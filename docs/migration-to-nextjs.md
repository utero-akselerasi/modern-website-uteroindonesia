# Blueprint Migrasi: HTML Statis ke Next.js & React

Dokumen ini menjelaskan strategi teknis, arsitektur, dan langkah-langkah detail untuk memigrasikan landing page **Utero Indonesia** dari satu file `index.html` statis menjadi aplikasi web modern menggunakan **Next.js 14+ (App Router)** dan **React**.

---

## 1. Mengapa Migrasi ke Next.js?

| Fitur | HTML Statis Saat Ini | Next.js (React) |
| :--- | :--- | :--- |
| **Struktur Kode** | Monolitik (1 file, ribuan baris, sulit di-maintain) | Berbasis Komponen (Modular, Reusable, Bersih) |
| **Performa & SEO** | Baik, namun aset tidak teroptimasi otomatis | **Server-Side Rendering (SSR)** / **Static Site Generation (SSG)** & Optimasi Gambar otomatis |
| **Skalabilitas** | Sulit ditambah fitur baru (seperti blog/dashboard) | Sangat mudah dikembangkan menjadi web multi-halaman |
| **Manajemen State** | Menggunakan Vanilla JS manual | React State / Context API untuk interaksi dinamis |
| **Styling** | CSS inline/eksternal besar | Tailwind CSS terintegrasi (menghapus CSS tidak terpakai secara otomatis) |

---

## 2. Arsitektur Proyek Next.js Baru

Struktur direktori Next.js yang disarankan untuk proyek ini:

```text
utero-nextjs/
├── public/                  # Aset statis (Logo, Ilustrasi, Favicon)
│   └── images/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout (Header, Footer, Meta Tag global)
│   │   ├── page.tsx         # Halaman utama landing page (gabungan komponen)
│   │   └── globals.css      # Tailwind & Global Styles
│   ├── components/          # Komponen React yang reusable (Atomic Design)
│   │   ├── ui/              # Komponen kecil (Button, Input, Card)
│   │   │   └── button.tsx
│   │   └── sections/        # Section utama landing page
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Services.tsx
│   │       ├── Portfolio.tsx
│   │       └── Contact.tsx
│   ├── hooks/               # Custom React hooks (jika diperlukan)
│   └── utils/               # Helper functions
├── tailwind.config.ts       # Konfigurasi Tailwind CSS
├── next.config.mjs          # Konfigurasi Next.js (Optimasi Image, Domain, dll)
├── package.json             # Dependensi Proyek
└── tsconfig.json            # Konfigurasi TypeScript
```

---

## 3. Strategi Pemecahan Komponen (Component Breakdown)

File `index.html` Anda yang memiliki ribuan baris akan dipecah menjadi bagian-bagian modular:

1.  **Layout Level:**
    *   `Navbar.tsx`: Navigasi melayang (sticky) yang responsif dengan mobile menu toggle.
    *   `Footer.tsx`: Informasi hak cipta, sosial media, dan link cepat.
2.  **Section Level (dimuat di `src/app/page.tsx`):**
    *   `Hero.tsx`: Headline utama, subheadline, tombol CTA, dan gambar/video latar belakang.
    *   `About.tsx`: Sejarah singkat, visi, dan misi Utero Indonesia.
    *   `Services.tsx`: Grid berisi kartu-kartu layanan (Branding, Cetak, Event, dll).
    *   `Portfolio.tsx`: Galeri interaktif dengan fitur filter kategori.
    *   `Contact.tsx`: Formulir kontak interaktif dan peta lokasi (Google Maps API / Leaflet).

---

## 4. Langkah-Langkah Migrasi (Step-by-Step)

### Tahap 1: Inisialisasi Proyek
1.  Membuat proyek Next.js dengan TypeScript & Tailwind:
    ```bash
    npx create-next-app@latest utero-nextjs --typescript --tailwind --eslint
    ```
2.  Pilih opsi berikut saat instalasi:
    *   *Would you like to use src/ directory?* **Yes**
    *   *Would you like to use App Router?* **Yes**
    *   *Would you like to customize the default import alias (@/*)?* **Yes**

### Tahap 2: Migrasi Aset
1.  Pindahkan semua gambar dan ikon dari folder HTML lama ke direktori `public/images/`.
2.  Konversikan gambar format lama (`.jpg` / `.png`) ke format modern (`.webp`) untuk menghemat ukuran transfer data.

### Tahap 3: Pembuatan Layout & Meta Tag SEO
1.  Salin metadata, Google Fonts, dan stylesheet global ke `src/app/layout.tsx`.
2.  Gunakan fitur metadata Next.js untuk optimasi SEO yang dinamis:
    ```typescript
    export const metadata: Metadata = {
      title: 'Utero Indonesia | Creative Agency & Branding',
      description: 'Solusi branding kreatif terbaik di Indonesia.',
      openGraph: {
        images: ['/images/og-image.jpg'],
      },
    };
    ```

### Tahap 4: Modularisasi Elemen HTML ke React
1.  Pindahkan bagian per-section dari `index.html` ke masing-masing file di folder `src/components/sections/`.
2.  Ganti tag `<img>` biasa menjadi `<Image />` bawaan Next.js untuk optimasi otomatis (Lazy loading & Responsive sizes).
3.  Ganti atribut HTML `class` menjadi `className` di React.
4.  Ganti tag tautan `<a>` internal menjadi `<Link>` dari Next.js.

### Tahap 5: Integrasi Interaktivitas
1.  Tambahkan fungsi dinamis seperti form kontak menggunakan React State (`useState`) atau library form modern seperti **React Hook Form + Zod** untuk validasi data sebelum dikirim.
2.  Tambahkan animasi halus menggunakan **Framer Motion** untuk menggantikan library JS lama yang berat.

---

## 5. Deployment Baru Setelah Migrasi

Setelah menjadi aplikasi Next.js, ada dua opsi deployment:

### Opsi A: Deployment Serverless (Sangat Direkomendasikan)
Deploy ke platform cloud seperti **Vercel** atau **Netlify**. 
*   **Kelebihan:** Nol manajemen server, CDN otomatis global, setup SSL otomatis, biaya gratis untuk trafik menengah.

### Opsi B: Docker Multi-stage Build (Tetap di Server Sendiri)
Jika tetap ingin menggunakan server sendiri (`carubra-network`): We will create a `Dockerfile` with multi-stage build to compile nextjs app into a very small node environment.

```dockerfile
# Dockerfile untuk Next.js Production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

dan `dokcer-compose.yml` disesuaikan untuk mengarah ke aplikasi Next.js port `3000` di dalam container.