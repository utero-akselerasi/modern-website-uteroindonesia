# Deployment Guide: Self-Hosted Supabase

Panduan lengkap untuk deploy Utero Indonesia website dengan self-hosted Supabase instance.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Environment Variables](#environment-variables)
4. [Deploy Edge Functions](#deploy-edge-functions)
5. [Deploy Frontend](#deploy-frontend)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Self-Hosted Supabase Server
- ✅ Supabase instance running di `supabase-server`
- ✅ Path: `~/docker/supabase/supabase-1.26.05/docker`
- ✅ Edge Functions enabled
- ✅ SSH access ke server

### Local Development
- ✅ Node.js 18+ installed
- ✅ SSH key configured untuk akses server
- ✅ Git installed

---

## Server Setup

### 1. Struktur Folder di Server

```
~/docker/supabase/supabase-1.26.05/docker/
├── .env                    # Main environment variables
├── docker-compose.yml      # Docker compose config
└── volumes/
    ├── functions/          # Edge Functions directory
    │   ├── .env           # Functions environment variables
    │   └── blog-auto-post/ # Your function here
    ├── db/                # Database volume
    └── storage/           # Storage volume
```

### 2. Configure Functions Environment Variables

SSH ke server dan edit file `.env` di `volumes/functions/`:

```bash
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
nano .env
```

Tambahkan environment variables berikut:

```env
# Blog Auto-Post API Key
BLOG_API_KEY=your-secure-random-api-key-here

# Supabase Service Role (untuk bypass RLS)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-from-main-env

# Optional: Custom variables lainnya
# CUSTOM_VAR=value
```

**Generate secure API key:**
```bash
openssl rand -base64 32
```

### 3. Configure Docker Compose (Jika Belum)

Edit `docker-compose.yml` di server untuk ensure Edge Functions service pass environment variables:

```yaml
edge-functions:
  image: supabase/edge-runtime:latest
  volumes:
    - ./volumes/functions:/home/deno/functions:Z
  environment:
    # Pass all env vars from .env file
    - BLOG_API_KEY=${BLOG_API_KEY}
    - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
```

---

## Environment Variables

### Server Side (`volumes/functions/.env`)

```env
# Required for blog-auto-post function
BLOG_API_KEY=generate-random-secure-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Client Side (`.env` - local project)

```env
# Supabase Self-Hosted Configuration
VITE_SUPABASE_URL=https://your-supabase-domain.com
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Blog API endpoint
VITE_BLOG_API_ENDPOINT=https://your-supabase-domain.com/functions/v1/blog-auto-post
```

**Cara mendapatkan keys:**

1. **SUPABASE_URL**: Domain self-hosted instance kamu
2. **ANON_KEY**: Check di `docker/.env`, variable `ANON_KEY`
3. **SERVICE_ROLE_KEY**: Check di `docker/.env`, variable `SERVICE_ROLE_KEY`

```bash
# Di server
cd ~/docker/supabase/supabase-1.26.05/docker
grep "ANON_KEY\|SERVICE_ROLE_KEY" .env
```

---

## Deploy Edge Functions

### Method 1: Automated Script (Recommended)

Dari local machine, jalankan script deployment:

```powershell
# Deploy function blog-auto-post
.\deploy-function.ps1

# Dengan custom parameters
.\deploy-function.ps1 -ServerUser "maskhar" -ServerHost "supabase-server"
```

### Method 2: Manual Deploy via SSH

```bash
# 1. Compress function locally
cd utero-vite
zip -r blog-auto-post.zip supabase/functions/blog-auto-post/*

# 2. Upload to server
scp blog-auto-post.zip maskhar@supabase-server:/tmp/

# 3. SSH to server and extract
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
rm -rf blog-auto-post
unzip /tmp/blog-auto-post.zip -d blog-auto-post
rm /tmp/blog-auto-post.zip

# 4. Restart Edge Functions service
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions

# 5. Check logs
docker-compose logs -f edge-functions
```

### Method 3: Git Clone + Symlink

```bash
# Di server
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions

# Clone repository
git clone https://github.com/your-repo/utero-vite.git temp-repo

# Copy function
cp -r temp-repo/supabase/functions/blog-auto-post ./

# Cleanup
rm -rf temp-repo

# Restart
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions
```

---

## Deploy Frontend

### Build Production

```bash
# Local machine
cd utero-vite
npm install
npm run build
```

Build output akan ada di folder `dist/`.

### Upload ke Server

#### Option 1: cPanel / FTP
1. Login ke cPanel
2. Navigate to File Manager → `public_html/`
3. Upload semua isi folder `dist/`
4. Ensure `.htaccess` included untuk SPA routing

#### Option 2: rsync via SSH

```bash
# Sync to web server
rsync -avz --delete dist/ user@webserver:/var/www/html/

# Dengan progress
rsync -avz --progress --delete dist/ user@webserver:/var/www/html/
```

#### Option 3: Vercel / Netlify

```bash
# Vercel
npm install -g vercel
vercel --prod

# Netlify
npm install -g netlify-cli
netlify deploy --prod
```

---

## Testing

### 1. Test Edge Function

Gunakan script test yang sudah ada:

```powershell
# Edit test-api-key.ps1 terlebih dahulu
# Update URL dan API key

.\test-api-key.ps1
```

Atau manual dengan curl:

```bash
curl -X POST https://your-supabase-domain.com/functions/v1/blog-auto-post \
  -H "x-api-key: your-blog-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Artikel",
    "content": "<p>Ini adalah test artikel.</p>",
    "excerpt": "Test excerpt",
    "author": "Test Author",
    "category": "Test"
  }'
```

Expected response:

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "slug": "test-artikel",
    "cover_url": null,
    "url": "/blog/test-artikel",
    "schema": "utero-artikel"
  }
}
```

### 2. Test Frontend

```bash
# Local dev server
npm run dev

# Preview production build
npm run preview
```

Buka browser dan test:
- Homepage: `http://localhost:3000`
- Artikel list: `http://localhost:3000/artikel`
- Artikel detail: `http://localhost:3000/artikel/test-artikel`

---

## Troubleshooting

### Function tidak bisa di-invoke

**Problem**: 404 atau 500 error

**Solution**:
```bash
# Check function exists
ssh maskhar@supabase-server
ls -la ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/blog-auto-post/

# Check logs
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose logs edge-functions

# Restart service
docker-compose restart edge-functions
```

### Environment variables tidak terbaca

**Problem**: Function return "Server configuration error: API key not set"

**Solution**:
```bash
# Check .env file
cat ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/.env

# Should contain:
# BLOG_API_KEY=your-key

# Restart service
docker-compose restart edge-functions
```

### CORS Error

**Problem**: Browser console shows CORS error

**Solution**: Function sudah include CORS headers, check di browser:
- Pastikan menggunakan HTTPS (bukan HTTP)
- Check browser console untuk error detail
- Verify `Access-Control-Allow-Origin: *` di response headers

### Database Connection Error

**Problem**: Function tidak bisa connect ke database

**Solution**:
```bash
# Check database is running
docker-compose ps

# Check database logs
docker-compose logs db

# Restart all services
docker-compose restart
```

### Storage Upload Error

**Problem**: Cover image tidak ter-upload

**Solution**:
```bash
# Check storage bucket exists
# Login to Supabase dashboard or via SQL:
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker

# Run SQL in database
docker-compose exec db psql -U postgres -d postgres -c "
SELECT * FROM storage.buckets WHERE name = 'blog-covers';
"

# Create bucket if not exists
docker-compose exec db psql -U postgres -d postgres -c "
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;
"
```

---

## Monitoring

### Check Function Logs

```bash
# Real-time logs
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose logs -f edge-functions

# Last 100 lines
docker-compose logs --tail=100 edge-functions
```

### Check Database

```bash
# Connect to database
docker-compose exec db psql -U postgres -d postgres

# Check blog posts
SELECT id, title, slug, published_at FROM blog_posts ORDER BY created_at DESC LIMIT 10;

# Check storage files
SELECT * FROM storage.objects WHERE bucket_id = 'blog-covers' ORDER BY created_at DESC LIMIT 10;
```

---

## Security Checklist

- [ ] Generate strong `BLOG_API_KEY` (minimum 32 characters)
- [ ] Never commit `.env` files to git
- [ ] Use HTTPS for production
- [ ] Restrict API key usage (store di environment, jangan hardcode)
- [ ] Setup firewall rules di server
- [ ] Regular backup database dan storage
- [ ] Monitor function logs untuk suspicious activity

---

## Maintenance

### Update Function

```bash
# Local machine: edit code
nano supabase/functions/blog-auto-post/index.ts

# Deploy updated version
.\deploy-function.ps1

# Check logs
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose logs -f edge-functions
```

### Database Migration

```bash
# Run migrations di server
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker

# Execute SQL file
docker-compose exec db psql -U postgres -d postgres -f /path/to/migration.sql
```

---

## Contact & Support

**PT. Utero Kreatif Indonesia**
- Website: https://uteroindonesia.com
- Email: info@uterogroup.com
- Phone: +62 812-1665-0111

---

**Last Updated**: August 5, 2026
