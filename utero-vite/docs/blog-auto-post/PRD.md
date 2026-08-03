# Product Requirements Document (PRD)
# Blog Auto-Post System untuk UteroindonesiaCom

**Versi:** 1.0  
**Tanggal:** 3 Agustus 2026  
**Project:** uteroindonesia.com  
**Author:** Development Team

---

## 1. Executive Summary

Dokumen ini menjelaskan requirement untuk implementasi sistem Blog Auto-Post pada website uteroindonesia.com. Sistem ini memungkinkan posting artikel blog secara otomatis melalui API endpoint, dengan dukungan upload gambar, auto-generate slug, dan SEO optimization.

---

## 2. Business Objectives

### 2.1 Goals
- Mempermudah proses publikasi artikel untuk content team
- Mendukung integrasi dengan sistem eksternal (CMS, automation tools)
- Meningkatkan efisiensi workflow content publishing
- Menyediakan API yang aman dan reliable untuk posting artikel

### 2.2 Success Metrics
- API response time < 3 detik untuk artikel dengan gambar
- 99.9% uptime untuk endpoint auto-post
- Zero security breach pada API authentication
- Support minimal 100 artikel per hari

---

## 3. Target Users

### 3.1 Primary Users
- **Content Manager**: Mengelola dan publish artikel melalui automation tools
- **Marketing Team**: Posting artikel campaign secara terjadwal
- **External CMS**: Integrasi dengan platform content management eksternal

### 3.2 User Stories

#### US-001: Posting Artikel dengan Gambar
**As a** content manager  
**I want to** post artikel dengan cover image melalui API  
**So that** artikel dapat langsung publish tanpa manual upload

**Acceptance Criteria:**
- API menerima base64 encoded image
- Image otomatis diupload ke Supabase Storage
- Public URL image disimpan di database
- Support format: PNG, JPG, WEBP

#### US-002: Auto-Generate Slug
**As a** content manager  
**I want** sistem auto-generate slug dari title jika tidak disediakan  
**So that** saya tidak perlu manual membuat URL-friendly slug

**Acceptance Criteria:**
- Slug otomatis dibuat dari title jika tidak ada
- Normalisasi: lowercase, hapus special chars, replace space dengan dash
- Maximum 100 karakter
- Unique constraint validation

#### US-003: SEO Optimization
**As a** marketing team  
**I want to** set meta description dan excerpt untuk SEO  
**So that** artikel muncul dengan baik di search engine

**Acceptance Criteria:**
- Field meta_description tersedia
- Field excerpt untuk preview
- Auto-fill meta_description dari excerpt jika tidak ada

#### US-004: Secure API Access
**As a** system admin  
**I want** API dilindungi dengan API key authentication  
**So that** hanya authorized client yang dapat posting artikel

**Acceptance Criteria:**
- API key validation via x-api-key header
- Return 401 untuk unauthorized request
- API key stored di environment variable

---

## 4. Functional Requirements

### 4.1 Core Features

#### F-001: Blog Post API Endpoint
**Priority:** High  
**Description:** REST API endpoint untuk create blog post

**Specifications:**
- **Method:** POST
- **Endpoint:** `/functions/v1/blog-auto-post`
- **Authentication:** API Key (x-api-key header)
- **Content-Type:** application/json

**Request Body:**
```json
{
  "title": "string (required)",
  "content": "string HTML (required)",
  "slug": "string (optional)",
  "excerpt": "string (optional)",
  "author": "string (default: 'Utero Indonesia Team')",
  "category": "string (default: 'Artikel')",
  "image_base64": "string (optional)",
  "image_filename": "string (optional)",
  "image_mime_type": "string (default: 'image/png')",
  "meta_fields": {
    "description": "string (optional)"
  }
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "string",
    "cover_url": "string",
    "url": "/blog/slug"
  }
}
```

**Response Error:**
- 400: Missing required fields
- 401: Invalid API key
- 405: Method not allowed
- 409: Duplicate slug
- 500: Server error

#### F-002: Image Upload System
**Priority:** High  
**Description:** Upload dan store cover image untuk artikel

**Specifications:**
- Accept base64 encoded image
- Store di Supabase Storage bucket: `blog-covers`
- Folder path: `blog-covers/{filename}`
- Auto-generate filename jika tidak disediakan: `{slug}-{timestamp}.{ext}`
- Return public URL setelah upload
- Support upsert (overwrite jika exist)

#### F-003: Slug Generation
**Priority:** High  
**Description:** Auto-generate URL-friendly slug dari title

**Algorithm:**
1. Convert to lowercase
2. Remove non-alphanumeric characters (kecuali space dan dash)
3. Replace multiple spaces dengan single dash
4. Remove trailing/leading dashes
5. Truncate to 100 characters

**Example:**
```
Input:  "10 Tips Mengelola Keuangan Bisnis UKM di 2026!"
Output: "10-tips-mengelola-keuangan-bisnis-ukm-di-2026"
```

#### F-004: Database Schema
**Priority:** High  
**Description:** Table structure untuk menyimpan blog posts

**Table: blog_posts**
| Column | Type | Constraint | Default |
|--------|------|------------|---------|
| id | UUID | PRIMARY KEY | gen_random_uuid() |
| title | TEXT | NOT NULL | - |
| content | TEXT | - | NULL |
| slug | TEXT | UNIQUE | NULL |
| excerpt | TEXT | - | NULL |
| author | TEXT | NOT NULL | 'Utero Indonesia Team' |
| category | TEXT | NOT NULL | 'Artikel' |
| cover_url | TEXT | - | NULL |
| meta_description | TEXT | - | NULL |
| published | BOOLEAN | - | true |
| published_at | TIMESTAMPTZ | - | now() |
| sort_order | INTEGER | - | 0 |
| created_at | TIMESTAMPTZ | NOT NULL | now() |
| updated_at | TIMESTAMPTZ | NOT NULL | now() |

**Indexes:**
- PRIMARY KEY on id
- UNIQUE INDEX on slug
- INDEX on published, published_at (untuk query listing)

### 4.2 Security Requirements

#### S-001: API Authentication
- API key validation menggunakan environment variable `BLOG_API_KEY`
- Header: `x-api-key`
- Reject request tanpa valid API key dengan 401 Unauthorized

#### S-002: Row Level Security (RLS)
**Policy: Public Read**
- Anyone dapat SELECT published posts (published = true)

**Policy: Service Insert**
- Edge function menggunakan service_role_key untuk INSERT
- Bypass RLS untuk auto-post operation

**Policy: Admin Management**
- Admin dapat melakukan ALL operations (SELECT, INSERT, UPDATE, DELETE)
- Menggunakan custom role check function

#### S-003: Input Validation
- Validate required fields: title, content
- Sanitize HTML content (backend validation)
- Validate image mime type
- Prevent SQL injection via parameterized queries

### 4.3 Non-Functional Requirements

#### NFR-001: Performance
- API response time: < 3s dengan image upload
- Image upload: < 2s untuk file < 5MB
- Database query: < 500ms untuk insert operation

#### NFR-002: Reliability
- API uptime: 99.9%
- Auto-retry untuk failed image uploads (max 3 attempts)
- Graceful error handling dengan descriptive messages

#### NFR-003: Scalability
- Support minimal 100 artikel per hari
- Image storage: unlimited (Supabase Storage)
- Database: optimize dengan indexing

#### NFR-004: Maintainability
- Clean code dengan proper error handling
- Comprehensive logging untuk debugging
- Environment-based configuration

---

## 5. Technical Stack

### 5.1 Backend
- **Runtime:** Deno 1.x (Supabase Edge Functions)
- **Database:** PostgreSQL (Supabase Self-Hosted)
- **Storage:** Supabase Storage
- **API:** RESTful API

### 5.2 Infrastructure
- **Supabase URL:** `https://supabase.carubra.com`
- **Database:** Self-hosted PostgreSQL
- **Storage Bucket:** `blog-covers`
- **Edge Functions:** Manual deployment

### 5.3 Security
- API Key Authentication
- Row Level Security (RLS)
- HTTPS only
- CORS configuration

---

## 6. Data Flow

### 6.1 Blog Post Creation Flow
```
1. Client sends POST request dengan API key
2. Edge Function validates API key
3. Validate required fields (title, content)
4. Generate slug jika tidak ada
5. [Optional] Decode base64 image
6. [Optional] Upload image ke Storage
7. [Optional] Get public URL
8. Insert data ke blog_posts table
9. Return response dengan post data
```

### 6.2 Error Handling Flow
```
1. Catch error di try-catch block
2. Log error untuk debugging
3. Determine error type:
   - 400: Validation error
   - 401: Auth error
   - 409: Duplicate slug
   - 500: Server error
4. Return JSON error response
```

---

## 7. Integration Points

### 7.1 Frontend Integration
- Blog listing page: `/blog`
- Blog detail page: `/blog/:slug`
- Query published posts dari `blog_posts` table
- Display cover image dari `cover_url`

### 7.2 External Integration
- CMS platforms (WordPress, Strapi, etc.)
- Automation tools (Zapier, n8n, etc.)
- Content scheduling systems
- Marketing automation platforms

---

## 8. Future Enhancements

### 8.1 Phase 2 Features
- **Tags System:** Multi-tag support untuk kategorisasi
- **Draft Mode:** Save as draft sebelum publish
- **Scheduled Publishing:** Set publish_at untuk future date
- **Rich Media:** Support multiple images, videos, galleries
- **SEO Analysis:** Auto-check SEO score sebelum publish
- **Version Control:** Track artikel revisions

### 8.2 Phase 3 Features
- **AI Content Enhancement:** Auto-generate excerpt, meta description
- **Multi-language Support:** i18n untuk artikel
- **Analytics Integration:** Track views, engagement
- **Comment System:** User comments dengan moderation
- **Related Posts:** Auto-suggest related articles

---

## 9. Acceptance Criteria

### 9.1 Definition of Done
- [ ] SQL migration script created dan tested
- [ ] Edge function deployed dan functional
- [ ] API documentation complete
- [ ] Security policies implemented dan tested
- [ ] Error handling comprehensive
- [ ] Logging implemented
- [ ] Manual deployment guide documented
- [ ] Integration testing passed

### 9.2 Testing Checklist
- [ ] Unit test: Slug generation
- [ ] Integration test: API endpoint
- [ ] Security test: API key validation
- [ ] Security test: RLS policies
- [ ] Performance test: Response time < 3s
- [ ] Error handling test: All error scenarios
- [ ] Image upload test: Multiple formats
- [ ] Duplicate slug test: Unique constraint

---

## 10. Deployment Plan

### 10.1 Database Migration
1. Review SQL migration file
2. Backup existing database
3. Run migration script via Supabase Studio
4. Verify table structure dan policies
5. Test RLS policies

### 10.2 Edge Function Deployment
1. Review function code
2. Set environment variables di Supabase
   - `BLOG_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy function via Supabase CLI atau manual upload
4. Test endpoint dengan sample request
5. Verify authentication dan response

### 10.3 Rollback Plan
- Keep backup SQL sebelum migration
- Document rollback steps
- Test rollback procedure di staging

---

## 11. Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| API key leak | High | Low | Rotate key immediately, add IP whitelist |
| Storage quota exceed | Medium | Low | Monitor usage, implement file size limit |
| Duplicate slug error | Low | Medium | Auto-append timestamp untuk resolve |
| Performance degradation | Medium | Low | Add caching, optimize queries |
| Image upload failure | Medium | Medium | Implement retry logic, fallback tanpa image |

---

## 12. Support & Maintenance

### 12.1 Monitoring
- API endpoint uptime monitoring
- Error rate tracking
- Storage usage monitoring
- Database performance metrics

### 12.2 Maintenance Tasks
- Weekly: Review error logs
- Monthly: Analyze API usage patterns
- Quarterly: Security audit
- Yearly: Performance optimization review

---

## 13. References

### 13.1 Related Documents
- SDD (System Design Document)
- API Documentation
- Deployment Guide
- Security Audit Report

### 13.2 External Resources
- Supabase Documentation: https://supabase.com/docs
- Deno Documentation: https://deno.land/manual
- PostgreSQL Documentation: https://www.postgresql.org/docs/

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-08-03 | Development Team | Initial PRD |

**Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Manager | - | - | - |
| Tech Lead | - | - | - |
| Security Lead | - | - | - |
