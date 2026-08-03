# System Design Document (SDD)
# Blog Auto-Post System untuk UteroindonesiaCom

**Versi:** 1.0  
**Tanggal:** 3 Agustus 2026  
**Project:** uteroindonesia.com  
**Author:** Development Team

---

## 1. Overview

### 1.1 Purpose
Dokumen ini menjelaskan desain sistem teknis untuk implementasi Blog Auto-Post System pada website uteroindonesia.com. Sistem ini memungkinkan posting artikel blog secara otomatis melalui API dengan dukungan upload gambar dan SEO optimization.

### 1.2 Scope
- Database schema design
- API endpoint architecture
- Security implementation
- Storage integration
- Error handling strategy
- Performance optimization

### 1.3 Goals
- Arsitektur yang scalable dan maintainable
- Security-first approach dengan RLS dan API authentication
- Performance optimal dengan response time < 3s
- Error handling yang comprehensive

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────┐
│  External Client│
│  (CMS, Tools)   │
└────────┬────────┘
         │ HTTPS + API Key
         ▼
┌─────────────────────────────────────────┐
│     Supabase Edge Functions             │
│  ┌───────────────────────────────────┐  │
│  │  blog-auto-post Function          │  │
│  │  - Validate API Key               │  │
│  │  - Validate Input                 │  │
│  │  - Generate Slug                  │  │
│  │  - Upload Image                   │  │
│  │  - Insert to DB                   │  │
│  └───────────────────────────────────┘  │
└─────────┬───────────────────┬───────────┘
          │                   │
          ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│ Supabase Storage │  │  PostgreSQL DB   │
│                  │  │                  │
│ Bucket:          │  │ Table:           │
│ blog-covers      │  │ blog_posts       │
└──────────────────┘  └──────────────────┘
          │                   │
          └─────────┬─────────┘
                    ▼
          ┌──────────────────┐
          │  Frontend App    │
          │  (React/Vite)    │
          │  - /blog         │
          │  - /blog/:slug   │
          └──────────────────┘
```

### 2.2 Component Diagram

```
┌────────────────────────────────────────────────────────┐
│                 Edge Function Layer                     │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐    ┌──────────────────┐         │
│  │ Authentication   │    │ Request Handler  │         │
│  │ Middleware       │───▶│ - CORS           │         │
│  │ - API Key Check  │    │ - Method Check   │         │
│  └──────────────────┘    └──────────────────┘         │
│           │                       │                    │
│           ▼                       ▼                    │
│  ┌──────────────────┐    ┌──────────────────┐         │
│  │ Input Validator  │    │ Slug Generator   │         │
│  │ - Required Fields│    │ - Normalization  │         │
│  │ - Data Types     │    │ - Uniqueness     │         │
│  └──────────────────┘    └──────────────────┘         │
│           │                       │                    │
│           └───────────┬───────────┘                    │
│                       ▼                                │
│              ┌──────────────────┐                      │
│              │ Image Uploader   │                      │
│              │ - Base64 Decode  │                      │
│              │ - Storage Upload │                      │
│              │ - URL Generation │                      │
│              └──────────────────┘                      │
│                       │                                │
│                       ▼                                │
│              ┌──────────────────┐                      │
│              │ Database Writer  │                      │
│              │ - Insert Post    │                      │
│              │ - Return Data    │                      │
│              └──────────────────┘                      │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## 3. Database Design

### 3.1 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────┐
│                  blog_posts                      │
├─────────────────────────────────────────────────┤
│ PK  id                  UUID                    │
│     title               TEXT NOT NULL           │
│     content             TEXT                    │
│ UK  slug                TEXT UNIQUE             │
│     excerpt             TEXT                    │
│     author              TEXT NOT NULL           │
│     category            TEXT NOT NULL           │
│     cover_url           TEXT                    │
│     meta_description    TEXT                    │
│     published           BOOLEAN                 │
│     published_at        TIMESTAMPTZ             │
│     sort_order          INTEGER                 │
│     created_at          TIMESTAMPTZ NOT NULL    │
│     updated_at          TIMESTAMPTZ NOT NULL    │
└─────────────────────────────────────────────────┘

Indexes:
- PRIMARY KEY (id)
- UNIQUE INDEX (slug)
- INDEX (published, published_at DESC)
- INDEX (category, published_at DESC)
```

### 3.2 Table Specifications

#### blog_posts Table

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | UUID | NO | gen_random_uuid() | Primary key |
| title | TEXT | NO | - | Judul artikel |
| content | TEXT | YES | NULL | Konten HTML artikel |
| slug | TEXT | YES | NULL | URL-friendly identifier |
| excerpt | TEXT | YES | NULL | Ringkasan artikel |
| author | TEXT | NO | 'Utero Indonesia Team' | Nama penulis |
| category | TEXT | NO | 'Artikel' | Kategori artikel |
| cover_url | TEXT | YES | NULL | URL gambar cover |
| meta_description | TEXT | YES | NULL | SEO meta description |
| published | BOOLEAN | YES | true | Status publikasi |
| published_at | TIMESTAMPTZ | YES | now() | Tanggal publikasi |
| sort_order | INTEGER | YES | 0 | Order untuk sorting manual |
| created_at | TIMESTAMPTZ | NO | now() | Timestamp created |
| updated_at | TIMESTAMPTZ | NO | now() | Timestamp updated |

### 3.3 Constraints

**Primary Key:**
```sql
CONSTRAINT blog_posts_pkey PRIMARY KEY (id)
```

**Unique Constraints:**
```sql
CONSTRAINT blog_posts_slug_key UNIQUE (slug)
```

**Check Constraints:**
```sql
CONSTRAINT blog_posts_title_check CHECK (char_length(title) > 0)
CONSTRAINT blog_posts_slug_check CHECK (slug ~ '^[a-z0-9-]+$')
```

### 3.4 Indexes Strategy

**Primary Index:**
- `blog_posts_pkey` on `id` - untuk lookup by ID

**Unique Index:**
- `blog_posts_slug_key` on `slug` - untuk lookup by slug dan prevent duplicate

**Performance Indexes:**
```sql
-- Index untuk public listing (published posts)
CREATE INDEX idx_blog_posts_published 
ON blog_posts(published, published_at DESC) 
WHERE published = true;

-- Index untuk category filtering
CREATE INDEX idx_blog_posts_category 
ON blog_posts(category, published_at DESC) 
WHERE published = true;

-- Index untuk full-text search (future)
CREATE INDEX idx_blog_posts_search 
ON blog_posts USING gin(to_tsvector('indonesian', title || ' ' || coalesce(content, '')));
```

---

## 4. API Design

### 4.1 Endpoint Specification

**Base URL:** `https://supabase.carubra.com/functions/v1`

**Endpoint:** `/blog-auto-post`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
x-api-key: <API_KEY>
```

### 4.2 Request Schema

```typescript
interface BlogPostRequest {
  title: string;                    // Required, min 1 char
  content: string;                  // Required, HTML content
  slug?: string;                    // Optional, auto-generated if empty
  excerpt?: string;                 // Optional, max 500 chars
  author?: string;                  // Optional, default: 'Utero Indonesia Team'
  category?: string;                // Optional, default: 'Artikel'
  image_base64?: string;            // Optional, base64 encoded image
  image_filename?: string;          // Optional, default: {slug}-{timestamp}.ext
  image_mime_type?: string;         // Optional, default: 'image/png'
  meta_fields?: {
    description?: string;           // Optional, for SEO
  };
}
```

### 4.3 Response Schema

**Success Response (201 Created):**
```typescript
interface BlogPostResponse {
  success: true;
  data: {
    id: string;                     // UUID of created post
    slug: string;                   // Generated or provided slug
    cover_url: string | null;       // Public URL of uploaded image
    url: string;                    // Frontend URL: /blog/{slug}
  };
}
```

**Error Response (4xx/5xx):**
```typescript
interface ErrorResponse {
  success: false;
  error: string;                    // Human-readable error message
}
```

### 4.4 Status Codes

| Code | Description | Scenario |
|------|-------------|----------|
| 201 | Created | Post berhasil dibuat |
| 400 | Bad Request | Missing required fields, invalid data |
| 401 | Unauthorized | Invalid atau missing API key |
| 405 | Method Not Allowed | Non-POST request |
| 409 | Conflict | Duplicate slug |
| 500 | Internal Server Error | Database error, storage error |

### 4.5 Request Examples

**Minimal Request:**
```json
{
  "title": "Panduan Lengkap Kesehatan Ibu Hamil",
  "content": "<h2>Pendahuluan</h2><p>Artikel ini membahas...</p>"
}
```

**Full Request:**
```json
{
  "title": "10 Tips Menjaga Kesehatan Janin",
  "content": "<h2>Tips 1</h2><p>Konsumsi makanan bergizi...</p>",
  "slug": "10-tips-kesehatan-janin",
  "excerpt": "Panduan lengkap untuk menjaga kesehatan janin selama kehamilan",
  "author": "Dr. Rina Susanti",
  "category": "Kesehatan",
  "image_base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "image_filename": "kesehatan-janin.png",
  "image_mime_type": "image/png",
  "meta_fields": {
    "description": "Tips praktis menjaga kesehatan janin untuk ibu hamil"
  }
}
```

---

## 5. Security Design

### 5.1 Authentication Flow

```
1. Client Request
   └─> Include x-api-key header

2. Edge Function
   └─> Read x-api-key from request
   └─> Read BLOG_API_KEY from env
   └─> Compare values
   └─> If match: Continue
   └─> If not match: Return 401

3. Process Request
   └─> Use service_role_key for DB operations
   └─> Bypass RLS for INSERT
```

### 5.2 Row Level Security (RLS) Policies

**Policy 1: Public Read Access**
```sql
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (published = true);
```
- Allows: Public users to read published posts
- Denies: Access to unpublished posts

**Policy 2: Admin Full Access**
```sql
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);
```
- Allows: Admin users to do all operations
- Requires: User must have 'admin' role

**Policy 3: Service Role Bypass**
- Edge function uses `SUPABASE_SERVICE_ROLE_KEY`
- Bypasses all RLS policies
- Direct INSERT access

### 5.3 API Key Management

**Storage:**
- Stored as environment variable: `BLOG_API_KEY`
- Never hardcoded in source code
- Rotate every 90 days

**Format Recommendation:**
```
Format: {prefix}-{random-string}
Example: utero_blog_4k9mN7xQ2pL8vR5jT1wE6hY3aZ0sF
Length: 32+ characters
Characters: a-zA-Z0-9_-
```

**Security Best Practices:**
- Use strong random generation
- Different keys for dev/staging/production
- Log API key usage
- Implement rate limiting (future)

### 5.4 Input Sanitization

**Server-Side Validation:**
```typescript
// Title validation
if (!title || title.trim().length === 0) {
  throw new Error('Title is required');
}
if (title.length > 500) {
  throw new Error('Title too long (max 500 chars)');
}

// Content validation
if (!content || content.trim().length === 0) {
  throw new Error('Content is required');
}

// Slug validation (if provided)
if (slug && !/^[a-z0-9-]+$/.test(slug)) {
  throw new Error('Invalid slug format');
}

// Image validation
if (image_base64) {
  const sizeInBytes = (image_base64.length * 3) / 4;
  if (sizeInBytes > 5 * 1024 * 1024) { // 5MB limit
    throw new Error('Image too large (max 5MB)');
  }
}
```

**HTML Sanitization:**
- Frontend akan handle sanitization saat display
- Backend stores raw HTML
- Use DOMPurify atau similar di frontend

---

## 6. Storage Design

### 6.1 Storage Structure

**Bucket:** `blog-covers`

**Folder Structure:**
```
blog-covers/
├── 2026/
│   ├── 08/
│   │   ├── kesehatan-janin-1722709200000.png
│   │   ├── tips-kehamilan-1722709300000.jpg
│   │   └── panduan-nutrisi-1722709400000.webp
│   └── 09/
│       └── ...
└── ...
```

**File Naming Convention:**
```
Format: {slug}-{timestamp}.{extension}
Example: kesehatan-janin-1722709200000.png

Components:
- slug: URL-friendly post slug
- timestamp: Unix timestamp in milliseconds
- extension: png, jpg, jpeg, webp
```

### 6.2 Upload Flow

```
1. Receive base64 image
2. Decode base64 to bytes
3. Determine file extension from mime_type
4. Generate filename: {slug}-{Date.now()}.{ext}
5. Upload to: blog-covers/{filename}
6. Set upsert: true (overwrite if exists)
7. Get public URL
8. Store URL in database
```

### 6.3 Storage Policies

**Public Access:**
```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-covers');

-- Only service role can upload
CREATE POLICY "Service Upload"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'blog-covers');
```

### 6.4 Storage Optimization

**Image Processing (Future):**
- Auto-resize to max width: 1200px
- Auto-compress to 80% quality
- Generate thumbnails: 400x300
- Convert to WebP for better compression

**CDN Integration (Future):**
- Use Supabase CDN for serving images
- Cache-Control headers
- Lazy loading di frontend

---

## 7. Error Handling

### 7.1 Error Types

**1. Validation Errors (400)**
```typescript
{
  "success": false,
  "error": "title and content are required"
}
```

**2. Authentication Errors (401)**
```typescript
{
  "success": false,
  "error": "Unauthorized: Invalid API key"
}
```

**3. Method Errors (405)**
```typescript
{
  "success": false,
  "error": "Method not allowed"
}
```

**4. Conflict Errors (409)**
```typescript
{
  "success": false,
  "error": "Slug \"kesehatan-janin\" already exists"
}
```

**5. Server Errors (500)**
```typescript
{
  "success": false,
  "error": "Database connection failed"
}
```

### 7.2 Error Handling Strategy

```typescript
try {
  // Validation
  validateInput(body);
  
  // Process
  const slug = generateSlug(title);
  const coverUrl = await uploadImage(image);
  const post = await insertPost(data);
  
  // Success
  return success(post);
  
} catch (error) {
  // Log for debugging
  console.error('blog-auto-post error:', error);
  
  // Determine error type
  if (error.code === '23505') {
    // Duplicate slug
    return errorResponse(409, 'Slug already exists');
  }
  
  if (error.message.includes('required')) {
    // Validation error
    return errorResponse(400, error.message);
  }
  
  // Generic server error
  return errorResponse(500, error.message);
}
```

### 7.3 Logging Strategy

**Log Levels:**
- **INFO:** Successful operations
- **WARN:** Non-critical issues (e.g., missing optional fields)
- **ERROR:** Failed operations

**Log Format:**
```typescript
{
  timestamp: '2026-08-03T15:41:30.865Z',
  level: 'ERROR',
  function: 'blog-auto-post',
  operation: 'image_upload',
  error: {
    message: 'Storage bucket not found',
    code: 'BUCKET_NOT_FOUND',
    stack: '...'
  },
  context: {
    slug: 'kesehatan-janin',
    filename: 'kesehatan-janin.png'
  }
}
```

---

## 8. Performance Optimization

### 8.1 Response Time Breakdown

**Target: < 3 seconds total**

```
Component              | Target Time | Optimization
-----------------------|-------------|------------------
API Key Validation     | < 10ms      | In-memory compare
Input Validation       | < 50ms      | Minimal regex
Slug Generation        | < 20ms      | Simple string ops
Image Decode           | < 200ms     | Native base64
Storage Upload         | < 1500ms    | Direct upload
Database Insert        | < 300ms     | Indexed table
Response Generation    | < 20ms      | JSON serialize
-----------------------|-------------|------------------
Total                  | ~2100ms     | < 3s target
```

### 8.2 Database Optimization

**Indexing Strategy:**
```sql
-- Primary lookup
CREATE INDEX idx_blog_posts_id ON blog_posts(id);

-- Slug lookup (unique)
CREATE UNIQUE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Published listing
CREATE INDEX idx_blog_posts_published 
ON blog_posts(published, published_at DESC) 
WHERE published = true;
```

**Query Optimization:**
```sql
-- Efficient INSERT with RETURNING
INSERT INTO blog_posts (title, content, slug, ...)
VALUES ($1, $2, $3, ...)
RETURNING id, slug;  -- Only return needed fields
```

### 8.3 Caching Strategy (Future)

**Edge Caching:**
- Cache published posts for 5 minutes
- Invalidate on new post
- Use Supabase Realtime for cache invalidation

**CDN Caching:**
- Cache images for 1 year
- Cache-Control: public, max-age=31536000, immutable

---

## 9. Monitoring & Observability

### 9.1 Metrics to Track

**Performance Metrics:**
- API response time (p50, p95, p99)
- Image upload time
- Database query time
- Error rate

**Business Metrics:**
- Posts created per day
- Success rate
- API key usage
- Storage usage

### 9.2 Health Check Endpoint (Future)

```
GET /functions/v1/blog-auto-post/health

Response:
{
  "status": "healthy",
  "checks": {
    "database": "ok",
    "storage": "ok",
    "api_key": "configured"
  },
  "timestamp": "2026-08-03T15:41:30.865Z"
}
```

### 9.3 Alerting Rules

**Critical Alerts:**
- Error rate > 5% in 5 minutes → Page on-call
- Response time > 5s for 3 consecutive requests → Slack alert
- Storage upload failure rate > 10% → Email alert

**Warning Alerts:**
- Response time > 3s (p95) → Slack notification
- Storage usage > 80% → Email notification

---

## 10. Deployment Architecture

### 10.1 Environment Configuration

**Development:**
```
SUPABASE_URL=https://supabase.carubra.com
SUPABASE_SERVICE_ROLE_KEY=<dev_service_key>
BLOG_API_KEY=utero_blog_dev_xxx
```

**Production:**
```
SUPABASE_URL=https://supabase.carubra.com
SUPABASE_SERVICE_ROLE_KEY=<prod_service_key>
BLOG_API_KEY=utero_blog_prod_xxx
```

### 10.2 Deployment Steps

**1. Database Migration:**
```bash
# Connect to Supabase Studio
# Navigate to SQL Editor
# Run migration file
# Verify tables and policies
```

**2. Edge Function Deployment:**
```bash
# Manual deployment via Supabase Dashboard
# Upload function code
# Set environment variables
# Test endpoint
```

**3. Storage Setup:**
```bash
# Create bucket via Supabase Storage
# Set public access policy
# Verify upload permissions
```

### 10.3 Rollback Procedure

**Database Rollback:**
```sql
-- Drop table
DROP TABLE IF EXISTS public.blog_posts;

-- Drop policies
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;
```

**Function Rollback:**
- Delete function via Supabase Dashboard
- Remove environment variables
- Restore previous version if exists

---

## 11. Testing Strategy

### 11.1 Unit Tests

**Slug Generation:**
```typescript
describe('generateSlug', () => {
  it('should convert title to lowercase slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });
  
  it('should remove special characters', () => {
    expect(generateSlug('Hello @World!')).toBe('hello-world');
  });
  
  it('should truncate to 100 chars', () => {
    const longTitle = 'a'.repeat(150);
    expect(generateSlug(longTitle).length).toBe(100);
  });
});
```

### 11.2 Integration Tests

**API Endpoint:**
```typescript
describe('POST /blog-auto-post', () => {
  it('should create post with valid data', async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'x-api-key': API_KEY },
      body: JSON.stringify({ title: 'Test', content: '<p>Test</p>' })
    });
    expect(response.status).toBe(201);
    expect(response.json()).toHaveProperty('data.id');
  });
  
  it('should reject invalid API key', async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'x-api-key': 'invalid' },
      body: JSON.stringify({ title: 'Test', content: '<p>Test</p>' })
    });
    expect(response.status).toBe(401);
  });
});
```

### 11.3 Security Tests

**RLS Policy Tests:**
```sql
-- Test public read access
SET ROLE anon;
SELECT * FROM blog_posts WHERE published = true;  -- Should succeed
SELECT * FROM blog_posts WHERE published = false; -- Should return empty

-- Test admin access
SET ROLE authenticated;
-- With admin role
INSERT INTO blog_posts (...) VALUES (...);  -- Should succeed
-- Without admin role
INSERT INTO blog_posts (...) VALUES (...);  -- Should fail
```

---

## 12. Future Enhancements

### 12.1 Phase 2 Features

**Auto-Optimization:**
- Auto-generate excerpt dari content
- Auto-generate meta description
- SEO score analysis

**Rich Media:**
- Multiple image upload
- Video embed support
- Gallery support

**Scheduling:**
```typescript
{
  "title": "Scheduled Post",
  "content": "...",
  "publish_at": "2026-08-10T08:00:00Z"  // Future date
}
```

### 12.2 Phase 3 Features

**AI Integration:**
- Auto-generate featured image
- Content improvement suggestions
- SEO optimization recommendations

**Analytics:**
- Track post views
- Track engagement metrics
- A/B testing for titles

---

## 13. Appendix

### 13.1 Code Style Guide

**TypeScript/Deno:**
- Use strict TypeScript types
- Async/await over callbacks
- Descriptive variable names
- JSDoc comments for functions

**SQL:**
- Lowercase table and column names
- snake_case naming convention
- Explicit column types
- Comment complex queries

### 13.2 Naming Conventions

**Database:**
- Tables: `blog_posts`, `user_roles`
- Columns: `created_at`, `cover_url`
- Policies: `"Descriptive policy name"`

**API:**
- Endpoints: `/blog-auto-post`
- Headers: `x-api-key`
- Fields: `image_base64`, `meta_fields`

### 13.3 References

**Technology Documentation:**
- Deno: https://deno.land/manual
- Supabase: https://supabase.com/docs
- PostgreSQL: https://www.postgresql.org/docs/

**Related Documents:**
- PRD: Product Requirements Document
- API Documentation
- Deployment Guide

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-08-03 | Development Team | Initial SDD |

**Review Status**

| Reviewer | Role | Status | Date |
|----------|------|--------|------|
| - | Tech Lead | Pending | - |
| - | Security Lead | Pending | - |
| - | DevOps Lead | Pending | - |
