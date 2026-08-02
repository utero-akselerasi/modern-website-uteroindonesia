# Static Export - Deployment Guide

## Build Output
Static files berhasil di-generate ke folder `out/`:
- **index.html** - Homepage
- **artikel.html** - Artikel listing
- **artikel/[slug].html** - Detail artikel (3 artikel)
- **robots.txt** & **sitemap.xml** - SEO files
- **_next/** - Next.js assets (CSS, JS, images)

## Cara Deploy ke cPanel

1. **Build locally:**
   ```bash
   npm run build
   ```
   Script otomatis run `next build` + `fix-paths.js` untuk convert absolute paths ke relative paths.

2. **Upload ke cPanel:**
   - Upload semua isi folder `out/` ke `public_html/` (atau subdomain folder)
   - Pastikan struktur folder tetap sama

3. **File .htaccess (optional untuk clean URLs):**
   Jika perlu clean URLs, tambahkan di `public_html/.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^([^\.]+)$ $1.html [NC,L]
   ```

## Perubahan Teknis

### Next.js Config (`next.config.ts`)
```typescript
output: "export"           // Static export mode
basePath: ""               // Root path
assetPrefix: ""            // No CDN prefix
trailingSlash: true        // Add trailing slash to URLs
images: { unoptimized: true }  // Disable Next.js image optimization
```

### Post-Build Script (`fix-paths.js`)
Script otomatis convert:
- `href="/_next/"` ? `href="./_next/"`
- `src="/_next/"` ? `src="./_next/"`
- `href="/images/"` ? `href="./images/"`
- `src="/images/"` ? `src="./images/"`

Ini penting agar CSS, JS, dan images bisa load di cPanel shared hosting.

### Package.json
```json
"build": "next build && node fix-paths.js"
```

## Keuntungan Static Export
? Tidak butuh Node.js server
? Memory footprint rendah (solved: "Out of memory" error)
? Bisa host di shared hosting biasa
? Load time sangat cepat
? SEO-friendly (semua pre-rendered)
? Relative paths = deploy anywhere

## Testing Local
Untuk test hasil build:
```bash
npx serve out
```
Buka http://localhost:3000

## Bundle Size
- Total: ~2-3 MB (termasuk assets)
- Gzipped: ~180 KB
- All routes pre-rendered
- No server-side runtime needed

## Troubleshooting

### CSS/JS tidak load?
Pastikan `fix-paths.js` sudah run. Check file HTML harus ada:
```html
<link href="./_next/static/chunks/..." />
<script src="./_next/static/chunks/..." />
```

### Images tidak muncul?
Check path di HTML:
```html
<img src="./images/client/logo.png" />
```

### Routing tidak jalan?
Tambahkan `.htaccess` atau gunakan trailing slash URL:
- ? `https://domain.com/artikel/`
- ? `https://domain.com/artikel` (bisa 404 tanpa .htaccess)

## Migrasi ke Vite?
Lihat dokumen `VITE-MIGRATION-PLAN.md` untuk rancangan lengkap migrasi dari Next.js ke Vite.
Estimasi: 7-8 jam effort, bundle size reduction ~35%.

**Rekomendasi:** Tetap pakai Next.js static export karena sudah production-ready dan working.
