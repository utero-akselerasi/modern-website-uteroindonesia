-- Script untuk generate API key baru
-- Usage: Run this script di Supabase SQL Editor atau psql
-- 
-- IMPORTANT: Copy API key yang di-generate ke tempat aman!
-- Key hanya bisa dilihat sekali saat di-generate.

-- ============================================================================
-- GENERATE NEW API KEY
-- ============================================================================

DO $$ 
DECLARE
    _raw_key TEXT;
    _key_hash TEXT;
    _key_prefix TEXT;
    _api_key_id UUID;
    _description TEXT := 'WordPress Integration'; -- UBAH SESUAI KEBUTUHAN
    _scope TEXT := 'automation'; -- automation atau public_read
    _expires_at TIMESTAMPTZ := NULL; -- NULL = tidak expired, atau set tanggal
BEGIN
    -- Generate random key (format: aut_live_xxxxxxxxxxxxx)
    _raw_key := 'aut_live_' || encode(gen_random_bytes(24), 'hex');
    
    -- Get prefix (first 16 chars for display)
    _key_prefix := substring(_raw_key, 1, 16);
    
    -- Hash the key using pgcrypto extension
    _key_hash := encode(digest(_raw_key, 'sha256'), 'hex');
    
    -- Insert to database
    INSERT INTO "utero-artikel".api_keys (
        key_hash,
        key_prefix,
        description,
        scope,
        is_active,
        expires_at
    ) VALUES (
        _key_hash,
        _key_prefix,
        _description,
        _scope,
        true,
        _expires_at
    )
    RETURNING id INTO _api_key_id;
    
    -- Display results
    RAISE NOTICE '============================================';
    RAISE NOTICE 'API KEY GENERATED SUCCESSFULLY!';
    RAISE NOTICE '============================================';
    RAISE NOTICE '';
    RAISE NOTICE 'API Key ID: %', _api_key_id;
    RAISE NOTICE 'Description: %', _description;
    RAISE NOTICE 'Scope: %', _scope;
    RAISE NOTICE 'Expires: %', COALESCE(_expires_at::TEXT, 'Never');
    RAISE NOTICE '';
    RAISE NOTICE '⚠️  COPY THIS KEY NOW - IT WON''T BE SHOWN AGAIN!';
    RAISE NOTICE '';
    RAISE NOTICE 'API Key: %', _raw_key;
    RAISE NOTICE '';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Usage:';
    RAISE NOTICE '';
    RAISE NOTICE 'curl -X POST "https://supabase.maskhar.net/functions/v1/automation-api" \';
    RAISE NOTICE '  -H "x-api-key: %s" \', _raw_key;
    RAISE NOTICE '  -H "Content-Type: application/json" \';
    RAISE NOTICE '  -d ''{ "external_id": "test-001", "title": "Test", "content": "<p>Test</p>" }''';
    RAISE NOTICE '============================================';
END $$;
