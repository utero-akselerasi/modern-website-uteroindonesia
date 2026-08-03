# Deployment Guide - Utero Vite

## Quick Deploy to cPanel

### Step 1: Build
```bash
cd utero-vite
npm run build
```

### Step 2: Upload
Upload semua isi folder `dist/` ke `public_html/` di cPanel:
- File Manager → public_html
- Upload semua file dari `dist/`
- Pastikan `.htaccess` ter-upload

### Step 3: Verify
Kunjungi: https://uteroindonesia.com
- Test homepage
- Test /artikel
- Test /artikel/profil-utero-kreatif-indonesia

## File Checklist

Pastikan file-file ini ada di public_html:
- [ ] index.html
- [ ] .htaccess (penting untuk routing)
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] assets/ folder (JS & CSS)
- [ ] images/ folder
- [ ] fonts/ folder

## Troubleshooting

### 404 Error pada /artikel
**Problem**: .htaccess tidak bekerja
**Solution**: 
1. Cek mod_rewrite enabled di Apache
2. Pastikan AllowOverride All di config
3. Re-upload .htaccess

### Images tidak muncul
**Problem**: Path salah atau file tidak ter-upload
**Solution**: 
1. Cek folder images/ ter-upload lengkap
2. Cek console browser untuk error 404
3. Pastikan path di code benar

### CSS tidak apply
**Problem**: CSS file tidak ter-load
**Solution**: 
1. Cek folder assets/ ter-upload
2. Clear browser cache
3. Cek network tab di DevTools

## Performance Check

Setelah deploy, test dengan:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## DNS & Domain

Jika domain belum pointing:
1. Update A Record ke IP server
2. Wait 24-48 jam propagasi
3. Test dengan https://www.whatsmydns.net

## SSL Certificate

Pastikan HTTPS aktif:
1. cPanel → SSL/TLS
2. Install Let's Encrypt (gratis)
3. Force HTTPS di .htaccess sudah included

## Backup

Sebelum deploy production:
1. Backup current public_html
2. Export database (jika ada)
3. Save backup di tempat aman

## Rollback

Jika ada masalah:
1. Restore backup public_html
2. Atau build ulang dari Next.js:
```bash
cd utero-nextjs
npm run build
# Upload folder out/
```

## Post-Deployment

- [ ] Test all pages
- [ ] Check Google Analytics (add GTM)
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor server logs
- [ ] Check mobile version
- [ ] Test forms & contact

## Support

Issues? Contact:
- Email: info@uterogroup.com
- WhatsApp: +62 812-1665-0111

---

**Last Updated**: 2026-08-02
**Version**: Vite 1.0
**Status**: Production Ready ✅

