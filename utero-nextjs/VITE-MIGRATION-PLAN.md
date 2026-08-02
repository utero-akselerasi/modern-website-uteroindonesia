# Rancangan Migrasi Next.js ke Vite

## Overview
Dokumen ini merancang migrasi dari Next.js 16 (App Router) ke Vite + React untuk mendapatkan build yang lebih cepat dan bundle size lebih kecil.

## Estimasi Effort
**Total: 6-8 jam kerja** (untuk developer berpengalaman)

---

## 1. Setup Awal (30 menit)

### Install Dependencies
```bash
npm create vite@latest . -- --template react-ts
npm install react-router-dom react-helmet-async
npm install -D @types/react-router-dom
```

### File Structure Baru
```
src/
+-- pages/              # Halaman-halaman
¦   +-- Home.tsx
¦   +-- ArtikelList.tsx
¦   +-- ArtikelDetail.tsx
+-- components/         # Komponen (sama seperti sekarang)
¦   +-- layout/
¦   +-- sections/
+-- data/              # Data (sama seperti sekarang)
+-- styles/            # Global styles
+-- router.tsx         # Routing config
+-- main.tsx           # Entry point
```

---

## 2. Migrasi File per File

### A. Routing System (1-2 jam)

**Next.js (App Router):**
```
src/app/
+-- page.tsx           ? Homepage
+-- artikel/
¦   +-- page.tsx       ? Artikel list
¦   +-- [slug]/
¦       +-- page.tsx   ? Artikel detail
+-- layout.tsx
+-- not-found.tsx
```

**Vite (React Router):**
```typescript
// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ArtikelList from './pages/ArtikelList';
import ArtikelDetail from './pages/ArtikelDetail';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'artikel', element: <ArtikelList /> },
      { path: 'artikel/:slug', element: <ArtikelDetail /> },
    ],
  },
]);
```

### B. Layout Component (30 menit)

**Next.js:**
```typescript
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
```

**Vite:**
```typescript
// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

export default function Layout() {
  return (
    <HelmetProvider>
      <div id="root-layout">
        <Outlet />
      </div>
    </HelmetProvider>
  );
}
```

### C. Image Component (30 menit)

**Next.js:**
```typescript
import Image from "next/image";
<Image src="/images/logo.png" width={200} height={100} alt="Logo" />
```

**Vite (Plain HTML):**
```typescript
<img src="/images/logo.png" width={200} height={100} alt="Logo" />
```

**Optional - Custom Image Component:**
```typescript
// src/components/OptimizedImage.tsx
interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function OptimizedImage({ src, alt, ...props }: Props) {
  return <img src={src} alt={alt} loading="lazy" {...props} />;
}
```

### D. Link Component (15 menit)

**Next.js:**
```typescript
import Link from "next/link";
<Link href="/artikel">Artikel</Link>
```

**Vite:**
```typescript
import { Link } from "react-router-dom";
<Link to="/artikel">Artikel</Link>
```

### E. SEO/Metadata (1 jam)

**Next.js:**
```typescript
// src/app/page.tsx
export const metadata = {
  title: "Homepage",
  description: "Deskripsi",
};
```

**Vite (React Helmet):**
```typescript
// src/pages/Home.tsx
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Homepage | Utero Indonesia</title>
        <meta name="description" content="Deskripsi" />
        <meta property="og:title" content="Homepage" />
        <meta property="og:description" content="Deskripsi" />
        <link rel="canonical" href="https://uteroindonesia.com/" />
      </Helmet>
      
      <main>
        {/* Content */}
      </main>
    </>
  );
}
```

### F. Font Loading (30 menit)

**Next.js:**
```typescript
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

**Vite (Manual @font-face):**
```css
/* src/styles/fonts.css */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-weight: 700;
  src: url('/fonts/inter-bold.woff2') format('woff2');
}
```

---

## 3. Dynamic Routes (1 jam)

**Next.js:**
```typescript
// src/app/artikel/[slug]/page.tsx
export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  // ...
}
```

**Vite:**
```typescript
// src/pages/ArtikelDetail.tsx
import { useParams } from 'react-router-dom';
import { getArticleBySlug } from '../data/articles';

export default function ArtikelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug!);
  
  if (!article) {
    return <NotFound />;
  }
  
  return (
    <>
      <Helmet>
        <title>{article.title} | Utero Indonesia</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      {/* Content */}
    </>
  );
}
```

---

## 4. Build Configuration (30 menit)

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animation: ['framer-motion'],
        },
      },
    },
  },
});
```

---

## 5. Static Generation (1 jam)

Karena Vite default adalah SPA (client-side), untuk SEO perlu tambahan:

### Opsi A: Vite SSG Plugin (Recommended)
```bash
npm install -D vite-plugin-ssg
```

```typescript
// vite.config.ts
import { ssgPlugin } from 'vite-plugin-ssg';

export default defineConfig({
  plugins: [
    react(),
    ssgPlugin({
      routes: [
        '/',
        '/artikel',
        '/artikel/profil-utero-kreatif-indonesia',
        '/artikel/layanan-utero-kreatif-indonesia',
        '/artikel/portofolio-proyek-utero-indonesia',
      ],
    }),
  ],
});
```

### Opsi B: Manual Prerender Script
```javascript
// scripts/prerender.js
const fs = require('fs');
const path = require('path');

const routes = ['/', '/artikel', /* ... */];

routes.forEach(route => {
  // Generate HTML untuk setiap route
  // (membutuhkan setup React SSR manual)
});
```

---

## 6. Robots.txt & Sitemap (15 menit)

**Next.js:** Punya API khusus (`robots.ts`, `sitemap.ts`)

**Vite:** Static files di `public/`

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://uteroindonesia.com/</loc>
    <lastmod>2026-08-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://uteroindonesia.com/artikel/</loc>
  </url>
</urlset>
```

```txt
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://uteroindonesia.com/sitemap.xml
```

---

## 7. Testing & Validation (1 jam)

### Checklist:
- [ ] Homepage load dengan benar
- [ ] Routing artikel list & detail berfungsi
- [ ] CSS & images load
- [ ] Meta tags SEO correct
- [ ] Fonts load properly
- [ ] Animations (Framer Motion) work
- [ ] Build size < 500 KB (gzipped)
- [ ] Lighthouse score > 90

---

## 8. Deployment (15 menit)

**Build:**
```bash
npm run build
# Output: dist/
```

**Upload ke cPanel:**
Upload semua isi folder `dist/` ke `public_html/`

**Routing Fix (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Perbandingan Bundle Size

### Next.js Static Export (Current)
```
CSS:     ~150 KB
JS:      ~400 KB (React + Next.js runtime)
Total:   ~550 KB (gzipped: ~180 KB)
```

### Vite + React (Estimated)
```
CSS:     ~150 KB
JS:      ~200 KB (React + Router only)
Total:   ~350 KB (gzipped: ~120 KB)
```

**Savings: ~35% reduction**

---

## Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| SEO menurun (SPA) | High | Gunakan vite-plugin-ssg atau prerender |
| Routing tidak cocok | Medium | Test semua routes sebelum deploy |
| Dynamic imports error | Low | Fallback ke static imports |
| Font loading delay | Low | Preload fonts di HTML |

---

## Timeline Realistis

| Fase | Durasi | Output |
|------|--------|--------|
| Setup & Install | 30 min | Vite project initialized |
| Routing Migration | 2 hr | React Router setup |
| Component Updates | 2 hr | Link, Image, SEO components |
| Build Config | 1 hr | Vite config + optimization |
| Testing | 1.5 hr | All routes validated |
| Deploy | 30 min | Live on cPanel |
| **Total** | **7.5 hr** | Production ready |

---

## Rekomendasi

### Kapan Migrasi ke Vite?
? **Migrasi sekarang jika:**
- Butuh build time lebih cepat (dev experience)
- Bundle size jadi concern utama
- Tidak butuh SSR/ISR Next.js
- Tim familiar dengan React Router

? **Tetap Next.js jika:**
- Website akan berkembang butuh SSR
- Butuh API routes Next.js
- Tim sudah comfortable dengan Next.js
- Fix current issue lebih cepat

### Rekomendasi Saya: **Tetap Next.js Static Export**
Karena:
1. Fix path issue cuma butuh `fix-paths.js` script (sudah done)
2. Website sudah production-ready
3. Migrasi butuh 7-8 jam effort
4. Risk vs reward tidak sebanding untuk skala website ini

**Migrasi ke Vite** cocok untuk project baru atau kalau performa benar-benar jadi bottleneck.

---

## Next Steps (Jika Mau Migrasi)

1. Buat branch baru: `git checkout -b migrate-to-vite`
2. Backup current Next.js version
3. Install Vite + dependencies
4. Migrate 1 page dulu (homepage) untuk proof of concept
5. Test routing & SEO
6. Migrate remaining pages
7. Final testing
8. Deploy

**Estimated Start to Finish: 2 days (part-time work)**

