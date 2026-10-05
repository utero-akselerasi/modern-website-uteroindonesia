# Automation API - Implementation Guide

**Last updated:** 11 September 2026

Implementasi lengkap Automation API untuk uteroindonesia.com dengan fitur-fitur enterprise grade.

---

## 🎯 Fitur Utama

### ✅ Yang Sudah Diimplementasikan

1. **API Key Management**
   - Database-based API keys dengan SHA-256 hashing
   - Support scope (automation, public_read)
   - Expiration dates
   - Active/inactive status
   - Last used tracking

2. **Upsert Logic**
   - Create artikel baru atau update existing dengan xternal_id
   - Automatic conflict resolution
   - Preserves data yang tidak di-update

3. **Auto Category Creation**
   - Auto-create category jika belum ada berdasarkan category_name
   - Slug generation otomatis
   - Category reuse untuk artikel berikutnya

4. **Tags Support**
   - Array of tags per artikel
   - GIN index untuk fast tag search
   - Auto sync tags saat upsert

5. **Status Control**
   - Draft, Pending, Published, Archived
   - Backward compatible dengan published boolean
   - Auto set published_at saat status = published

6. **Rate Limiting**
   - 120 requests per 60 seconds per API key
   - Automatic window tracking
   - Response headers: X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After

7. **Audit Logging**
   - Track semua API calls
   - Request/response logging
   - IP address & user agent tracking
   - Search by API key, endpoint, date

8. **Image Upload**
   - Base64 upload support
   - URL reference support (eatured_image_url)
   - Auto storage di Supabase Storage bucket log-covers

---

## 📦 File Structure

\\\
utero-vite/
├── supabase/
│   ├── migrations/
│   │   ├── 20260803_create_blog_posts.sql          # Initial setup
│   │   ├── 20260911_automation_api_enhancements.sql # New features
│   │   └── generate_api_key.sql                    # Helper script
│   └── functions/
│       ├── blog-auto-post/                         # Old function (deprecated)
│       │   └── index.ts
│       └── automation-api/                         # New enhanced function
│           └── index.ts
└── docs/
    └── AUTOMATION-API-IMPLEMENTATION.md            # This file
\\\

---

## 🚀 Setup Instructions

### Step 1: Run Database Migrations

Jalankan migrations di Supabase SQL Editor secara berurutan:

\\\ash
# 1. Run initial migration (jika belum)
supabase migration run 20260803_create_blog_posts.sql

# 2. Run enhancement migration
supabase migration run 20260911_automation_api_enhancements.sql
\\\

Atau via Supabase Dashboard:
1. Buka Supabase Dashboard → SQL Editor
2. Copy paste isi file 20260911_automation_api_enhancements.sql
3. Klik Run

### Step 2: Deploy Edge Function

\\\ash
# Deploy new automation-api function
supabase functions deploy automation-api

# Verify deployment
supabase functions list
\\\

### Step 3: Generate API Key

Ada 2 cara generate API key:

#### Option A: Via SQL Script (Recommended)

1. Buka file supabase/migrations/generate_api_key.sql
2. Edit variabel:
   \\\sql
   _description TEXT := 'WordPress Integration'; -- Ubah sesuai kebutuhan
   _scope TEXT := 'automation'; -- automation atau public_read
   _expires_at TIMESTAMPTZ := NULL; -- NULL = tidak expired
   \\\
3. Run di SQL Editor
4. Copy API key yang muncul di NOTICE

#### Option B: Manual Insert

\\\sql
-- Generate key manually
DO $$ 
DECLARE
    _raw_key TEXT := 'aut_live_' || encode(gen_random_bytes(24), 'hex');
    _key_hash TEXT := encode(digest(_raw_key, 'sha256'), 'hex');
BEGIN
    INSERT INTO "utero-artikel".api_keys (key_hash, key_prefix, description, scope)
    VALUES (_key_hash, substring(_raw_key, 1, 16), 'My API Key', 'automation');
    
    RAISE NOTICE 'API Key: %', _raw_key;
END $$;
\\\

### Step 4: Test API

\\\ash
curl -X POST "https://YOUR-PROJECT.supabase.co/functions/v1/automation-api" \
  -H "x-api-key: aut_live_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "external_id": "test-001",
    "title": "Test Article",
    "content": "<p>This is test content</p>",
    "excerpt": "Test excerpt",
    "tags": ["test", "automation"],
    "status": "draft"
  }'
\\\

Expected response:
\\\json
{
  "success": true,
  "data": {
    "article_id": "uuid-here",
    "external_id": "test-001",
    "slug": "test-article",
    "cover_url": null,
    "url": "/blog/test-article",
    "is_new": true,
    "status": "draft"
  }
}
\\\

---

## 📖 API Documentation

### Endpoint

\\\
POST https://YOUR-PROJECT.supabase.co/functions/v1/automation-api
\\\

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| x-api-key | ✅ Yes | API key dengan scope utomation |
| Content-Type | ✅ Yes | Must be pplication/json |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| xternal_id | string | ✅ Yes | Unique ID dari sistem external (e.g., WordPress post ID) |
| 	itle | string | ✅ Yes | Judul artikel (max 255 chars) |
| content | string | ✅ Yes | HTML content artikel |
| slug | string | ❌ No | URL slug (auto-generated from title if not provided) |
| xcerpt | string | ❌ No | Short description (max 1000 chars) |
| uthor | string | ❌ No | Author name (default: "Utero Indonesia Team") |
| category_name | string | ❌ No | Category name (auto-created if not exists) |
| 	ags | array | ❌ No | Array of tag strings (e.g., ["kesehatan", "tips"]) |
| status | string | ❌ No | draft, pending, published, rchived (default: published) |
| eatured_image_url | string | ❌ No | Public URL to image |
| image_base64 | string | ❌ No | Base64 encoded image (alternative to eatured_image_url) |
| image_filename | string | ❌ No | Filename for uploaded image |
| image_mime_type | string | ❌ No | MIME type (default: image/png) |

### Response

#### Success (201 Created / 200 OK)

\\\json
{
  "success": true,
  "data": {
    "article_id": "uuid",
    "external_id": "wp-123",
    "slug": "article-slug",
    "cover_url": "https://...",
    "url": "/blog/article-slug",
    "is_new": true,
    "status": "published"
  }
}
\\\

#### Error Responses

| Status | Description |
|--------|-------------|
| 400 | Bad Request - Missing required fields or invalid data |
| 401 | Unauthorized - Invalid API key |
| 403 | Forbidden - API key doesn't have automation scope |
| 409 | Conflict - Slug already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## 🔧 Database Schema

### New Tables

#### api_keys
\\\sql
- id: UUID (PK)
- key_hash: TEXT (SHA-256 hash)
- key_prefix: TEXT (display prefix)
- description: TEXT
- scope: TEXT (automation|public_read)
- is_active: BOOLEAN
- expires_at: TIMESTAMPTZ
- last_used_at: TIMESTAMPTZ
- created_at: TIMESTAMPTZ
\\\

#### categories
\\\sql
- id: UUID (PK)
- name: TEXT (unique)
- slug: TEXT (unique)
- description: TEXT
- created_at: TIMESTAMPTZ
\\\

#### api_audit_logs
\\\sql
- id: UUID (PK)
- api_key_id: UUID (FK)
- endpoint: TEXT
- method: TEXT
- request_body: JSONB
- response_status: INTEGER
- response_body: JSONB
- ip_address: TEXT
- user_agent: TEXT
- created_at: TIMESTAMPTZ
\\\

#### api_rate_limits
\\\sql
- id: UUID (PK)
- api_key_id: UUID (FK)
- window_start: TIMESTAMPTZ
- request_count: INTEGER
- created_at: TIMESTAMPTZ
\\\

### Updated blog_posts Table

Added columns:
- xternal_id: TEXT (unique) - For upsert logic
- 	ags: TEXT[] - Array of tags
- status: article_status ENUM - Article status
- category_id: UUID (FK) - Reference to categories table

---

## 🔍 Monitoring & Audit

### View API Usage

\\\sql
-- Recent API calls
SELECT 
    al.created_at,
    ak.description as api_key,
    al.endpoint,
    al.response_status,
    al.ip_address
FROM "utero-artikel".api_audit_logs al
JOIN "utero-artikel".api_keys ak ON al.api_key_id = ak.id
ORDER BY al.created_at DESC
LIMIT 100;
\\\

### Check Rate Limits

\\\sql
-- Current rate limit status per API key
SELECT 
    ak.description,
    rl.window_start,
    rl.request_count,
    (120 - rl.request_count) as remaining
FROM "utero-artikel".api_rate_limits rl
JOIN "utero-artikel".api_keys ak ON rl.api_key_id = ak.id
WHERE rl.window_start >= now() - interval '1 minute'
ORDER BY rl.window_start DESC;
\\\

### API Key Stats

\\\sql
-- API key usage statistics
SELECT 
    ak.description,
    ak.scope,
    ak.is_active,
    ak.last_used_at,
    COUNT(al.id) as total_calls,
    COUNT(CASE WHEN al.response_status = 200 THEN 1 END) as successful_calls,
    COUNT(CASE WHEN al.response_status >= 400 THEN 1 END) as failed_calls
FROM "utero-artikel".api_keys ak
LEFT JOIN "utero-artikel".api_audit_logs al ON ak.id = al.api_key_id
GROUP BY ak.id, ak.description, ak.scope, ak.is_active, ak.last_used_at
ORDER BY total_calls DESC;
\\\

---

## 🔐 Security Best Practices

1. **Never commit API keys** ke repository
2. **Use environment variables** untuk store API keys
3. **Rotate keys regularly** (setiap 3-6 bulan)
4. **Set expiration dates** untuk API keys yang temporary
5. **Monitor audit logs** untuk detect suspicious activity
6. **Use HTTPS only** untuk API calls
7. **Implement retry logic** dengan exponential backoff
8. **Validate data** sebelum send ke API

---

## 🐛 Troubleshooting

### Error: Invalid or inactive API key

**Solusi:**
1. Check di database apakah key masih active:
   \\\sql
   SELECT * FROM "utero-artikel".api_keys WHERE key_prefix = 'aut_live_xxxx';
   \\\
2. Verify key hash matches
3. Generate new key jika perlu

### Error: Rate limit exceeded

**Solusi:**
1. Wait sesuai Retry-After header
2. Implement exponential backoff
3. Batch requests jika memungkinkan

### Artikel tidak muncul setelah POST

**Solusi:**
1. Check response untuk rticle_id
2. Query database:
   \\\sql
   SELECT * FROM "utero-artikel".blog_posts WHERE external_id = 'your-external-id';
   \\\
3. Check status field (mungkin masih draft)

---

## 📚 Migration from Old Function

Jika Anda masih menggunakan log-auto-post function lama:

### Differences

| Feature | Old (blog-auto-post) | New (automation-api) |
|---------|---------------------|---------------------|
| Auth | Env var BLOG_API_KEY | Database API keys |
| Upsert | ❌ No | ✅ Yes (via xternal_id) |
| Categories | String field | ✅ Auto-create |
| Tags | ❌ No | ✅ Array support |
| Status | Boolean published | ✅ Enum (draft/pending/published/archived) |
| Rate Limiting | ❌ No | ✅ 120 req/60s |
| Audit Logs | ❌ No | ✅ Full logging |

### Migration Steps

1. Run new migrations
2. Deploy utomation-api function
3. Generate new API keys
4. Update client code untuk use new fields
5. Test thoroughly
6. Deprecate old log-auto-post function

---

## 🎉 Example Integrations

### WordPress Plugin

\\\php
// functions.php or custom plugin

function sync_to_utero_cms(\) {
    \ = get_post(\);
    
    \ = [
        'external_id' => 'wp-' . \,
        'title' => \->post_title,
        'content' => \->post_content,
        'excerpt' => \->post_excerpt,
        'author' => get_the_author_meta('display_name', \->post_author),
        'category_name' => get_the_category(\)[0]->name,
        'tags' => wp_get_post_tags(\, ['fields' => 'names']),
        'status' => \->post_status === 'publish' ? 'published' : 'draft',
        'featured_image_url' => get_the_post_thumbnail_url(\, 'full')
    ];
    
    \ = wp_remote_post('https://YOUR-PROJECT.supabase.co/functions/v1/automation-api', [
        'headers' => [
            'x-api-key' => UTERO_API_KEY,
            'Content-Type' => 'application/json'
        ],
        'body' => json_encode(\),
        'timeout' => 30
    ]);
    
    if (is_wp_error(\)) {
        error_log('Utero sync failed: ' . \->get_error_message());
        return false;
    }
    
    \ = json_decode(wp_remote_retrieve_body(\), true);
    
    if (\['success']) {
        update_post_meta(\, '_utero_article_id', \['data']['article_id']);
        return true;
    }
    
    return false;
}

add_action('save_post', 'sync_to_utero_cms');
\\\

### Node.js Script

\\\javascript
const fetch = require('node-fetch');

async function syncArticle(article) {
  const response = await fetch('https://YOUR-PROJECT.supabase.co/functions/v1/automation-api', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.UTERO_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      external_id: article.id,
      title: article.title,
      content: article.content,
      tags: article.tags,
      status: 'published',
      category_name: article.category
    })
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error);
  }
  
  return data.data;
}
\\\

---

## 📞 Support

- **Documentation**: This file
- **Issues**: Create issue di repository
- **Email**: support@uteroindonesia.com

---

**Version:** 1.0.0  
**Last Updated:** 11 September 2026  
**Author:** Utero Indonesia Development Team
