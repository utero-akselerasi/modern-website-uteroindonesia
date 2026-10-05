# 🎯 RINGKASAN SOLUSI - ARTIKEL TIDAK MUNCUL

## 📊 Status Saat Ini

✅ Link "ARTIKEL" di navbar → sudah berfungsi (ke /artikel)
✅ Frontend code → sudah siap fetch dari database
✅ .env → sudah terisi dengan benar
✅ Build → berhasil
❌ Artikel tidak muncul → **Karena RPC Functions belum dibuat di Supabase**

---

## 🔍 Root Cause

Schema `utero-artikel` tidak ter-expose di Supabase API config, sehingga:
- Frontend tidak bisa query langsung `blog_posts` dari schema `utero-artikel`
- Error: "Invalid schema: utero-artikel"

---

## ✅ Solusi yang Sudah Diimplementasi

### 1. Workaround dengan RPC Functions
Buat 3 functions di schema `public` yang akan bridge ke schema `utero-artikel`:

- `get_published_articles()` → Ambil semua artikel published
- `get_article_by_slug(slug)` → Ambil 1 artikel by slug
- `get_recent_articles(count)` → Ambil N artikel terbaru

### 2. Update Frontend Code
- ✅ `src/lib/supabase.ts` → Hapus custom schema config
- ✅ `src/lib/articleService.ts` → Gunakan RPC functions
- ✅ `src/components/layout/Navbar.tsx` → Fix link artikel
- ✅ TypeScript errors → Fixed
- ✅ Build → Success

---

## 🚀 YANG HARUS ANDA LAKUKAN SEKARANG

### Step 1: Login ke Supabase Dashboard
URL: https://supabase.carubra.com

### Step 2: Buka SQL Editor
Klik **SQL Editor** di sidebar kiri

### Step 3: Run Migration File
Copy-paste isi file ini ke SQL Editor:
📂 **`supabase/migrations/20260805_create_rpc_functions.sql`**

Klik **Run** atau tekan `Ctrl+Enter`

### Step 4: Verify RPC Functions
Jalankan test query ini:

```sql
-- Test 1: Get all articles
SELECT * FROM public.get_published_articles();

-- Test 2: Get by slug
SELECT * FROM public.get_article_by_slug('panduan-kesehatan-ibu-hamil-trimester-pertama');

-- Test 3: Get recent 3
SELECT * FROM public.get_recent_articles(3);
```

**Expected Result:** Harus return data artikel (title, slug, content, dll)

### Step 5: Test di Browser
1. Refresh browser (`Ctrl+F5` atau hard refresh)
2. Buka: http://localhost:3003/artikel
3. Artikel harus muncul!

---

## 📂 File Locations

```
utero-vite/
├── supabase/migrations/
│   ├── 20260803_create_blog_posts.sql          ← Schema + Table (sudah dirun)
│   ├── sample_blog_posts.sql                   ← Sample data (sudah dirun)
│   └── 20260805_create_rpc_functions.sql       ← **WAJIB RUN INI!**
├── src/lib/
│   ├── supabase.ts                             ← Updated (no custom schema)
│   └── articleService.ts                       ← Updated (use RPC)
├── docs/
│   ├── SETUP-ARTIKEL-DATABASE.md               ← Step-by-step guide
│   └── EXPOSE-SCHEMA-SUPABASE.md               ← Alternative solution
└── .env                                        ← Sudah terisi
```

---

## 🆘 Troubleshooting

### Jika masih error "Could not find function"
→ File `20260805_create_rpc_functions.sql` belum dijalankan

### Jika error "relation blog_posts does not exist"
→ Table belum dibuat, run `20260803_create_blog_posts.sql`

### Jika RPC return empty array
→ Belum ada data, run `sample_blog_posts.sql`

### Jika console browser error "Failed to fetch"
→ Check .env sudah benar (URL dan anon key)

---

## 📸 Screenshot yang Dibutuhkan (Jika Masih Error)

1. Screenshot hasil SQL Editor setelah run RPC functions
2. Screenshot hasil test query (SELECT * FROM get_published_articles())
3. Screenshot browser console (F12 → Console tab)
4. Screenshot halaman /artikel

---

## ⏱️ Estimasi Waktu

- Run SQL migration: ~2 menit
- Test & verify: ~3 menit
- **Total: 5 menit**

---

## 🎉 Setelah Selesai

Artikel akan muncul di:
- `/artikel` → List semua artikel (grid 3 kolom)
- `/artikel/[slug]` → Detail artikel dengan full content
- Homepage → Section "Artikel Terbaru" (3 artikel terbaru)

---

**Prioritas Tertinggi:** 
Jalankan file `supabase/migrations/20260805_create_rpc_functions.sql` di SQL Editor!

Setelah itu, artikel pasti muncul. 🚀
