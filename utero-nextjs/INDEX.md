# 📚 Deployment Documentation Index

Ini adalah index lengkap semua dokumentasi deployment untuk Utero Next.js ke cPanel.

## 🚀 Mulai Dari Mana?

### Jika kamu baru pertama kali deploy:
**→ Baca file ini dulu: [`START-HERE.md`](START-HERE.md)**

### Jika kamu butuh command cepat:
**→ Lihat: [`QUICK-REFERENCE.txt`](QUICK-REFERENCE.txt)**

### Jika kamu mau panduan visual lengkap:
**→ Baca: [`DEPLOYMENT-SUMMARY.md`](DEPLOYMENT-SUMMARY.md)**

---

## 📖 Daftar Dokumentasi

### 📘 Panduan Utama (Wajib Baca)

| File | Ukuran | Deskripsi | Untuk Siapa? |
|------|--------|-----------|--------------|
| **START-HERE.md** | 2.9 KB | Overview & quick start | Semua orang (mulai di sini!) |
| **QUICK-REFERENCE.txt** | 12.7 KB | Command cheat sheet | Yang butuh referensi cepat |
| **DEPLOYMENT-SUMMARY.md** | 11.3 KB | Visual complete guide | Yang suka panduan detail & visual |

### 📗 Panduan Detail

| File | Ukuran | Deskripsi | Untuk Siapa? |
|------|--------|-----------|--------------|
| **DEPLOYMENT.md** | 4.4 KB | Step-by-step instructions | Yang butuh panduan lengkap |
| **CHECKLIST.md** | 3.1 KB | Deployment checklist | Yang sudah paham, butuh checklist |
| **README-DEPLOYMENT.md** | 3.4 KB | Feature overview | Yang mau tau fitur apa aja |

### ⚙️ File Teknis

| File | Ukuran | Deskripsi | Kegunaan |
|------|--------|-----------|----------|
| **server.js** | 1 KB | Node.js server | Core server untuk cPanel |
| **deploy.bat** | 1.6 KB | Deployment script | Auto-deploy untuk Windows |
| **deploy.sh** | 1.4 KB | Deployment script | Auto-deploy untuk Linux/Mac |

### 📋 Configuration Templates

| File | Ukuran | Deskripsi | Kapan Dipakai? |
|------|--------|-----------|----------------|
| **.env.production.example** | 0.3 KB | Environment variables | Copy & rename jadi `.env.production` |
| **.htaccess.example** | 1.7 KB | Apache config | Copy ke `public_html/` jika perlu |

---

## 🎯 Workflow Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. Baca START-HERE.md                                          │
│     └─> Pahami overview & requirements                          │
│                                                                 │
│  2. Test Local (Optional tapi recommended)                      │
│     └─> pnpm build && node server.js                           │
│                                                                 │
│  3. Create Deployment Package                                   │
│     └─> .\deploy.bat (Windows) atau ./deploy.sh (Linux/Mac)   │
│                                                                 │
│  4. Upload ke cPanel                                            │
│     └─> Upload & extract utero-nextjs-deploy.zip              │
│                                                                 │
│  5. Setup Node.js App                                           │
│     └─> Ikuti panduan di DEPLOYMENT-SUMMARY.md                 │
│                                                                 │
│  6. Install Dependencies                                        │
│     └─> npm install --production                               │
│                                                                 │
│  7. Start & Test                                                │
│     └─> Restart app & test di browser                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔍 Cari Info Spesifik

### Pertanyaan Umum

**Q: Bagaimana cara deploy ke cPanel?**
→ Baca: `DEPLOYMENT-SUMMARY.md` (paling lengkap)

**Q: Command apa aja yang harus dijalankan?**
→ Lihat: `QUICK-REFERENCE.txt`

**Q: Error saat deploy, gimana troubleshoot?**
→ Baca: `DEPLOYMENT-SUMMARY.md` bagian "Common Issues"

**Q: File apa aja yang harus di-upload?**
→ Lihat: `CHECKLIST.md` atau `QUICK-REFERENCE.txt`

**Q: Bagaimana cara update setelah deploy?**
→ Baca: `DEPLOYMENT-SUMMARY.md` bagian "Update Workflow"

**Q: cPanel saya support Node.js atau tidak?**
→ Cek di cPanel → Software → Setup Node.js App (harus ada feature ini)

---

## ⚙️ File yang Digunakan dalam Deployment

### Files yang HARUS ada di server:
```
✅ server.js              # Custom Node.js server (WAJIB!)
✅ .next/                 # Build output (WAJIB!)
✅ public/                # Static assets
✅ src/                   # Source code
✅ package.json           # Dependencies list
✅ pnpm-lock.yaml         # Lock file
✅ next.config.ts         # Next.js config
✅ tsconfig.json          # TypeScript config
```

### Files yang TIDAK perlu di-upload:
```
❌ node_modules/          # Install di server, jangan upload!
❌ .git/                  # Tidak perlu
❌ tests/                 # Tidak perlu di production
❌ .next/cache/           # Auto-generated
```

---

## 💡 Tips & Best Practices

1. **Selalu test local dulu** sebelum upload ke production
2. **Backup** website lama sebelum deploy yang baru
3. **Jangan upload `node_modules/`** - install di server saja
4. **Simpan semua dokumentasi** untuk referensi masa depan
5. **Catat error messages** kalau ada masalah
6. **Check logs** di cPanel jika app tidak start
7. **Pastikan Node.js version 18+** di cPanel

---

## 🆘 Troubleshooting Quick Links

| Masalah | Solusi Ada Di |
|---------|--------------|
| App tidak mau start | `DEPLOYMENT-SUMMARY.md` → Common Issues |
| 404 di semua halaman | `DEPLOYMENT-SUMMARY.md` → Common Issues |
| Images tidak muncul | `DEPLOYMENT-SUMMARY.md` → Common Issues |
| Port conflict | `QUICK-REFERENCE.txt` → Common Issues |
| Memory error | `DEPLOYMENT-SUMMARY.md` → Common Issues |
| Build error | Test local dulu: `pnpm build` |

---

## 📞 Support & Resources

- **Documentation**: Semua file di folder ini
- **Next.js Docs**: https://nextjs.org/docs/deployment
- **cPanel Node.js**: Tanya hosting provider kamu
- **Test Local**: `node server.js` sebelum upload

---

## ✨ What You Get

Setelah deploy sukses, website kamu akan punya:

✅ **Full Next.js Features**
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- Image Optimization
- Dynamic Routes

✅ **Performance**
- Automatic code splitting
- Optimized bundles
- Browser caching
- Compressed assets

✅ **SEO & Analytics**
- Google Analytics integrated
- Complete SEO metadata
- Open Graph tags
- JSON-LD structured data

✅ **User Experience**
- Framer Motion animations
- Smooth scrolling
- Mobile responsive
- Fast page loads

---

## 🎊 Ready to Deploy!

**Langkah pertama:** Buka [`START-HERE.md`](START-HERE.md)

**Quick start:** Run `.\deploy.bat` (Windows) atau `./deploy.sh` (Linux/Mac)

**Need help:** Lihat `DEPLOYMENT-SUMMARY.md` untuk panduan lengkap

---

**Project:** PT. Utero Kreatif Indonesia  
**Framework:** Next.js 16.2.9 (App Router)  
**Target:** cPanel with Node.js support  
**Created:** 2026-08-01  
**Status:** ✅ Ready for Production  

Good luck! 🚀
