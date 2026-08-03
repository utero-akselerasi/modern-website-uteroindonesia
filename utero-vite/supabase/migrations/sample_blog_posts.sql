-- Sample Data Insert untuk Blog Auto-Post System
-- Schema: utero-artikel
-- Website: uteroindonesia.com
-- Created: 2026-08-04

-- ============================================================================
-- SAMPLE ARTIKEL 1: Panduan Kesehatan Ibu Hamil
-- ============================================================================

INSERT INTO "utero-artikel"."blog_posts" (
  "id", 
  "title", 
  "excerpt", 
  "content", 
  "author", 
  "category", 
  "cover_url", 
  "published", 
  "published_at", 
  "sort_order", 
  "created_at", 
  "updated_at", 
  "slug", 
  "meta_description"
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'Panduan Lengkap Kesehatan Ibu Hamil Trimester Pertama',
  'Panduan lengkap untuk menjaga kesehatan ibu hamil di trimester pertama, termasuk nutrisi penting, olahraga ringan, dan pemeriksaan rutin yang harus dilakukan.',
  '<h2>Pendahuluan: Menyambut Kehamilan dengan Persiapan Matang</h2>
<p>Trimester pertama kehamilan adalah fase yang sangat krusial dalam perkembangan janin. Pada periode ini, organ-organ vital bayi mulai terbentuk, sehingga kesehatan ibu sangat berpengaruh terhadap perkembangan janin. Artikel ini akan membahas secara lengkap panduan kesehatan untuk ibu hamil di trimester pertama.</p>

<h2>Nutrisi Penting untuk Ibu Hamil</h2>
<p>Asupan nutrisi yang tepat sangat penting untuk mendukung pertumbuhan janin. Berikut adalah nutrisi-nutrisi kunci yang harus dipenuhi:</p>
<ul>
    <li><strong>Asam Folat:</strong> Sangat penting untuk mencegah cacat tabung saraf pada janin. Konsumsi minimal 400 mcg per hari.</li>
    <li><strong>Zat Besi:</strong> Membantu pembentukan sel darah merah dan mencegah anemia pada ibu hamil.</li>
    <li><strong>Kalsium:</strong> Penting untuk pembentukan tulang dan gigi bayi.</li>
    <li><strong>Protein:</strong> Membantu pertumbuhan sel dan jaringan janin.</li>
    <li><strong>DHA dan Omega-3:</strong> Mendukung perkembangan otak dan mata janin.</li>
</ul>

<h2>Makanan yang Dianjurkan</h2>
<p>Berikut adalah daftar makanan sehat yang direkomendasikan untuk ibu hamil:</p>
<ul>
    <li>Sayuran hijau seperti bayam, brokoli, dan kangkung</li>
    <li>Buah-buahan segar seperti jeruk, alpukat, dan pisang</li>
    <li>Protein hewani seperti ikan salmon, telur, dan daging ayam tanpa lemak</li>
    <li>Kacang-kacangan dan biji-bijian</li>
    <li>Susu dan produk olahan susu rendah lemak</li>
</ul>

<h2>Makanan yang Harus Dihindari</h2>
<p>Beberapa makanan dapat membahayakan kesehatan ibu dan janin, antara lain:</p>
<ul>
    <li>Daging dan telur mentah atau setengah matang</li>
    <li>Ikan yang mengandung merkuri tinggi seperti tuna besar dan hiu</li>
    <li>Susu dan keju yang tidak dipasteurisasi</li>
    <li>Alkohol dan kafein berlebihan</li>
    <li>Makanan cepat saji dan makanan olahan tinggi garam</li>
</ul>

<h2>Olahraga Ringan yang Aman</h2>
<p>Olahraga ringan sangat dianjurkan untuk menjaga kebugaran ibu hamil. Beberapa aktivitas yang aman dilakukan:</p>
<ul>
    <li><strong>Jalan kaki:</strong> 30 menit setiap hari dapat meningkatkan sirkulasi darah.</li>
    <li><strong>Senam hamil:</strong> Membantu memperkuat otot panggul dan mengurangi nyeri punggung.</li>
    <li><strong>Yoga prenatal:</strong> Meningkatkan fleksibilitas dan mengurangi stres.</li>
    <li><strong>Berenang:</strong> Olahraga yang minim risiko cedera dan menyegarkan.</li>
</ul>

<h2>Pemeriksaan Rutin yang Penting</h2>
<p>Pemeriksaan rutin ke dokter kandungan sangat penting untuk memantau kesehatan ibu dan janin:</p>
<ul>
    <li><strong>Minggu ke-6 hingga ke-8:</strong> Pemeriksaan pertama, konfirmasi kehamilan melalui USG.</li>
    <li><strong>Minggu ke-10 hingga ke-12:</strong> Pemeriksaan darah lengkap dan skrining genetik.</li>
    <li><strong>Setiap bulan:</strong> Pemeriksaan tekanan darah, berat badan, dan detak jantung janin.</li>
</ul>

<h2>Mengatasi Keluhan Umum Trimester Pertama</h2>
<p>Beberapa keluhan yang sering dialami ibu hamil di trimester pertama:</p>
<ul>
    <li><strong>Morning sickness:</strong> Makan dalam porsi kecil tapi sering, hindari makanan berminyak.</li>
    <li><strong>Kelelahan:</strong> Istirahat cukup, tidur 7-8 jam per malam.</li>
    <li><strong>Sering buang air kecil:</strong> Normal akibat perubahan hormon, jangan kurangi asupan air.</li>
    <li><strong>Perubahan mood:</strong> Komunikasi dengan pasangan dan keluarga sangat penting.</li>
</ul>

<h2>Kesimpulan</h2>
<p>Trimester pertama adalah fondasi penting dalam kehamilan. Dengan menjaga nutrisi, olahraga teratur, dan pemeriksaan rutin, ibu dapat memastikan kesehatan optimal untuk diri sendiri dan janin. Konsultasikan selalu dengan dokter kandungan untuk mendapatkan saran yang sesuai dengan kondisi kesehatan Anda.</p>',
  'Dr. Rina Susanti, SpOG',
  'Kesehatan',
  'https://supabase.carubra.com/storage/v1/object/public/blog-covers/panduan-kesehatan-ibu-hamil-trimester-pertama.png',
  true,
  '2026-08-04 03:30:00.000+00',
  0,
  '2026-08-04 03:30:00.123456+00',
  '2026-08-04 03:30:00.123456+00',
  'panduan-kesehatan-ibu-hamil-trimester-pertama',
  'Panduan lengkap kesehatan ibu hamil di trimester pertama: nutrisi penting, olahraga aman, pemeriksaan rutin, dan tips mengatasi keluhan umum kehamilan awal.'
);

-- ============================================================================
-- SAMPLE ARTIKEL 2: Tips Memilih Bidan Profesional
-- ============================================================================

INSERT INTO "utero-artikel"."blog_posts" (
  "id", 
  "title", 
  "excerpt", 
  "content", 
  "author", 
  "category", 
  "cover_url", 
  "published", 
  "published_at", 
  "sort_order", 
  "created_at", 
  "updated_at", 
  "slug", 
  "meta_description"
) VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  '10 Tips Memilih Bidan Profesional untuk Persalinan Anda',
  'Memilih bidan yang tepat adalah keputusan penting untuk persalinan yang aman dan nyaman. Berikut 10 tips memilih bidan profesional yang berpengalaman.',
  '<h2>Pendahuluan: Pentingnya Memilih Bidan yang Tepat</h2>
<p>Proses persalinan adalah momen paling penting dalam kehidupan seorang ibu. Memilih bidan yang profesional dan berpengalaman akan memberikan rasa aman dan nyaman selama proses persalinan. Artikel ini akan membahas 10 tips penting dalam memilih bidan yang tepat untuk Anda.</p>

<h2>1. Periksa Sertifikasi dan Lisensi</h2>
<p>Pastikan bidan yang Anda pilih memiliki sertifikasi resmi dari organisasi profesi dan lisensi praktik yang masih berlaku. Di Indonesia, bidan harus terdaftar di Ikatan Bidan Indonesia (IBI) dan memiliki Surat Tanda Registrasi (STR) yang aktif.</p>

<h2>2. Cek Pengalaman dan Spesialisasi</h2>
<p>Tanyakan berapa lama bidan tersebut telah berpraktik dan berapa banyak persalinan yang telah ditangani. Bidan dengan pengalaman minimal 5 tahun biasanya sudah sangat terlatih dalam menangani berbagai situasi persalinan.</p>

<h2>3. Lokasi dan Aksesibilitas</h2>
<p>Pilih bidan yang praktiknya dekat dengan rumah Anda atau mudah dijangkau. Ini sangat penting terutama saat persalinan darurat. Pastikan juga bidan tersebut tersedia 24 jam atau memiliki sistem on-call yang jelas.</p>

<h2>4. Fasilitas Praktik yang Memadai</h2>
<p>Kunjungi tempat praktik bidan dan periksa fasilitas yang tersedia:</p>
<ul>
    <li>Ruang persalinan yang bersih dan steril</li>
    <li>Peralatan medis lengkap dan modern</li>
    <li>Ruang tunggu yang nyaman untuk keluarga</li>
    <li>Fasilitas toilet dan kamar mandi yang bersih</li>
</ul>

<h2>5. Komunikasi yang Baik</h2>
<p>Bidan yang baik harus bisa menjelaskan proses persalinan dengan jelas, menjawab semua pertanyaan Anda, dan membuat Anda merasa nyaman. Komunikasi yang efektif sangat penting untuk membangun kepercayaan.</p>

<h2>6. Prosedur Darurat dan Rujukan</h2>
<p>Tanyakan bagaimana prosedur jika terjadi komplikasi atau keadaan darurat. Pastikan bidan memiliki kerjasama dengan rumah sakit terdekat dan dokter spesialis kandungan untuk rujukan cepat jika diperlukan.</p>

<h2>7. Biaya Jasa yang Transparan</h2>
<p>Minta rincian biaya secara lengkap sejak awal, termasuk:</p>
<ul>
    <li>Biaya pemeriksaan kehamilan</li>
    <li>Biaya persalinan normal</li>
    <li>Biaya perawatan pasca persalinan</li>
    <li>Biaya tambahan jika ada komplikasi</li>
</ul>

<h2>8. Testimoni dan Rekomendasi</h2>
<p>Cari tahu testimoni dari pasien sebelumnya. Anda bisa bertanya kepada teman, keluarga, atau mencari ulasan online. Rekomendasi dari orang yang pernah menggunakan jasa bidan tersebut sangat berharga.</p>

<h2>9. Filosofi dan Pendekatan Persalinan</h2>
<p>Setiap bidan mungkin memiliki pendekatan berbeda. Ada yang lebih fokus pada persalinan alami, ada yang lebih medis. Pilih bidan yang filosofinya sesuai dengan keinginan Anda untuk proses persalinan.</p>

<h2>10. Ketersediaan Layanan Pasca Persalinan</h2>
<p>Bidan yang baik tidak hanya membantu saat persalinan, tapi juga memberikan layanan pasca persalinan seperti:</p>
<ul>
    <li>Perawatan luka jahitan</li>
    <li>Konsultasi menyusui</li>
    <li>Pemeriksaan kesehatan bayi</li>
    <li>Konseling KB dan kesehatan reproduksi</li>
</ul>

<h2>Kesimpulan</h2>
<p>Memilih bidan yang tepat membutuhkan riset dan pertimbangan matang. Jangan ragu untuk bertemu dengan beberapa bidan sebelum membuat keputusan final. Yang terpenting adalah Anda merasa nyaman dan percaya dengan bidan pilihan Anda. Keputusan ini akan sangat mempengaruhi pengalaman persalinan Anda.</p>',
  'Tim Utero Indonesia',
  'Tips',
  'https://supabase.carubra.com/storage/v1/object/public/blog-covers/tips-memilih-bidan-profesional.png',
  true,
  '2026-08-04 04:00:00.000+00',
  0,
  '2026-08-04 04:00:00.123456+00',
  '2026-08-04 04:00:00.123456+00',
  'tips-memilih-bidan-profesional',
  '10 tips praktis memilih bidan profesional untuk persalinan aman dan nyaman: sertifikasi, pengalaman, fasilitas, biaya, dan layanan pasca persalinan.'
);

-- ============================================================================
-- SAMPLE ARTIKEL 3: Pentingnya USG Kehamilan
-- ============================================================================

INSERT INTO "utero-artikel"."blog_posts" (
  "id", 
  "title", 
  "excerpt", 
  "content", 
  "author", 
  "category", 
  "cover_url", 
  "published", 
  "published_at", 
  "sort_order", 
  "created_at", 
  "updated_at", 
  "slug", 
  "meta_description"
) VALUES (
  '550e8400-e29b-41d4-a716-446655440003',
  'Pentingnya Pemeriksaan USG Kehamilan untuk Ibu dan Janin',
  'USG kehamilan adalah pemeriksaan penting untuk memantau perkembangan janin. Ketahui jadwal, manfaat, dan jenis-jenis pemeriksaan USG selama kehamilan.',
  '<h2>Apa Itu Pemeriksaan USG Kehamilan?</h2>
<p>USG (Ultrasonografi) adalah teknologi medis yang menggunakan gelombang suara berfrekuensi tinggi untuk menghasilkan gambar janin di dalam rahim. Pemeriksaan ini tidak menggunakan radiasi sehingga aman untuk ibu dan bayi. USG menjadi salah satu pemeriksaan standar yang sangat penting selama kehamilan.</p>

<h2>Manfaat Pemeriksaan USG</h2>
<p>Pemeriksaan USG memberikan banyak manfaat penting:</p>
<ul>
    <li><strong>Konfirmasi kehamilan:</strong> Memastikan kehamilan dan lokasi kantung janin (di dalam atau di luar rahim).</li>
    <li><strong>Menentukan usia kehamilan:</strong> Menghitung perkiraan tanggal persalinan dengan akurat.</li>
    <li><strong>Memantau pertumbuhan janin:</strong> Mengukur ukuran kepala, panjang tulang paha, dan berat badan janin.</li>
    <li><strong>Mendeteksi kelainan:</strong> Mendeteksi dini kelainan struktural atau cacat bawaan pada janin.</li>
    <li><strong>Memeriksa plasenta:</strong> Memastikan posisi plasenta tidak menghalangi jalan lahir.</li>
    <li><strong>Mengetahui jenis kelamin:</strong> Biasanya bisa diketahui mulai usia kehamilan 18-20 minggu.</li>
</ul>

<h2>Jadwal USG Selama Kehamilan</h2>
<p>Berikut adalah jadwal pemeriksaan USG yang direkomendasikan:</p>

<h3>Trimester Pertama (Minggu 1-12)</h3>
<ul>
    <li><strong>USG Awal (6-8 minggu):</strong> Konfirmasi kehamilan dan detak jantung janin.</li>
    <li><strong>USG 11-14 minggu:</strong> Skrining kelainan kromosom dan pengukuran NT (Nuchal Translucency).</li>
</ul>

<h3>Trimester Kedua (Minggu 13-26)</h3>
<ul>
    <li><strong>USG 18-22 minggu (Anatomy Scan):</strong> Pemeriksaan detail anatomi janin, organ dalam, dan jenis kelamin.</li>
</ul>

<h3>Trimester Ketiga (Minggu 27-40)</h3>
<ul>
    <li><strong>USG 32-36 minggu:</strong> Memantau pertumbuhan janin, posisi bayi, dan jumlah air ketuban.</li>
    <li><strong>USG menjelang persalinan:</strong> Mengecek posisi bayi (kepala di bawah atau sungsang).</li>
</ul>

<h2>Jenis-Jenis USG Kehamilan</h2>

<h3>1. USG 2D (Dua Dimensi)</h3>
<p>USG standar yang menghasilkan gambar datar hitam putih. Ini adalah jenis USG paling umum dan cukup untuk pemeriksaan rutin.</p>

<h3>2. USG 3D (Tiga Dimensi)</h3>
<p>Menghasilkan gambar tiga dimensi yang lebih detail, sehingga wajah dan tubuh janin terlihat lebih jelas. Berguna untuk mendeteksi kelainan struktural seperti bibir sumbing.</p>

<h3>3. USG 4D</h3>
<p>Sama dengan USG 3D tetapi dalam format video bergerak, sehingga Anda bisa melihat gerakan janin secara real-time.</p>

<h3>4. USG Doppler</h3>
<p>Digunakan untuk mengukur aliran darah di tali pusat dan plasenta, penting untuk memastikan janin mendapat nutrisi dan oksigen yang cukup.</p>

<h2>Apakah USG Aman?</h2>
<p>Ya, pemeriksaan USG sangat aman karena tidak menggunakan radiasi. Berbagai penelitian medis telah membuktikan bahwa USG tidak menimbulkan efek samping pada ibu maupun janin. Gelombang suara yang digunakan frekuensinya terlalu tinggi untuk didengar manusia dan tidak merusak jaringan tubuh.</p>

<h2>Persiapan Sebelum USG</h2>
<p>Beberapa tips persiapan sebelum pemeriksaan USG:</p>
<ul>
    <li>Minum air putih 2-3 gelas sebelum USG trimester pertama (kandung kemih penuh membantu visualisasi).</li>
    <li>Kenakan pakaian yang nyaman dan mudah dibuka.</li>
    <li>Tidak perlu puasa atau diet khusus.</li>
    <li>Bawa hasil USG sebelumnya untuk perbandingan.</li>
</ul>

<h2>Biaya Pemeriksaan USG</h2>
<p>Biaya USG bervariasi tergantung jenis dan lokasi:</p>
<ul>
    <li><strong>USG 2D:</strong> Rp 100.000 - Rp 300.000</li>
    <li><strong>USG 3D:</strong> Rp 300.000 - Rp 600.000</li>
    <li><strong>USG 4D:</strong> Rp 500.000 - Rp 1.000.000</li>
</ul>
<p>Beberapa fasilitas kesehatan yang bekerja sama dengan BPJS Kesehatan menyediakan USG gratis atau dengan biaya subsidi.</p>

<h2>Kesimpulan</h2>
<p>Pemeriksaan USG adalah bagian penting dari perawatan kehamilan yang tidak boleh dilewatkan. Dengan USG, Anda dapat memantau kesehatan dan perkembangan janin, mendeteksi masalah sejak dini, dan mempersiapkan persalinan dengan lebih baik. Konsultasikan dengan dokter atau bidan Anda mengenai jadwal USG yang sesuai dengan kondisi kehamilan Anda.</p>',
  'Dr. Ahmad Hidayat, SpOG',
  'Kesehatan',
  'https://supabase.carubra.com/storage/v1/object/public/blog-covers/pentingnya-usg-kehamilan.png',
  true,
  '2026-08-04 04:30:00.000+00',
  0,
  '2026-08-04 04:30:00.123456+00',
  '2026-08-04 04:30:00.123456+00',
  'pentingnya-usg-kehamilan',
  'Panduan lengkap pemeriksaan USG kehamilan: jadwal, manfaat, jenis USG 2D/3D/4D, keamanan, persiapan, dan biaya. Penting untuk ibu hamil.'
);

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================

-- Cek data yang baru diinsert
SELECT 
    id,
    title,
    slug,
    author,
    category,
    published,
    published_at,
    created_at
FROM "utero-artikel"."blog_posts"
ORDER BY published_at DESC
LIMIT 3;

-- Hitung total artikel
SELECT COUNT(*) as total_articles 
FROM "utero-artikel"."blog_posts";

-- ============================================================================
-- NOTES
-- ============================================================================

/*
Format Data:
- Schema: "utero-artikel" (bukan "public")
- Storage URL: https://supabase.carubra.com (self-hosted)
- Author: Dr. [Nama], Tim Utero Indonesia
- Category: Kesehatan, Tips, Artikel
- Content: Full HTML dengan struktur <h2>, <p>, <ul>, <li>
- Slug: kebab-case (lowercase dengan dash)
- Timestamps: ISO 8601 format dengan timezone +00

Cara Import:
1. Login ke Supabase Dashboard: https://supabase.carubra.com
2. Navigate: SQL Editor
3. Copy-paste SQL ini
4. Click Run atau Ctrl+Enter
5. Verify dengan query SELECT di akhir

Catatan Gambar:
- URL gambar di sample ini adalah contoh
- Saat deploy, pastikan upload gambar dulu ke Storage
- Atau set cover_url = NULL jika belum ada gambar
*/
