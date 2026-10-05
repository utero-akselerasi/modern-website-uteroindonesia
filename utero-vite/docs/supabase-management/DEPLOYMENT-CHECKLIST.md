# ✅ Deployment Checklist - Self-Hosted Supabase

Gunakan checklist ini untuk memastikan semua langkah deployment sudah dilakukan dengan benar.

---

## 📋 Pre-Deployment Checklist

### Local Environment Setup

- [ ] Node.js 18+ installed
- [ ] npm atau pnpm installed
- [ ] Git installed
- [ ] SSH access ke server configured
- [ ] SSH key sudah di-setup (passwordless login)
- [ ] Project di-clone dari repository

### Server Access Verification

- [ ] Bisa SSH ke server: `ssh maskhar@supabase-server`
- [ ] Supabase instance running: `docker-compose ps`
- [ ] Edge Functions service active
- [ ] Database accessible
- [ ] Storage service running

---

## 🔧 Configuration Checklist

### 1. Local Environment Variables (.env)

- [ ] File `.env` sudah dibuat dari `.env.example`
- [ ] `VITE_SUPABASE_URL` diisi dengan benar
  - Format: `https://supabase.carubra.com`
  - ✅ Verified accessible via browser
- [ ] `VITE_SUPABASE_ANON_KEY` diisi
  - Source: `docker/.env` di server
  - Command: `grep "ANON_KEY" .env`
- [ ] `VITE_BLOG_API_KEY` generated dan diisi
  - Generated with: `openssl rand -base64 32`
  - ✅ Minimum 32 characters
  - ✅ Stored securely

### 2. Server-Side Environment Variables

- [ ] SSH ke server berhasil
- [ ] Navigate ke functions directory: `cd ~/docker/supabase/.../volumes/functions`
- [ ] File `.env` exists di functions directory
- [ ] `BLOG_API_KEY` added ke functions `.env`
  - ✅ Same value as local `VITE_BLOG_API_KEY`
  - ✅ No trailing spaces atau newlines
- [ ] File permissions correct: `chmod 600 .env`
- [ ] Environment variables loaded by service
  - Verify: restart service dan check logs

---

## 🚀 Deployment Checklist

### 1. Edge Function Deployment

#### Option A: Automated Script
- [ ] Run `.\deploy-function.ps1`
- [ ] Script completed without errors
- [ ] Function uploaded to server
- [ ] Service restarted successfully
- [ ] No error messages in output

#### Option B: Manual Deployment
- [ ] Function compressed: `zip -r blog-auto-post.zip supabase/functions/blog-auto-post/*`
- [ ] Uploaded to server: `scp blog-auto-post.zip maskhar@supabase-server:/tmp/`
- [ ] SSH to server
- [ ] Extracted to functions directory
- [ ] Old function backed up (if exists)
- [ ] Permissions set correctly
- [ ] Service restarted: `docker-compose restart edge-functions`

### 2. Verify Function Deployment

- [ ] Function directory exists: `ls -la volumes/functions/blog-auto-post/`
- [ ] `index.ts` file present
- [ ] File ownership correct (user: maskhar)
- [ ] Check logs: `docker-compose logs edge-functions`
- [ ] No error messages about missing files
- [ ] Function shows up in logs during startup

---

## 🧪 Testing Checklist

### 1. API Test with Script

- [ ] Run `.\test-api-key.ps1`
- [ ] Script loads `.env` successfully
- [ ] Request sent to correct URL
- [ ] Response status: 201 (Created)
- [ ] Response contains `success: true`
- [ ] Response contains `data.id`
- [ ] Response contains `data.slug`
- [ ] Response contains `data.url`
- [ ] Response contains `data.schema: "utero-artikel"`

### 2. Manual API Test (curl)

```bash
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Manual Test",
    "content": "<p>Test content</p>",
    "excerpt": "Test"
  }'
```

- [ ] Command executed without errors
- [ ] Response status: 201
- [ ] Response body is valid JSON
- [ ] Blog post created in database

### 3. Verify in Database

```bash
# SSH to server
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker

# Query database
docker-compose exec db psql -U postgres -d postgres -c "
SELECT id, title, slug, published, created_at 
FROM blog_posts 
ORDER BY created_at DESC 
LIMIT 5;
"
```

- [ ] Test post appears in database
- [ ] Slug is correct
- [ ] Published status correct
- [ ] Timestamp is recent
- [ ] No duplicate entries

### 4. Error Handling Tests

Test dengan invalid data untuk verify error handling:

- [ ] Test without API key → Should return 401
- [ ] Test with wrong API key → Should return 401
- [ ] Test with empty title → Should return 400
- [ ] Test with empty content → Should return 400
- [ ] Test with duplicate slug → Should return 409

---

## 🎨 Frontend Checklist

### 1. Local Development

- [ ] Dependencies installed: `npm install`
- [ ] Dev server starts: `npm run dev`
- [ ] No console errors
- [ ] Homepage loads correctly
- [ ] Navigation works (/, /artikel)
- [ ] Blog posts display (if data exists)
- [ ] Mobile responsive
- [ ] SEO meta tags present

### 2. Production Build

- [ ] Build succeeds: `npm run build`
- [ ] No build errors
- [ ] No TypeScript errors
- [ ] Bundle size reasonable (~641 KB)
- [ ] `dist/` folder created
- [ ] `dist/index.html` exists
- [ ] `dist/assets/` contains JS/CSS files
- [ ] `.htaccess` included for SPA routing

### 3. Preview Build

- [ ] Run `npm run preview`
- [ ] Preview server starts
- [ ] All pages accessible
- [ ] Routing works correctly
- [ ] No 404 errors
- [ ] Images load properly
- [ ] Fonts load properly

---

## 🌐 Production Deployment Checklist

### 1. Pre-Deployment

- [ ] Backup existing website (if any)
- [ ] Database backup completed
- [ ] Environment variables verified
- [ ] API endpoints tested and working
- [ ] All tests passing

### 2. Frontend Deployment

#### Option A: cPanel
- [ ] Login to cPanel
- [ ] Navigate to File Manager
- [ ] Backup existing `public_html/`
- [ ] Upload all files from `dist/`
- [ ] Verify `.htaccess` uploaded
- [ ] Set file permissions (644 for files, 755 for folders)
- [ ] Clear browser cache
- [ ] Test website

#### Option B: rsync
```bash
rsync -avz --delete dist/ user@webserver:/var/www/html/
```
- [ ] rsync command completed successfully
- [ ] All files transferred
- [ ] No permission errors
- [ ] Website accessible

#### Option C: Vercel/Netlify
- [ ] Platform CLI installed
- [ ] Logged in to platform
- [ ] Deployment command executed
- [ ] Build succeeded
- [ ] Site deployed
- [ ] Custom domain configured (if applicable)

### 3. Post-Deployment Verification

- [ ] Website accessible via domain
- [ ] HTTPS working (SSL certificate valid)
- [ ] Homepage loads without errors
- [ ] All routes accessible
- [ ] Blog posts display correctly
- [ ] Images load from Supabase Storage
- [ ] API calls working (check browser console)
- [ ] No console errors
- [ ] Mobile responsive working
- [ ] SEO meta tags present

---

## 🔍 Post-Deployment Testing

### Functionality Tests

- [ ] Create new blog post via API
- [ ] Blog post appears on website
- [ ] Blog post detail page accessible
- [ ] Images display correctly
- [ ] Meta descriptions correct
- [ ] Social sharing preview working (og:image, og:title)

### Performance Tests

- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 80
- [ ] Images optimized
- [ ] No unnecessary network requests
- [ ] Caching working properly

### SEO Tests

- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] Meta tags present on all pages
- [ ] Canonical URLs correct
- [ ] Open Graph tags working
- [ ] Twitter Cards working

### Security Tests

- [ ] API key not exposed in frontend code
- [ ] Environment variables not in bundle
- [ ] HTTPS enforced
- [ ] CORS headers correct
- [ ] RLS policies working in database

---

## 📊 Monitoring Setup

### Server Monitoring

- [ ] Setup log rotation for Docker logs
- [ ] Monitor disk space usage
- [ ] Monitor database size
- [ ] Monitor storage bucket usage
- [ ] Setup alerts for service failures

### Application Monitoring

- [ ] Setup error tracking (optional: Sentry)
- [ ] Setup analytics (optional: Google Analytics)
- [ ] Monitor API response times
- [ ] Monitor database query performance
- [ ] Track 404 errors

---

## 📝 Documentation

- [ ] All team members have access to documentation
- [ ] Server credentials documented securely
- [ ] API keys stored in password manager
- [ ] Deployment process documented
- [ ] Rollback procedure documented
- [ ] Emergency contacts listed

---

## 🎓 Knowledge Transfer

- [ ] Team trained on deployment process
- [ ] Documentation reviewed by team
- [ ] Emergency procedures understood
- [ ] Backup/restore procedures tested
- [ ] Monitoring dashboards accessible

---

## ✅ Final Verification

- [ ] All checklist items completed
- [ ] No outstanding errors or warnings
- [ ] Website live and functioning
- [ ] API working correctly
- [ ] Database accessible
- [ ] Monitoring in place
- [ ] Documentation complete
- [ ] Team informed of deployment

---

## 🎉 Deployment Complete!

Jika semua items di atas sudah checked, deployment kamu sudah complete dan production-ready!

### Next Steps

1. Monitor logs untuk 24 jam pertama
2. Check analytics untuk traffic patterns
3. Setup automated backups
4. Plan untuk updates dan maintenance

---

## 📞 Emergency Contacts

**Technical Issues**:
- Server: maskhar@supabase-server
- Database: Check logs dengan `docker-compose logs db`
- Functions: Check logs dengan `docker-compose logs edge-functions`

**Business Contact**:
- PT. Utero Kreatif Indonesia
- Email: info@uterogroup.com
- Phone: +62 812-1665-0111

---

**Checklist Version**: 1.0.0  
**Last Updated**: August 5, 2026  
**Next Review**: Monthly
