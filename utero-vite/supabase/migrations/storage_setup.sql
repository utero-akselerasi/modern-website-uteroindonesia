-- Storage Setup for Blog Auto-Post System
-- Created: 2026-08-04
-- Description: Setup storage bucket dan policies untuk blog cover images

-- ============================================================================
-- IMPORTANT NOTES
-- ============================================================================
/*
Supabase Storage menggunakan schema 'storage' yang built-in.
Bucket creation tidak bisa dilakukan via SQL, harus via:
1. Supabase Dashboard (Recommended)
2. Storage API
3. Supabase CLI

File SQL ini hanya untuk setup POLICIES setelah bucket dibuat manual.
*/

-- ============================================================================
-- MANUAL STEPS - CREATE BUCKET (Via Dashboard)
-- ============================================================================
/*
LANGKAH 1: Buat Bucket via Supabase Dashboard
---------------------------------------------
1. Login: https://supabase.carubra.com
2. Navigate: Storage → Buckets
3. Click: [New bucket]
4. Config:
   - Name: blog-covers
   - Public: YES (checked)
   - File size limit: 5 MB (5242880 bytes)
   - Allowed MIME types: image/png, image/jpeg, image/jpg, image/webp
5. Click: Create bucket
6. Bucket akan tersedia di: storage.objects dengan bucket_id = 'blog-covers'
*/

-- ============================================================================
-- VERIFY BUCKET EXISTS
-- ============================================================================

-- Check if bucket exists
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE name = 'blog-covers';

-- Expected result:
-- id: blog-covers
-- name: blog-covers
-- public: true
-- file_size_limit: 5242880 (5MB)
-- allowed_mime_types: {image/png, image/jpeg, image/jpg, image/webp}

-- ============================================================================
-- STORAGE POLICIES SETUP
-- ============================================================================

-- ============================================================================
-- 1. PUBLIC READ POLICY - Anyone can view/download images
-- ============================================================================

CREATE POLICY IF NOT EXISTS "Public Access to Blog Covers"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'blog-covers');

COMMENT ON POLICY "Public Access to Blog Covers" ON storage.objects IS 
'Allows anyone to view and download blog cover images';

-- ============================================================================
-- 2. SERVICE ROLE INSERT POLICY - Edge Function can upload
-- ============================================================================

CREATE POLICY IF NOT EXISTS "Service Role Upload to Blog Covers"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'blog-covers');

COMMENT ON POLICY "Service Role Upload to Blog Covers" ON storage.objects IS 
'Allows Edge Function (via service_role_key) to upload blog cover images';

-- ============================================================================
-- 3. SERVICE ROLE UPDATE POLICY - Edge Function can update/replace
-- ============================================================================

CREATE POLICY IF NOT EXISTS "Service Role Update Blog Covers"
ON storage.objects
FOR UPDATE
TO service_role
USING (bucket_id = 'blog-covers')
WITH CHECK (bucket_id = 'blog-covers');

COMMENT ON POLICY "Service Role Update Blog Covers" ON storage.objects IS 
'Allows Edge Function to update/replace existing blog cover images';

-- ============================================================================
-- 4. SERVICE ROLE DELETE POLICY - Service can delete (optional)
-- ============================================================================

CREATE POLICY IF NOT EXISTS "Service Role Delete Blog Covers"
ON storage.objects
FOR DELETE
TO service_role
USING (bucket_id = 'blog-covers');

COMMENT ON POLICY "Service Role Delete Blog Covers" ON storage.objects IS 
'Allows service role to delete blog cover images (for cleanup/maintenance)';

-- ============================================================================
-- 5. AUTHENTICATED USER UPLOAD (Optional - untuk admin dashboard)
-- ============================================================================

-- Uncomment jika ingin allow authenticated users upload via dashboard
/*
CREATE POLICY IF NOT EXISTS "Authenticated Users Can Upload Blog Covers"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'blog-covers' 
    AND auth.uid() IN (
        SELECT user_id FROM "utero-artikel".user_roles 
        WHERE role = 'admin'
    )
);

COMMENT ON POLICY "Authenticated Users Can Upload Blog Covers" ON storage.objects IS 
'Allows admin users to upload blog cover images via dashboard';
*/

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- 1. Check all policies on storage.objects for blog-covers bucket
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND (qual LIKE '%blog-covers%' OR with_check LIKE '%blog-covers%')
ORDER BY policyname;

-- 2. Test bucket accessibility (should return bucket info)
SELECT 
    id,
    name,
    owner,
    public,
    file_size_limit,
    allowed_mime_types,
    created_at,
    updated_at
FROM storage.buckets
WHERE name = 'blog-covers';

-- 3. List files in bucket (will be empty initially)
SELECT 
    id,
    name,
    bucket_id,
    owner,
    created_at,
    updated_at,
    last_accessed_at,
    metadata
FROM storage.objects
WHERE bucket_id = 'blog-covers'
ORDER BY created_at DESC
LIMIT 10;

-- ============================================================================
-- STORAGE USAGE STATISTICS
-- ============================================================================

-- Count files in blog-covers bucket
SELECT COUNT(*) as total_files
FROM storage.objects
WHERE bucket_id = 'blog-covers';

-- Calculate total storage used (in MB)
SELECT 
    bucket_id,
    COUNT(*) as file_count,
    ROUND(SUM((metadata->>'size')::bigint) / 1024.0 / 1024.0, 2) as total_size_mb
FROM storage.objects
WHERE bucket_id = 'blog-covers'
GROUP BY bucket_id;

-- ============================================================================
-- TEST UPLOAD (Manual via API or Dashboard)
-- ============================================================================

/*
TEST 1: Upload via Dashboard
-----------------------------
1. Go to: Storage → blog-covers
2. Click: Upload file
3. Select image file (max 5MB, png/jpg/webp)
4. Verify file appears in list
5. Copy public URL
6. Test URL in browser

TEST 2: Upload via Edge Function
---------------------------------
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "title": "Test Upload Image",
    "content": "<p>Test</p>",
    "image_base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "image_filename": "test-image.png"
  }'

Expected Response:
{
  "success": true,
  "data": {
    "cover_url": "https://supabase.carubra.com/storage/v1/object/public/blog-covers/test-image-1722709200000.png"
  }
}

TEST 3: Verify Image Accessible
--------------------------------
curl -I https://supabase.carubra.com/storage/v1/object/public/blog-covers/test-image-1722709200000.png

Expected: HTTP 200 OK
*/

-- ============================================================================
-- TROUBLESHOOTING
-- ============================================================================

/*
ISSUE 1: Bucket not found
--------------------------
Error: "Bucket 'blog-covers' does not exist"
Solution: Create bucket via Dashboard first (manual step)

ISSUE 2: Upload permission denied
----------------------------------
Error: "new row violates row-level security policy"
Solution: 
- Verify service_role_key is used (not anon key)
- Check policies exist: SELECT * FROM pg_policies WHERE tablename = 'objects'
- Re-run policy creation SQL

ISSUE 3: Public URL returns 404
--------------------------------
Error: Image URL not accessible
Solution:
- Verify bucket is PUBLIC (bucket.public = true)
- Check policy "Public Access to Blog Covers" exists
- Verify file path correct in storage.objects

ISSUE 4: File size limit exceeded
----------------------------------
Error: "File size exceeds limit"
Solution:
- Check bucket file_size_limit setting
- Update limit via Dashboard: Storage → blog-covers → Settings
- Or accept only smaller files (<5MB)

ISSUE 5: MIME type not allowed
-------------------------------
Error: "File type not allowed"
Solution:
- Check bucket allowed_mime_types
- Update via Dashboard to include: image/png, image/jpeg, image/jpg, image/webp
*/

-- ============================================================================
-- CLEANUP / ROLLBACK
-- ============================================================================

-- Uncomment to remove policies (WARNING: will break storage access)
/*
DROP POLICY IF EXISTS "Public Access to Blog Covers" ON storage.objects;
DROP POLICY IF EXISTS "Service Role Upload to Blog Covers" ON storage.objects;
DROP POLICY IF EXISTS "Service Role Update Blog Covers" ON storage.objects;
DROP POLICY IF EXISTS "Service Role Delete Blog Covers" ON storage.objects;
-- DROP POLICY IF EXISTS "Authenticated Users Can Upload Blog Covers" ON storage.objects;
*/

-- Note: Bucket deletion must be done via Dashboard
-- Storage → blog-covers → Settings → Delete bucket

-- ============================================================================
-- STORAGE PATH STRUCTURE
-- ============================================================================

/*
Recommended folder structure in bucket:

blog-covers/
├── 2026/
│   ├── 08/
│   │   ├── artikel-1-1722709200000.png
│   │   ├── artikel-2-1722709300000.jpg
│   │   └── artikel-3-1722709400000.webp
│   ├── 09/
│   │   └── artikel-4-1722795600000.png
│   └── ...
├── temp/  (untuk testing)
│   └── test-image.png
└── archived/  (untuk gambar lama yang tidak dipakai)
    └── old-cover.jpg

Naming Convention:
- Format: {slug}-{timestamp}.{ext}
- Example: panduan-kesehatan-ibu-hamil-1722709200000.png
- Slug: dari artikel title (kebab-case)
- Timestamp: Unix timestamp in milliseconds
- Extension: png, jpg, jpeg, webp

Benefits:
- Easy to organize by date
- Unique filenames (timestamp)
- Traceable to source article (slug)
- Prevents overwrite conflicts
*/

-- ============================================================================
-- MONITORING QUERIES
-- ============================================================================

-- Monitor recent uploads (last 24 hours)
SELECT 
    name,
    bucket_id,
    created_at,
    (metadata->>'size')::bigint as size_bytes,
    ROUND((metadata->>'size')::bigint / 1024.0, 2) as size_kb,
    metadata->>'mimetype' as mime_type
FROM storage.objects
WHERE bucket_id = 'blog-covers'
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Find largest files
SELECT 
    name,
    (metadata->>'size')::bigint as size_bytes,
    ROUND((metadata->>'size')::bigint / 1024.0 / 1024.0, 2) as size_mb
FROM storage.objects
WHERE bucket_id = 'blog-covers'
ORDER BY (metadata->>'size')::bigint DESC
LIMIT 10;

-- Check for orphaned images (images not referenced in blog_posts)
SELECT o.name, o.created_at
FROM storage.objects o
WHERE o.bucket_id = 'blog-covers'
AND NOT EXISTS (
    SELECT 1 FROM "utero-artikel".blog_posts b
    WHERE b.cover_url LIKE '%' || o.name || '%'
)
ORDER BY o.created_at DESC;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$ BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Storage Policies Setup Completed!';
    RAISE NOTICE '============================================';
    RAISE NOTICE '';
    RAISE NOTICE 'Next Steps:';
    RAISE NOTICE '1. Create bucket "blog-covers" via Dashboard';
    RAISE NOTICE '   - Navigate: Storage → Buckets → New bucket';
    RAISE NOTICE '   - Set public: YES';
    RAISE NOTICE '   - Set size limit: 5 MB';
    RAISE NOTICE '   - Allowed types: image/png, image/jpeg, image/jpg, image/webp';
    RAISE NOTICE '';
    RAISE NOTICE '2. Verify policies created:';
    RAISE NOTICE '   - Public Read Access';
    RAISE NOTICE '   - Service Role Upload';
    RAISE NOTICE '   - Service Role Update';
    RAISE NOTICE '   - Service Role Delete';
    RAISE NOTICE '';
    RAISE NOTICE '3. Test upload via Edge Function';
    RAISE NOTICE '4. Verify public URL accessible';
    RAISE NOTICE '';
    RAISE NOTICE 'Bucket URL format:';
    RAISE NOTICE 'https://supabase.carubra.com/storage/v1/object/public/blog-covers/{filename}';
    RAISE NOTICE '============================================';
END $$;
