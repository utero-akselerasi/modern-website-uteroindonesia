# Deploy Docker — uteroindonesia.com

Port host `8081` meneruskan HTTP ke Nginx dalam container. Port `80` host sudah dipakai Nginx lain; konfigurasi ini tidak mengubah container/proxy yang sedang berjalan. PHP-FPM melayani `/api/articles.php` dan `/api/categories.php` tanpa mengekspos port ke host.

1. Salin `.env.example` ke `.env` lalu isi `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, dan `ARTIKEL_API_KEY` yang valid. Kedua variabel `VITE_` menjadi bagian bundle publik saat build; jangan pakai service-role key. File lokal `artikel-api-config.php` tidak masuk image dan tidak diperlukan oleh Compose. Opsional: `ARTIKEL_API_URL` dan `ARTIKEL_API_CATEGORIES` (daftar slug dipisahkan koma).
2. Pastikan Docker Desktop aktif. Buat hanya jaringan yang belum ada:

   ```powershell
   foreach ($name in @('uteroindonesia-network', 'utero-id-network', 'carubra-network')) {
     if (-not (docker network ls --format '{{.Name}}' | Where-Object { $_ -eq $name })) { docker network create $name }
   }
   ```

3. Dari direktori ini jalankan `docker compose up -d --build`. Uji `http://localhost:8081/` dan `http://localhost:8081/api/categories.php`. Periksa `docker compose ps` serta `docker compose logs` jika perlu.

Untuk akses publik `uteroindonesia.com`, arahkan DNS domain ke IP host dan atur **reverse proxy yang sudah menguasai port 80/443** agar meneruskan HTTP dan HTTPS untuk `uteroindonesia.com` (juga `www` jika dipakai) ke `http://HOST:8081`. Jika reverse proxy berupa container di `carubra-network`, lebih baik teruskan ke `http://uteroindonesia-web:80` tanpa melewati port host. Tambahkan sertifikat TLS pada reverse proxy tersebut. Konfigurasi Nginx di container ini hanya HTTP; domain publik dan HTTPS belum aktif sampai DNS, proxy, dan TLS diatur.

Jalankan `docker compose down` untuk menghentikan kedua service tanpa menghapus tiga jaringan eksternal.
