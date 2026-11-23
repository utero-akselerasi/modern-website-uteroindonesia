# Deploy Docker — uteroindonesia.com

Port host `8081` meneruskan HTTP ke Nginx dalam container. Port `80` host sudah dipakai Nginx lain; konfigurasi ini tidak mengubah container/proxy yang sedang berjalan. PHP-FPM melayani `/api/articles.php` dan `/api/categories.php` tanpa mengekspos port ke host.

1. Salin `.env.example` ke `.env` lalu isi `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, dan `ARTIKEL_API_KEY` yang aktif di CMS Artikel (bukan `BLOG_API_KEY` Supabase). Kedua variabel `VITE_` menjadi bagian bundle publik saat build; jangan pakai service-role key. File lokal `artikel-api-config.php` tidak masuk image dan tidak diperlukan oleh Compose. Jika file konfigurasi lama ter-mount di deployment lain, `ARTIKEL_API_KEY` dari environment mengalahkan nilai `api_key` dalam file. Opsional: `ARTIKEL_API_URL` dan `ARTIKEL_API_CATEGORIES` (daftar slug dipisahkan koma).
2. Pastikan Docker Desktop aktif. Buat hanya jaringan yang belum ada:

   ```powershell
   foreach ($name in @('uteroindonesia-network', 'utero-id-network', 'carubra-network')) {
     if (-not (docker network ls --format '{{.Name}}' | Where-Object { $_ -eq $name })) { docker network create $name }
   }
   ```

3. Jalankan `./scripts/check-article-api.ps1` dari direktori ini. Jika CMS mengembalikan `INVALID_API_KEY`, perbarui/terbitkan kunci baca website melalui pengelolaan API key CMS Artikel, lalu isi `ARTIKEL_API_KEY` di `.env`. Jangan tempel kunci di source, browser, atau chat.
4. Jalankan `docker compose up -d --build` (setelah rotasi kunci pada container yang sudah hidup, `docker compose up -d --force-recreate uteroindonesia-php` agar environment baru diterapkan). Uji `http://localhost:8081/`, `http://localhost:8081/api/categories.php`, dan `http://localhost:8081/api/articles.php?category=tips&page=1&limit=1`. Periksa `docker compose ps` serta `docker compose logs` jika perlu.

Untuk akses publik `uteroindonesia.com`, arahkan DNS domain ke IP host dan atur **reverse proxy yang sudah menguasai port 80/443** agar meneruskan HTTP dan HTTPS untuk `uteroindonesia.com` (juga `www` jika dipakai) ke `http://HOST:8081`. Jika reverse proxy berupa container di `carubra-network`, lebih baik teruskan ke `http://uteroindonesia-web:80` tanpa melewati port host. Tambahkan sertifikat TLS pada reverse proxy tersebut. Konfigurasi Nginx di container ini hanya HTTP; domain publik dan HTTPS belum aktif sampai DNS, proxy, dan TLS diatur.

Jalankan `docker compose down` untuk menghentikan kedua service tanpa menghapus tiga jaringan eksternal.

`401 INVALID_API_KEY` pada `/api/articles.php` berasal dari CMS Artikel: kunci website tidak valid atau kedaluwarsa. Endpoint kategori tidak memakai kunci ini, sehingga dapat tetap berfungsi. `ERR_BLOCKED_BY_CLIENT` dari Google Maps atau aset lain berasal dari pemblokir di browser dan tidak terkait dengan autentikasi artikel.
