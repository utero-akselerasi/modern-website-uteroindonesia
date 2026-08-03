# Blog Auto-Post API Documentation
# UteroindonesiaCom

**Version:** 1.0  
**Base URL:** `https://supabase.carubra.com/functions/v1`  
**Endpoint:** `/blog-auto-post`

---

## Overview

REST API untuk auto-posting artikel blog ke website uteroindonesia.com. API ini mendukung upload gambar cover, auto-generate slug, dan SEO optimization.

---

## Authentication

**Type:** API Key

**Header:**
```
x-api-key: <your_api_key>
```

**Example:**
```bash
curl -H "x-api-key: utero_blog_prod_9Km2nX5pQ8vR4jT" ...
```

---

## Endpoint

### Create Blog Post

**POST** `/blog-auto-post`

Create dan publish artikel blog baru.

#### Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | `application/json` |
| `x-api-key` | Yes | API key untuk authentication |

#### Request Body

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | string | Yes | - | Judul artikel (max 500 chars) |
| `content` | string | Yes | - | Konten HTML artikel |
| `slug` | string | No | auto-generated | URL-friendly identifier (a-z, 0-9, dash only) |
| `excerpt` | string | No | null | Ringkasan artikel (max 1000 chars) |
| `author` | string | No | "Utero Indonesia Team" | Nama penulis |
| `category` | string | No | "Artikel" | Kategori artikel |
| `image_base64` | string | No | null | Base64 encoded image (max 5MB) |
| `image_filename` | string | No | `{slug}-{timestamp}.{ext}` | Nama file untuk image |
| `image_mime_type` | string | No | "image/png" | MIME type: image/png, image/jpeg, image/webp |
| `meta_fields` | object | No | null | SEO metadata |
| `meta_fields.description` | string | No | null | Meta description untuk SEO |

#### Request Example

**Minimal Request:**
```json
{
  "title": "Panduan Kesehatan Ibu Hamil",
  "content": "<h2>Pendahuluan</h2><p>Artikel ini membahas pentingnya menjaga kesehatan selama kehamilan...</p>"
}
```

**Full Request:**
```json
{
  "title": "10 Tips Menjaga Kesehatan Janin",
  "content": "<h2>Tips 1: Nutrisi Seimbang</h2><p>Konsumsi makanan bergizi...</p><h2>Tips 2: Olahraga Teratur</h2><p>Olahraga ringan sangat penting...</p>",
  "slug": "10-tips-kesehatan-janin",
  "excerpt": "Sepuluh tips praktis untuk menjaga kesehatan janin selama masa kehamilan",
  "author": "Dr. Rina Susanti",
  "category": "Kesehatan",
  "image_base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "image_filename": "tips-kesehatan-janin.png",
  "image_mime_type": "image/png",
  "meta_fields": {
    "description": "Tips lengkap menjaga kesehatan janin untuk ibu hamil trimester pertama hingga ketiga"
  }
}
```

#### Response

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "slug": "10-tips-kesehatan-janin",
    "cover_url": "https://supabase.carubra.com/storage/v1/object/public/blog-covers/tips-kesehatan-janin-1722709200000.png",
    "url": "/blog/10-tips-kesehatan-janin"
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Error message description"
}
```

#### Status Codes

| Code | Description | Scenario |
|------|-------------|----------|
| 201 | Created | Artikel berhasil dibuat |
| 400 | Bad Request | Missing required fields, invalid format, atau data validation error |
| 401 | Unauthorized | Invalid atau missing API key |
| 405 | Method Not Allowed | Non-POST request |
| 409 | Conflict | Duplicate slug (slug sudah digunakan) |
| 500 | Internal Server Error | Database error, storage error, atau server error |

---

## Error Responses

### 400 - Bad Request

**Missing required field:**
```json
{
  "success": false,
  "error": "Field \"title\" is required and must be a non-empty string"
}
```

**Invalid data:**
```json
{
  "success": false,
  "error": "Title too long (maximum 500 characters)"
}
```

**Image too large:**
```json
{
  "success": false,
  "error": "Image too large (maximum 5MB)"
}
```

### 401 - Unauthorized

```json
{
  "success": false,
  "error": "Unauthorized: Invalid API key"
}
```

### 405 - Method Not Allowed

```json
{
  "success": false,
  "error": "Method not allowed. Use POST method."
}
```

### 409 - Conflict

```json
{
  "success": false,
  "error": "Slug \"10-tips-kesehatan-janin\" already exists. Please provide a different slug or title."
}
```

### 500 - Internal Server Error

```json
{
  "success": false,
  "error": "Database connection failed"
}
```

---

## Examples

### cURL

**Basic Request:**
```bash
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: utero_blog_prod_9Km2nX5pQ8vR4jT" \
  -d '{
    "title": "Panduan Kesehatan Ibu Hamil",
    "content": "<h2>Pendahuluan</h2><p>Kesehatan ibu hamil sangat penting...</p>"
  }'
```

**With Image:**
```bash
# Convert image to base64 first
IMAGE_BASE64=$(base64 -w 0 image.png)

curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "Content-Type: application/json" \
  -H "x-api-key: utero_blog_prod_9Km2nX5pQ8vR4jT" \
  -d '{
    "title": "Panduan Kesehatan Ibu Hamil",
    "content": "<h2>Pendahuluan</h2><p>Artikel lengkap...</p>",
    "image_base64": "'$IMAGE_BASE64'",
    "image_filename": "panduan-kesehatan.png"
  }'
```

### JavaScript (Fetch)

```javascript
const createBlogPost = async () => {
  const response = await fetch('https://supabase.carubra.com/functions/v1/blog-auto-post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'utero_blog_prod_9Km2nX5pQ8vR4jT'
    },
    body: JSON.stringify({
      title: 'Panduan Kesehatan Ibu Hamil',
      content: '<h2>Pendahuluan</h2><p>Artikel lengkap...</p>',
      excerpt: 'Panduan lengkap kesehatan untuk ibu hamil',
      author: 'Dr. Rina Susanti',
      category: 'Kesehatan',
      meta_fields: {
        description: 'Panduan kesehatan ibu hamil untuk kehamilan yang sehat'
      }
    })
  });

  const result = await response.json();
  
  if (result.success) {
    console.log('Post created:', result.data.url);
    console.log('Post ID:', result.data.id);
  } else {
    console.error('Error:', result.error);
  }
};
```

### Python (Requests)

```python
import requests
import base64

def create_blog_post():
    url = 'https://supabase.carubra.com/functions/v1/blog-auto-post'
    headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'utero_blog_prod_9Km2nX5pQ8vR4jT'
    }
    
    # Optional: Read and encode image
    with open('image.png', 'rb') as f:
        image_base64 = base64.b64encode(f.read()).decode('utf-8')
    
    data = {
        'title': 'Panduan Kesehatan Ibu Hamil',
        'content': '<h2>Pendahuluan</h2><p>Artikel lengkap...</p>',
        'excerpt': 'Panduan lengkap kesehatan untuk ibu hamil',
        'author': 'Dr. Rina Susanti',
        'category': 'Kesehatan',
        'image_base64': image_base64,
        'image_filename': 'panduan-kesehatan.png',
        'meta_fields': {
            'description': 'Panduan kesehatan ibu hamil'
        }
    }
    
    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    
    if result.get('success'):
        print(f"Post created: {result['data']['url']}")
        print(f"Cover URL: {result['data']['cover_url']}")
    else:
        print(f"Error: {result['error']}")

create_blog_post()
```

### PHP

```php
<?php

function createBlogPost() {
    $url = 'https://supabase.carubra.com/functions/v1/blog-auto-post';
    
    // Optional: Read and encode image
    $imageBase64 = base64_encode(file_get_contents('image.png'));
    
    $data = [
        'title' => 'Panduan Kesehatan Ibu Hamil',
        'content' => '<h2>Pendahuluan</h2><p>Artikel lengkap...</p>',
        'excerpt' => 'Panduan lengkap kesehatan untuk ibu hamil',
        'author' => 'Dr. Rina Susanti',
        'category' => 'Kesehatan',
        'image_base64' => $imageBase64,
        'image_filename' => 'panduan-kesehatan.png',
        'meta_fields' => [
            'description' => 'Panduan kesehatan ibu hamil'
        ]
    ];
    
    $options = [
        'http' => [
            'method' => 'POST',
            'header' => [
                'Content-Type: application/json',
                'x-api-key: utero_blog_prod_9Km2nX5pQ8vR4jT'
            ],
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $result = json_decode($response, true);
    
    if ($result['success']) {
        echo "Post created: " . $result['data']['url'] . "\n";
        echo "Cover URL: " . $result['data']['cover_url'] . "\n";
    } else {
        echo "Error: " . $result['error'] . "\n";
    }
}

createBlogPost();
?>
```

---

## Slug Generation Rules

Jika `slug` tidak disediakan, sistem akan auto-generate dari `title` dengan rules:

1. Convert ke lowercase
2. Hapus karakter spesial (kecuali space dan dash)
3. Replace multiple spaces dengan single dash
4. Remove leading/trailing dashes
5. Truncate ke 100 karakter

**Examples:**

| Title | Generated Slug |
|-------|----------------|
| "Panduan Kesehatan Ibu Hamil" | `panduan-kesehatan-ibu-hamil` |
| "10 Tips Menjaga Kesehatan!" | `10-tips-menjaga-kesehatan` |
| "Nutrisi untuk Ibu & Bayi" | `nutrisi-untuk-ibu-bayi` |
| "Hello    World" | `hello-world` |

---

## Image Upload Guidelines

### Supported Formats
- PNG (`.png`)
- JPEG (`.jpg`, `.jpeg`)
- WebP (`.webp`)

### Size Limit
- Maximum: **5MB** per image
- Recommended: **< 1MB** untuk optimal performance

### Image Requirements
- Encode dalam base64 format
- Set correct `image_mime_type`
- Optimal dimensions: **1200x630px** (untuk social media sharing)

### Base64 Encoding

**Linux/Mac:**
```bash
base64 -w 0 image.png
```

**JavaScript:**
```javascript
const fs = require('fs');
const imageBuffer = fs.readFileSync('image.png');
const base64 = imageBuffer.toString('base64');
```

**Python:**
```python
import base64
with open('image.png', 'rb') as f:
    base64_string = base64.b64encode(f.read()).decode('utf-8')
```

---

## Rate Limiting

Currently: **No rate limit** enforced

**Recommendations:**
- Implement client-side throttling
- Max 100 requests per day per API key
- Contact admin untuk bulk import needs

**Future:** Rate limiting akan diimplementasikan:
- 100 requests per hour per API key
- Burst: 10 requests per minute

---

## Best Practices

### 1. Error Handling

Always check `success` field:

```javascript
const response = await fetch(url, options);
const result = await response.json();

if (result.success) {
  // Handle success
  console.log('Created:', result.data);
} else {
  // Handle error
  console.error('Error:', result.error);
  
  // Specific error handling
  if (response.status === 409) {
    console.log('Slug already exists, try different title');
  }
}
```

### 2. Slug Management

Provide custom slug untuk kontrol URL:

```javascript
{
  "title": "Panduan Lengkap Kesehatan Ibu Hamil 2026",
  "slug": "panduan-kesehatan-ibu-hamil",  // Custom, clean slug
  // ...
}
```

### 3. SEO Optimization

Selalu set `excerpt` dan `meta_description`:

```javascript
{
  "title": "Panduan Kesehatan Ibu Hamil",
  "excerpt": "Panduan lengkap untuk menjaga kesehatan ibu hamil...",
  "meta_fields": {
    "description": "Tips dan panduan kesehatan ibu hamil trimester 1-3"
  }
}
```

### 4. Image Optimization

Optimize image sebelum upload:

```bash
# Resize dengan ImageMagick
convert input.png -resize 1200x630 -quality 85 output.png

# Compress dengan pngquant
pngquant --quality 70-85 input.png -o output.png
```

### 5. Retry Logic

Implement retry untuk transient errors:

```javascript
async function createPostWithRetry(data, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        return result;
      }
      
      // Don't retry for client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(result.error);
      }
      
      // Retry for server errors (5xx)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

---

## Security

### API Key Management

- **Never** commit API key ke Git
- Store di environment variables
- Rotate setiap 90 hari
- Use different keys untuk dev/prod

### Input Sanitization

Server melakukan validation, tapi client juga harus:

```javascript
// Validate title length
if (title.length > 500) {
  console.error('Title too long');
  return;
}

// Validate required fields
if (!title || !content) {
  console.error('Missing required fields');
  return;
}
```

### HTTPS Only

Always use HTTPS endpoint:
```
✓ https://supabase.carubra.com/functions/v1/blog-auto-post
✗ http://supabase.carubra.com/functions/v1/blog-auto-post
```

---

## FAQ

**Q: Apakah bisa update artikel yang sudah ada?**  
A: Saat ini hanya support CREATE. Untuk update, gunakan Supabase Dashboard atau direct database access.

**Q: Apakah artikel langsung published?**  
A: Ya, artikel otomatis set `published = true`. Untuk draft mode, edit via Dashboard.

**Q: Apa maksimum ukuran content?**  
A: Tidak ada hard limit, tapi recommended < 50,000 characters untuk optimal performance.

**Q: Bagaimana cara delete artikel?**  
A: Via Supabase Dashboard atau direct SQL: `DELETE FROM blog_posts WHERE id = '...'`

**Q: Apakah bisa upload multiple images?**  
A: Saat ini hanya 1 cover image. Untuk content images, upload manual ke storage lalu reference di HTML.

**Q: Format HTML apa yang supported?**  
A: Semua standard HTML tags. Frontend akan sanitize saat display untuk keamanan.

**Q: Apakah ada webhook untuk notification?**  
A: Belum tersedia. Planned untuk future version.

**Q: Bagaimana cara mendapatkan API key?**  
A: Contact admin atau development team.

---

## Support

**Technical Support:**
- Email: dev@uteroindonesia.com
- Documentation: `/docs/blog-auto-post/`

**Bug Reports:**
- GitHub Issues: [repository URL]
- Email: dev@uteroindonesia.com

**API Key Requests:**
- Contact: admin@uteroindonesia.com

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-03 | Initial API release |

---

**End of API Documentation**
