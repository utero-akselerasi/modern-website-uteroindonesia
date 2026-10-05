# 🎉 Setup Complete - Self-Hosted Supabase Deployment

**Project**: Utero Indonesia - Vite + Self-Hosted Supabase
**Date**: August 5, 2026
**Status**: ✅ Ready for Deployment

---

## 📦 What's Been Created

### 🔧 Deployment Scripts

1. **deploy-function.ps1**
   - Automated deployment script untuk Edge Functions
   - Upload ke server via SCP
   - Auto-restart services
   - Usage: `.\deploy-function.ps1`

2. **test-api-key.ps1** (Updated)
   - Test Blog API endpoint
   - Load configuration dari .env
   - Detailed error reporting
   - Usage: `.\test-api-key.ps1`

### 📚 Documentation (8 Files)

1. **docs/README.md** - Documentation index & quick links
2. **docs/SELFHOSTED-QUICKSTART.md** - 5-minute setup guide
3. **docs/DEPLOYMENT-SELFHOSTED.md** - Full deployment guide
4. **docs/DATABASE-SCHEMA.md** - Database structure & queries
5. **docs/COMMAND-CHEATSHEET.md** - Command reference

### ⚙️ Configuration Files

1. **.env.example** (Updated)
   - Complete environment variables template
   - Self-hosted Supabase configuration
   - Blog API keys
   - Detailed comments

2. **README.md** (Updated)
   - Added self-hosted Supabase section
   - Deployment instructions
   - Quick start links

---

## 🚀 Quick Start (Next Steps)

### 1. Setup Environment Variables (2 min)

```bash
# Copy template
cp .env.example .env

# Edit with your config
nano .env
```

Required values:
```env
VITE_SUPABASE_URL=https://supabase.carubra.com
VITE_SUPABASE_ANON_KEY=your-anon-key-from-server
VITE_BLOG_API_KEY=generate-with-openssl-rand-base64-32
```

Get keys dari server:
```bash
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker
grep "ANON_KEY" .env
```

### 2. Setup Server-Side Environment (1 min)

```bash
# SSH to server
ssh maskhar@supabase-server

# Edit functions .env
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
nano .env

# Add this line (same value as local VITE_BLOG_API_KEY):
BLOG_API_KEY=your-secure-key-here
```

### 3. Deploy Edge Function (1 min)

```powershell
# From local machine (Windows)
.\deploy-function.ps1
```

Or manual:
```bash
# Compress
zip -r blog-auto-post.zip supabase/functions/blog-auto-post/*

# Upload
scp blog-auto-post.zip maskhar@supabase-server:/tmp/

# SSH and deploy
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
unzip -o /tmp/blog-auto-post.zip -d blog-auto-post
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions
```

### 4. Test API (1 min)

```powershell
.\test-api-key.ps1
```

Expected output:
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "slug": "test-artikel-...",
    "url": "/blog/test-artikel-...",
    "schema": "utero-artikel"
  }
}
```

### 5. Build & Deploy Frontend

```bash
# Install dependencies
npm install

# Build production
npm run build

# Upload dist/ to web server
# Option 1: cPanel File Manager
# Option 2: rsync
rsync -avz --delete dist/ user@webserver:/var/www/html/
```

---

## 📖 Documentation Links

- **Quick Start**: [docs/SELFHOSTED-QUICKSTART.md](../SELFHOSTED-QUICKSTART.md)
- **Full Guide**: [docs/DEPLOYMENT-SELFHOSTED.md](../DEPLOYMENT-SELFHOSTED.md)
- **Database**: [docs/DATABASE-SCHEMA.md](../DATABASE-SCHEMA.md)
- **Commands**: [docs/COMMAND-CHEATSHEET.md](../COMMAND-CHEATSHEET.md)
- **Index**: [docs/README.md](../README.md)

---

## 🔗 Server Information

```yaml
Server:
  Host: supabase-server
  User: maskhar
  Path: ~/docker/supabase/supabase-1.26.05/docker
  
Supabase Instance:
  URL: https://supabase.carubra.com
  Version: 1.26.05
  
Edge Functions:
  Path: volumes/functions/blog-auto-post/
  Endpoint: /functions/v1/blog-auto-post
  Auth: x-api-key header
```

---

## ✅ Features

- ✅ Self-hosted Supabase backend
- ✅ Edge Functions (Deno runtime)
- ✅ Blog auto-post API with authentication
- ✅ PostgreSQL database with RLS
- ✅ Supabase Storage for images
- ✅ Automated deployment scripts
- ✅ Comprehensive documentation
- ✅ Testing scripts
- ✅ Command cheat sheet
- ✅ Environment variable management

---

## 🛠️ Troubleshooting

### Function returns 401 Unauthorized
- Check API keys match between local `.env` and server `volumes/functions/.env`

### Function returns 500 Server Error
```bash
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose logs -f edge-functions
```

### Function not found (404)
```bash
# Re-deploy
.\deploy-function.ps1

# Or check if exists
ssh maskhar@supabase-server "ls -la ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/blog-auto-post/"
```

**Full troubleshooting**: [docs/DEPLOYMENT-SELFHOSTED.md#troubleshooting](../DEPLOYMENT-SELFHOSTED.md#troubleshooting)

---

## 📋 Checklist

### Initial Setup
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in `VITE_SUPABASE_URL`
- [ ] Fill in `VITE_SUPABASE_ANON_KEY`
- [ ] Generate `VITE_BLOG_API_KEY` (openssl rand -base64 32)
- [ ] Setup `BLOG_API_KEY` di server
- [ ] Deploy function: `.\deploy-function.ps1`
- [ ] Test API: `.\test-api-key.ps1`
- [ ] Build frontend: `npm run build`
- [ ] Deploy frontend to web server

### Verify Everything Works
- [ ] Function accessible via HTTPS
- [ ] API key authentication works
- [ ] Blog post creation successful
- [ ] Image upload to storage works
- [ ] Frontend displays articles
- [ ] SEO meta tags correct
- [ ] Mobile responsive

---

## 🎓 Learning Resources

### Self-Hosted Supabase
- Official docs: https://supabase.com/docs/guides/self-hosting
- Docker setup: https://supabase.com/docs/guides/self-hosting/docker
- Edge Functions: https://supabase.com/docs/guides/functions

### Project Documentation
- Start here: [docs/README.md](../README.md)
- Quick commands: [docs/COMMAND-CHEATSHEET.md](../COMMAND-CHEATSHEET.md)

---

## 📞 Support

**PT. Utero Kreatif Indonesia**
- Website: https://uteroindonesia.com
- Email: info@uterogroup.com
- Phone: +62 812-1665-0111

---

## 🎯 What to Do Next?

1. **Setup environment variables** - 2 minutes
2. **Deploy Edge Function** - 1 minute  
3. **Test API** - 1 minute
4. **Build & deploy frontend** - 5 minutes

**Total time**: ~10 minutes to production! 🚀

---

**Happy Deploying! 🎉**

Created: August 5, 2026
By: Kiro AI Assistant
