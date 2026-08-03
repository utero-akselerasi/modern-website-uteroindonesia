import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

/**
 * Blog Auto-Post Edge Function
 * 
 * Endpoint untuk auto-posting artikel blog ke uteroindonesia.com
 * Schema: utero-artikel
 * 
 * Features:
 * - API key authentication
 * - Auto-generate slug dari title
 * - Upload cover image ke Supabase Storage
 * - Insert artikel ke database dengan RLS bypass
 * - SEO optimization dengan meta description
 * 
 * @endpoint POST /functions/v1/blog-auto-post
 * @auth x-api-key header
 */

// CORS headers untuk allow cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/**
 * Main request handler
 */
serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204 
    });
  }

  try {
    // ========================================================================
    // 1. API KEY AUTHENTICATION
    // ========================================================================
    const apiKey = req.headers.get('x-api-key');
    const expectedKey = Deno.env.get('BLOG_API_KEY');
    
    if (!expectedKey) {
      console.error('BLOG_API_KEY not configured in environment');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Server configuration error: API key not set' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    if (!apiKey || apiKey !== expectedKey) {
      console.warn('Unauthorized access attempt with invalid API key');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Unauthorized: Invalid API key' 
        }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // ========================================================================
    // 2. METHOD VALIDATION
    // ========================================================================
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Method not allowed. Use POST method.' 
        }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // ========================================================================
    // 3. PARSE REQUEST BODY
    // ========================================================================
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid JSON in request body' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const {
      title,
      content,
      slug,
      excerpt,
      author = 'Utero Indonesia Team',
      category = 'Artikel',
      image_base64,
      image_filename,
      image_mime_type = 'image/png',
      meta_fields,
    } = body;

    // ========================================================================
    // 4. INPUT VALIDATION
    // ========================================================================
    
    // Required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Field "title" is required and must be a non-empty string' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Field "content" is required and must be a non-empty string' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Title length validation
    if (title.length > 500) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Title too long (maximum 500 characters)' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Excerpt length validation
    if (excerpt && excerpt.length > 1000) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Excerpt too long (maximum 1000 characters)' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Image size validation (5MB limit)
    if (image_base64) {
      const sizeInBytes = (image_base64.length * 3) / 4;
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (sizeInBytes > maxSize) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Image too large (maximum 5MB)' 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // ========================================================================
    // 5. INITIALIZE SUPABASE CLIENT
    // ========================================================================
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase credentials not configured');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Server configuration error' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Use service role to bypass RLS for insert
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      db: { schema: 'utero-artikel' }
    });

    // ========================================================================
    // 6. GENERATE SLUG
    // ========================================================================
    const finalSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')          // Replace spaces with dash
      .replace(/-+/g, '-')           // Replace multiple dashes with single
      .replace(/^-+|-+$/g, '')       // Remove leading/trailing dashes
      .substring(0, 100);            // Limit to 100 characters

    console.log(`Generated slug: "${finalSlug}" from title: "${title}"`);

    // ========================================================================
    // 7. UPLOAD IMAGE (if provided)
    // ========================================================================
    let coverUrl: string | null = null;

    if (image_base64) {
      try {
        console.log('Starting image upload...');
        
        // Decode base64 to bytes
        const imageBytes = decode(image_base64);
        
        // Determine file extension from MIME type
        const extensionMap: { [key: string]: string } = {
          'image/png': 'png',
          'image/jpeg': 'jpg',
          'image/jpg': 'jpg',
          'image/webp': 'webp',
        };
        const extension = extensionMap[image_mime_type] || 'png';
        
        // Generate filename
        const filename = image_filename || `${finalSlug}-${Date.now()}.${extension}`;
        const filePath = `blog-covers/${filename}`;

        console.log(`Uploading image to: ${filePath}`);

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('blog-covers')
          .upload(filePath, imageBytes, {
            contentType: image_mime_type,
            upsert: true, // Overwrite if exists
          });

        if (uploadError) {
          console.error('Image upload error:', uploadError);
          // Continue without image rather than failing entire request
          console.warn('Proceeding without cover image');
        } else {
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('blog-covers')
            .getPublicUrl(filePath);
          
          coverUrl = publicUrl;
          console.log(`Image uploaded successfully: ${coverUrl}`);
        }
      } catch (error) {
        console.error('Image processing error:', error);
        // Continue without image
        console.warn('Proceeding without cover image due to error');
      }
    }

    // ========================================================================
    // 8. INSERT BLOG POST
    // ========================================================================
    console.log('Inserting blog post to database (schema: utero-artikel)...');

    const { data: post, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: title.trim(),
        content: content.trim(),
        slug: finalSlug,
        excerpt: excerpt?.trim() || meta_fields?.description?.trim() || null,
        author: author.trim(),
        category: category.trim(),
        cover_url: coverUrl,
        meta_description: meta_fields?.description?.trim() || excerpt?.trim() || null,
        published: true,
        published_at: new Date().toISOString(),
      })
      .select('id, slug')
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);

      // Check for duplicate slug
      if (insertError.code === '23505' && insertError.message.includes('slug')) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Slug "${finalSlug}" already exists. Please provide a different slug or title.` 
          }),
          { 
            status: 409, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Generic database error
      throw insertError;
    }

    // ========================================================================
    // 9. SUCCESS RESPONSE
    // ========================================================================
    console.log(`Blog post created successfully: ${post.id} (schema: utero-artikel)`);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: post.id,
          slug: post.slug,
          cover_url: coverUrl,
          url: `/blog/${post.slug}`,
          schema: 'utero-artikel'
        },
      }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    // ========================================================================
    // ERROR HANDLER
    // ========================================================================
    console.error('blog-auto-post error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
