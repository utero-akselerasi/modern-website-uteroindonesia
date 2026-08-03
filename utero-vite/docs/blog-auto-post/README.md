# Blog Auto-Post System
# UteroindonesiaCom

Sistem auto-posting artikel blog untuk website uteroindonesia.com dengan dukungan upload gambar, auto-generate slug, dan SEO optimization.

## 📚 Dokumentasi

### Dokumen Utama
- **[PRD (Product Requirements Document)](./PRD.md)** - Requirements dan spesifikasi lengkap
- **[SDD (System Design Document)](./SDD.md)** - Desain sistem dan arsitektur teknis
- **[API Documentation](./API.md)** - Dokumentasi lengkap API endpoint
- **[Deployment Guide](./DEPLOYMENT.md)** - Panduan deployment step-by-step

## 🚀 Quick Start

### Prerequisites
- Akses ke Supabase Dashboard: `https://supabase.carubra.com`
- Database admin credentials
- Service role key dan anon key

### Deployment Steps

1. **Database Setup**
   ```bash
   # Execute SQL migration
   # File: supabase/migrations/20260803_create_blog_posts.sql
   # Via: Supabase Dashboard → SQL Editor
   ```

2. **Storage Setup**
   ```bash
   # Create bucket via Supabase Dashboard
   # Bucket name: blog-covers
   # Public: Yes
   ```

3. **Edge Function Deployment**
   ```bash
   # Deploy via Supabase Dashboard
   # Function: supabase/functions/blog-auto-post/index.ts
   ```

4. **Environment Variables**
   ```bash
   SUPABASE_URL=https://supabase.carubra.com
   SUPABASE_SERVICE_ROLE_KEY=<your_service_key>
   BLOG_API_KEY=<your_generated_api_key>
   ```

5. **Testing**
   ```bash
   curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
     -H "Content-Type: application/json" \
     -H "x-api-key: YOUR_API_KEY" \
     -d '{"title":"Test","content":"<p>Test</p>"}'
   ```

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap.

## 📋 Features

### Core Features
- ✅ **Auto-Post API** - REST endpoint untuk posting artikel
- ✅ **API Authentication** - Secure dengan API key
- ✅ **Auto Slug Generation** - Generate URL-friendly slug dari title
- ✅ **Image Upload** - Upload cover image via base64
- ✅ **SEO Optimization** - Meta description dan excerpt
- ✅ **Row Level Security** - RLS policies untuk data security

### Database Features
- ✅ **PostgreSQL Table** - Structured data dengan indexes
- ✅ **Full-Text Search** - Indonesian language search support
- ✅ **Auto Timestamps** - created_at dan updated_at otomatis
- ✅ **Unique Slug** - Prevent duplicate URLs

### Storage Features
- ✅ **Supabase Storage** - Cloud storage untuk gambar
- ✅ **Public Access** - CDN untuk serve images
- ✅ **Multiple Formats** - PNG, JPEG, WebP support

## 🏗️ Architecture

```
┌─────────────────┐
│  External Client│
│  (CMS, Tools)   │
└────────┬────────┘
         │ HTTPS + API Key
         ▼
┌─────────────────────────────────────────┐
│     Supabase Edge Functions             │
│  ┌───────────────────────────────────┐  │
│  │  blog-auto-post Function          │  │
│  │  - Validate API Key               │  │
│  │  - Generate Slug                  │  │
│  │  - Upload Image                   │  │
│  │  - Insert to DB                   │  │
│  └───────────────────────────────────┘  │
└─────────┬───────────────────┬───────────┘
          │                   │
          ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│ Supabase Storage │  │  PostgreSQL DB   │
│ bucket:          │  │ table:           │
│ blog-covers      │  │ blog_posts       │
└──────────────────┘  └──────────────────┘
```

## 📊 Database Schema

```sql
Table: blog_posts
├── id (UUID, PK)
├── title (TEXT, NOT NULL)
├── content (TEXT)
├── slug (TEXT, UNIQUE)
├── excerpt (TEXT)
├── author (TEXT, default: 'Utero Indonesia Team')
├── category (TEXT, default: 'Artikel')
├── cover_url (TEXT)
├── meta_description (TEXT)
├── published (BOOLEAN, default: true)
├── published_at (TIMESTAMPTZ)
├── sort_order (INTEGER)
├── created_at (TIMESTAMPTZ)
└── updated_at (TIMESTAMPTZ)

Indexes:
- idx_blog_posts_slug (UNIQUE)
- idx_blog_posts_published
- idx_blog_posts_category
- idx_blog_posts_search (Full-text)
```

## 🔐 Security

### API Authentication
```bash
x-api-key: utero_blog_prod_xxxxx
```

### Row Level Security (RLS)
- **Public Read**: Anyone dapat read published posts
- **Admin Write**: Hanya admin dapat CRUD
- **Service Bypass**: Edge function bypass RLS untuk auto-post

### Input Validation
- Title: max 500 chars
- Excerpt: max 1000 chars
- Image: max 5MB
- Slug: alphanumeric + dash only

## 🔗 API Endpoint

**Endpoint:** `POST /functions/v1/blog-auto-post`

**Request:**
```json
{
  "title": "Panduan Kesehatan Ibu Hamil",
  "content": "<h2>Pendahuluan</h2><p>...</p>",
  "slug": "panduan-kesehatan-ibu-hamil",
  "excerpt": "Panduan lengkap...",
  "author": "Dr. Rina Susanti",
  "category": "Kesehatan",
  "image_base64": "iVBORw0KGgo...",
  "meta_fields": {
    "description": "SEO description"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "panduan-kesehatan-ibu-hamil",
    "cover_url": "https://supabase.carubra.com/storage/.../image.png",
    "url": "/blog/panduan-kesehatan-ibu-hamil"
  }
}
```

Lihat [API.md](./API.md) untuk dokumentasi lengkap.

## 📁 File Structure

```
docs/blog-auto-post/
├── README.md           # File ini
├── PRD.md             # Product Requirements Document
├── SDD.md             # System Design Document
├── API.md             # API Documentation
└── DEPLOYMENT.md      # Deployment Guide

supabase/
├── migrations/
│   └── 20260803_create_blog_posts.sql
└── functions/
    └── blog-auto-post/
        └── index.ts
```

## 🧪 Testing

### Test 1: Basic Request
```bash
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "title": "Test Artikel",
    "content": "<p>Test content</p>"
  }'
```

### Test 2: With Image
```bash
IMAGE_BASE64=$(base64 -w 0 image.png)

curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "title": "Test Artikel dengan Gambar",
    "content": "<p>Test content</p>",
    "image_base64": "'$IMAGE_BASE64'"
  }'
```

### Test 3: Error Handling
```bash
# Test tanpa API key (should return 401)
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"<p>Test</p>"}'

# Test missing required field (should return 400)
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"title":"Test"}'
```

## 📈 Performance

**Target Metrics:**
- API Response Time: < 3s (with image)
- Image Upload: < 2s (< 5MB)
- Database Insert: < 500ms
- Uptime: 99.9%

**Optimization:**
- Database indexes untuk fast queries
- CDN untuk image delivery
- Connection pooling untuk DB
- Async image upload

## 🔄 Workflow

### Manual Posting via API
```
1. Client prepare artikel data
2. Encode image ke base64 (optional)
3. POST request ke endpoint
4. Sistem validate API key
5. Generate slug dari title
6. Upload image ke storage
7. Insert data ke database
8. Return post URL
```

### Scheduled Posting (Future)
```
1. Queue artikel dengan schedule
2. Cron trigger di scheduled time
3. Auto-post via internal call
4. Send notification
```

## 🛠️ Development

### Local Testing
```bash
# Start Supabase local
supabase start

# Deploy function locally
supabase functions serve blog-auto-post

# Test locally
curl -X POST http://localhost:54321/functions/v1/blog-auto-post \
  -H "x-api-key: test_key" \
  -d '{"title":"Test","content":"<p>Test</p>"}'
```

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- JSDoc comments
- Error handling di setiap function

## 📞 Support

**Technical Issues:**
- Email: dev@uteroindonesia.com
- Documentation: `/docs/blog-auto-post/`

**Security Issues:**
- Report to: security@uteroindonesia.com
- PGP Key: [link]

**API Key Request:**
- Contact: admin@uteroindonesia.com

## 🗓️ Roadmap

### Phase 1 (Current)
- [x] Basic auto-post API
- [x] Image upload
- [x] Slug generation
- [x] SEO optimization
- [x] Documentation

### Phase 2 (Q3 2026)
- [ ] Draft mode
- [ ] Scheduled publishing
- [ ] Multiple images support
- [ ] Tags system
- [ ] Rate limiting

### Phase 3 (Q4 2026)
- [ ] AI content enhancement
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] Comment system
- [ ] Version control

## 📝 License

Internal project untuk UteroindonesiaCom.  
Tidak untuk distribusi publik.

## 👥 Contributors

- Development Team
- DevOps Team
- Content Team

## 📚 References

- [Supabase Documentation](https://supabase.com/docs)
- [Deno Documentation](https://deno.land/manual)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Last Updated:** 2026-08-03  
**Version:** 1.0  
**Status:** Ready for Deployment ✅
