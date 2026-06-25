# Utero Indonesia - One Landing Page (Deployment & DevOps Documentation)

Dokumentasi ini berisi panduan teknis mengenai arsitektur, struktur proyek, dan cara menjalankan landing page **Utero Indonesia** menggunakan Docker, Docker Compose, dan Nginx.

---

## 📋 Daftar Isi
1. [Struktur Proyek](#1-struktur-proyek)
2. [Prasyarat Sistem](#2-prasyarat-sistem)
3. [Arsitektur & Konfigurasi](#3-arsitektur--konfigurasi)
   - [Docker Compose](#docker-compose)
   - [Nginx Configuration](#nginx-configuration)
4. [Langkah Deployment (Cara Menjalankan)](#4-langkah-deployment-cara-menjalankan)
5. [Manajemen Container](#5-manajemen-container)
6. [Optimalisasi Performa & Produksi](#6-optimalisasi-performa--produksi)

---

## 1. Struktur Proyek
Proyek ini dirancang agar sangat modular, ringan, dan mudah di-maintain. Kita memisahkan kode sumber HTML, konfigurasi web server (Nginx), dan orkestrasi container (Docker Compose).

```text
.
├── index.html          # File HTML utama landing page (ribuan baris kode)
├── nginx.conf          # Konfigurasi custom Nginx (Gzip, Routing, Caching)
├── dokcer-compose.yml  # File orkestrasi Docker Compose
├── PRD.md              # Product Requirement Document (Dokumen Produk)
└── README.md           # Dokumen Teknis & Deployment ini
```

---

## 2. Prasyarat Sistem
Sebelum menjalankan proyek ini di VPS atau server lokal, pastikan Anda telah menginstal tools berikut:
*   **Docker** (v20.10+)
*   **Docker Compose v2** (atau `docker-compose` v1.29+)
*   **External Network:** Network bernama `carubra-network` harus sudah dibuat di sistem Docker Anda.

Jika network belum ada, buat terlebih dahulu dengan perintah:
```bash
docker network create carubra-network
```

---

## 3. Arsitektur & Konfigurasi

### Docker Compose
Menggunakan image `nginx:alpine` yang sangat ringan (~5MB). File `index.html` dan `nginx.conf` di-mount dari host ke dalam container secara **Read-Only (`:ro`)** untuk keamanan maksimal.
*   **Port:** Container di-bind ke port host `3002`, memetakan ke port `80` di dalam container.
*   **Network:** Terhubung ke `carubra-network` untuk kemudahan reverse proxy (misalnya menggunakan Nginx Proxy Manager, Traefik, atau Cloudflare Tunnel).

### Nginx Configuration
Konfigurasi Nginx (`nginx.conf`) telah dioptimasi untuk website produksi dengan fitur:
*   **Gzip Compression:** Mengompresi file HTML/CSS/JS di atas 10KB sebelum dikirim ke browser untuk menghemat bandwidth server dan mempercepat loading time di browser client.
*   **Fallback Routing (`try_files`):** Mengarahkan router frontend agar selalu menyajikan `index.html` jika user mengakses sub-url, mencegah error 404 (sangat ramah SPA/landing page modern).

---

## 4. Langkah Deployment (Cara Menjalankan)

Ikuti langkah-langkah di bawah ini untuk meng-online-kan landing page:

1.  **Clone / Salin berkas proyek** ke VPS Anda (misal di folder `/var/www/utero-landing-page`).
2.  **Pastikan external network tersedia:**
    ```bash
    docker network ls | grep carubra-network
    ```
    *Jika belum ada, buat dengan `docker network create carubra-network`.*
3.  **Jalankan Docker Compose di background (detached mode):**
    ```bash
    docker compose -f dokcer-compose.yml up -d
    ```
4.  **Verifikasi container berjalan dengan sukses:**
    ```bash
    docker compose -f dokcer-compose.yml ps
    ```
    *Aplikasi sekarang aktif di `http://<IP-Server>:3002`.*

---

## 5. Manajemen Container

Berikut adalah kumpulan perintah penting untuk mengelola container landing page ini:

*   **Melihat Log Container (Realtime):**
    ```bash
    docker compose -f dokcer-compose.yml logs -f
    ```
*   **Menghentikan Website (Stop):**
    ```bash
    docker compose -f dokcer-compose.yml down
    ```
*   **Merestart / Memuat Ulang Konfigurasi Nginx setelah update HTML/Config:**
    ```bash
    # Cara 1: Restart container secara penuh
    docker compose -f dokcer-compose.yml restart web

    # Cara 2: Reload Nginx tanpa downtime (Sangat Direkomendasikan untuk Produksi!)
    docker exec -it nginx-dev-uteroindonesia nginx -s reload
    ```

---

## 6. Optimalisasi Performa & Produksi

Untuk meningkatkan performa landing page ini saat live:
1.  **SSL/TLS (HTTPS):** Sangat disarankan untuk mengarahkan reverse proxy Anda (seperti Cloudflare atau Nginx Proxy Manager yang terhubung ke `carubra-network`) agar meng-handle sertifikat SSL (Let's Encrypt).
2.  **Minifikasi Aset:** Pastikan file `index.html` Anda telah diminifikasi (menghapus spasi dan komentar yang tidak perlu) sebelum dipublikasikan untuk mengurangi ukuran file.
3.  **Image Compression:** Gunakan format gambar modern seperti `.webp` atau `.avif` daripada `.png` atau `.jpg` biasa untuk performa loading secepat kilat.