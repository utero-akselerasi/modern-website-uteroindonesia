# Deployment Checklist - Automation API

**Project**: Utero Indonesia - Automation API Enhancement  
**Date**: 11 September 2026  
**Status**: Ready for Review

---

## 📋 Pre-Deployment Checklist

### 1. Database Schema

- [ ] Review migration file: `supabase/migrations/20260911_automation_api_enhancements.sql`
- [ ] Verify no conflicts with existing schema
- [ ] Backup existing database (if production)
- [ ] Test migration on development/staging first
- [ ] Verify all indexes created successfully
- [ ] Check RLS policies are correct

**Verification Query:**
```sql
-- Check if all new tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'utero-artikel' 
AND table_name IN ('api_keys', 'categories', 'api_audit_logs', 'api_rate_limits');

-- Check new columns on blog_posts
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'utero-artikel' 
AND table_name = 'blog_posts'
AND column_name IN ('external_id', 'tags', 'status', 'category_id');
```

### 2. Edge Function

- [ ] Review function code: `supabase/functions/automation-api/index.ts`
- [ ] Verify environment variables are set:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Test locally with `supabase functions serve`
- [ ] Deploy to staging/development first
- [ ] Test all endpoints and error cases
- [ ] Verify CORS headers work

**Test Command:**
```bash
# Local test
supabase functions serve automation-api

# Deploy
supabase functions deploy automation-api

# Check logs
supabase functions logs automation-api
```

### 3. API Key Generation

- [ ] Run `generate_api_key.sql` script
- [ ] Store generated key securely (password manager)
- [ ] Document which key is for which integration
- [ ] Set appropriate expiration dates
- [ ] Test key authentication

### 4. Testing

- [ ] Test create new article (201 response)
- [ ] Test update existing article with same `external_id` (200 response)
- [ ] Test invalid API key (401 response)
- [ ] Test missing required fields (400 response)
- [ ] Test rate limiting (429 response after 120 requests)
- [ ] Test category auto-creation
- [ ] Test tags array
- [ ] Test all status values (draft, pending, published, archived)
- [ ] Test image upload (base64 and URL)
- [ ] Test duplicate slug handling (409 response)

**Test Script:**
```bash
# Test 1: Create article
curl -X POST "https://YOUR-PROJECT.supabase.co/functions/v1/automation-api" \
  -H "x-api-key: aut_live_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "external_id": "test-001",
    "title": "Test Article Create",
    "content": "<p>Test content</p>",
    "tags": ["test", "automation"],
    "category_name": "Testing",
    "status": "draft"
  }'

# Test 2: Update same article
curl -X POST "https://YOUR-PROJECT.supabase.co/functions/v1/automation-api" \
  -H "x-api-key: aut_live_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "external_id": "test-001",
    "title": "Test Article Updated",
    "content": "<p>Updated content</p>",
    "status": "published"
  }'

# Test 3: Invalid key
curl -X POST "https://YOUR-PROJECT.supabase.co/functions/v1/automation-api" \
  -H "x-api-key: invalid_key" \
  -H "Content-Type: application/json" \
  -d '{"external_id": "test", "title": "Test", "content": "Test"}'
```

### 5. Monitoring Setup

- [ ] Verify audit logs are being created
- [ ] Check rate limit tracking works
- [ ] Setup alerts for failed requests
- [ ] Document how to query audit logs
- [ ] Create dashboard for monitoring (optional)

**Monitoring Queries:**
```sql
-- Check recent API activity
SELECT 
    created_at,
    endpoint,
    method,
    response_status,
    ip_address
FROM "utero-artikel".api_audit_logs
ORDER BY created_at DESC
LIMIT 50;

-- Check rate limit status
SELECT 
    ak.description,
    rl.window_start,
    rl.request_count,
    (120 - rl.request_count) as remaining
FROM "utero-artikel".api_rate_limits rl
JOIN "utero-artikel".api_keys ak ON rl.api_key_id = ak.id
WHERE rl.window_start >= now() - interval '5 minutes';

-- Failed requests
SELECT 
    created_at,
    response_status,
    response_body->>'error' as error_message
FROM "utero-artikel".api_audit_logs
WHERE response_status >= 400
ORDER BY created_at DESC
LIMIT 20;
```

### 6. Documentation

- [ ] Review `docs/AUTOMATION-API-IMPLEMENTATION.md`
- [ ] Review `README-AUTOMATION-API.md`
- [ ] Update main README if needed
- [ ] Document API endpoint URL
- [ ] Share documentation with team
- [ ] Create migration guide for existing clients

### 7. Security Review

- [ ] API keys stored as hashes (not plain text) ✅
- [ ] Rate limiting enabled ✅
- [ ] Audit logging enabled ✅
- [ ] RLS policies correct ✅
- [ ] CORS configured properly ✅
- [ ] Input validation in place ✅
- [ ] No sensitive data in logs ✅

### 8. Backward Compatibility

- [ ] Old `blog-auto-post` function still works
- [ ] Existing articles not affected
- [ ] New fields are nullable/optional
- [ ] Old queries still work
- [ ] Can migrate gradually

---

## 🚀 Deployment Steps

### Step 1: Backup (Production Only)

```bash
# Backup via Supabase dashboard: Database > Backups > Create backup
# Or save migration state
```

### Step 2: Run Migration

```bash
# Option A: Via CLI
supabase db push

# Option B: Via SQL Editor
# 1. Open Supabase Dashboard → SQL Editor
# 2. Copy paste supabase/migrations/20260911_automation_api_enhancements.sql
# 3. Click Run
# 4. Check for errors in output
```

### Step 3: Deploy Function

```bash
# Deploy function
supabase functions deploy automation-api

# Verify
supabase functions list
```

### Step 4: Generate API Key

```bash
# Run generate_api_key.sql in SQL Editor
# Copy the generated key immediately
# Store in password manager
```

### Step 5: Test

```bash
# Run test script (see Testing section above)
# Verify all responses are correct
```

### Step 6: Monitor

```bash
# Watch logs
supabase functions logs automation-api --tail

# Check audit logs in database
```

---

## 🔄 Rollback Plan

If something goes wrong:

### Rollback Database

```sql
-- Disable new function calls first
-- Then rollback schema changes

-- Drop new tables
DROP TABLE IF EXISTS "utero-artikel".api_rate_limits CASCADE;
DROP TABLE IF EXISTS "utero-artikel".api_audit_logs CASCADE;
DROP TABLE IF EXISTS "utero-artikel".categories CASCADE;
DROP TABLE IF EXISTS "utero-artikel".api_keys CASCADE;

-- Drop new columns
ALTER TABLE "utero-artikel".blog_posts DROP COLUMN IF EXISTS external_id;
ALTER TABLE "utero-artikel".blog_posts DROP COLUMN IF EXISTS tags;
ALTER TABLE "utero-artikel".blog_posts DROP COLUMN IF EXISTS status;
ALTER TABLE "utero-artikel".blog_posts DROP COLUMN IF EXISTS category_id;

-- Drop new functions
DROP FUNCTION IF EXISTS "utero-artikel".validate_api_key(TEXT);
DROP FUNCTION IF EXISTS "utero-artikel".check_rate_limit(UUID, INTEGER, INTEGER);
DROP FUNCTION IF EXISTS "utero-artikel".get_or_create_category(TEXT);
DROP FUNCTION IF EXISTS "utero-artikel".upsert_article(...);

-- Drop enum
DROP TYPE IF EXISTS "utero-artikel".article_status;
```

### Rollback Function

```bash
# Delete function
supabase functions delete automation-api

# Or redeploy old version if needed
```

---

## 📊 Success Criteria

Deployment is successful if:

- ✅ All migrations run without errors
- ✅ Function deploys successfully
- ✅ Test article can be created (201)
- ✅ Test article can be updated via same external_id (200)
- ✅ Invalid API key returns 401
- ✅ Rate limiting works (429 after 120 requests)
- ✅ Audit logs are being created
- ✅ Category auto-creation works
- ✅ Tags are saved correctly
- ✅ All status values work
- ✅ No errors in function logs
- ✅ Old blog-auto-post still works (if kept)

---

## 🐛 Known Issues & Limitations

1. **Rate Limiting Window**: Uses minute-based windows, not sliding window
2. **Image Upload**: Large images (>6MB) may timeout
3. **Category Slug Conflicts**: Auto-generated slugs may need manual adjustment
4. **Multi-tenant**: site_id column exists but not yet implemented
5. **Backward Compatibility**: Old `published` boolean still exists for compatibility

---

## 📝 Post-Deployment Tasks

- [ ] Update client applications to use new API
- [ ] Monitor error rates for first 24 hours
- [ ] Document any issues encountered
- [ ] Train team on new features
- [ ] Setup regular API key rotation schedule
- [ ] Review audit logs weekly
- [ ] Optimize queries if performance issues
- [ ] Consider adding dashboard for API metrics

---

## 📞 Emergency Contacts

- **Developer**: [Your Name]
- **Supabase Support**: https://supabase.com/support
- **Database Admin**: [Name/Email]

---

## 📅 Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Development | 2 hours | ✅ Complete |
| Testing | 1 hour | ⏳ Pending |
| Documentation | 30 min | ✅ Complete |
| Deployment | 30 min | ⏳ Pending |
| Monitoring | 24 hours | ⏳ Pending |

---

**Prepared by**: AI Assistant  
**Reviewed by**: _____________  
**Approved by**: _____________  
**Deployment Date**: _____________  
**Deployment Time**: _____________  

---

## ✅ Sign-off

- [ ] Code reviewed
- [ ] Tests passed
- [ ] Documentation complete
- [ ] Backup created
- [ ] Rollback plan understood
- [ ] Team notified
- [ ] Ready to deploy

**Signature**: _____________  
**Date**: _____________
