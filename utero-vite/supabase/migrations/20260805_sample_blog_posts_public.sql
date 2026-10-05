-- Sample Data Insert untuk Blog Posts (PUBLIC SCHEMA)
-- Website: uteroindonesia.com
-- Created: 2026-08-05

-- ============================================================================
-- SAMPLE ARTIKEL 1: Panduan Kesehatan Ibu Hamil
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  excerpt, 
  content, 
  author, 
  category, 
  cover_url, 
  published, 
  published_at, 
  slug, 
  meta_description
) VALUES (
  'Panduan Lengkap Kesehatan Ibu Hamil Trimester Pertama',
  'Panduan lengkap untuk menjaga kesehatan ibu hamil di trimester pertama, termasuk nutrisi penting, olahraga ringan, dan pemeriksaan rutin yang harus dilakukan.',
  '<h2>Pendahuluan</h2><p>Trimester pertama kehamilan adalah fase yang sangat krusial. Artikel ini membahas panduan kesehatan lengkap untuk ibu hamil.</p><h2>Nutrisi Penting</h2><ul><li><strong>Asam Folat:</strong> Minimal 400 mcg per hari</li><li><strong>Zat Besi:</strong> Mencegah anemia</li><li><strong>Kalsium:</strong> Pembentukan tulang bayi</li></ul>',
  'Dr. Rina Susanti, SpOG',
  'Kesehatan',
  NULL,
  true,
  '2026-08-05 07:00:00+00',
  'panduan-kesehatan-ibu-hamil-trimester-pertama',
  'Panduan lengkap kesehatan ibu hamil trimester pertama: nutrisi, olahraga, dan pemeriksaan rutin yang penting.'
);

-- ============================================================================
-- SAMPLE ARTIKEL 2: 10 Tips Kesehatan Janin
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  excerpt, 
  content, 
  author, 
  category, 
  cover_url, 
  published, 
  published_at, 
  slug, 
  meta_description
) VALUES (
  '10 Tips Menjaga Kesehatan Janin Selama Kehamilan',
  'Sepuluh tips praktis yang dapat dilakukan ibu hamil untuk menjaga kesehatan dan perkembangan janin yang optimal.',
  '<h2>Tips 1: Konsumsi Makanan Bergizi</h2><p>Pastikan asupan protein, vitamin, dan mineral tercukupi.</p><h2>Tips 2: Rutin Berolahraga</h2><p>Olahraga ringan seperti jalan kaki dan yoga prenatal.</p><h2>Tips 3: Istirahat Cukup</h2><p>Tidur 7-8 jam setiap malam.</p>',
  'Tim Utero Indonesia',
  'Tips',
  NULL,
  true,
  '2026-08-04 07:00:00+00',
  '10-tips-kesehatan-janin',
  '10 tips praktis menjaga kesehatan janin: nutrisi, olahraga, istirahat, dan pemeriksaan rutin.'
);

-- ============================================================================
-- SAMPLE ARTIKEL 3: Pentingnya USG Kehamilan
-- ============================================================================

INSERT INTO public.blog_posts (
  title, 
  excerpt, 
  content, 
  author, 
  category, 
  cover_url, 
  published, 
  published_at, 
  slug, 
  meta_description
) VALUES (
  'Pentingnya Pemeriksaan USG Selama Kehamilan',
  'Kenali manfaat, jadwal, dan jenis-jenis pemeriksaan USG yang penting dilakukan selama masa kehamilan.',
  '<h2>Mengapa USG Penting?</h2><p>USG membantu memantau perkembangan janin dan mendeteksi kelainan sejak dini.</p><h2>Jadwal USG</h2><ul><li>Trimester 1: Minggu 6-8 dan 11-14</li><li>Trimester 2: Minggu 18-22</li><li>Trimester 3: Minggu 32-36</li></ul><h2>Jenis USG</h2><p>USG 2D, 3D, 4D, dan Doppler masing-masing memiliki kegunaan tersendiri.</p>',
  'Dr. Ahmad Hidayat, SpOG',
  'Kesehatan',
  NULL,
  true,
  '2026-08-03 07:00:00+00',
  'pentingnya-usg-kehamilan',
  'Panduan lengkap pemeriksaan USG kehamilan: jadwal, manfaat, jenis USG 2D/3D/4D, dan keamanan.'
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Count articles
SELECT COUNT(*) as total_articles FROM public.blog_posts;

-- List all articles
SELECT 
    id,
    title,
    slug,
    author,
    category,
    published,
    published_at
FROM public.blog_posts
ORDER BY published_at DESC;
