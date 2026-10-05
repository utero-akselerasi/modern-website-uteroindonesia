# Self-Hosted Supabase Setup - Quick Start

Panduan singkat untuk setup dan deploy ke self-hosted Supabase instance.

---

## 🚀 Quick Setup (5 Menit)

### 1. Setup Environment Variables

```bash
# Copy template
cp .env.example .env

# Edit dan isi dengan konfigurasi self-hosted kamu
nano .env
```

Required variables:
```env
VITE_SUPABASE_URL=https://supabase.carubra.com
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_BLOG_API_KEY=your-secure-api-key-here
```

**Cara mendapatkan keys dari server:**

```bash
# SSH ke server
ssh maskhar@supabase-server

# Check keys
cd ~/docker/supabase/supabase-1.26.05/docker
grep "ANON_KEY\|SERVICE_ROLE_KEY" .env
```

### 2. Setup API Key di Server

```bash
# SSH ke server
ssh maskhar@supabase-server

# Edit functions .env
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
nano .env
```

Tambahkan:
```env
BLOG_API_KEY=same-value-as-local-VITE_BLOG_API_KEY
```

**Generate secure key:**
```bash
openssl rand -base64 32
```

### 3. Deploy Edge Function

```powershell
# Dari local machine (Windows)
.\deploy-function.ps1
```

Atau manual via SSH:
```bash
# Compress & upload
zip -r blog-auto-post.zip supabase/functions/blog-auto-post/*
scp blog-auto-post.zip maskhar@supabase-server:/tmp/

# SSH dan extract
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
unzip -o /tmp/blog-auto-post.zip -d blog-auto-post
rm /tmp/blog-auto-post.zip

# Restart
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions
```

### 4. Test Function

```powershell
# Test dengan script
.\test-api-key.ps1
```

Expected output:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "test-artikel-...",
    "url": "/blog/test-artikel-...",
    "schema": "utero-artikel"
  }
}
```

### 5. Build & Deploy Frontend

```bash
# Build
npm install
npm run build

# Upload dist/ ke web server
# Option 1: cPanel File Manager
# Option 2: rsync
rsync -avz --delete dist/ user@webserver:/var/www/html/

# Option 3: Vercel/Netlify
vercel --prod
```

---

## 📁 Struktur Server

```
~/docker/supabase/supabase-1.26.05/docker/
├── .env                        # Main config (ANON_KEY, SERVICE_ROLE_KEY)
├── docker-compose.yml          # Docker services
└── volumes/
    └── functions/
        ├── .env               # Functions env vars (BLOG_API_KEY)
        └── blog-auto-post/    # Your function
            └── index.ts
```

---

## 🔧 Troubleshooting

### Function returns 401 Unauthorized
```bash
# Check API keys match
# Local: .env
grep VITE_BLOG_API_KEY .env

# Server: volumes/functions/.env
ssh maskhar@supabase-server
cat ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/.env
```

### Function returns 500 Server Error
```bash
# Check logs
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose logs edge-functions

# Restart service
docker-compose restart edge-functions
```

### Function not found (404)
```bash
# Check function exists
ssh maskhar@supabase-server
ls -la ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/blog-auto-post/

# Re-deploy
.\deploy-function.ps1
```

### CORS Error
- Pastikan menggunakan HTTPS
- Check browser console untuk detail error
- Function sudah include CORS headers

---

## 📚 Dokumentasi Lengkap

Untuk panduan detail, lihat:
- [DEPLOYMENT-SELFHOSTED.md](./DEPLOYMENT-SELFHOSTED.md) - Full deployment guide
- [README.md](../README.md) - Project overview

---

## 🔗 Links

- **Self-hosted Instance**: https://supabase.carubra.com
- **Server Path**: `~/docker/supabase/supabase-1.26.05/docker`
- **Functions Path**: `volumes/functions/blog-auto-post/`

---

## 📞 Support

**PT. Utero Kreatif Indonesia**
- Website: https://uteroindonesia.com
- Email: info@uterogroup.com
- Phone: +62 812-1665-0111

---

**Last Updated**: August 5, 2026
