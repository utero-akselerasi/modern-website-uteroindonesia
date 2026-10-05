-- Migration: Enhanced Automation API Features
-- Created: 2026-09-11
-- Description: Add API keys management, external_id, tags, rate limiting, audit logs
-- Schema: utero-artikel

-- ============================================================================
-- 1. CREATE API KEYS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "utero-artikel".api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_hash TEXT NOT NULL UNIQUE, -- SHA-256 hash of the actual key
    key_prefix TEXT NOT NULL, -- First 8 chars for display (e.g., "aut_live")
    description TEXT NOT NULL,
    scope TEXT NOT NULL CHECK (scope IN ('automation', 'public_read')),
    site_id UUID, -- For multi-tenant support (optional for now)
    is_active BOOLEAN NOT NULL DEFAULT true,
    expires_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE "utero-artikel".api_keys IS 'API keys untuk automation dan public read access';
COMMENT ON COLUMN "utero-artikel".api_keys.key_hash IS 'SHA-256 hash dari API key (tidak menyimpan plain text)';
COMMENT ON COLUMN "utero-artikel".api_keys.key_prefix IS 'Prefix untuk display di UI (contoh: aut_live_abc12345)';
COMMENT ON COLUMN "utero-artikel".api_keys.scope IS 'Scope akses: automation atau public_read';
COMMENT ON COLUMN "utero-artikel".api_keys.expires_at IS 'Tanggal expired (NULL = tidak expired)';

-- Create index
CREATE INDEX idx_api_keys_key_hash ON "utero-artikel".api_keys(key_hash);
CREATE INDEX idx_api_keys_active ON "utero-artikel".api_keys(is_active) WHERE is_active = true;

-- ============================================================================
-- 2. ALTER BLOG_POSTS TABLE - ADD NEW FIELDS
-- ============================================================================

-- Add external_id for upsert logic
ALTER TABLE "utero-artikel".blog_posts 
ADD COLUMN IF NOT EXISTS external_id TEXT UNIQUE;

COMMENT ON COLUMN "utero-artikel".blog_posts.external_id IS 'External system ID untuk upsert logic (e.g., WordPress post ID)';

-- Add tags array
ALTER TABLE "utero-artikel".blog_posts 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

COMMENT ON COLUMN "utero-artikel".blog_posts.external_id IS 'Array tags untuk artikel';

-- Add status enum
DO $$ BEGIN
    CREATE TYPE "utero-artikel".article_status AS ENUM ('draft', 'pending', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add status column (keeping published for backward compatibility)
ALTER TABLE "utero-artikel".blog_posts 
ADD COLUMN IF NOT EXISTS status "utero-artikel".article_status DEFAULT 'published';

COMMENT ON COLUMN "utero-artikel".blog_posts.status IS 'Status artikel: draft, pending, published, archived';

-- Add category_id for proper category management
ALTER TABLE "utero-artikel".blog_posts 
ADD COLUMN IF NOT EXISTS category_id UUID;

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_blog_posts_external_id ON "utero-artikel".blog_posts(external_id) WHERE external_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON "utero-artikel".blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON "utero-artikel".blog_posts(status);

-- ============================================================================
-- 3. CREATE CATEGORIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "utero-artikel".categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]+$'),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE "utero-artikel".categories IS 'Kategori untuk artikel blog';

-- Insert default categories
INSERT INTO "utero-artikel".categories (name, slug, description) VALUES
    ('Artikel', 'artikel', 'Artikel umum'),
    ('Kesehatan', 'kesehatan', 'Artikel kesehatan'),
    ('Tips', 'tips', 'Tips dan panduan'),
    ('Berita', 'berita', 'Berita terkini')
ON CONFLICT (name) DO NOTHING;

-- Add foreign key constraint
ALTER TABLE "utero-artikel".blog_posts
ADD CONSTRAINT fk_blog_posts_category
FOREIGN KEY (category_id) REFERENCES "utero-artikel".categories(id) ON DELETE SET NULL;

-- ============================================================================
-- 4. CREATE AUDIT LOGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "utero-artikel".api_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_key_id UUID REFERENCES "utero-artikel".api_keys(id) ON DELETE SET NULL,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    request_body JSONB,
    response_status INTEGER,
    response_body JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE "utero-artikel".api_audit_logs IS 'Audit log untuk semua API calls';

-- Create indexes
CREATE INDEX idx_audit_logs_api_key ON "utero-artikel".api_audit_logs(api_key_id);
CREATE INDEX idx_audit_logs_created_at ON "utero-artikel".api_audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_endpoint ON "utero-artikel".api_audit_logs(endpoint);

-- ============================================================================
-- 5. CREATE RATE LIMITING TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS "utero-artikel".api_rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_key_id UUID NOT NULL REFERENCES "utero-artikel".api_keys(id) ON DELETE CASCADE,
    window_start TIMESTAMPTZ NOT NULL,
    request_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(api_key_id, window_start)
);

COMMENT ON TABLE "utero-artikel".api_rate_limits IS 'Rate limiting tracking (120 req/60s per API key)';

CREATE INDEX idx_rate_limits_api_key_window ON "utero-artikel".api_rate_limits(api_key_id, window_start);

-- ============================================================================
-- 6. CREATE HELPER FUNCTIONS
-- ============================================================================

-- Function to validate API key
CREATE OR REPLACE FUNCTION "utero-artikel".validate_api_key(
    _key_hash TEXT
)
RETURNS TABLE(
    is_valid BOOLEAN,
    api_key_id UUID,
    scope TEXT,
    error_message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    _api_key RECORD;
BEGIN
    -- Find API key by hash
    SELECT * INTO _api_key
    FROM "utero-artikel".api_keys
    WHERE key_hash = _key_hash;
    
    -- Check if key exists
    IF NOT FOUND THEN
        RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, 'Invalid API key'::TEXT;
        RETURN;
    END IF;
    
    -- Check if active
    IF NOT _api_key.is_active THEN
        RETURN QUERY SELECT false, _api_key.id, _api_key.scope, 'API key is inactive'::TEXT;
        RETURN;
    END IF;
    
    -- Check expiration
    IF _api_key.expires_at IS NOT NULL AND _api_key.expires_at < now() THEN
        RETURN QUERY SELECT false, _api_key.id, _api_key.scope, 'API key has expired'::TEXT;
        RETURN;
    END IF;
    
    -- Update last_used_at
    UPDATE "utero-artikel".api_keys
    SET last_used_at = now()
    WHERE id = _api_key.id;
    
    -- Valid
    RETURN QUERY SELECT true, _api_key.id, _api_key.scope, NULL::TEXT;
END;
$$;

-- Function to check rate limit
CREATE OR REPLACE FUNCTION "utero-artikel".check_rate_limit(
    _api_key_id UUID,
    _limit INTEGER DEFAULT 120,
    _window_seconds INTEGER DEFAULT 60
)
RETURNS TABLE(
    allowed BOOLEAN,
    current_count INTEGER,
    limit_value INTEGER,
    retry_after INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    _window_start TIMESTAMPTZ;
    _current_count INTEGER;
    _retry_after INTEGER;
BEGIN
    -- Calculate window start (truncate to minute)
    _window_start := date_trunc('minute', now());
    
    -- Get or create rate limit record
    INSERT INTO "utero-artikel".api_rate_limits (api_key_id, window_start, request_count)
    VALUES (_api_key_id, _window_start, 1)
    ON CONFLICT (api_key_id, window_start)
    DO UPDATE SET request_count = api_rate_limits.request_count + 1
    RETURNING api_rate_limits.request_count INTO _current_count;
    
    -- Check if exceeded
    IF _current_count > _limit THEN
        _retry_after := _window_seconds - EXTRACT(EPOCH FROM (now() - _window_start))::INTEGER;
        RETURN QUERY SELECT false, _current_count, _limit, _retry_after;
    ELSE
        RETURN QUERY SELECT true, _current_count, _limit, 0;
    END IF;
END;
$$;

-- Function to get or create category
CREATE OR REPLACE FUNCTION "utero-artikel".get_or_create_category(
    _category_name TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    _category_id UUID;
    _slug TEXT;
BEGIN
    -- Try to find existing category
    SELECT id INTO _category_id
    FROM "utero-artikel".categories
    WHERE name = _category_name;
    
    IF FOUND THEN
        RETURN _category_id;
    END IF;
    
    -- Generate slug
    _slug := lower(trim(_category_name));
    _slug := regexp_replace(_slug, '[^a-z0-9\s-]', '', 'g');
    _slug := regexp_replace(_slug, '\s+', '-', 'g');
    _slug := regexp_replace(_slug, '-+', '-', 'g');
    _slug := regexp_replace(_slug, '^-+|-+$', '', 'g');
    _slug := substring(_slug, 1, 100);
    
    -- Create new category
    INSERT INTO "utero-artikel".categories (name, slug)
    VALUES (_category_name, _slug)
    RETURNING id INTO _category_id;
    
    RETURN _category_id;
END;
$$;

-- Function to upsert article (create or update by external_id)
CREATE OR REPLACE FUNCTION "utero-artikel".upsert_article(
    _external_id TEXT,
    _title TEXT,
    _content TEXT,
    _slug TEXT,
    _excerpt TEXT,
    _author TEXT,
    _category_name TEXT,
    _tags TEXT[],
    _cover_url TEXT,
    _meta_description TEXT,
    _status "utero-artikel".article_status
)
RETURNS TABLE(
    article_id UUID,
    is_new BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    _article_id UUID;
    _category_id UUID;
    _is_new BOOLEAN;
BEGIN
    -- Get or create category
    IF _category_name IS NOT NULL THEN
        _category_id := "utero-artikel".get_or_create_category(_category_name);
    END IF;
    
    -- Try to find existing article by external_id
    SELECT id INTO _article_id
    FROM "utero-artikel".blog_posts
    WHERE external_id = _external_id;
    
    IF FOUND THEN
        -- Update existing article
        UPDATE "utero-artikel".blog_posts
        SET
            title = _title,
            content = _content,
            slug = COALESCE(_slug, slug),
            excerpt = _excerpt,
            author = COALESCE(_author, author),
            category_id = COALESCE(_category_id, category_id),
            tags = COALESCE(_tags, tags),
            cover_url = COALESCE(_cover_url, cover_url),
            meta_description = _meta_description,
            status = _status,
            published = (_status = 'published'),
            published_at = CASE
                WHEN _status = 'published' AND published_at IS NULL THEN now()
                WHEN _status = 'published' THEN published_at
                ELSE NULL
            END,
            updated_at = now()
        WHERE id = _article_id;
        
        _is_new := false;
    ELSE
        -- Insert new article
        INSERT INTO "utero-artikel".blog_posts (
            external_id,
            title,
            content,
            slug,
            excerpt,
            author,
            category_id,
            tags,
            cover_url,
            meta_description,
            status,
            published,
            published_at
        ) VALUES (
            _external_id,
            _title,
            _content,
            _slug,
            _excerpt,
            _author,
            _category_id,
            _tags,
            _cover_url,
            _meta_description,
            _status,
            (_status = 'published'),
            CASE WHEN _status = 'published' THEN now() ELSE NULL END
        )
        RETURNING id INTO _article_id;
        
        _is_new := true;
    END IF;
    
    RETURN QUERY SELECT _article_id, _is_new;
END;
$$;

-- ============================================================================
-- 7. ENABLE RLS ON NEW TABLES
-- ============================================================================

ALTER TABLE "utero-artikel".api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE "utero-artikel".categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE "utero-artikel".api_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE "utero-artikel".api_rate_limits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for api_keys
CREATE POLICY "Admins can manage API keys"
ON "utero-artikel".api_keys
FOR ALL
USING ("utero-artikel".has_role(auth.uid(), 'admin'));

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Anyone can read categories"
ON "utero-artikel".categories
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage categories"
ON "utero-artikel".categories
FOR ALL
USING ("utero-artikel".has_role(auth.uid(), 'admin'));

-- RLS Policies for audit logs (admin only)
CREATE POLICY "Admins can view audit logs"
ON "utero-artikel".api_audit_logs
FOR SELECT
USING ("utero-artikel".has_role(auth.uid(), 'admin'));

-- RLS Policies for rate limits (admin only)
CREATE POLICY "Admins can view rate limits"
ON "utero-artikel".api_rate_limits
FOR SELECT
USING ("utero-artikel".has_role(auth.uid(), 'admin'));

-- ============================================================================
-- 8. GRANT PERMISSIONS
-- ============================================================================

GRANT USAGE ON SCHEMA "utero-artikel" TO anon, authenticated;
GRANT SELECT ON "utero-artikel".categories TO anon, authenticated;
GRANT EXECUTE ON FUNCTION "utero-artikel".validate_api_key(TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION "utero-artikel".check_rate_limit(UUID, INTEGER, INTEGER) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION "utero-artikel".get_or_create_category(TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION "utero-artikel".upsert_article(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT[], TEXT, TEXT, "utero-artikel".article_status) TO anon, authenticated, service_role;

-- ============================================================================
-- 9. SUCCESS MESSAGE
-- ============================================================================

DO $$ BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Added features:';
    RAISE NOTICE '- API Keys management table';
    RAISE NOTICE '- External ID for upsert logic';
    RAISE NOTICE '- Tags array support';
    RAISE NOTICE '- Article status enum';
    RAISE NOTICE '- Categories table';
    RAISE NOTICE '- Audit logs table';
    RAISE NOTICE '- Rate limiting table';
    RAISE NOTICE '- Helper functions for automation';
    RAISE NOTICE '============================================';
END $$;
