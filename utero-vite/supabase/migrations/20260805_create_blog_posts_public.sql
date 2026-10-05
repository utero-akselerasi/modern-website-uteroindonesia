-- Migration: Create blog_posts table in PUBLIC schema
-- Created: 2026-08-05
-- Description: Setup blog system untuk uteroindonesia.com di schema public

-- ============================================================================
-- 1. CREATE BLOG_POSTS TABLE in PUBLIC schema
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
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
COMMENT ON TABLE public.blog_posts IS 'Tabel untuk menyimpan artikel blog uteroindonesia.com';
COMMENT ON COLUMN public.blog_posts.id IS 'Primary key UUID';
COMMENT ON COLUMN public.blog_posts.title IS 'Judul artikel (max 500 karakter)';
COMMENT ON COLUMN public.blog_posts.content IS 'Konten HTML artikel';
COMMENT ON COLUMN public.blog_posts.slug IS 'URL-friendly identifier (unique, lowercase, alphanumeric + dash)';
COMMENT ON COLUMN public.blog_posts.excerpt IS 'Ringkasan artikel untuk preview (max 1000 karakter)';
COMMENT ON COLUMN public.blog_posts.author IS 'Nama penulis artikel';
COMMENT ON COLUMN public.blog_posts.category IS 'Kategori artikel (Artikel, Kesehatan, Tips, dll)';
COMMENT ON COLUMN public.blog_posts.cover_url IS 'URL gambar cover dari Supabase Storage';
COMMENT ON COLUMN public.blog_posts.meta_description IS 'SEO meta description (max 500 karakter)';
COMMENT ON COLUMN public.blog_posts.published IS 'Status publish (true = dipublikasikan, false = draft)';
COMMENT ON COLUMN public.blog_posts.published_at IS 'Tanggal artikel dipublikasikan';
COMMENT ON COLUMN public.blog_posts.sort_order IS 'Custom sort order (default 0)';
COMMENT ON COLUMN public.blog_posts.created_at IS 'Timestamp record dibuat';
COMMENT ON COLUMN public.blog_posts.updated_at IS 'Timestamp record terakhir diupdate';

-- ============================================================================
-- 2. CREATE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_sort_order ON public.blog_posts(sort_order);

-- ============================================================================
-- 3. CREATE UPDATED_AT TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 4. CREATE TRIGGER FOR AUTO-UPDATE updated_at
-- ============================================================================

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 5. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 6. CREATE RLS POLICIES
-- ============================================================================

-- Allow public read access to published posts
DROP POLICY IF EXISTS "Allow public read access to published posts" ON public.blog_posts;
CREATE POLICY "Allow public read access to published posts"
ON public.blog_posts
FOR SELECT
USING (published = true);

-- Allow service role full access (for Edge Functions)
DROP POLICY IF EXISTS "Allow service role full access" ON public.blog_posts;
CREATE POLICY "Allow service role full access"
ON public.blog_posts
FOR ALL
USING (auth.role() = 'service_role');

-- ============================================================================
-- 7. GRANT PERMISSIONS
-- ============================================================================

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO service_role;

-- ============================================================================
-- 8. VERIFICATION QUERIES
-- ============================================================================

-- Check if table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'blog_posts'
) as table_exists;

-- Check indexes
SELECT schemaname, tablename, indexname, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename = 'blog_posts'
ORDER BY indexname;

-- Check RLS policies
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename = 'blog_posts';

-- Success message
DO $$ BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Schema: public';
    RAISE NOTICE 'Table: blog_posts created with RLS policies';
    RAISE NOTICE 'Ready to accept blog posts!';
    RAISE NOTICE '============================================';
END $$;
