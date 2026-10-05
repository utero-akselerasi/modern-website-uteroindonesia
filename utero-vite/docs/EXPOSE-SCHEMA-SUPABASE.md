# INSTRUKSI UNTUK EXPOSE SCHEMA utero-artikel DI SUPABASE

## Step 1: Login ke Supabase Dashboard
URL: https://supabase.carubra.com

## Step 2: Buka Settings → API
- Klik **Settings** di sidebar kiri
- Pilih **API**

## Step 3: Tambahkan Schema ke Exposed Schemas
Cari section **"Exposed schemas"** atau **"Database Settings"**

Tambahkan schema: `utero-artikel`

Atau jalankan SQL ini di SQL Editor:

```sql
-- Expose schema utero-artikel untuk PostgREST API
ALTER DATABASE postgres SET "request.headers.claim.schema" = 'utero-artikel';

-- Grant usage ke anon role
GRANT USAGE ON SCHEMA "utero-artikel" TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA "utero-artikel" TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA "utero-artikel" TO service_role;

-- Refresh schema cache (restart PostgREST)
NOTIFY pgrst, 'reload schema';
```

## Step 4: Atau Edit postgresql.conf (jika punya akses)
Tambahkan `utero-artikel` ke parameter:
```
db-schemas = "public,storage,graphql_public,utero-artikel"
```

## Step 5: Restart Supabase/PostgREST
Setelah konfigurasi, restart service untuk apply changes.
