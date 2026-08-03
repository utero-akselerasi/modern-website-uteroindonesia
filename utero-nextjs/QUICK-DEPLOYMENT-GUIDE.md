# QUICK DEPLOYMENT GUIDE

## 🚀 Upload to cPanel - Step by Step

### 1. Build Locally (Already Done ✅)
```bash
npm run build
```

### 2. Prepare Files
You need to upload:
- **ALL contents of `out/` folder** (319 files, 51.44 MB)
- **`.htaccess`** file (updated with Next.js routing rules)

### 3. Upload via cPanel File Manager

**Option A: Via File Manager**
1. Login to cPanel
2. Open "File Manager"
3. Navigate to `public_html/` (or your domain folder)
4. Delete old files if any
5. Upload the `.htaccess` file to `public_html/`
6. Upload ALL contents from `out/` folder to `public_html/`
   - Make sure to upload folder contents, not the `out` folder itself
   - Structure should be: `public_html/index.html`, `public_html/_next/`, etc.

**Option B: Via FTP**
1. Connect to FTP (Host: your-domain.com, Port: 21)
2. Navigate to `public_html/`
3. Upload `.htaccess`
4. Upload all files from `out/` folder

**Option C: Via ZIP Upload**
1. Create ZIP of `out/` folder contents (not the folder itself)
2. Upload ZIP to cPanel File Manager
3. Extract in `public_html/`
4. Upload `.htaccess` separately

### 4. Set Permissions (if needed)
- Folders: 755
- Files: 644

### 5. Test Deployment ✅

Visit your domain and check:
- [ ] Homepage loads: `https://yourdomain.com/`
- [ ] Artikel list: `https://yourdomain.com/artikel/`
- [ ] Artikel detail: `https://yourdomain.com/artikel/layanan-utero-kreatif-indonesia/`
- [ ] CSS/JS loads (check browser DevTools - no 404 errors)
- [ ] Images display correctly
- [ ] Navigation works between pages

### 6. Troubleshooting

**CSS/JS not loading?**
- Check `.htaccess` is uploaded
- Check paths in browser DevTools Network tab
- Verify all `_next/` folder uploaded completely

**404 errors on artikel pages?**
- Verify `.htaccess` has rewrite rules
- Check `artikel/` subfolder structure exists

**Images not showing?**
- Verify `images/` folder uploaded completely
- Check image paths in DevTools

**Blank page?**
- Check browser console for JavaScript errors
- Verify `index.html` exists in root
- Clear browser cache and try again

## 📊 What's Deployed

```
public_html/
├── .htaccess                    (routing rules)
├── index.html                   (homepage)
├── 404.html                     (error page)
├── artikel/
│   ├── index.html               (artikel listing)
│   └── [slug]/index.html        (artikel details)
├── _next/
│   └── static/
│       ├── chunks/              (JavaScript bundles)
│       ├── css/                 (Stylesheets)
│       └── media/               (Fonts)
└── images/                      (All images)
```

## 🎯 Key Points

✅ **All paths are relative** - works in any directory
✅ **No server required** - pure static HTML/CSS/JS
✅ **SEO friendly** - all pages pre-rendered
✅ **Fast loading** - optimized static files
✅ **Cache enabled** - via .htaccess rules

## 📝 Future Updates

To update the site:
1. Make changes locally
2. Run `npm run build`
3. Upload `out/` folder contents to cPanel
4. Clear browser cache to see changes

## ⚠️ Important Notes

- Don't upload the `out/` folder itself, upload its CONTENTS
- The `.htaccess` file is crucial for proper routing
- First load might be slow due to cache building
- All paths are now relative, so deployment is flexible

---

**Last Updated:** August 2, 2026
**Build Status:** ✅ READY
**Files:** 319 files (51.44 MB)
**Deployment Status:** ⏳ Awaiting upload to cPanel
