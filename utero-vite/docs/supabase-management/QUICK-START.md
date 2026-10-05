# 🚀 Quick Start - Supabase Management
# Domain: supabase.carubra.com

## 📋 Daily Operations Cheat Sheet

### Login & Navigate

```bash
# SSH to server
ssh maskhar@supabase.carubra.com

# Navigate to Supabase directory
cd ~/docker/supabase/supabase-1.26.05/docker
```

---

## ⚡ Common Tasks

### 1. Check Service Status

```bash
# View all services
docker-compose ps

# Check specific service
docker-compose ps db
docker-compose ps edge-functions
docker-compose ps storage
```

### 2. View Logs

```bash
# All services (real-time)
docker-compose logs -f

# Specific service
docker-compose logs -f edge-functions
docker-compose logs -f db
docker-compose logs -f storage

# Last 100 lines
docker-compose logs --tail=100 edge-functions

# Last 1 hour
docker-compose logs --since 1h edge-functions
```

### 3. Restart Services

```bash
# Restart specific service
docker-compose restart edge-functions

# Restart all services
docker-compose restart

# Full restart (stop + start)
docker-compose down
docker-compose up -d
```

---

## 💾 Database Quick Commands

### Connect to Database

```bash
# Connect via Docker
docker-compose exec db psql -U postgres -d postgres
```

### Common Queries

```sql
-- List all tables in schema
\dt "utero-artikel".*

-- Count blog posts
SELECT COUNT(*) FROM "utero-artikel".blog_posts;

-- Recent blog posts
SELECT id, title, slug, created_at 
FROM "utero-artikel".blog_posts 
ORDER BY created_at DESC 
LIMIT 10;

-- Articles by category
SELECT category, COUNT(*) 
FROM "utero-artikel".blog_posts 
GROUP BY category;

-- Unpublished articles
SELECT title, author, created_at 
FROM "utero-artikel".blog_posts 
WHERE published = false;

-- Database size
SELECT pg_size_pretty(pg_database_size('postgres'));

-- Exit psql
\q
```

### Quick Backup

```bash
# Backup database
docker-compose exec -T db pg_dump -U postgres postgres | gzip > ~/backup_$(date +%Y%m%d).sql.gz

# Backup specific schema
docker-compose exec -T db pg_dump -U postgres -n "utero-artikel" postgres > ~/utero_$(date +%Y%m%d).sql
```

---

## ⚡ Edge Functions

### Deploy Function (from local Windows machine)

```powershell
# Run deploy script
.\deploy-function.ps1

# Test function
.\test-api-key.ps1
```

### Manual Deploy

```bash
# On server
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions

# Backup current function
mv blog-auto-post blog-auto-post.backup

# Extract new function (uploaded to /tmp/)
unzip /tmp/blog-auto-post.zip -d blog-auto-post

# Set permissions
chmod -R 755 blog-auto-post

# Restart service
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions

# Check logs
docker-compose logs -f edge-functions
```

### Test Function

```bash
# Test API endpoint
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article",
    "content": "<p>Test content</p>",
    "excerpt": "Testing"
  }'
```

---

## 📦 Storage Management

### Check Storage Usage

```bash
# Storage volume size
du -sh ./volumes/storage/

# List buckets
ls -lh ./volumes/storage/

# Files in blog-covers
ls -lh ./volumes/storage/blog-covers/
```

### Check Buckets in Database

```sql
-- Connect to database first
docker-compose exec db psql -U postgres -d postgres

-- List all buckets
SELECT * FROM storage.buckets;

-- Count files per bucket
SELECT 
    bucket_id,
    COUNT(*) as file_count
FROM storage.objects
GROUP BY bucket_id;
```

---

## 🔍 Troubleshooting

### Service Won't Start

```bash
# Check logs for errors
docker-compose logs [service-name]

# Check if port is in use
sudo netstat -tulpn | grep [PORT]

# Check disk space
df -h

# Restart service
docker-compose restart [service-name]
```

### Database Issues

```bash
# Test database connection
docker-compose exec db psql -U postgres -c "SELECT version();"

# Check database logs
docker-compose logs db | tail -100

# Restart database
docker-compose restart db
```

### Function Not Working

```bash
# Check function exists
ls -la ./volumes/functions/blog-auto-post/

# Check environment variables
cat ./volumes/functions/.env

# Check logs
docker-compose logs edge-functions | grep "blog-auto-post"

# Restart edge functions
docker-compose restart edge-functions
```

---

## 🔒 Security Quick Checks

### Check Environment Variables

```bash
# Main .env file
cat .env | grep -E "PASSWORD|KEY|SECRET"

# Functions .env file
cat ./volumes/functions/.env
```

### Update API Key

```bash
# Generate new key
openssl rand -base64 32

# Update in functions/.env
nano ./volumes/functions/.env
# Edit: BLOG_API_KEY=new-key-here

# Restart
docker-compose restart edge-functions

# Update local .env
# Edit VITE_BLOG_API_KEY in local project
```

---

## 📊 Monitoring

### System Resources

```bash
# Docker stats
docker stats

# Disk usage
df -h

# Memory usage
free -h

# Docker disk usage
docker system df
```

### Database Statistics

```sql
-- Active connections
SELECT COUNT(*) FROM pg_stat_activity;

-- Database size
SELECT pg_size_pretty(pg_database_size('postgres'));

-- Table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'utero-artikel'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## 🆘 Emergency Procedures

### Complete Service Restart

```bash
cd ~/docker/supabase/supabase-1.26.05/docker

# Stop all
docker-compose down

# Wait
sleep 10

# Start all
docker-compose up -d

# Monitor
docker-compose logs -f
```

### Quick Restore

```bash
# Restore latest database backup
cd ~/docker/supabase/supabase-1.26.05/docker

LATEST=$(ls -t ~/backups/supabase/db_*.sql.gz | head -1)
gunzip -c $LATEST | docker-compose exec -T db psql -U postgres postgres

# Restart services
docker-compose restart
```

---

## 📞 Quick Reference Links

- **Dashboard**: https://supabase.carubra.com
- **API Endpoint**: https://supabase.carubra.com/functions/v1/blog-auto-post
- **Full Guide**: `docs/supabase-management/MANAGEMENT-GUIDE.md`

---

## 🎯 Most Used Commands

```bash
# Status check
docker-compose ps

# View logs
docker-compose logs -f edge-functions

# Restart service
docker-compose restart edge-functions

# Database connection
docker-compose exec db psql -U postgres -d postgres

# Quick backup
docker-compose exec -T db pg_dump -U postgres postgres | gzip > backup.sql.gz

# Deploy function (from Windows)
.\deploy-function.ps1

# Test function (from Windows)
.\test-api-key.ps1
```

---

**Quick Start Version**: 1.0.0  
**Domain**: supabase.carubra.com  
**Support**: maskhar@supabase.carubra.com
