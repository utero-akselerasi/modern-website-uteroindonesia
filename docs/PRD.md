"# Product Requirement Document (PRD) & Roadmap

## 1. Project Overview & Vision
*   **Project Name:** Utero Indonesia - Core Template & Landing Page
*   **Target Domain:** `uteroindonesia.com` (Main Website Hub)
*   **Template Concept:** Halaman ini bertindak sebagai **Landing Page Template berkecepatan tinggi**. Berfungsi sebagai etalase konversi utama, sedangkan fitur-fitur kompleks, sistem dinamis, dan portal utama diletakkan di dalam domain utama `uteroindonesia.com`.
*   **Version:** 1.1.0
*   **Status:** Active Development / Migration Planning
*   **Owner / Tech Lead:** DevOps & Web Development Team

### 1.1. Background & Context
Utero Indonesia membutuhkan landing page modular yang bertindak sebagai gerbang konversi. Halaman ini dirancang menggunakan arsitektur modern agar dapat digunakan kembali (*reusable template*) untuk sub-layanan, kampanye iklan, atau microsite. Seluruh aliran data prospek (leads) dan navigasi tingkat lanjut akan bermuara pada situs utama **`uteroindonesia.com`**.

### 1.2. Objectives
1.  **Sinergi Sistem Hub-and-Spoke:** Landing page ini menjadi corong (*spoke*) penarik trafik iklan/organik yang secara dinamis mengalirkan audiens ke situs utama `uteroindonesia.com` (*hub*) untuk fitur lengkap.
2.  **Modern UI/UX & High-End CSS:** Implementasi desain modern berbasis bento-grid, neomorphism halus, transisi mulus, dan *Dark/Light mode* adaptif.
3.  **SEO Nomor Satu di Google:** Optimasi meta tag komprehensif, Schema markup (JSON-LD), kecepatan Core Web Vitals (skor 100), dan optimasi sitemap.
4.  **Skalabilitas React & Next.js:** Migrasi terstruktur dari HTML statis ke Next.js App Router demi modularitas kode.

---

## 2. Target Audience & Personas
*   **Calon Klien B2B (Corporate):** Perusahaan yang mencari vendor branding profesional, event organizer, atau cetak skala besar. Menuntut interface yang rapi, profesional, cepat dimuat, dan portofolio yang interaktif.
*   **Calon Klien B2C (UKM/Individu):** Pengusaha lokal yang membutuhkan jasa desain logo cepat dan cetak kemasan produk. Membutuhkan navigasi intuitif pada perangkat mobile (85%+ trafik).

---

## 3. Fitur Utama & Integrasi ke `uteroindonesia.com`

Untuk menjaga landing page tetap ringan, fitur dinamis akan dikembangkan dan diarahkan langsung ke domain utama `uteroindonesia.com`:

| Fitur di Landing Page (Template) | Fitur Lanjutan di `uteroindonesia.com` (Main Website) |
| :--- | :--- |
| **Ringkasan Portofolio (Grid)** | Galeri Portofolio Lengkap + Fitur Filter Kategori & Studi Kasus Klien |
| **Formulir Kontak Cepat** | Sistem Tiket Layanan, Dashboard Klien, & Live Chat Interaktif |
| **Kalkulator Harga Estimasi** | Checkout Pemesanan, Sistem Invoice, & Integrasi Payment Gateway |
| **Review Singkat Pelanggan** | Halaman Testimoni Lengkap & Studi Dampak Branding (*Client Success Story*) |
| **Daftar Layanan Utama** | Halaman Detail Spesifikasi Layanan, Dokumen Pendukung, & FAQ Interaktif |

---

## 4. Standar UI/UX & CSS Modern (Cross-Device)

Desain harus merepresentasikan identitas Utero Indonesia sebagai *creative agency* papan atas dengan standar berikut:

### 4.1. Responsive Design & Fluid Typography
*   **Mobile First:** Desain dioptimasi untuk layar terkecil smartphone (320px) hingga layar lebar ultra-wide (4K).
*   **Fluid Typography:** Menggunakan ukuran font CSS berbasis clamp (misal: `font-size: clamp(2rem, 5vw, 4rem)`) agar teks membesar/mengecil secara dinamis tanpa patah breakpoint.
*   **Touch-Target Size:** Seluruh tombol navigasi mobile minimal berukuran 48x48px untuk kenyamanan sentuhan jari.

### 4.2. Efek Visual & Interaksi Modern
*   **Micro-interactions:** Animasi hover interaktif pada tombol, efek kartu mengangkat (hover-up), dan animasi magnetik pada tombol CTA.
*   **Glassmorphism & Bento Grid:** Menggunakan layout bento-grid untuk menampilkan portofolio dan efek kaca semi transparan (`backdrop-filter: blur()`) pada header navigasi.
*   **Framer Motion (Next.js):** Efek transisi antar section menggunakan scroll-triggered animations (fade-in, slide-up) yang halus tanpa merusak performa *frame-rate* (60fps).

---

## 5. Strategi SEO & Metadata Ekstrim (Target Peringkat #1 Google)

Agar website berada di halaman pertama Google, implementasi SEO teknis wajib mencakup:

### 5.1. Meta Tags & Open Graph (OG)
Setiap halaman template wajib mengimplementasikan struktur meta tag lengkap untuk mesin pencari dan media sosial:
```html
<!-- SEO Utama -->
<title>Utero Indonesia | Creative Branding & Event Specialist Malang</title>
<meta name="description" content="Jasa branding logo kreatif, cetak profesional, dan event organizer terpercaya di Indonesia. Solusi satu pintu untuk bisnis Anda berkembang bersama Utero Indonesia.">
<meta name="keywords" content="utero indonesia, creative agency malang, branding logo, cetak kemasan, event organizer malang, digital marketing">
<link rel="canonical" href="https://uteroindonesia.com">

<!-- Open Graph (Facebook / LinkedIn) -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://uteroindonesia.com">
<meta property="og:title" content="Utero Indonesia | Creative Branding & Event Specialist">
<meta property="og:description" content="Tingkatkan nilai brand bisnis Anda bersama para ahli kreatif di Utero Indonesia.">
<meta property="og:image" content="https://uteroindonesia.com/images/og-main.jpg">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://uteroindonesia.com">
<meta name="twitter:title" content="Utero Indonesia | Creative Branding & Event Specialist">
<meta name="twitter:description" content="Solusi satu pintu pengembangan brand bisnis Anda bersama Utero Indonesia.">
<meta name="twitter:image" content="https://uteroindonesia.com/images/og-main.jpg">
```

### 5.2. Aset SEO (Favicon & Icons)
Menggunakan standar resolusi favicon modern di folder `/public`:
*   `favicon.ico`: 32x32 piksel untuk browser lama.
*   `icon.png` (PNG): 192x192 piksel untuk browser modern.
*   `apple-icon.png`: 180x180 piksel khusus perangkat iOS (Apple Touch Icon).
*   `manifest.json`: Web app manifest untuk optimasi PWA (Progressive Web App).

### 5.3. Schema Markup (JSON-LD)
Menambahkan structured data di dalam `<head>` agar Google menampilkan cuplikan kaya (*rich snippets*) di hasil pencarian:
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Utero Indonesia",
  "image": "https://uteroindonesia.com/images/logo.png",
  "@id": "https://uteroindonesia.com",
  "url": "https://uteroindonesia.com",
  "telephone": "+62-811-XXXX-XXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Basuki Rahmat No. XX",
    "addressLocality": "Malang",
    "addressRegion": "Jawa Timur",
    "postalCode": "65111",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -7.9826,
    "longitude": 112.6308
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.instagram.com/uteroindonesia",
    "https://www.facebook.com/uteroindonesia"
  ]
}
```

---

## 6. TODO List & Roadmap Detail
Daftar tugas pengerjaan (*development checklist*) yang terperinci secara taktis dari Fase 1 hingga Fase 6 telah dipisahkan agar lebih mudah dilacak. Silakan merujuk ke dokumen terpisah:
👉 **[TODO.md](./TODO.md)**"