# 🚀 Utero Next.js - cPanel Deployment Package

Semua file yang dibutuhkan untuk deploy project ini ke cPanel sudah tersedia!

## 📦 Files Created

### Core Files
- `server.js` - Custom Node.js server untuk cPanel
- `package.json` - Updated dengan script `start:server` dan engines

### Deployment Scripts
- `deploy.bat` - Windows deployment script (auto-build & zip)
- `deploy.sh` - Linux/Mac deployment script (auto-build & zip)

### Documentation
- `DEPLOYMENT.md` - Panduan lengkap step-by-step
- `CHECKLIST.md` - Quick checklist untuk deployment
- `README-DEPLOYMENT.md` - File ini

### Configuration Examples
- `.env.production.example` - Template environment variables
- `.htaccess.example` - Caching & security headers untuk cPanel

## 🎯 Quick Start

### Method 1: Automatic (Recommended)

**Windows:**
```bash
.\deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

Ini akan:
1. Install dependencies
2. Build project
3. Create `utero-nextjs-deploy.zip`
4. Siap upload ke cPanel!

### Method 2: Manual

1. Build project:
```bash
pnpm install
pnpm build
```

2. Zip files:
```
- .next/
- public/
- src/
- package.json
- pnpm-lock.yaml
- next.config.ts
- tsconfig.json
- server.js
- .env.production (optional)
```

3. Upload ke cPanel

## 📖 Full Documentation

Baca file berikut sesuai kebutuhan:

1. **CHECKLIST.md** - Checklist cepat, untuk yang sudah paham
2. **DEPLOYMENT.md** - Panduan detail lengkap dengan troubleshooting

## ⚙️ cPanel Requirements

Pastikan cPanel kamu punya:
- ✅ Feature "Setup Node.js App"
- ✅ Node.js version 18+ atau 20+
- ✅ Terminal/SSH access (recommended)
- ✅ Minimal 500MB disk space

## 🔑 Key Configuration

### Environment Variables (cPanel)
```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### Node.js App Settings (cPanel)
```
Application startup file: server.js
Application mode: Production
Node.js version: 20.x (or latest available)
```

## 🧪 Test Locally First

Sebelum upload, test dulu di local:

```bash
# Build
pnpm build

# Test dengan custom server
node server.js

# Buka browser
http://localhost:3000
```

Kalau jalan di local, pasti jalan di cPanel!

## 📊 After Deployment

Check halaman-halaman ini:
- Homepage: `/`
- Artikel list: `/artikel`
- Artikel detail: `/artikel/profil-utero-kreatif-indonesia`
- All sections scroll smoothly
- Images load correctly
- Mobile responsive

## 🔄 Update Process

Setelah deploy, kalau ada perubahan:

1. Build ulang: `pnpm build`
2. Upload cuma folder `.next/` (via FTP)
3. Restart: `touch tmp/restart.txt` di cPanel Terminal

Tidak perlu upload semua file lagi!

## 🆘 Troubleshooting

**App tidak start?**
→ Cek DEPLOYMENT.md bagian Troubleshooting

**Port conflict?**
→ cPanel auto-assign port, jangan hardcode

**Memory limit?**
→ Hubungi support hosting

**Images tidak muncul?**
→ Check folder `public/` ter-upload lengkap

## 📞 Support

- Dokumentasi lengkap: `DEPLOYMENT.md`
- Quick reference: `CHECKLIST.md`
- Next.js docs: https://nextjs.org/docs/deployment
- cPanel Node.js: Ask your hosting provider

## ✨ Features Included

✅ Full Next.js features (SSR, ISR, Image Optimization)
✅ Dynamic routes (`/artikel/[slug]`)
✅ Google Analytics tracking
✅ Framer Motion animations
✅ Optimized for production
✅ Security headers configured
✅ Browser caching enabled

---

**Good luck with deployment! 🎉**

Jika ada masalah, cek log error di cPanel → Node.js App → Open logs.
