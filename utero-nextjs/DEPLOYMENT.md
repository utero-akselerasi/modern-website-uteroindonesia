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

2. **Upload ke cPanel:**
   - Upload semua isi folder `out/` ke `public_html/` (atau subdomain folder)
   - Pastikan struktur folder tetap sama

3. **File .htaccess (optional):**
   Jika perlu clean URLs, tambahkan di `public_html/.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^([^\.]+)$ $1.html [NC,L]
   ```

## Keuntungan Static Export
? Tidak butuh Node.js server
? Memory footprint rendah
? Bisa host di shared hosting biasa
? Load time sangat cepat
? SEO-friendly (semua pre-rendered)

## Yang Berubah
- ? `output: "export"` ditambahkan di `next.config.ts`
- ? `export const dynamic = "force-static"` di `robots.ts` dan `sitemap.ts`
- ? Semua halaman di-generate sebagai static HTML

## Testing Local
Untuk test hasil build:
```bash
npx serve out
```
Buka http://localhost:3000

## Notes
- Build size: ~2-3 MB (termasuk assets)
- Semua routes sudah pre-rendered
- No server-side runtime needed
