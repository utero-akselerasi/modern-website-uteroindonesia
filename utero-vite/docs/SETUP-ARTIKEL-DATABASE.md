# SETUP ARTIKEL DATABASE - STEP BY STEP GUIDE

## 📋 Ringkasan Masalah

Schema `utero-artikel` tidak ter-expose di Supabase config, sehingga frontend tidak bisa akses langsung.

**Solusi:** Gunakan RPC Functions di schema `public` sebagai bridge ke schema `utero-artikel`.

---

## 🔧 Step-by-Step Setup

### Step 1: Login ke Supabase Dashboard
1. Buka: https://supabase.carubra.com
2. Login dengan credentials Anda

### Step 2: Cek Apakah Schema `utero-artikel` Sudah Ada

Buka **SQL Editor** → Jalankan query ini:

```sql
-- Cek apakah schema utero-artikel ada
SELECT schema_name 
FROM information_schema.schemata 
WHERE schema_name = 'utero-artikel';
```

**Jika TIDAK ADA:**
- Jalankan file: `supabase/migrations/20260803_create_blog_posts.sql`
- File ini akan membuat schema `utero-artikel` dan table `blog_posts`

**Jika SUDAH ADA:**
- Lanjut ke Step 3

### Step 3: Cek Apakah Table `blog_posts` Ada

```sql
-- Cek apakah table blog_posts ada
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'utero-artikel' 
AND table_name = 'blog_posts';
```

**Jika TIDAK ADA:**
- Jalankan file: `supabase/migrations/20260803_create_blog_posts.sql`

**Jika SUDAH ADA:**
- Lanjut ke Step 4

### Step 4: Insert Sample Data (Jika Belum Ada Artikel)

```sql
-- Cek jumlah artikel
SELECT COUNT(*) FROM "utero-artikel".blog_posts;
```

**Jika 0 atau NULL:**
- Jalankan file: `supabase/migrations/sample_blog_posts.sql`
- Atau jalankan file yang sudah Anda run kemarin

### Step 5: Buat RPC Functions (PENTING!)

Jalankan file ini di SQL Editor:
**`supabase/migrations/20260805_create_rpc_functions.sql`**

File ini akan membuat 3 functions:
- `get_published_articles()` - Get semua artikel
- `get_article_by_slug(slug)` - Get artikel by slug
- `get_recent_articles(count)` - Get N artikel terbaru

### Step 6: Verify RPC Functions

```sql
-- Test RPC functions
SELECT * FROM public.get_published_articles();
SELECT * FROM public.get_article_by_slug('panduan-kesehatan-ibu-hamil-trimester-pertama');
SELECT * FROM public.get_recent_articles(3);
```

**Expected result:** Harus return data artikel

---

## 🧪 Test di Frontend

Setelah semua SQL dijalankan:

1. **Build ulang:**
   ```bash
   pnpm build
   ```

2. **Run dev server:**
   ```bash
   pnpm dev
   ```

3. **Test di browser:**
   - Buka: http://localhost:3003/artikel
   - Harus muncul list artikel
   - Klik salah satu artikel → harus buka detail page

4. **Cek console browser (F12):**
   - Tidak boleh ada error
   - Jika ada error, screenshot dan share

---

## 📂 Files yang Harus Dijalankan (Urutan)

1. ✅ `supabase/migrations/20260803_create_blog_posts.sql`
   → Membuat schema + table

2. ✅ `supabase/migrations/sample_blog_posts.sql`
   → Insert 3 artikel sample (atau yang sudah Anda run)

3. ⚠️ `supabase/migrations/20260805_create_rpc_functions.sql`
   → **WAJIB! Ini yang belum dijalankan**

---

## 🆘 Troubleshooting

### Error: "Could not find the function"
→ **Solusi:** Run file `20260805_create_rpc_functions.sql`

### Error: "relation utero-artikel.blog_posts does not exist"
→ **Solusi:** Run file `20260803_create_blog_posts.sql`

### Artikel tidak muncul (no data)
→ **Solusi:** Run file `sample_blog_posts.sql` atau insert manual

### Error: "permission denied for schema utero-artikel"
→ **Solusi:** Jalankan SQL ini:
```sql
GRANT USAGE ON SCHEMA "utero-artikel" TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA "utero-artikel" TO anon, authenticated;
```

---

## ✅ Checklist

- [ ] Schema `utero-artikel` sudah ada
- [ ] Table `blog_posts` sudah ada
- [ ] Sample data (minimal 1 artikel) sudah ada
- [ ] RPC Functions sudah dibuat ← **PALING PENTING!**
- [ ] Test RPC di SQL Editor → berhasil return data
- [ ] Frontend build success
- [ ] Browser test → artikel muncul

---

## 📞 Next Steps

Setelah checklist lengkap:
1. Screenshot hasil dari SQL Editor (test RPC)
2. Screenshot hasil di browser (list artikel)
3. Kalau masih error, share error message-nya

**Prioritas:** Jalankan file `20260805_create_rpc_functions.sql` di SQL Editor!
