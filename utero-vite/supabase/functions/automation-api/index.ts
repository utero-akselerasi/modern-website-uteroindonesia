import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

/**
 * Enhanced Automation API Edge Function
 *
 * Endpoint untuk auto-posting artikel dengan fitur lengkap:
 * - API Key authentication dari database
 * - Upsert logic dengan external_id
 * - Auto category creation
 * - Tags support
 * - Status control (draft/pending/published/archived)
 * - Rate limiting (120 req/60s)
 * - Audit logging
 *
 * @endpoint POST /functions/v1/automation-api
 * @auth x-api-key header
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Hash function for API key validation
async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  const requestStartTime = Date.now();
  let apiKeyId: string | null = null;
  let responseStatus = 500;
  let responseBody: any = { success: false, error: 'Unknown error' };

  try {
    // Initialize Supabase client with service role for database access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      db: { schema: 'utero-artikel' }
    });

    // ========================================================================
    // 1. API KEY AUTHENTICATION
    // ========================================================================
    const apiKey = req.headers.get('x-api-key');

    if (!apiKey) {
      responseStatus = 401;
      responseBody = { success: false, error: 'Missing x-api-key header' };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Hash the provided API key
    const keyHash = await hashApiKey(apiKey);

    // Validate API key using database function
    const { data: validation, error: validationError } = await supabase
      .rpc('validate_api_key', { _key_hash: keyHash })
      .single();

    if (validationError || !validation || !validation.is_valid) {
      responseStatus = 401;
      responseBody = {
        success: false,
        error: validation?.error_message || 'Invalid or inactive API key'
      };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check scope
    if (validation.scope !== 'automation') {
      responseStatus = 403;
      responseBody = {
        success: false,
        error: 'This API key does not have automation scope'
      };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    apiKeyId = validation.api_key_id;

    // ========================================================================
    // 2. RATE LIMITING
    // ========================================================================
    const { data: rateLimit, error: rateLimitError } = await supabase
      .rpc('check_rate_limit', {
        _api_key_id: apiKeyId,
        _limit: 120,
        _window_seconds: 60
      })
      .single();

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    }

    if (rateLimit && !rateLimit.allowed) {
      responseStatus = 429;
      responseBody = {
        success: false,
        error: 'Rate limit exceeded',
        limit: rateLimit.limit_value,
        current: rateLimit.current_count,
        retry_after: rateLimit.retry_after
      };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(rateLimit.limit_value),
          'X-RateLimit-Remaining': String(Math.max(0, rateLimit.limit_value - rateLimit.current_count)),
          'Retry-After': String(rateLimit.retry_after)
        }
      });
    }

    // Add rate limit headers to response
    const rateLimitHeaders = rateLimit ? {
      'X-RateLimit-Limit': String(rateLimit.limit_value),
      'X-RateLimit-Remaining': String(Math.max(0, rateLimit.limit_value - rateLimit.current_count))
    } : {};

    // ========================================================================
    // 3. PARSE REQUEST BODY
    // ========================================================================
    if (req.method !== 'POST') {
      responseStatus = 405;
      responseBody = { success: false, error: 'Method not allowed. Use POST method.' };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
      });
    }

    let body;
    try {
      body = await req.json();
    } catch (error) {
      responseStatus = 400;
      responseBody = { success: false, error: 'Invalid JSON in request body' };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
      });
    }

    const {
      external_id,
      title,
      content,
      slug,
      excerpt,
      author = 'Utero Indonesia Team',
      category_name,
      category_id,
      tags = [],
      status = 'published',
      featured_image_url,
      image_base64,
      image_filename,
      image_mime_type = 'image/png',
    } = body;

    // ========================================================================
    // 4. INPUT VALIDATION
    // ========================================================================

    // Required: external_id
    if (!external_id || typeof external_id !== 'string' || external_id.trim().length === 0) {
      responseStatus = 400;
      responseBody = {
        success: false,
        error: 'Field "external_id" is required and must be a non-empty string'
      };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Required: title
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      responseStatus = 400;
      responseBody = {
        success: false,
        error: 'Field "title" is required and must be a non-empty string'
      };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Required: content
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      responseStatus = 400;
      responseBody = {
        success: false,
        error: 'Field "content" is required and must be a non-empty string'
      };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate title length
    if (title.length > 255) {
      responseStatus = 400;
      responseBody = { success: false, error: 'Title too long (maximum 255 characters)' };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate status
    const validStatuses = ['draft', 'pending', 'published', 'archived'];
    if (!validStatuses.includes(status)) {
      responseStatus = 400;
      responseBody = {
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate tags array
    if (tags && !Array.isArray(tags)) {
      responseStatus = 400;
      responseBody = { success: false, error: 'Field "tags" must be an array' };
      return new Response(JSON.stringify(responseBody), {
        status: responseStatus,
        headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
      });
    }

    // ========================================================================
    // 5. GENERATE SLUG (if not provided)
    // ========================================================================
    let finalSlug = slug;
    if (!finalSlug || finalSlug.trim().length === 0) {
      finalSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 100);

      console.log(`Generated slug: "${finalSlug}" from title: "${title}"`);
    }

    // ========================================================================
    // 6. UPLOAD IMAGE (if provided)
    // ========================================================================
    let coverUrl = featured_image_url || null;

    if (image_base64 && !coverUrl) {
      try {
        console.log('Starting image upload...');

        const imageBytes = decode(image_base64);

        const extensionMap: { [key: string]: string } = {
          'image/png': 'png',
          'image/jpeg': 'jpg',
          'image/jpg': 'jpg',
          'image/webp': 'webp',
        };
        const extension = extensionMap[image_mime_type] || 'png';

        const filename = image_filename || `${finalSlug}-${Date.now()}.${extension}`;
        const filePath = `blog-covers/${filename}`;

        console.log(`Uploading image to: ${filePath}`);

        const { error: uploadError } = await supabase.storage
          .from('blog-covers')
          .upload(filePath, imageBytes, {
            contentType: image_mime_type,
            upsert: true,
          });

        if (uploadError) {
          console.error('Image upload error:', uploadError);
          console.warn('Proceeding without cover image');
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('blog-covers')
            .getPublicUrl(filePath);

          coverUrl = publicUrl;
          console.log(`Image uploaded successfully: ${coverUrl}`);
        }
      } catch (error) {
        console.error('Image processing error:', error);
        console.warn('Proceeding without cover image due to error');
      }
    }

    // ========================================================================
    // 7. UPSERT ARTICLE USING DATABASE FUNCTION
    // ========================================================================
    console.log(`Upserting article with external_id: ${external_id}`);

    const { data: upsertResult, error: upsertError } = await supabase
      .rpc('upsert_article', {
        _external_id: external_id.trim(),
        _title: title.trim(),
        _content: content.trim(),
        _slug: finalSlug,
        _excerpt: excerpt?.trim() || null,
        _author: author.trim(),
        _category_name: category_name?.trim() || null,
        _tags: tags,
        _cover_url: coverUrl,
        _meta_description: excerpt?.trim() || null,
        _status: status
      })
      .single();

    if (upsertError) {
      console.error('Upsert error:', upsertError);

      // Check for duplicate slug
      if (upsertError.code === '23505' && upsertError.message.includes('slug')) {
        responseStatus = 409;
        responseBody = {
          success: false,
          error: `Slug "${finalSlug}" already exists. Please provide a different slug or title.`
        };
        return new Response(JSON.stringify(responseBody), {
          status: responseStatus,
          headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' }
        });
      }

      throw upsertError;
    }

    // ========================================================================
    // 8. SUCCESS RESPONSE
    // ========================================================================
    const isNew = upsertResult.is_new;
    const articleId = upsertResult.article_id;

    console.log(`Article ${isNew ? 'created' : 'updated'} successfully: ${articleId}`);

    responseStatus = 200;
    responseBody = {
      success: true,
      data: {
        article_id: articleId,
        operation: isNew ? 'insert' : 'update',
        message: isNew ? 'Article created successfully' : 'Article updated successfully',
        external_id: external_id,
        slug: finalSlug,
        cover_url: coverUrl,
        url: `/blog/${finalSlug}`,
        is_new: isNew,
        status: status
      },
    };

    return new Response(JSON.stringify(responseBody), {
      status: responseStatus,
      headers: {
        ...corsHeaders,
        ...rateLimitHeaders,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    // ========================================================================
    // ERROR HANDLER
    // ========================================================================
    console.error('automation-api error:', error);

    responseStatus = 500;
    responseBody = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };

    return new Response(JSON.stringify(responseBody), {
      status: responseStatus,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } finally {
    // ========================================================================
    // AUDIT LOGGING (fire and forget)
    // ========================================================================
    if (apiKeyId) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
          db: { schema: 'utero-artikel' }
        });

        await supabase
          .from('api_audit_logs')
          .insert({
            api_key_id: apiKeyId,
            endpoint: '/functions/v1/automation-api',
            method: req.method,
            response_status: responseStatus,
            response_body: responseBody,
            ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
            user_agent: req.headers.get('user-agent') || 'unknown'
          });
      } catch (logError) {
        console.error('Failed to log audit trail:', logError);
      }
    }
  }
});
