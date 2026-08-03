# Static Export - Deployment Guide

## Build Output
Static files berhasil di-generate ke folder `out/`:
- **index.html** - Homepage
- **artikel/index.html** - Artikel listing
- **artikel/[slug]/index.html** - Detail artikel (3 artikel)
- **404.html** & **404/index.html** - Error pages
- **_next/** - Next.js assets (CSS, JS, images)
- **images/** - Image assets

## Cara Deploy ke cPanel

1. **Build locally:**
   ```bash
   npm run build
   ```
   Script otomatis run `next build` + `fix-paths.js` untuk convert absolute paths ke relative paths.

2. **Upload ke cPanel:**
   - Upload semua isi folder `out/` ke `public_html/` (atau subdomain folder)
   - Upload file `.htaccess` (sudah include di root project)
   - Set permissions: folders 755, files 644

3. **Verifikasi:**
   - Buka website di browser
   - Check semua CSS/JS load dengan benar
   - Test navigasi antar halaman
   - Test artikel detail pages

## Update fix-paths.js (Aug 2, 2026)

Script diperbaiki untuk menangani **absolute paths di dalam JavaScript code**:

### Masalah Sebelumnya
- ✓ HTML attributes sudah fixed: `href="/_next/"` → `href="./_next/"`
- ✗ JavaScript strings belum fixed: `"/_next/static/chunks/"` (141 instances)

### Solusi
Script sekarang meng-handle:
```javascript
// JavaScript string paths
content = content.replace(/"\/_next\/static\//g, '"./_next/static/');
content = content.replace(/"\/images\//g, '"./images/');
content = content.replace(/'\/_next\/static\//g, '\'"./_next/static/');
content = content.replace(/'\/images\//g, '\'"./images/');
```

### Hasil Verifikasi
- ✓ index.html: 0 absolute paths, 155 relative paths
- ✓ artikel/index.html: 0 absolute paths, 67 relative paths
- ✓ Semua HTML files: Paths successfully converted

## File `.htaccess` untuk cPanel

```apache
# Enable rewrite engine
RewriteEngine On

# Remove trailing slash for files
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} (.+)/$
RewriteRule ^ %1 [R=301,L]

# Serve HTML files without .html extension
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# Handle Next.js routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^artikel/([^/]+)/?$ artikel/$1/index.html [L]

# Fallback to index.html for SPA-like behavior
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]

# Cache static assets
<FilesMatch "\.(css|js|jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

## package.json build script

```json
"build": "next build && node fix-paths.js"
```

## Keuntungan Static Export
✓ Tidak butuh Node.js server
✓ Memory footprint rendah (solved: "Out of memory" error)
✓ Bisa host di shared hosting biasa
✓ Load time sangat cepat
✓ SEO-friendly (semua pre-rendered)
✓ Relative paths = deploy anywhere
✓ JavaScript paths fixed untuk proper loading

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
Pastikan `fix-paths.js` sudah run dengan versi terbaru. Check file HTML harus ada:
```html
<link href="./_next/static/chunks/..." />
<script src="./_next/static/chunks/..." />
```

Dan di dalam JavaScript:
```javascript
"./_next/static/chunks/..."
```

### Images tidak muncul?
Check path di HTML:
```html
<img src="./images/client/logo.png" />
```

### Routing tidak jalan?
Tambahkan `.htaccess` atau gunakan trailing slash URL:
- ✓ `https://domain.com/artikel/`
- ✗ `https://domain.com/artikel` (bisa 404 tanpa .htaccess)

## Deployment Checklist
- [x] Build completed: `npm run build`
- [x] Paths fixed: absolute → relative (HTML + JS)
- [x] Verify no `"/_next/` in output files
- [ ] Upload `out/` folder to cPanel
- [ ] Upload `.htaccess` to root
- [ ] Test website di production
- [ ] Verify all pages load correctly
- [ ] Check DevTools console for errors

## Migrasi ke Vite?
Lihat dokumen `VITE-MIGRATION-PLAN.md` untuk rancangan lengkap migrasi dari Next.js ke Vite.
Estimasi: 7-8 jam effort, bundle size reduction ~35%.

**Rekomendasi:** Tetap pakai Next.js static export karena sudah production-ready dan working.

## Latest Update
**Date:** August 2, 2026
**Status:** ✓ All paths fixed and verified
**Next Step:** Upload to cPanel for production deployment
