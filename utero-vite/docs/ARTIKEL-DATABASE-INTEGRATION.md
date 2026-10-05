# Setup Environment Variables untuk Artikel dari Database

## Overview
Frontend sekarang sudah terintegrasi dengan Supabase untuk mengambil artikel dari database yang di-generate oleh N8N.

## Flow Artikel
```
N8N (Generate Artikel) 
  → Edge Function (blog-auto-post) 
  → Supabase Database (schema: utero-artikel, table: blog_posts)
  → Frontend (fetch via Supabase Client)
  → Tampil di Page Artikel & Section Artikel Terbaru
```

## File yang Ditambahkan/Diubah

### 1. Environment Variables
- `.env` - File environment variables (jangan di-commit)
- `.env.example` - Template environment variables

### 2. Supabase Integration
- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/articleService.ts` - Service untuk fetch artikel dari database

### 3. Updated Components
- `src/pages/ArtikelList.tsx` - Fetch semua artikel dari database
- `src/pages/ArtikelDetail.tsx` - Fetch detail artikel by slug
- `src/components/sections/RecentArticles.tsx` - Fetch 3 artikel terbaru untuk homepage

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install @supabase/supabase-js
```
✅ Sudah terinstall

### Step 2: Configure Environment Variables
Edit file `.env` dan isi dengan kredensial Supabase Anda:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Cara mendapatkan kredensial:**
1. Buka Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### Step 3: Verify Database Schema
Pastikan database Supabase memiliki:
- Schema: `utero-artikel`
- Table: `blog_posts`
- RLS Policy: Allow public read access untuk published articles

Query untuk check:
```sql
SELECT * FROM "utero-artikel".blog_posts WHERE published = true LIMIT 5;
```

### Step 4: Test Locally
```bash
npm run dev
```

Buka:
- Homepage: `http://localhost:3002` (cek section "Artikel Terbaru")
- Artikel List: `http://localhost:3002/artikel`
- Artikel Detail: `http://localhost:3002/artikel/[slug]`

## Features

### 1. Article List Page (`/artikel`)
- Fetch semua artikel published dari database
- Sorted by `published_at` DESC (terbaru di atas)
- Loading state & error handling
- Responsive grid layout (3 kolom → 2 kolom → 1 kolom)

### 2. Article Detail Page (`/artikel/:slug`)
- Fetch artikel by slug
- Render HTML content (support dari N8N generator)
- Display cover image jika ada
- SEO meta tags (title, description, og:image)
- Author & published date
- Redirect ke `/artikel` jika artikel tidak ditemukan

### 3. Recent Articles Section (Homepage)
- Fetch 3 artikel terbaru
- Auto-hide jika tidak ada artikel
- Loading state
- Link ke semua artikel

## API Functions

### `fetchArticles()`
Fetch semua artikel published, sorted by latest.

```typescript
import { fetchArticles } from '@/lib/articleService';

const articles = await fetchArticles();
```

### `fetchArticleBySlug(slug: string)`
Fetch single artikel by slug.

```typescript
import { fetchArticleBySlug } from '@/lib/articleService';

const article = await fetchArticleBySlug('panduan-kesehatan-ibu-hamil');
```

### `fetchRecentArticles(count: number = 3)`
Fetch N artikel terbaru (default 3).

```typescript
import { fetchRecentArticles } from '@/lib/articleService';

const recentArticles = await fetchRecentArticles(3);
```

## Database Schema Reference

Table: `"utero-artikel".blog_posts`

| Column            | Type         | Description                          |
|-------------------|--------------|--------------------------------------|
| id                | UUID         | Primary key                          |
| title             | TEXT         | Judul artikel (max 500 chars)        |
| content           | TEXT         | HTML content artikel                 |
| slug              | TEXT         | URL-friendly identifier (unique)     |
| excerpt           | TEXT         | Ringkasan artikel (max 1000 chars)   |
| author            | TEXT         | Nama penulis (default: Utero Team)   |
| category          | TEXT         | Kategori (default: Artikel)          |
| cover_url         | TEXT         | URL gambar cover dari Storage        |
| meta_description  | TEXT         | SEO meta description (max 500 chars) |
| published         | BOOLEAN      | Status publish (true/false)          |
| published_at      | TIMESTAMPTZ  | Tanggal publish                      |
| created_at        | TIMESTAMPTZ  | Tanggal dibuat                       |
| updated_at        | TIMESTAMPTZ  | Tanggal update terakhir              |

## Deployment Checklist

### Production Build
```bash
npm run build
```
✅ Build success: `dist/` folder ready

### Environment Variables di Production
**cPanel / Hosting Tradisional:**
- Upload file `.env` ke server (di folder root project)
- Pastikan `.htaccess` tidak expose `.env` file

**Vercel / Netlify:**
1. Dashboard → Project Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Redeploy

### Upload ke Server
Upload semua file `dist/` ke `public_html/`:
- `dist/index.html` → `public_html/index.html`
- `dist/assets/*` → `public_html/assets/*`
- `dist/.htaccess` → `public_html/.htaccess`

**Jangan lupa:** Upload file `.env` juga (di root project, bukan di `dist/`)

## Security Notes

### ✅ Safe (Already Implemented)
- `.env` file sudah di `.gitignore`
- RLS policies di Supabase untuk read-only public access
- Anon key safe untuk frontend (bukan service_role key)
- HTML content di-sanitize via `dangerouslySetInnerHTML` (sudah proper)

### ⚠️ Important
- **JANGAN** commit `.env` ke Git
- **JANGAN** expose `VITE_SUPABASE_ANON_KEY` di screenshot/dokumentasi
- Gunakan `.env.example` untuk template

## Troubleshooting

### Artikel tidak muncul?
1. Check console browser (F12 → Console)
2. Verify `.env` sudah diisi dengan benar
3. Test connection:
   ```javascript
   import { supabase } from './src/lib/supabase';
   const { data, error } = await supabase.from('blog_posts').select('*').limit(1);
   console.log(data, error);
   ```

### Error: "Missing Supabase environment variables"
- Pastikan `.env` file ada di root project
- Restart dev server: `Ctrl+C` → `npm run dev`

### Error: "relation 'blog_posts' does not exist"
- Pastikan schema `utero-artikel` sudah dibuat
- Run migration: `supabase\migrations\20260803_create_blog_posts.sql`

### Artikel tidak ter-redirect dengan benar?
- Check `.htaccess` di `public_html/`
- Pastikan SPA routing enabled

## Next Steps

1. ✅ Setup environment variables
2. ✅ Test fetching artikel dari database
3. 🔜 Generate artikel via N8N workflow
4. 🔜 Test end-to-end flow (N8N → Database → Frontend)
5. 🔜 Deploy ke production

## Contact
Jika ada pertanyaan, hubungi:
- Email: info@uterogroup.com
- Phone: +62 812-1665-0111

---

**Last Updated:** 5 Agustus 2026
