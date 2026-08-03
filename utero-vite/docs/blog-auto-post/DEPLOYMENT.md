# Deployment Guide - Blog Auto-Post System
# UteroindonesiaCom

**Version:** 1.0  
**Last Updated:** 2026-08-03  
**Target Environment:** Supabase Self-Hosted (supabase.carubra.com)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Storage Setup](#storage-setup)
4. [Edge Function Deployment](#edge-function-deployment)
5. [Environment Variables](#environment-variables)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [Rollback Procedure](#rollback-procedure)

---

## Prerequisites

### Required Access
- [x] Supabase Dashboard access: `https://supabase.carubra.com`
- [x] Database admin credentials
- [x] Service role key
- [x] Public anon key

### Required Files
- [x] `supabase/migrations/20260803_create_blog_posts.sql`
- [x] `supabase/functions/blog-auto-post/index.ts`

### Tools
- [x] Web browser untuk Supabase Dashboard
- [x] Text editor untuk review SQL
- [x] API testing tool (Postman, cURL, atau Insomnia)

---

## Database Setup

### Step 1: Backup Existing Database

**⚠️ PENTING: Selalu backup sebelum migration!**

```sql
-- Via Supabase Dashboard: Database → Backups → Create Backup
-- Atau via SQL:
pg_dump -h supabase.carubra.com -U postgres -d postgres > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Step 2: Review Migration File

1. Buka file: `supabase/migrations/20260803_create_blog_posts.sql`
2. Review script untuk memastikan sesuai kebutuhan
3. Perhatikan bagian:
   - ✓ Table creation
   - ✓ Indexes
   - ✓ RLS policies
   - ✓ Triggers
   - ✓ Comments

### Step 3: Execute Migration

**Via Supabase Dashboard:**

1. Login ke `https://supabase.carubra.com`
2. Pilih project: `uteroindonesia`
3. Navigate: **SQL Editor** → **New Query**
4. Copy-paste isi file `20260803_create_blog_posts.sql`
5. Click **Run** atau tekan `Ctrl + Enter`
6. Tunggu hingga selesai (akan muncul success message)

**Expected Output:**
```
NOTICE:  Migration completed successfully!
NOTICE:  Table blog_posts created with RLS policies
NOTICE:  Next steps:
NOTICE:  1. Create Storage bucket "blog-covers" via Dashboard
NOTICE:  2. Deploy Edge Function "blog-auto-post"
NOTICE:  3. Set environment variables for API_KEY
```

### Step 4: Verify Database Objects

Run verification queries:

```sql
-- 1. Check table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'blog_posts'
) as table_exists;
-- Expected: table_exists = true

-- 2. Check columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;
-- Expected: 14 columns

-- 3. Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'blog_posts' 
ORDER BY indexname;
-- Expected: 4+ indexes

-- 4. Check RLS policies
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'blog_posts';
-- Expected: 2 policies

-- 5. Check triggers
SELECT trigger_name, event_manipulation, action_statement
FROM information_schema.triggers
WHERE event_object_table = 'blog_posts';
-- Expected: update_blog_posts_updated_at trigger
```

### Step 5: Test RLS Policies

```sql
-- Test as anonymous user (public read)
SET ROLE anon;
SELECT count(*) FROM blog_posts WHERE published = true;
-- Should succeed

SELECT count(*) FROM blog_posts WHERE published = false;
-- Should return 0 (no access to unpublished)

-- Reset role
RESET ROLE;
```

---

## Storage Setup

### Step 1: Create Storage Bucket

1. Login ke Supabase Dashboard
2. Navigate: **Storage** → **Buckets**
3. Click **New bucket**
4. Fill form:
   - **Name:** `blog-covers`
   - **Public bucket:** ✓ **Yes** (checked)
   - **File size limit:** `5 MB`
   - **Allowed MIME types:** `image/png, image/jpeg, image/jpg, image/webp`
5. Click **Create bucket**

### Step 2: Configure Bucket Policies

Bucket policies akan otomatis dibuat untuk public bucket. Verify dengan:

1. Click bucket `blog-covers`
2. Tab **Policies**
3. Pastikan ada policy untuk:
   - ✓ Public read access
   - ✓ Service role write access

**Expected Policies:**

```sql
-- Public read
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-covers');

-- Service role write
CREATE POLICY "Service Upload"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'blog-covers');
```

### Step 3: Test Storage Upload

Via Supabase Dashboard:

1. Bucket `blog-covers` → **Upload file**
2. Upload sample image
3. Verify file muncul di list
4. Copy public URL
5. Paste URL di browser, pastikan gambar bisa diakses

---

## Edge Function Deployment

### Step 1: Review Function Code

1. Buka file: `supabase/functions/blog-auto-post/index.ts`
2. Review code untuk memastikan logic sesuai
3. Perhatikan:
   - ✓ API key validation
   - ✓ Input validation
   - ✓ Slug generation
   - ✓ Image upload
   - ✓ Database insert
   - ✓ Error handling

### Step 2: Deploy Function

**Via Supabase Dashboard:**

1. Navigate: **Edge Functions**
2. Click **Deploy new function**
3. Fill form:
   - **Function name:** `blog-auto-post`
   - **Code:** Copy-paste dari `index.ts`
4. Click **Deploy**
5. Tunggu hingga deployment selesai

**Via Supabase CLI (Alternative):**

```bash
# Install Supabase CLI (jika belum)
npm install -g supabase

# Login
supabase login

# Link to project
supabase link --project-ref <project-ref>

# Deploy function
supabase functions deploy blog-auto-post
```

### Step 3: Verify Function Deployment

1. Navigate: **Edge Functions**
2. Check function `blog-auto-post` ada di list
3. Status: **Active** (green indicator)
4. Note the endpoint URL:
   ```
   https://supabase.carubra.com/functions/v1/blog-auto-post
   ```

---

## Environment Variables

### Required Variables

Set di Supabase Dashboard: **Settings** → **API** → **Environment Variables**

| Variable | Description | How to Get |
|----------|-------------|------------|
| `SUPABASE_URL` | Supabase project URL | Dashboard → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | Dashboard → Settings → API → service_role key |
| `BLOG_API_KEY` | Custom API key untuk auth | Generate sendiri (lihat panduan) |

### Generate BLOG_API_KEY

**Recommended Format:**
```
utero_blog_{environment}_{random_string}

Example:
- Dev: utero_blog_dev_9Km2nX5pQ8vR4jT
- Prod: utero_blog_prod_7Lp3mY6qW1sN8hF
```

**Generate via Command Line:**

```bash
# Linux/Mac
echo "utero_blog_prod_$(openssl rand -base64 24 | tr -d /=+ | cut -c1-20)"

# PowerShell
"utero_blog_prod_" + (-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 20 | % {[char]$_}))

# Python
import secrets
import string
chars = string.ascii_letters + string.digits
random_str = ''.join(secrets.choice(chars) for _ in range(20))
print(f"utero_blog_prod_{random_str}")
```

### Set Environment Variables

**Via Supabase Dashboard:**

1. Navigate: **Edge Functions** → `blog-auto-post`
2. Tab **Settings** atau **Secrets**
3. Add variables:

```
SUPABASE_URL=https://supabase.carubra.com
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
BLOG_API_KEY=utero_blog_prod_9Km2nX5pQ8vR4jT
```

4. Click **Save**

**⚠️ IMPORTANT:** 
- Jangan commit API key ke Git!
- Simpan di password manager
- Rotate setiap 90 hari

---

## Testing

### Test 1: Health Check (Manual)

Verify function responds:

```bash
curl -X OPTIONS https://supabase.carubra.com/functions/v1/blog-auto-post
```

**Expected Response:**
```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
```

### Test 2: Invalid API Key

```bash
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: invalid_key" \
  -d '{
    "title": "Test",
    "content": "<p>Test</p>"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Unauthorized: Invalid API key"
}
```
**Status:** 401

### Test 3: Missing Required Fields

```bash
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: utero_blog_prod_9Km2nX5pQ8vR4jT" \
  -d '{
    "title": "Test"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Field \"content\" is required and must be a non-empty string"
}
```
**Status:** 400

### Test 4: Minimal Valid Request

```bash
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: utero_blog_prod_9Km2nX5pQ8vR4jT" \
  -d '{
    "title": "Test Artikel Deployment",
    "content": "<h2>Heading</h2><p>Ini adalah test artikel untuk verifikasi deployment.</p>"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "test-artikel-deployment",
    "cover_url": null,
    "url": "/blog/test-artikel-deployment"
  }
}
```
**Status:** 201

### Test 5: Full Request with Image

```bash
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: utero_blog_prod_9Km2nX5pQ8vR4jT" \
  -d '{
    "title": "Panduan Kesehatan Ibu Hamil",
    "content": "<h2>Pendahuluan</h2><p>Artikel tentang kesehatan ibu hamil...</p>",
    "slug": "panduan-kesehatan-ibu-hamil",
    "excerpt": "Panduan lengkap kesehatan untuk ibu hamil",
    "author": "Dr. Rina Susanti",
    "category": "Kesehatan",
    "image_base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "image_filename": "kesehatan-ibu-hamil.png",
    "image_mime_type": "image/png",
    "meta_fields": {
      "description": "Panduan kesehatan ibu hamil untuk kehamilan yang sehat"
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "234f5678-f90c-23e4-b567-537725285111",
    "slug": "panduan-kesehatan-ibu-hamil",
    "cover_url": "https://supabase.carubra.com/storage/v1/object/public/blog-covers/panduan-kesehatan-ibu-hamil-1722709200000.png",
    "url": "/blog/panduan-kesehatan-ibu-hamil"
  }
}
```
**Status:** 201

### Test 6: Duplicate Slug

Run Test 4 atau Test 5 dua kali dengan title/slug yang sama.

**Expected Response:**
```json
{
  "success": false,
  "error": "Slug \"test-artikel-deployment\" already exists. Please provide a different slug or title."
}
```
**Status:** 409

### Test 7: Verify in Database

```sql
SELECT id, title, slug, author, category, cover_url, published, published_at
FROM blog_posts
ORDER BY created_at DESC
LIMIT 5;
```

Pastikan artikel yang baru dibuat muncul di hasil query.

### Test 8: Verify Public Access

```bash
# Test via frontend (jika sudah di-deploy)
curl https://uteroindonesia.com/blog/test-artikel-deployment
```

Artikel harus bisa diakses public.

---

## Troubleshooting

### Issue 1: Function Not Found (404)

**Symptoms:**
```json
{"error": "Function not found"}
```

**Solutions:**
1. Verify function deployed: Dashboard → Edge Functions
2. Check endpoint URL correct
3. Verify function status: Active
4. Redeploy function

### Issue 2: Internal Server Error (500)

**Symptoms:**
```json
{"success": false, "error": "Server configuration error"}
```

**Solutions:**
1. Check environment variables set correctly
2. Verify `SUPABASE_URL` format (no trailing slash)
3. Verify `SUPABASE_SERVICE_ROLE_KEY` is service role, bukan anon key
4. Check function logs: Dashboard → Edge Functions → Logs

### Issue 3: Database Insert Fails

**Symptoms:**
```json
{"success": false, "error": "permission denied for table blog_posts"}
```

**Solutions:**
1. Verify menggunakan service_role_key (bukan anon key)
2. Check RLS policies correct
3. Verify table exists: `SELECT * FROM blog_posts LIMIT 1;`

### Issue 4: Image Upload Fails

**Symptoms:**
Function succeeds but `cover_url` is null

**Solutions:**
1. Check bucket `blog-covers` exists
2. Verify bucket is public
3. Check storage policies
4. Verify image size < 5MB
5. Check function logs untuk error message

### Issue 5: Duplicate Slug Not Detected

**Symptoms:**
Duplicate insert succeeds instead of returning 409

**Solutions:**
1. Verify UNIQUE constraint on slug column:
   ```sql
   SELECT constraint_name, constraint_type
   FROM information_schema.table_constraints
   WHERE table_name = 'blog_posts' AND constraint_type = 'UNIQUE';
   ```
2. If missing, add constraint:
   ```sql
   ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);
   ```

### Issue 6: CORS Error from Browser

**Symptoms:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solutions:**
1. Verify CORS headers di function code
2. Test dengan CORS disabled (untuk debug)
3. Check `Access-Control-Allow-Origin` header
4. Verify OPTIONS request handled correctly

---

## Rollback Procedure

### When to Rollback
- Critical bug discovered
- Data corruption
- Performance issues
- Security vulnerability

### Step 1: Disable Function

**Immediate Action:**

1. Dashboard → Edge Functions → `blog-auto-post`
2. Click **Disable** atau **Delete**
3. Ini akan stop incoming requests

### Step 2: Rollback Database

⚠️ **WARNING:** This will delete all blog posts!

```sql
-- Drop trigger
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;

-- Drop table (CASCADE will drop dependent objects)
DROP TABLE IF EXISTS public.blog_posts CASCADE;

-- Drop function
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- If also rolling back user_roles (hati-hati!)
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;
```

**Selective Rollback (Keep Data):**

```sql
-- Only drop policies
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;

-- Disable RLS
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
```

### Step 3: Rollback Storage

1. Dashboard → Storage → `blog-covers`
2. **Empty bucket** (optional, if want to remove all images)
3. **Delete bucket** (if completely removing feature)

### Step 4: Restore from Backup

```sql
-- Restore database from backup
psql -h supabase.carubra.com -U postgres -d postgres < backup_20260803_153000.sql
```

### Step 5: Verify Rollback

```sql
-- Verify table removed
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'blog_posts'
) as table_exists;
-- Expected: false

-- Verify function removed
SELECT EXISTS (
    SELECT FROM information_schema.routines
    WHERE routine_schema = 'public'
    AND routine_name = 'blog-auto-post'
) as function_exists;
-- Expected: false
```

---

## Post-Deployment Checklist

- [ ] Database migration executed successfully
- [ ] Table `blog_posts` created with 14 columns
- [ ] 4+ indexes created (including unique slug)
- [ ] 2 RLS policies active
- [ ] Trigger `update_blog_posts_updated_at` active
- [ ] Storage bucket `blog-covers` created and public
- [ ] Storage policies configured
- [ ] Edge function `blog-auto-post` deployed
- [ ] Environment variables set (3 variables)
- [ ] API key generated and secured
- [ ] All 8 tests passed
- [ ] Sample article created successfully
- [ ] Article accessible via frontend
- [ ] Function logs reviewed (no errors)
- [ ] Performance verified (< 3s response time)
- [ ] Documentation updated in project repo
- [ ] API key shared with authorized team members
- [ ] Backup created before deployment
- [ ] Rollback procedure documented and tested

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Review function logs untuk errors
- [ ] Check API error rate < 5%
- [ ] Verify storage usage within limits

### Weekly Checks
- [ ] Review performance metrics
- [ ] Check for slow queries (> 500ms)
- [ ] Analyze API usage patterns

### Monthly Checks
- [ ] Review security audit logs
- [ ] Update dependencies if needed
- [ ] Check storage cleanup needed

### Quarterly Checks
- [ ] Rotate API key (every 90 days)
- [ ] Performance optimization review
- [ ] Security vulnerability scan

---

## Support Contacts

**Technical Issues:**
- Development Team: dev@uteroindonesia.com
- On-call: [Slack channel atau phone]

**Supabase Support:**
- Dashboard: https://supabase.carubra.com
- Docs: https://supabase.com/docs

**Emergency Rollback:**
- Contact DevOps lead immediately
- Follow rollback procedure above
- Document incident in post-mortem

---

## Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-08-03 | 1.0 | Initial deployment guide | Development Team |

---

**End of Deployment Guide**

For questions or issues, refer to:
- PRD: `docs/blog-auto-post/PRD.md`
- SDD: `docs/blog-auto-post/SDD.md`
- Source Code: `supabase/functions/blog-auto-post/index.ts`
