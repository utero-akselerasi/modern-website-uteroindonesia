# 🔑 API KEY SETUP GUIDE - Blog Auto-Post

## 📋 Ringkasan

API Key (`x-api-key`) adalah **security header** yang wajib ada saat POST artikel ke Edge Function `blog-auto-post`.

---

## 🎯 API Key yang Anda Gunakan

Dari workflow N8N Anda:
```
76fd5b95720c6f4554542e5cf67fde46f69bee3972e8d013db4a644f3dc58b6c
```

**Status:** ✅ Sudah dipakai di N8N node "Post to uteroindonesia.com"

---

## 🔧 Setup di Supabase Dashboard

### Step 1: Login
- URL: https://supabase.carubra.com
- Login dengan credentials Anda

### Step 2: Buka Edge Functions
1. Klik **Edge Functions** di sidebar
2. Cari function: **blog-auto-post**
3. Klik untuk buka detail

### Step 3: Set Environment Variable
1. Klik tab **Settings** atau **Configuration**
2. Cari section **Environment Variables** / **Secrets** / **Function Secrets**
3. Click **Add new secret** atau **Add variable**
4. Isi:
   - **Name:** `BLOG_API_KEY`
   - **Value:** `76fd5b95720c6f4554542e5cf67fde46f69bee3972e8d013db4a644f3dc58b6c`
5. Click **Save** atau **Add**

### Step 4: Redeploy Function
- Klik **Deploy** atau **Redeploy**
- Atau restart Edge Function service
- Tunggu sampai status: **Active** / **Running**

---

## ✅ Verification

### Cara 1: Via Dashboard
Check apakah environment variable `BLOG_API_KEY` sudah muncul di function settings.

### Cara 2: Via Test Request
Run PowerShell script:
```powershell
.\test-api-key.ps1
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "test-artikel-api-key-...",
    "cover_url": null,
    "url": "/blog/test-artikel-api-key-...",
    "schema": "utero-artikel"
  }
}
```

### Cara 3: Via N8N
Trigger workflow N8N → Node "Post to uteroindonesia.com" harus berhasil (status 201).

---

## 🔐 Security Best Practices

### DO ✅
- Simpan API key di environment variables (bukan hardcode di code)
- Gunakan API key yang panjang (minimal 32 characters)
- Rotate API key secara berkala (6 bulan sekali)
- Batasi akses Edge Function hanya dari IP tertentu (jika perlu)

### DON'T ❌
- Jangan commit API key ke Git repository
- Jangan share API key di public chat/forum
- Jangan gunakan API key yang mudah ditebak

---

## 🆘 Troubleshooting

### Error: "Unauthorized: Invalid API key"
**Penyebab:** API key di N8N ≠ API key di Supabase

**Solusi:**
1. Check N8N node header: `x-api-key`
2. Check Supabase env variable: `BLOG_API_KEY`
3. Pastikan nilai SAMA PERSIS
4. Redeploy Edge Function

### Error: "Server configuration error: API key not set"
**Penyebab:** Environment variable `BLOG_API_KEY` belum di-set di Supabase

**Solusi:**
1. Set environment variable di Supabase Dashboard
2. Redeploy Edge Function
3. Test ulang

### Error: "ECONNREFUSED" atau "Network error"
**Penyebab:** Edge Function belum running atau URL salah

**Solusi:**
1. Check Edge Function status: Active/Running
2. Verify URL: `https://supabase.carubra.com/functions/v1/blog-auto-post`
3. Check firewall/network

---

## 📊 Flow Lengkap dengan API Key

```
N8N Workflow
  ↓
Node: "Post to uteroindonesia.com"
  ↓ HTTP POST
  ↓ Header: x-api-key = "76fd5b95720c6f4554542e5cf67fde46f69bee3972e8d013db4a644f3dc58b6c"
  ↓
Edge Function: blog-auto-post
  ↓
Validate API Key:
  - Read from request header: x-api-key
  - Compare with env variable: BLOG_API_KEY
  - If match → Continue
  - If not match → Return 401 Unauthorized
  ↓
Insert to Database
  ↓
Return Response
```

---

## 🧪 Test Scripts

### Test dengan PowerShell
File: `test-api-key.ps1` (sudah dibuat)

```powershell
.\test-api-key.ps1
```

### Test dengan cURL (Linux/Mac)
```bash
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "x-api-key: 76fd5b95720c6f4554542e5cf67fde46f69bee3972e8d013db4a644f3dc58b6c" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Artikel",
    "content": "<p>Test content</p>",
    "slug": "test-artikel-123",
    "excerpt": "Test excerpt"
  }'
```

### Test dengan Node.js
```javascript
const response = await fetch('https://supabase.carubra.com/functions/v1/blog-auto-post', {
  method: 'POST',
  headers: {
    'x-api-key': '76fd5b95720c6f4554542e5cf67fde46f69bee3972e8d013db4a644f3dc58b6c',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Test Artikel',
    content: '<p>Test content</p>',
    slug: 'test-artikel-' + Date.now()
  })
});

const result = await response.json();
console.log(result);
```

---

## 📝 Checklist Setup

- [ ] Edge Function `blog-auto-post` sudah deployed
- [ ] Environment variable `BLOG_API_KEY` sudah di-set
- [ ] API key sama dengan yang di N8N
- [ ] Edge Function status: Active/Running
- [ ] Test request berhasil (status 201)
- [ ] N8N workflow bisa POST artikel

---

## 🔄 Rotate API Key (Opsional)

Jika ingin ganti API key baru:

1. **Generate key baru:**
   ```powershell
   [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
   ```

2. **Update di Supabase:**
   - Edit environment variable `BLOG_API_KEY`
   - Paste key baru
   - Redeploy function

3. **Update di N8N:**
   - Edit node "Post to uteroindonesia.com"
   - Update header `x-api-key` dengan key baru
   - Save workflow

4. **Test:**
   - Trigger workflow
   - Pastikan berhasil

---

## 📞 Next Steps

1. ✅ Set environment variable `BLOG_API_KEY` di Supabase
2. ✅ Redeploy Edge Function
3. ✅ Test dengan script `test-api-key.ps1`
4. ✅ Trigger N8N workflow
5. ✅ Verify artikel masuk ke database
6. ✅ Check artikel muncul di website

---

**Tanggal:** 5 Agustus 2026
**Project:** Utero Indonesia - Blog Auto-Post System
