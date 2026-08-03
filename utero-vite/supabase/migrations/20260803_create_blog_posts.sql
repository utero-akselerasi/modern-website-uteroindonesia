-- Migration: Create blog_posts table and related objects
-- Created: 2026-08-03
-- Description: Setup blog system untuk uteroindonesia.com dengan auto-post support
-- Schema: utero-artikel

-- ============================================================================
-- 1. CREATE SCHEMA (if not exists)
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS "utero-artikel";

-- ============================================================================
-- 2. CREATE ENUM FOR USER ROLES (if not exists)
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE "utero-artikel".app_role AS ENUM ('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 3. CREATE USER ROLES TABLE (if not exists)
-- ============================================================================

CREATE TABLE IF NOT EXISTS "utero-artikel".user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role "utero-artikel".app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE "utero-artikel".user_roles ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 4. CREATE ROLE CHECK FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION "utero-artikel".has_role(_user_id uuid, _role "utero-artikel".app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = "utero-artikel"
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM "utero-artikel".user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- ============================================================================
-- 5. RLS POLICIES FOR USER_ROLES (if not exists)
-- ============================================================================

DO $$ BEGIN
    CREATE POLICY "Users can view their own roles"
    ON "utero-artikel".user_roles
    FOR SELECT
    USING (auth.uid() = user_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Admins can view all roles"
    ON "utero-artikel".user_roles
    FOR SELECT
    USING ("utero-artikel".has_role(auth.uid(), 'admin'));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Admins can manage roles"
    ON "utero-artikel".user_roles
    FOR ALL
    USING ("utero-artikel".has_role(auth.uid(), 'admin'));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 6. CREATE BLOG_POSTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "utero-artikel".blog_posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL CHECK (char_length(title) > 0 AND char_length(title) <= 500),
    content TEXT,
    slug TEXT UNIQUE CHECK (slug IS NULL OR slug ~ '^[a-z0-9-]+$'),
    excerpt TEXT CHECK (excerpt IS NULL OR char_length(excerpt) <= 1000),
    author TEXT NOT NULL DEFAULT 'Utero Indonesia Team',
    category TEXT NOT NULL DEFAULT 'Artikel',
    cover_url TEXT,
    meta_description TEXT CHECK (meta_description IS NULL OR char_length(meta_description) <= 500),
    published BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ DEFAULT now(),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comments for documentation
COMMENT ON SCHEMA "utero-artikel" IS 'Schema khusus untuk blog system uteroindonesia.com';
COMMENT ON TABLE "utero-artikel".blog_posts IS 'Tabel untuk menyimpan artikel blog uteroindonesia.com';
COMMENT ON COLUMN "utero-artikel".blog_posts.id IS 'Primary key UUID';
COMMENT ON COLUMN "utero-artikel".blog_posts.title IS 'Judul artikel (max 500 karakter)';
COMMENT ON COLUMN "utero-artikel".blog_posts.content IS 'Konten HTML artikel';
COMMENT ON COLUMN "utero-artikel".blog_posts.slug IS 'URL-friendly identifier (unique, lowercase, alphanumeric + dash)';
COMMENT ON COLUMN "utero-artikel".blog_posts.excerpt IS 'Ringkasan artikel untuk preview (max 1000 karakter)';
COMMENT ON COLUMN "utero-artikel".blog_posts.author IS 'Nama penulis artikel';
COMMENT ON COLUMN "utero-artikel".blog_posts.category IS 'Kategori artikel (Artikel, Kesehatan, Tips, dll)';
COMMENT ON COLUMN "utero-artikel".blog_posts.cover_url IS 'URL gambar cover dari Supabase Storage';
COMMENT ON COLUMN "utero-artikel".blog_posts.meta_description IS 'SEO meta description (max 500 karakter)';
COMMENT ON COLUMN "utero-artikel".blog_posts.published IS 'Status publikasi (true = published, false = draft)';
COMMENT ON COLUMN "utero-artikel".blog_posts.published_at IS 'Tanggal publikasi';
COMMENT ON COLUMN "utero-artikel".blog_posts.sort_order IS 'Order manual untuk sorting (default: 0)';

-- ============================================================================
-- 7. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index untuk lookup by slug (already unique index from constraint)
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug ON "utero-artikel".blog_posts(slug);

-- Index untuk public listing (published posts, sorted by date)
CREATE INDEX IF NOT EXISTS idx_blog_posts_published 
ON "utero-artikel".blog_posts(published, published_at DESC) 
WHERE published = true;

-- Index untuk category filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_category 
ON "utero-artikel".blog_posts(category, published_at DESC) 
WHERE published = true;

-- Index untuk full-text search (Indonesian language)
CREATE INDEX IF NOT EXISTS idx_blog_posts_search 
ON "utero-artikel".blog_posts USING gin(
    to_tsvector('indonesian', 
        coalesce(title, '') || ' ' || 
        coalesce(excerpt, '') || ' ' || 
        coalesce(content, '')
    )
);

-- ============================================================================
-- 8. ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE "utero-artikel".blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 9. CREATE RLS POLICIES
-- ============================================================================

-- Policy 1: Anyone can view published blog posts
DO $$ BEGIN
    CREATE POLICY "Anyone can view published blog posts"
    ON "utero-artikel".blog_posts
    FOR SELECT
    USING (published = true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Policy 2: Admins can manage all blog posts
DO $$ BEGIN
    CREATE POLICY "Admins can manage blog posts"
    ON "utero-artikel".blog_posts
    FOR ALL
    USING ("utero-artikel".has_role(auth.uid(), 'admin'));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Note: Edge function akan menggunakan service_role_key yang bypass RLS
-- untuk INSERT operation via auto-post endpoint

-- ============================================================================
-- 10. CREATE UPDATED_AT TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION "utero-artikel".update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = "utero-artikel";

-- ============================================================================
-- 11. CREATE TRIGGER FOR AUTO UPDATE TIMESTAMP
-- ============================================================================

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON "utero-artikel".blog_posts;

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON "utero-artikel".blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION "utero-artikel".update_updated_at_column();

-- ============================================================================
-- 12. CREATE STORAGE BUCKET FOR BLOG COVERS
-- ============================================================================

-- Note: Bucket creation harus dilakukan via Supabase Dashboard atau Storage API
-- Karena tidak bisa dilakukan via SQL migration

-- Manual steps:
-- 1. Buka Supabase Dashboard -> Storage
-- 2. Create new bucket: "blog-covers"
-- 3. Set public: true
-- 4. Set file size limit: 5MB
-- 5. Allowed MIME types: image/png, image/jpeg, image/jpg, image/webp

-- ============================================================================
-- 13. GRANT PERMISSIONS
-- ============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA "utero-artikel" TO anon, authenticated;

-- Grant select on published posts to anon
GRANT SELECT ON "utero-artikel".blog_posts TO anon;

-- Grant all to authenticated (akan dikontrol oleh RLS)
GRANT ALL ON "utero-artikel".blog_posts TO authenticated;

-- Grant all to service_role (untuk edge function)
GRANT ALL ON "utero-artikel".blog_posts TO service_role;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION "utero-artikel".has_role(uuid, "utero-artikel".app_role) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION "utero-artikel".update_updated_at_column() TO anon, authenticated;

-- ============================================================================
-- 14. INSERT SAMPLE DATA (OPTIONAL - FOR TESTING)
-- ============================================================================

-- Uncomment untuk insert sample data
/*
INSERT INTO "utero-artikel".blog_posts (
    title,
    content,
    slug,
    excerpt,
    author,
    category,
    meta_description,
    published,
    published_at
) VALUES 
(
    'Panduan Lengkap Kesehatan Ibu Hamil',
    '<h2>Pendahuluan</h2><p>Kesehatan ibu hamil sangat penting untuk perkembangan janin yang optimal. Artikel ini membahas berbagai aspek penting dalam menjaga kesehatan selama kehamilan.</p><h2>Nutrisi yang Diperlukan</h2><p>Ibu hamil memerlukan asupan nutrisi yang lengkap dan seimbang...</p>',
    'panduan-kesehatan-ibu-hamil',
    'Panduan lengkap untuk menjaga kesehatan ibu hamil selama masa kehamilan',
    'Dr. Rina Susanti',
    'Kesehatan',
    'Tips dan panduan kesehatan untuk ibu hamil agar janin berkembang optimal',
    true,
    now()
),
(
    '10 Tips Menjaga Kesehatan Janin',
    '<h2>Tips 1: Konsumsi Makanan Bergizi</h2><p>Pastikan asupan makanan mengandung protein, vitamin, dan mineral yang cukup...</p>',
    '10-tips-kesehatan-janin',
    'Sepuluh tips praktis untuk menjaga kesehatan janin selama kehamilan',
    'Tim Utero Indonesia',
    'Tips',
    '10 tips penting untuk menjaga kesehatan janin selama masa kehamilan',
    true,
    now()
),
(
    'Pentingnya Pemeriksaan Rutin Kehamilan',
    '<h2>Mengapa Pemeriksaan Rutin Penting?</h2><p>Pemeriksaan rutin kehamilan membantu mendeteksi dini masalah kesehatan...</p>',
    'pentingnya-pemeriksaan-rutin-kehamilan',
    'Kenali pentingnya pemeriksaan rutin untuk kesehatan ibu dan janin',
    'Dr. Ahmad Hidayat',
    'Kesehatan',
    'Pentingnya pemeriksaan rutin kehamilan untuk kesehatan ibu dan janin',
    true,
    now()
);
*/

-- ============================================================================
-- 15. VERIFICATION QUERIES
-- ============================================================================

-- Check if schema exists
SELECT EXISTS (
    SELECT FROM information_schema.schemata 
    WHERE schema_name = 'utero-artikel'
) as schema_exists;

-- Check if table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'utero-artikel' 
    AND table_name = 'blog_posts'
) as table_exists;

-- Check indexes
SELECT schemaname, tablename, indexname, indexdef 
FROM pg_indexes 
WHERE schemaname = 'utero-artikel' 
AND tablename = 'blog_posts'
ORDER BY indexname;

-- Check RLS policies
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'utero-artikel'
AND tablename = 'blog_posts';

-- Check constraints
SELECT conname, contype, pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = '"utero-artikel".blog_posts'::regclass;

-- Check functions
SELECT routine_schema, routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'utero-artikel'
ORDER BY routine_name;

-- ============================================================================
-- ROLLBACK SCRIPT (if needed)
-- ============================================================================

-- Uncomment untuk rollback
/*
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON "utero-artikel".blog_posts;
DROP TABLE IF EXISTS "utero-artikel".blog_posts CASCADE;
DROP FUNCTION IF EXISTS "utero-artikel".update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS "utero-artikel".has_role(uuid, "utero-artikel".app_role) CASCADE;
DROP TABLE IF EXISTS "utero-artikel".user_roles CASCADE;
DROP TYPE IF EXISTS "utero-artikel".app_role CASCADE;
DROP SCHEMA IF EXISTS "utero-artikel" CASCADE;
*/

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================

-- Success message
DO $$ BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Schema: utero-artikel';
    RAISE NOTICE 'Table: blog_posts created with RLS policies';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Create Storage bucket "blog-covers" via Dashboard';
    RAISE NOTICE '2. Deploy Edge Function "blog-auto-post"';
    RAISE NOTICE '3. Set environment variables for API_KEY';
    RAISE NOTICE '4. Update Edge Function to use schema "utero-artikel"';
    RAISE NOTICE '============================================';
END $$;
