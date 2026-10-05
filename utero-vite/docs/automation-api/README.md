# Automation API - Quick Start

Implementasi Automation API untuk uteroindonesia.com berdasarkan dokumentasi CMS Artikel.

## ✅ What's New

Fitur yang ditambahkan berdasarkan AUTOMATION-API-USAGE.md:

- ✅ **API Key Management**: Database-based dengan hashing, expiration, scope
- ✅ **Upsert Logic**: Create/update artikel dengan xternal_id
- ✅ **Auto Category**: Create category otomatis by name
- ✅ **Tags Support**: Array tags dengan GIN index
- ✅ **Status Control**: draft, pending, published, archived
- ✅ **Rate Limiting**: 120 req/60s per API key
- ✅ **Audit Logging**: Track semua API calls
- ✅ **Multi-status**: Better control artikel lifecycle

## 📁 Files Changed/Added

### New Files
- supabase/migrations/20260911_automation_api_enhancements.sql - Database schema updates
- supabase/migrations/generate_api_key.sql - Helper script untuk generate API key
- supabase/functions/automation-api/index.ts - Enhanced edge function
- docs/AUTOMATION-API-IMPLEMENTATION.md - Detailed documentation

### Modified Files
- None (backward compatible dengan existing log-auto-post)

## 🚀 Quick Deployment

### 1. Run Migration

`ash
# Via Supabase CLI
supabase db push

# Atau manual di SQL Editor
# Copy paste file: supabase/migrations/20260911_automation_api_enhancements.sql
`

### 2. Deploy Function

`ash
# Deploy automation-api function
supabase functions deploy automation-api

# Set environment variables (if needed)
supabase secrets set SUPABASE_URL=your-url
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-key
`

### 3. Generate API Key

`sql
-- Run this in SQL Editor
-- Edit _description sesuai kebutuhan
DO  
DECLARE
    _raw_key TEXT;
    _key_hash TEXT;
BEGIN
    _raw_key := 'aut_live_' || encode(gen_random_bytes(24), 'hex');
    _key_hash := encode(digest(_raw_key, 'sha256'), 'hex');
    
    INSERT INTO "utero-artikel".api_keys (key_hash, key_prefix, description, scope)
    VALUES (_key_hash, substring(_raw_key, 1, 16), 'WordPress Integration', 'automation');
    
    RAISE NOTICE 'API Key: %', _raw_key;
END ;
`

### 4. Test

`ash
curl -X POST "https://YOUR-PROJECT.supabase.co/functions/v1/automation-api" \
  -H "x-api-key: aut_live_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "external_id": "test-001",
    "title": "Test Article",
    "content": "<p>Test content</p>",
    "status": "draft"
  }'
`

## 📖 Documentation

- **Full Documentation**: [docs/AUTOMATION-API-IMPLEMENTATION.md](../AUTOMATION-API-IMPLEMENTATION.md)
- **Original Spec**: [cms-artikel/docs/AUTOMATION-API-USAGE.md](../../../cms-artikel/docs/AUTOMATION-API-USAGE.md)

## 🔄 Migration from Old Function

Jika masih pakai log-auto-post:

1. ✅ Deploy utomation-api (no conflict, different endpoint)
2. ✅ Generate new API keys
3. ✅ Update client untuk use new endpoint
4. ✅ Test dengan xternal_id untuk upsert
5. ⚠️ Deprecate log-auto-post setelah semua client migrate

## 📊 Key Differences

| Feature | blog-auto-post | automation-api |
|---------|---------------|----------------|
| Endpoint | /blog-auto-post | /automation-api |
| Auth | Env var | Database keys |
| Upsert | ❌ No | ✅ Yes |
| external_id | ❌ No | ✅ Required |
| Categories | String | ✅ Auto-create |
| Tags | ❌ No | ✅ Array |
| Status | Boolean | ✅ Enum |
| Rate Limit | ❌ No | ✅ 120/min |
| Audit | ❌ No | ✅ Full |

## 🎯 Next Steps

1. [ ] Run migration
2. [ ] Deploy function
3. [ ] Generate API key
4. [ ] Test dengan curl/Postman
5. [ ] Update WordPress/client integration
6. [ ] Monitor audit logs
7. [ ] Setup alerts untuk rate limits

## 🐛 Troubleshooting

**Error: Function not found**
`ash
supabase functions list
supabase functions deploy automation-api
`

**Error: Relation does not exist**
`ash
# Re-run migration
supabase db reset
supabase db push
`

**Error: Invalid API key**
`sql
-- Check API keys
SELECT * FROM "utero-artikel".api_keys WHERE is_active = true;
`

## 📞 Support

- Issues: Create issue di repository
- Docs: docs/AUTOMATION-API-IMPLEMENTATION.md

---

**Status**: ✅ Ready for deployment  
**Version**: 1.0.0  
**Date**: 11 September 2026
