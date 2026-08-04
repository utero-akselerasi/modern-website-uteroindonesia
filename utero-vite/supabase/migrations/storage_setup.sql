-- Storage Setup for Blog Auto-Post System
-- Created: 2026-08-04
-- Description: Setup storage bucket policies untuk blog cover images

-- ============================================================================
-- IMPORTANT NOTES
-- ============================================================================
/*
PERHATIAN:
----------
Policies untuk storage.objects HANYA bisa dibuat via:
1. Supabase Dashboard (Recommended)
2. Supabase CLI dengan service role
3. Direct API call dengan service_role_key

SQL Editor biasa TIDAK BISA karena permission denied.

File ini berisi INSTRUKSI dan VERIFICATION QUERIES saja.
*/

-- ============================================================================
-- MANUAL STEPS - CREATE BUCKET VIA DASHBOARD
-- ============================================================================
/*
STEP 1: Create Bucket
---------------------
1. Login: https://supabase.carubra.com
2. Navigate: Storage → Buckets
3. Click: [New bucket]
4. Configuration:
   - Name: blog-covers
   - Public bucket: YES ✅ (IMPORTANT!)
   - File size limit: 5 MB (5242880 bytes)
   - Allowed MIME types: image/png, image/jpeg, image/jpg, image/webp
5. Click: Create bucket

STEP 2: Configure Policies via Dashboard
-----------------------------------------
Supabase akan OTOMATIS membuat policies untuk public bucket:
- Public read access (SELECT untuk semua orang)
- Service role full access (INSERT, UPDATE, DELETE untuk service_role)

Jika perlu custom policies:
1. Navigate: Storage → blog-covers → Policies
2. Click: [New policy]
3. Configure as needed (see examples below)
*/

-- ============================================================================
-- POLICY CONFIGURATION GUIDE (Manual via Dashboard)
-- ============================================================================
/*
POLICY 1: Public Read Access (Auto-created untuk public bucket)
----------------------------------------------------------------
Policy name: Public Access to Blog Covers
Allowed operation: SELECT
Target roles: public
USING expression: bucket_id = 'blog-covers'

POLICY 2: Service Role Upload (Auto-created)
---------------------------------------------
Policy name: Service Role Upload to Blog Covers
Allowed operation: INSERT
Target roles: service_role
WITH CHECK expression: bucket_id = 'blog-covers'

POLICY 3: Service Role Update (Auto-created)
---------------------------------------------
Policy name: Service Role Update Blog Covers
Allowed operation: UPDATE
Target roles: service_role
USING expression: bucket_id = 'blog-covers'
WITH CHECK expression: bucket_id = 'blog-covers'

POLICY 4: Service Role Delete (Auto-created)
---------------------------------------------
Policy name: Service Role Delete Blog Covers
Allowed operation: DELETE
Target roles: service_role
USING expression: bucket_id = 'blog-covers'

NOTE: Untuk public bucket, policies ini SUDAH OTOMATIS dibuat oleh Supabase.
      Anda tidak perlu manual create kecuali butuh custom rules.
*/

-- ============================================================================
-- VERIFY BUCKET EXISTS
-- ============================================================================

-- Check if bucket exists and configuration
SELECT 
    id,
    name,
    owner,
    public,
    file_size_limit,
    ROUND(file_size_limit / 1024.0 / 1024.0, 2) as size_limit_mb,
    allowed_mime_types,
    created_at,
    updated_at
FROM storage.buckets
WHERE name = 'blog-covers';

/*
Expected Output:
----------------
id: blog-covers
name: blog-covers
public: true (MUST BE TRUE!)
size_limit_mb: 5.00
allowed_mime_types: {image/png, image/jpeg, image/jpg, image/webp}
*/

-- ============================================================================
-- VERIFY POLICIES (After bucket creation)
-- ============================================================================

-- Check all policies for blog-covers bucket
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation,
    CASE 
        WHEN cmd = 'SELECT' THEN 'Read'
        WHEN cmd = 'INSERT' THEN 'Upload'
        WHEN cmd = 'UPDATE' THEN 'Update'
        WHEN cmd = 'DELETE' THEN 'Delete'
        ELSE cmd
    END as action_type
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
AND (qual LIKE '%blog-covers%' OR with_check LIKE '%blog-covers%')
ORDER BY cmd, policyname;

/*
Expected Output (untuk public bucket):
---------------------------------------
Minimal 2 policies:
1. [Auto] public read access (SELECT untuk public)
2. [Auto] service_role full access (ALL untuk service_role)

Jika muncul policies, berarti setup sudah benar!
*/

-- ============================================================================
-- TEST BUCKET ACCESSIBILITY
-- ============================================================================

-- 1. Count existing files
SELECT COUNT(*) as total_files
FROM storage.objects
WHERE bucket_id = 'blog-covers';

-- 2. List recent files (if any)
SELECT 
    name,
    bucket_id,
    created_at,
    (metadata->>'size')::bigint as size_bytes,
    ROUND((metadata->>'size')::bigint / 1024.0, 2) as size_kb,
    metadata->>'mimetype' as mime_type
FROM storage.objects
WHERE bucket_id = 'blog-covers'
ORDER BY created_at DESC
LIMIT 10;

-- 3. Calculate total storage usage
SELECT 
    bucket_id,
    COUNT(*) as file_count,
    ROUND(SUM((metadata->>'size')::bigint) / 1024.0 / 1024.0, 2) as total_size_mb,
    ROUND(AVG((metadata->>'size')::bigint) / 1024.0, 2) as avg_size_kb
FROM storage.objects
WHERE bucket_id = 'blog-covers'
GROUP BY bucket_id;

-- ============================================================================
-- STORAGE HEALTH CHECK
-- ============================================================================

-- Check bucket health
SELECT 
    'Bucket Exists' as check_name,
    CASE 
        WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE name = 'blog-covers') 
        THEN '✅ PASS' 
        ELSE '❌ FAIL - Create bucket first!' 
    END as status
UNION ALL
SELECT 
    'Bucket is Public',
    CASE 
        WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE name = 'blog-covers' AND public = true) 
        THEN '✅ PASS' 
        ELSE '❌ FAIL - Enable public access!' 
    END
UNION ALL
SELECT 
    'Size Limit Configured',
    CASE 
        WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE name = 'blog-covers' AND file_size_limit > 0) 
        THEN '✅ PASS' 
        ELSE '⚠️  WARNING - No size limit set' 
    END
UNION ALL
SELECT 
    'Policies Exist',
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE schemaname = 'storage' 
            AND tablename = 'objects' 
            AND (qual LIKE '%blog-covers%' OR with_check LIKE '%blog-covers%')
        ) 
        THEN '✅ PASS' 
        ELSE '⚠️  WARNING - No custom policies (may use defaults)' 
    END;

-- ============================================================================
-- TEST UPLOAD VIA DASHBOARD
-- ============================================================================
/*
MANUAL TEST 1: Upload via Dashboard
------------------------------------
1. Navigate: Storage → blog-covers
2. Click: [Upload file]
3. Select test image (< 5MB, png/jpg/webp)
4. Wait for upload complete
5. File should appear in list
6. Click file → Copy URL
7. Paste URL in browser → Image should load

Example URL format:
https://supabase.carubra.com/storage/v1/object/public/blog-covers/test-image.png

MANUAL TEST 2: Upload via Edge Function
----------------------------------------
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "title": "Test Upload Storage",
    "content": "<p>Testing storage upload functionality</p>",
    "image_base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "image_filename": "test-storage-upload.png",
    "image_mime_type": "image/png"
  }'

Expected Response:
{
  "success": true,
  "data": {
    "id": "...",
    "slug": "test-upload-storage",
    "cover_url": "https://supabase.carubra.com/storage/v1/object/public/blog-covers/test-storage-upload-1722757200000.png",
    "url": "/blog/test-upload-storage"
  }
}

MANUAL TEST 3: Verify Public Access
------------------------------------
Open browser and paste the cover_url from response.
Image should load without authentication.
*/

-- ============================================================================
-- MONITORING QUERIES
-- ============================================================================

-- Recent uploads in last 24 hours
SELECT 
    name,
    created_at,
    ROUND((metadata->>'size')::bigint / 1024.0, 2) as size_kb,
    metadata->>'mimetype' as mime_type,
    AGE(NOW(), created_at) as uploaded_ago
FROM storage.objects
WHERE bucket_id = 'blog-covers'
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Find largest files
SELECT 
    name,
    ROUND((metadata->>'size')::bigint / 1024.0 / 1024.0, 2) as size_mb,
    created_at
FROM storage.objects
WHERE bucket_id = 'blog-covers'
ORDER BY (metadata->>'size')::bigint DESC
LIMIT 10;

-- Orphaned images (not referenced in blog_posts)
SELECT 
    o.name,
    o.created_at,
    ROUND((o.metadata->>'size')::bigint / 1024.0, 2) as size_kb
FROM storage.objects o
WHERE o.bucket_id = 'blog-covers'
AND NOT EXISTS (
    SELECT 1 FROM "utero-artikel".blog_posts b
    WHERE b.cover_url LIKE '%' || o.name || '%'
)
ORDER BY o.created_at DESC;

-- Storage usage by month
SELECT 
    TO_CHAR(created_at, 'YYYY-MM') as month,
    COUNT(*) as files,
    ROUND(SUM((metadata->>'size')::bigint) / 1024.0 / 1024.0, 2) as total_mb
FROM storage.objects
WHERE bucket_id = 'blog-covers'
GROUP BY TO_CHAR(created_at, 'YYYY-MM')
ORDER BY month DESC;

-- ============================================================================
-- TROUBLESHOOTING
-- ============================================================================
/*
ERROR 1: "must be owner of relation objects"
---------------------------------------------
Cause: Trying to create policies via SQL Editor
Solution: Policies untuk public bucket OTOMATIS dibuat oleh Supabase.
          Tidak perlu manual create via SQL.

ERROR 2: "Bucket 'blog-covers' does not exist"
-----------------------------------------------
Cause: Bucket belum dibuat
Solution: Create bucket via Dashboard terlebih dahulu

ERROR 3: Image URL returns 404
-------------------------------
Cause: Bucket tidak public atau file tidak ada
Solution: 
- Verify bucket.public = true
- Check file exists: SELECT * FROM storage.objects WHERE name = 'filename'

ERROR 4: Upload permission denied
----------------------------------
Cause: Edge function tidak menggunakan service_role_key
Solution: 
- Verify SUPABASE_SERVICE_ROLE_KEY di environment variables
- Pastikan menggunakan service_role, bukan anon key

ERROR 5: File size exceeded
----------------------------
Cause: Image > 5MB
Solution: 
- Compress image before upload
- Or increase bucket size limit via Dashboard
*/

-- ============================================================================
-- CLEANUP QUERIES (Use with caution!)
-- ============================================================================

-- Delete specific file
/*
DELETE FROM storage.objects
WHERE bucket_id = 'blog-covers'
AND name = 'test-image.png';
*/

-- Delete all test files (BE CAREFUL!)
/*
DELETE FROM storage.objects
WHERE bucket_id = 'blog-covers'
AND name LIKE 'test-%';
*/

-- Delete orphaned images (not in blog_posts)
/*
DELETE FROM storage.objects o
WHERE o.bucket_id = 'blog-covers'
AND NOT EXISTS (
    SELECT 1 FROM "utero-artikel".blog_posts b
    WHERE b.cover_url LIKE '%' || o.name || '%'
);
*/

-- ============================================================================
-- RECOMMENDED FILE NAMING CONVENTION
-- ============================================================================
/*
Format: {slug}-{timestamp}.{ext}

Examples:
- panduan-kesehatan-ibu-hamil-1722757233394.png
- tips-memilih-bidan-1722757245123.jpg
- pentingnya-usg-kehamilan-1722757256789.webp

Benefits:
✅ Unique (timestamp prevents conflicts)
✅ Traceable (slug links to article)
✅ SEO-friendly (descriptive name)
✅ Sortable (by timestamp)

Alternative: Organize by date folder
- blog-covers/2026/08/artikel-name-timestamp.png
*/

-- ============================================================================
-- SUMMARY & NEXT STEPS
-- ============================================================================

DO $$ BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Storage Setup Instructions';
    RAISE NOTICE '============================================';
    RAISE NOTICE '';
    RAISE NOTICE 'STEP 1: Create Bucket (Manual)';
    RAISE NOTICE '  → Dashboard → Storage → Buckets → New bucket';
    RAISE NOTICE '  → Name: blog-covers';
    RAISE NOTICE '  → Public: YES ✅';
    RAISE NOTICE '  → Size limit: 5 MB';
    RAISE NOTICE '  → MIME: image/png, image/jpeg, image/jpg, image/webp';
    RAISE NOTICE '';
    RAISE NOTICE 'STEP 2: Verify Setup (Run queries above)';
    RAISE NOTICE '  → SELECT * FROM storage.buckets WHERE name = ''blog-covers''';
    RAISE NOTICE '  → Run "Storage Health Check" query';
    RAISE NOTICE '';
    RAISE NOTICE 'STEP 3: Test Upload';
    RAISE NOTICE '  → Upload test image via Dashboard';
    RAISE NOTICE '  → Verify public URL accessible';
    RAISE NOTICE '  → Test via Edge Function (see examples above)';
    RAISE NOTICE '';
    RAISE NOTICE 'NOTE: Policies are AUTO-CREATED for public buckets!';
    RAISE NOTICE '      No manual SQL policy creation needed.';
    RAISE NOTICE '';
    RAISE NOTICE 'Public URL format:';
    RAISE NOTICE 'https://supabase.carubra.com/storage/v1/object/public/blog-covers/{filename}';
    RAISE NOTICE '============================================';
END $$;
