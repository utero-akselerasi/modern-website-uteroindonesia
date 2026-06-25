# 📋 Todo List Pengembangan: Utero Indonesia Landing Page & Migration

Dokumen ini berisi daftar tugas (*checklist*) taktis pengembangan proyek dari penyiapan template HTML Nginx saat ini hingga migrasi penuh ke **Next.js 14+ & React** yang terintegrasi dengan domain utama **`uteroindonesia.com`**.

---

## 🟩 Tahap 1: Stabilisasi Template Saat Ini (On-Going)
Fokus pada optimalisasi server Nginx lokal dan integrasi Docker network.
- [x] Buat konfigurasi kontainerisasi Nginx ringan (`dokcer-compose.yml`).
- [x] Pisahkan konfigurasi custom server (`nginx.conf`) untuk optimasi Gzip dan routing.
- [x] Rapikan dan hubungkan container ke network internal `carubra-network`.
- [x] Pisahkan dokumen manajemen ke folder `docs/`.
- [ ] Lakukan uji coba akses port `3002` di server staging/produksi.
- [ ] Cek log container untuk memastikan tidak ada eror routing (`docker compose logs -f`).

---

## 🟨 Tahap 2: UI/UX Desain & Persiapan Aset Modern
Mempersiapkan visual modern dan aset media sebelum masuk ke tahap pengkodean Next.js.
- [ ] Desain ulang tata letak (gunakan konsep **Bento Grid** untuk bagian Portofolio & Keunggulan).
- [ ] Optimasi seluruh gambar: Konversi format `.jpg`/`.png` lama menjadi format modern **`.webp`** atau **`.svg`** untuk ikon.
- [ ] Buat paket ikon favicon lengkap:
  - [ ] `favicon.ico` (32x32px untuk browser warisan)
  - [ ] `icon.png` (192x192px PNG transparan)
  - [ ] `apple-icon.png` (180x180px untuk Apple Touch Icon)
  - [ ] `manifest.json` (untuk standardisasi PWA)
- [ ] Tentukan skema warna modern (Brand color Utero Indonesia dengan integrasi Dark Mode otomatis).

---

## 🟦 Tahap 3: Migrasi Frontend ke Next.js & React
Mengubah template HTML statis ribuan baris menjadi komponen modular.
- [ ] Inisialisasi proyek Next.js dengan perintah `npx create-next-app@latest` (TypeScript + Tailwind CSS + App Router).
- [ ] Integrasikan Google Fonts (seperti *Plus Jakarta Sans* atau *Inter*) lokal melalui `next/font`.
- [ ] Pecah file `index.html` menjadi komponen modular React:
  - [ ] `components/layout/Navbar.tsx` (sticky, efek glassmorphism blur)
  - [ ] `components/sections/Hero.tsx` (Headline & tombol CTA magnetik dengan Framer Motion)
  - [ ] `components/sections/About.tsx` (Visi Misi interaktif)
  - [ ] `components/sections/Services.tsx` (Grid interaktif dengan hover-card effect)
  - [ ] `components/sections/Portfolio.tsx` (Galeri portofolio dengan filter kategori instan)
  - [ ] `components/sections/Contact.tsx` (Formulir validasi Zod & integrasi peta)
  - [ ] `components/layout/Footer.tsx` (Informasi legalitas & link sosial media)
- [ ] Terapkan CSS modern adaptif:
  - [ ] Atur fluid typography menggunakan rumus `clamp()` CSS di Tailwind.
  - [ ] Pastikan touch-target berukuran minimal 48x48px untuk pengguna smartphone.
- [ ] Ganti seluruh tag `<img>` menjadi komponen `<Image />` Next.js (optimasi lazy-loading).
- [ ] Ganti semua tag `<a>` navigasi internal menjadi komponen `<Link>` Next.js.

---

## 🟥 Tahap 4: Optimasi SEO & Analitik Ekstrim
Memastikan website memiliki performa terbaik untuk merangkak naik ke halaman #1 Google.
- [ ] Konfigurasi Metadata statis & dinamis komprehensif di `src/app/layout.tsx`.
- [ ] Pasang JSON-LD Schema Markup (`ProfessionalService` atau `LocalBusiness`) untuk SEO lokal.
- [ ] Buat file sitemap dinamis (`src/app/sitemap.ts`) dan file `robots.txt` (`src/app/robots.txt`).
- [ ] Pasang & Konfigurasikan Google Analytics 4 (GA4) secara asinkron agar tidak membebani kecepatan loading halaman. Sesuai panduan integrasi di 👉 **[analytics-setup.md](./analytics-setup.md)**.
- [ ] Hubungkan domain ke Google Search Console (GSC) untuk memantau performa indeksasi.

---

## 🚀 Tahap 5: Integrasi & Pengalihan ke `uteroindonesia.com`
Menyambungkan sistem template ini ke domain utama *hub-and-spoke*.
- [ ] Hubungkan CTA (Call to Action) di template ke sistem redirect/routing milik `uteroindonesia.com` (seperti sub-layanan, form order, checkout).
- [ ] Atur domain reverse-proxy sehingga template dapat diakses melalui sub-path atau sub-domain tertentu dari `uteroindonesia.com`.

---

## ⚙️ Tahap 6: Deployment Produksi & CI/CD (DevOps)
Otomatisasi deployment dan manajemen container di server VPS.
- [ ] Buat file multi-stage `Dockerfile` khusus untuk Next.js production build agar file container sangat ringan.
- [ ] Perbarui `dokcer-compose.yml` untuk memetakan port Next.js (port `3000` internal ke port produksi luar server).
- [ ] Sambungkan container Next.js baru ke `carubra-network` agar terhubung ke SSL reverse-proxy utama.
- [ ] Setup CI/CD Auto-deploy via GitHub Actions ke VPS target.