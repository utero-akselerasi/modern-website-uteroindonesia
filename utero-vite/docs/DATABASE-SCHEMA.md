# Database Schema - Utero Indonesia Blog

Dokumentasi lengkap struktur database untuk self-hosted Supabase instance.

---

## 📊 Database Info

- **Schema**: `public` (default) dan `utero-artikel` (custom)
- **Database**: PostgreSQL 15+
- **Instance**: Self-hosted Supabase
- **RLS**: Enabled untuk semua tables

---

## 📋 Tables

### `blog_posts`

Table utama untuk menyimpan artikel blog.

```sql
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author VARCHAR(255) DEFAULT 'Utero Indonesia Team',
  category VARCHAR(100) DEFAULT 'Artikel',
  cover_url TEXT,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Columns**:
- `id` - UUID primary key
- `title` - Judul artikel (max 500 chars)
- `slug` - URL-friendly slug (unique, max 200 chars)
- `content` - Konten artikel (HTML format)
- `excerpt` - Ringkasan artikel
- `author` - Nama penulis
- `category` - Kategori artikel
- `cover_url` - URL gambar cover
- `meta_description` - SEO meta description
- `published` - Status publikasi (boolean)
- `published_at` - Waktu publikasi
- `created_at` - Waktu dibuat
- `updated_at` - Waktu terakhir diupdate

---

## 🔐 Row Level Security (RLS)

### Policies untuk `blog_posts`

```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access untuk published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Authenticated users dapat CRUD semua posts
CREATE POLICY "Authenticated users full access"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Service role bypass RLS (untuk Edge Functions)
-- Service role secara default bypass RLS
```

---

## 🗄️ Storage Buckets

### `blog-covers`

Bucket untuk menyimpan cover image artikel.

```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Public access policy
CREATE POLICY "Public can view blog covers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-covers');

-- Authenticated users can upload
CREATE POLICY "Authenticated can upload blog covers"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-covers' 
    AND auth.role() = 'authenticated'
  );

-- Service role can manage (via Edge Functions)
-- Service role bypass policies by default
```

**Configuration**:
- Public: `true` (images bisa diakses public)
- File size limit: 5MB
- Allowed MIME types: `image/png`, `image/jpeg`, `image/jpg`, `image/webp`

---

## 🔄 Migrations

### Apply Migrations

```bash
# SSH ke server
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker

# Execute migration file
docker-compose exec db psql -U postgres -d postgres -f /path/to/migration.sql

# Or via stdin
cat migration.sql | docker-compose exec -T db psql -U postgres -d postgres
```

### Migration Files

Semua migration files ada di folder `supabase/migrations/`:

1. `20260803_create_blog_posts.sql` - Create blog_posts table
2. `20260805_create_blog_posts_published.sql` - Add published fields
3. `20260805_create_rpc_functions.sql` - Create RPC functions
4. `storage_setup.sql` - Setup storage bucket

---

## 🔧 RPC Functions

### `get_published_posts()`

Get semua published posts ordered by published_at.

```sql
CREATE OR REPLACE FUNCTION get_published_posts(
  page_limit INT DEFAULT 10,
  page_offset INT DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  slug VARCHAR,
  excerpt TEXT,
  author VARCHAR,
  category VARCHAR,
  cover_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.slug,
    p.excerpt,
    p.author,
    p.category,
    p.cover_url,
    p.published_at
  FROM blog_posts p
  WHERE p.published = true
  ORDER BY p.published_at DESC NULLS LAST
  LIMIT page_limit
  OFFSET page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Usage**:
```javascript
const { data, error } = await supabase.rpc('get_published_posts', {
  page_limit: 10,
  page_offset: 0
});
```

### `get_post_by_slug()`

Get single post by slug.

```sql
CREATE OR REPLACE FUNCTION get_post_by_slug(post_slug VARCHAR)
RETURNS TABLE (
  id UUID,
  title VARCHAR,
  slug VARCHAR,
  content TEXT,
  excerpt TEXT,
  author VARCHAR,
  category VARCHAR,
  cover_url TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.slug,
    p.content,
    p.excerpt,
    p.author,
    p.category,
    p.cover_url,
    p.meta_description,
    p.published_at,
    p.created_at,
    p.updated_at
  FROM blog_posts p
  WHERE p.slug = post_slug AND p.published = true
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Usage**:
```javascript
const { data, error } = await supabase.rpc('get_post_by_slug', {
  post_slug: 'my-article-slug'
});
```

---

## 📊 Sample Data

### Insert Sample Posts

```sql
INSERT INTO blog_posts (title, slug, content, excerpt, author, category, published, published_at)
VALUES 
  (
    'Mengenal Utero Indonesia',
    'mengenal-utero-indonesia',
    '<h2>Tentang Kami</h2><p>Utero Indonesia adalah...</p>',
    'Pengenalan singkat tentang Utero Indonesia',
    'Utero Team',
    'Company',
    true,
    NOW()
  ),
  (
    'Layanan Kami',
    'layanan-kami',
    '<h2>Layanan yang Kami Tawarkan</h2><p>Kami menawarkan...</p>',
    'Daftar lengkap layanan Utero Indonesia',
    'Utero Team',
    'Services',
    true,
    NOW()
  );
```

---

## 🔍 Useful Queries

### Get All Published Posts

```sql
SELECT id, title, slug, published_at, category
FROM blog_posts
WHERE published = true
ORDER BY published_at DESC;
```

### Get Posts by Category

```sql
SELECT id, title, slug, published_at
FROM blog_posts
WHERE published = true AND category = 'Artikel'
ORDER BY published_at DESC;
```

### Search Posts by Title

```sql
SELECT id, title, slug, excerpt
FROM blog_posts
WHERE published = true 
  AND title ILIKE '%search term%'
ORDER BY published_at DESC;
```

### Get Post Stats

```sql
SELECT 
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE published = true) as published_posts,
  COUNT(*) FILTER (WHERE published = false) as draft_posts,
  COUNT(DISTINCT category) as total_categories
FROM blog_posts;
```

### Get Posts by Month

```sql
SELECT 
  DATE_TRUNC('month', published_at) as month,
  COUNT(*) as post_count
FROM blog_posts
WHERE published = true
GROUP BY month
ORDER BY month DESC;
```

---

## 🛠️ Maintenance

### Backup Database

```bash
# SSH ke server
ssh maskhar@supabase-server
cd ~/docker/supabase/supabase-1.26.05/docker

# Backup semua database
docker-compose exec db pg_dumpall -U postgres > backup_$(date +%Y%m%d).sql

# Backup specific database
docker-compose exec db pg_dump -U postgres -d postgres > backup_postgres_$(date +%Y%m%d).sql

# Backup hanya blog_posts table
docker-compose exec db pg_dump -U postgres -d postgres -t blog_posts > backup_blog_posts_$(date +%Y%m%d).sql
```

### Restore Database

```bash
# Restore full backup
cat backup_20260805.sql | docker-compose exec -T db psql -U postgres

# Restore specific database
cat backup_postgres_20260805.sql | docker-compose exec -T db psql -U postgres -d postgres
```

### Vacuum & Analyze

```bash
# Optimize database
docker-compose exec db psql -U postgres -d postgres -c "VACUUM ANALYZE blog_posts;"
```

---

## 📞 Support

**PT. Utero Kreatif Indonesia**
- Website: https://uteroindonesia.com
- Email: info@uterogroup.com

---

**Last Updated**: August 5, 2026
