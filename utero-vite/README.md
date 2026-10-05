# Utero Indonesia - Vite Migration

## Overview
Migrasi dari Next.js 16 ke Vite + React untuk performa lebih baik dan bundle size lebih kecil.

**Backend**: Self-hosted Supabase dengan Edge Functions

## Tech Stack
- **Vite** - Build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing
- **React Helmet Async** - SEO management
- **Framer Motion** - Animations
- **Supabase** - Self-hosted backend (PostgreSQL, Auth, Storage, Edge Functions)

## Project Structure
```
utero-vite/
├── public/              # Static assets
│   ├── images/         # Images
│   ├── fonts/          # Fonts
│   ├── .htaccess       # Apache rewrite rules
│   ├── robots.txt      # SEO robots
│   └── sitemap.xml     # SEO sitemap
├── src/
│   ├── components/     # React components
│   │   ├── layout/    # Layout components (Navbar, Footer)
│   │   └── sections/  # Page sections
│   ├── data/          # Static data
│   ├── pages/         # Route pages
│   ├── styles/        # Global styles
│   ├── router.tsx     # Router configuration
│   ├── main.tsx       # Entry point
│   └── index.css      # Global CSS
├── supabase/
│   ├── functions/     # Edge Functions
│   │   └── blog-auto-post/  # Blog API
│   └── migrations/    # Database migrations
├── docs/              # Documentation
│   ├── deployment/    # Docker deployment
│   ├── automation-api/# Automation API documentation
│   ├── supabase-management/ # Supabase operations
│   ├── DEPLOYMENT-SELFHOSTED.md   # Full deployment guide
│   └── SELFHOSTED-QUICKSTART.md   # Quick start guide
├── docker/            # Nginx configuration
├── Dockerfile         # Multi-stage frontend and PHP image
├── docker-compose.yml # Local production stack
├── dist/              # Build output
├── deploy-function.ps1  # Deploy script
└── test-api-key.ps1     # API test script
```

## Installation

```bash
cd utero-vite
npm install
```

## Configuration

### Setup Environment Variables

```bash
# Copy template
cp .env.example .env

# Edit dengan konfigurasi self-hosted Supabase kamu
nano .env
```

Required variables:
```env
VITE_SUPABASE_URL=https://your-supabase-domain.com
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_BLOG_API_KEY=your-secure-api-key
```

**📖 Panduan lengkap setup**: [docs/SELFHOSTED-QUICKSTART.md](./docs/SELFHOSTED-QUICKSTART.md)

## Docker Deployment

Production-like deployment lokal tersedia melalui Docker Compose:

```bash
docker compose up -d --build
```

Website tersedia di `http://localhost:8081`. Panduan domain, reverse proxy, network, dan TLS: [docs/deployment/DOCKER.md](./docs/deployment/DOCKER.md).

## Development

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`

## Build Results
- **Total bundle size**: ~641 KB
- **Gzipped**: ~144 KB
- **CSS**: 23.43 KB (gzipped: 6.55 KB)
- **JavaScript**: 617 KB (gzipped: ~137 KB)

### Chunk Breakdown:
- `vendor.js` (React + Router): 295 KB → 94 KB gzipped
- `index.js` (App code): 189 KB → 35 KB gzipped
- `animation.js` (Framer Motion): 133 KB → 43 KB gzipped

## Deployment

### Self-Hosted Supabase Setup

**Quick Deploy (5 menit)**:

1. Setup environment variables di `.env`
2. Deploy Edge Function:
   ```powershell
   .\deploy-function.ps1
   ```
3. Test API:
   ```powershell
   .\test-api-key.ps1
   ```
4. Build & upload frontend:
   ```bash
   npm run build
   # Upload dist/ ke web server
   ```

**📖 Dokumentasi lengkap**: 
- [Quick Start Guide](./docs/SELFHOSTED-QUICKSTART.md) - Setup 5 menit
- [Full Deployment Guide](./docs/DEPLOYMENT-SELFHOSTED.md) - Panduan detail

### Frontend Deployment

#### Upload ke cPanel
1. Build project: `npm run build`
2. Upload semua isi folder `dist/` ke `public_html/`
3. File `.htaccess` sudah included untuk routing SPA

#### Vercel / Netlify
Project sudah siap deploy ke platform modern:
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

## Supabase Edge Functions

### Blog Auto-Post Function

Endpoint untuk auto-posting artikel blog dengan features:
- ✅ API key authentication
- ✅ Auto-generate slug dari title
- ✅ Upload cover image ke Supabase Storage
- ✅ Insert artikel ke database dengan RLS bypass
- ✅ SEO optimization dengan meta description

**Endpoint**: `POST /functions/v1/blog-auto-post`

**Headers**:
```
x-api-key: your-blog-api-key
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Judul Artikel",
  "content": "<p>Konten artikel dalam HTML</p>",
  "excerpt": "Ringkasan artikel",
  "author": "Nama Author",
  "category": "Kategori",
  "image_base64": "base64-encoded-image",
  "image_mime_type": "image/png"
}
```

**Test Function**:
```powershell
.\test-api-key.ps1
```

## Key Features
✅ Fast development with HMR
✅ Optimized production builds
✅ Code splitting (vendor, animation, helmet)
✅ SEO-friendly with React Helmet
✅ Client-side routing with React Router
✅ TypeScript type safety
✅ Framer Motion animations
✅ Mobile responsive
✅ Self-hosted backend with Supabase
✅ Edge Functions for serverless API
✅ PostgreSQL database
✅ File storage with Supabase Storage

## Routes
- `/` - Homepage
- `/artikel` - Artikel list
- `/artikel/:slug` - Artikel detail

## SEO
- Meta tags via React Helmet Async
- Sitemap.xml untuk search engines
- Robots.txt configuration
- Canonical URLs
- Open Graph tags

## Performance Improvements vs Next.js
- ✅ 35% smaller bundle size
- ✅ Faster build times (15s vs 45s+)
- ✅ Faster dev server startup
- ✅ Better HMR performance
- ✅ Self-hosted backend (no vendor lock-in)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Self-Hosted Supabase Instance

**Server**: `supabase-server` (maskhar@supabase-server)
**Instance**: https://supabase.carubra.com
**Path**: `~/docker/supabase/supabase-1.26.05/docker`

### Services:
- ✅ PostgreSQL Database
- ✅ PostgREST API
- ✅ GoTrue Authentication
- ✅ Realtime Subscriptions
- ✅ Storage API
- ✅ Edge Functions (Deno runtime)
- ✅ Kong API Gateway

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

**Deployment Scripts**:
- `deploy-function.ps1` - Deploy Edge Function ke server
- `test-api-key.ps1` - Test Blog API endpoint

## Migration Checklist
- [x] Setup Vite project
- [x] Migrate all components
- [x] Configure React Router
- [x] Setup React Helmet for SEO
- [x] Copy static assets
- [x] Configure build optimization
- [x] Create .htaccess for SPA routing
- [x] Test build successfully
- [x] Remove Next.js dependencies
- [x] Setup self-hosted Supabase
- [x] Create Edge Functions
- [x] Database migrations
- [x] Storage bucket configuration
- [x] Deployment scripts
- [x] API testing scripts
- [x] Documentation

## Troubleshooting

### Edge Function Issues
```bash
# Check function logs
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose logs -f edge-functions

# Restart service
docker-compose restart edge-functions
```

### API Key Issues
- Pastikan `VITE_BLOG_API_KEY` di `.env` sama dengan `BLOG_API_KEY` di server
- Generate new key: `openssl rand -base64 32`

### CORS Issues
- Function sudah include CORS headers
- Pastikan menggunakan HTTPS untuk production

**📖 Troubleshooting lengkap**: [docs/DEPLOYMENT-SELFHOSTED.md#troubleshooting](./docs/DEPLOYMENT-SELFHOSTED.md#troubleshooting)

## Security

- 🔒 API key authentication untuk blog posting
- 🔒 Row Level Security (RLS) di database
- 🔒 Service role key untuk bypass RLS di functions
- 🔒 HTTPS enforced untuk production
- 🔒 Environment variables tidak di-commit ke git
- 🔒 Secure API key generation (32+ characters)

## Contact
PT. Utero Kreatif Indonesia
- Website: https://uteroindonesia.com
- Email: info@uterogroup.com
- Phone: +62 812-1665-0111

---

**Built with ❤️ by Utero Indonesia**

**Self-hosted with 🚀 Supabase**
