"# 📊 Panduan Integrasi Google Analytics 4 (GA4)

Dokumen ini berisi panduan teknis mengenai pemasangan, konfigurasi, dan pelacakan event (event tracking) menggunakan **Google Analytics 4 (GA4)** untuk landing page Utero Indonesia, baik pada template HTML saat ini maupun setelah migrasi ke Next.js & React.

---

## 1. Konfigurasi GA4 pada Template HTML Statis (Saat Ini)

Untuk template HTML statis, kode tracking diletakkan langsung di dalam tag `<head>` pada file `index.html`. 

### Langkah-langkah:
1. Masuk ke dashboard [Google Analytics](https://analytics.google.com/).
2. Buat properti GA4 baru untuk `uteroindonesia.com` dan salin **Measurement ID** Anda (format: `G-XXXXXXXXXX`).
3. Sisipkan skrip pelacak (Google Tag) berikut tepat di bawah tag `<head>` pembuka:

```html
<!-- Google Tag (gtag.js) -->
<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX\"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': true
  });
</script>
```
*Catatan: Ganti `G-XXXXXXXXXX` dengan Measurement ID riil milik Anda.*

---

## 2. Konfigurasi GA4 pada Next.js (Setelah Migrasi)

Pada Next.js (App Router), kita dapat menggunakan komponen bawaan `@next/third-parties/google` yang sangat optimal karena dimuat secara asinkron (*lazy-loading*) sehingga tidak mengurangi skor kecepatan Core Web Vitals Anda.

### Langkah-langkah:
1. **Instal dependensi:**
   ```bash
   npm install @next/third-parties
   ```

2. **Integrasikan pada `src/app/layout.tsx`:**
   ```tsx
   // src/app/layout.tsx
   import { GoogleAnalytics } from '@next/third-parties/google';

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang=\"id\">
         <body>
           {children}
           {/* Masukkan ID GA4 Anda di sini */}
           <GoogleAnalytics gaId=\"G-XXXXXXXXXX\" />
         </body>
       </html>
     );
   }
   ```

---

## 3. Pelacakan Event Konversi Khusus (CTA & Redirect ke `uteroindonesia.com`)

Karena landing page ini berfungsi sebagai **Template Konversi** yang mengarahkan pengguna ke situs utama `uteroindonesia.com` atau tombol WhatsApp, kita wajib melacak perilaku klik ini sebagai **Event Konversi Utama**.

### 3.1. Tracking Klik Tombol WhatsApp (Lead Conversion)
Gunakan kode JavaScript berikut untuk melacak ketika pengunjung mengklik tombol WhatsApp untuk konsultasi:

#### A. Pada HTML Statis:
Tambahkan atribut `onclick` pada tag `<a>` tombol WhatsApp:
```html
<a href=\"https://wa.me/62811XXXXXXXX\" 
   onclick=\"trackWhatsAppClick()\" 
   class=\"btn-whatsapp\">
   Hubungi Kami via WhatsApp
</a>

<script>
function trackWhatsAppClick() {
  gtag('event', 'generate_lead', {
    'event_category': 'Engagement',
    'event_label': 'WhatsApp Click - Landing Page Template',
    'value': 1.0
  });
}
</script>
```

#### B. Pada React/Next.js:
Gunakan fungsi `sendGAEvent` bawaan dari library `@next/third-parties/google`:
```tsx
'use client';

import { sendGAEvent } from '@next/third-parties/google';

export default function WhatsAppButton() {
  return (
    <button
      onClick={() => sendGAEvent({ event: 'generate_lead', value: 'whatsapp_click' })}
      className=\"btn-whatsapp\"
    >
      Hubungi Kami via WhatsApp
    </button>
  );
}
```

### 3.2. Tracking Pengalihan (Redirect) Trafik ke `uteroindonesia.com`
Untuk menganalisis berapa banyak pengunjung template yang berpindah ke website utama guna mengakses fitur yang lebih lengkap:

```javascript
// Mengirim event ketika tautan mengarah ke domain uteroindonesia.com diklik
gtag('event', 'click_hub_redirect', {
  'event_category': 'Navigation',
  'event_label': 'Redirect to Main Website uteroindonesia.com',
  'transport_type': 'beacon'
});
```

---

## 4. Pelacakan Lintas Domain (Cross-Domain Tracking)

Karena Anda menggunakan landing page template ini bersamaan dengan domain utama `uteroindonesia.com` (baik melalui sub-domain maupun domain yang berbeda), Anda perlu mengaktifkan **Cross-Domain Tracking** di admin GA4 agar perjalanan pengguna tidak terputus dan dianggap sebagai sesi baru.

1. Di Google Analytics, masuk ke **Admin** > **Data Streams** > pilih stream Anda.
2. Klik **Configure tag settings** > **Configure your domains**.
3. Tambahkan domain yang Anda gunakan:
   * Domain 1: Domain tempat template ini online (misal: `promo.uteroindonesia.com` atau ip server).
   * Domain 2: Domain utama (`uteroindonesia.com`).
4. Klik **Save**. GA4 akan secara otomatis mendeteksi link antar kedua website tersebut dan membagikan ID Sesi (*Client ID*) yang sama.
"