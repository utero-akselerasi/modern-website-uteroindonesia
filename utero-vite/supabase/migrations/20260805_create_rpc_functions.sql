-- Workaround: Create RPC functions in PUBLIC schema to access utero-artikel schema
-- Run this in Supabase SQL Editor

-- ============================================================================
-- 1. Function to get all published articles
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_published_articles()
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  slug TEXT,
  excerpt TEXT,
  author TEXT,
  category TEXT,
  cover_url TEXT,
  meta_description TEXT,
  published BOOLEAN,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    id,
    title,
    content,
    slug,
    excerpt,
    author,
    category,
    cover_url,
    meta_description,
    published,
    published_at,
    created_at,
    updated_at
  FROM "utero-artikel".blog_posts
  WHERE published = true
  ORDER BY published_at DESC;
$$;

-- ============================================================================
-- 2. Function to get article by slug
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_article_by_slug(article_slug TEXT)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  slug TEXT,
  excerpt TEXT,
  author TEXT,
  category TEXT,
  cover_url TEXT,
  meta_description TEXT,
  published BOOLEAN,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    id,
    title,
    content,
    slug,
    excerpt,
    author,
    category,
    cover_url,
    meta_description,
    published,
    published_at,
    created_at,
    updated_at
  FROM "utero-artikel".blog_posts
  WHERE slug = article_slug
    AND published = true
  LIMIT 1;
$$;

-- ============================================================================
-- 3. Function to get recent articles
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_recent_articles(article_count INTEGER DEFAULT 3)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  slug TEXT,
  excerpt TEXT,
  author TEXT,
  category TEXT,
  cover_url TEXT,
  meta_description TEXT,
  published BOOLEAN,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    id,
    title,
    content,
    slug,
    excerpt,
    author,
    category,
    cover_url,
    meta_description,
    published,
    published_at,
    created_at,
    updated_at
  FROM "utero-artikel".blog_posts
  WHERE published = true
  ORDER BY published_at DESC
  LIMIT article_count;
$$;

-- ============================================================================
-- 4. Grant permissions to anon users
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.get_published_articles() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_article_by_slug(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_recent_articles(INTEGER) TO anon, authenticated;

-- ============================================================================
-- 5. Test queries
-- ============================================================================

-- Test get all articles
SELECT * FROM public.get_published_articles();

-- Test get by slug
SELECT * FROM public.get_article_by_slug('panduan-kesehatan-ibu-hamil-trimester-pertama');

-- Test get recent 3 articles
SELECT * FROM public.get_recent_articles(3);

-- Success message
DO $$ BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'RPC Functions created successfully!';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Functions available:';
    RAISE NOTICE '- get_published_articles()';
    RAISE NOTICE '- get_article_by_slug(slug)';
    RAISE NOTICE '- get_recent_articles(count)';
    RAISE NOTICE '============================================';
END $$;
