# 🎛️ Panduan Manajemen Supabase Self-Hosted
# Domain: supabase.carubra.com
# Utero Indonesia

## 📋 Daftar Isi

1. [Akses & Monitoring](#akses--monitoring)
2. [Database Management](#database-management)
3. [Storage Management](#storage-management)
4. [Edge Functions Management](#edge-functions-management)
5. [Backup & Restore](#backup--restore)
6. [Security & Maintenance](#security--maintenance)
7. [Troubleshooting](#troubleshooting)
8. [Performance Optimization](#performance-optimization)

---

## 🔐 Akses & Monitoring

### SSH ke Server

```bash
# Login ke server
ssh maskhar@supabase.carubra.com

# Atau jika menggunakan IP
ssh maskhar@[IP_ADDRESS]

# Login dengan specific key
ssh -i ~/.ssh/id_rsa maskhar@supabase.carubra.com
```

### Lokasi Instalasi Supabase

```bash
# Navigate ke direktori Supabase
cd ~/docker/supabase/supabase-1.26.05/docker

# Check status semua services
docker-compose ps

# View running containers
docker ps

# Check disk usage
df -h
```

### Monitoring Services

```bash
# Check all service status
docker-compose ps

# Expected output:
# - db (PostgreSQL)
# - kong (API Gateway)
# - auth (GoTrue)
# - rest (PostgREST)
# - realtime
# - storage
# - imgproxy
# - edge-functions (Deno runtime)
# - studio (Dashboard)
# - meta
# - vector
# - analytics

# Check specific service health
docker-compose ps db
docker-compose ps edge-functions
docker-compose ps storage
```

### View Logs

```bash
# All services logs
docker-compose logs -f

# Specific service logs
docker-compose logs -f db
docker-compose logs -f edge-functions
docker-compose logs -f storage
docker-compose logs -f auth

# Last 100 lines
docker-compose logs --tail=100 edge-functions

# Filter by time
docker-compose logs --since 1h edge-functions

# Save logs to file
docker-compose logs edge-functions > edge-functions-$(date +%Y%m%d).log
```

### Dashboard Access

```bash
# Supabase Studio Dashboard
https://supabase.carubra.com

# Default credentials (jika belum diubah):
# Email: [check .env file]
# Password: [check .env file]

# Check dashboard port in .env
grep "STUDIO_PORT" .env
```

---

## 💾 Database Management

### Connect to Database

```bash
# Method 1: Via Docker
docker-compose exec db psql -U postgres -d postgres

# Method 2: Via connection string
# Get connection details from .env
grep "POSTGRES_PASSWORD" .env

# Connection string format:
# postgresql://postgres:[PASSWORD]@localhost:5432/postgres
```

### Database Queries

```sql
-- Connect to database first
docker-compose exec db psql -U postgres -d postgres

-- List all databases
\l

-- Connect to specific database
\c postgres

-- List all schemas
\dn

-- List tables in schema
\dt "utero-artikel".*

-- View table structure
\d "utero-artikel".blog_posts

-- Count blog posts
SELECT COUNT(*) FROM "utero-artikel".blog_posts;

-- View recent blog posts
SELECT 
    id, 
    title, 
    slug, 
    author,
    published,
    created_at 
FROM "utero-artikel".blog_posts 
ORDER BY created_at DESC 
LIMIT 10;

-- Check database size
SELECT 
    pg_size_pretty(pg_database_size('postgres')) as db_size;

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'utero-artikel'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- View active connections
SELECT 
    datname,
    usename,
    application_name,
    client_addr,
    state,
    query
FROM pg_stat_activity
WHERE datname = 'postgres';

-- Kill specific connection (if needed)
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE pid = [PID_NUMBER];
```

### Run Migrations

```bash
# Navigate to migrations directory
cd ~/docker/supabase/supabase-1.26.05/docker

# Run migration file
docker-compose exec db psql -U postgres -d postgres -f /path/to/migration.sql

# Or copy migration from local
scp ./supabase/migrations/new_migration.sql maskhar@supabase.carubra.com:/tmp/

# Then on server
docker-compose exec -T db psql -U postgres -d postgres < /tmp/new_migration.sql
```

### Database Backup

```bash
# Full database backup
docker-compose exec -T db pg_dump -U postgres postgres > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup specific schema
docker-compose exec -T db pg_dump -U postgres -n "utero-artikel" postgres > utero_artikel_$(date +%Y%m%d).sql

# Backup specific table
docker-compose exec -T db pg_dump -U postgres -t "utero-artikel.blog_posts" postgres > blog_posts_$(date +%Y%m%d).sql

# Compressed backup
docker-compose exec -T db pg_dump -U postgres postgres | gzip > backup_$(date +%Y%m%d).sql.gz

# Backup with custom format (faster restore)
docker-compose exec -T db pg_dump -U postgres -Fc postgres > backup_$(date +%Y%m%d).dump
```

### Database Restore

```bash
# Restore from SQL file
docker-compose exec -T db psql -U postgres postgres < backup_20260805.sql

# Restore compressed backup
gunzip -c backup_20260805.sql.gz | docker-compose exec -T db psql -U postgres postgres

# Restore custom format
docker-compose exec -T db pg_restore -U postgres -d postgres /path/to/backup.dump

# Restore specific schema only
docker-compose exec -T db pg_restore -U postgres -d postgres -n "utero-artikel" backup.dump
```

---

## 📦 Storage Management

### Access Storage

```bash
# Storage service logs
docker-compose logs -f storage

# Check storage volume
docker volume ls | grep storage

# Check storage directory size
du -sh ./volumes/storage/
```

### Storage Buckets

```sql
-- Connect to database
docker-compose exec db psql -U postgres -d postgres

-- List all buckets
SELECT * FROM storage.buckets;

-- Create new bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true);

-- Update bucket policy
UPDATE storage.buckets 
SET public = true 
WHERE id = 'blog-covers';

-- View bucket size
SELECT 
    bucket_id,
    COUNT(*) as file_count,
    pg_size_pretty(SUM(metadata->>'size')::bigint) as total_size
FROM storage.objects
GROUP BY bucket_id;
```

### Manage Files

```bash
# List files in storage volume
ls -lh ./volumes/storage/blog-covers/

# Check file permissions
ls -la ./volumes/storage/

# Clean up old files (be careful!)
# Backup first!
find ./volumes/storage/ -type f -mtime +90 -name "*.jpg" -ls

# Optimize images (if imagemagick installed)
find ./volumes/storage/blog-covers -name "*.jpg" -exec mogrify -resize 1920x1080\> -quality 85 {} \;
```

### Storage Cleanup

```sql
-- Find orphaned files (files without database records)
SELECT * FROM storage.objects 
WHERE bucket_id = 'blog-covers'
AND name NOT IN (
    SELECT REPLACE(cover_url, '/storage/v1/object/public/blog-covers/', '')
    FROM "utero-artikel".blog_posts
    WHERE cover_url IS NOT NULL
);

-- Delete orphaned files
DELETE FROM storage.objects 
WHERE id IN (
    SELECT id FROM storage.objects 
    WHERE bucket_id = 'blog-covers'
    AND name NOT IN (
        SELECT REPLACE(cover_url, '/storage/v1/object/public/blog-covers/', '')
        FROM "utero-artikel".blog_posts
        WHERE cover_url IS NOT NULL
    )
);
```

---

## ⚡ Edge Functions Management

### Function Locations

```bash
# Edge Functions directory
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions

# List deployed functions
ls -la

# Expected: blog-auto-post/
```

### Deploy Edge Function

```bash
# From local machine (Windows PowerShell)
.\deploy-function.ps1

# Manual deploy steps:

# 1. Compress function
cd utero-vite
Compress-Archive -Path .\supabase\functions\blog-auto-post\* -DestinationPath .\blog-auto-post.zip -Force

# 2. Upload to server
scp .\blog-auto-post.zip maskhar@supabase.carubra.com:/tmp/

# 3. SSH to server
ssh maskhar@supabase.carubra.com

# 4. Extract and deploy
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
rm -rf blog-auto-post.backup
mv blog-auto-post blog-auto-post.backup
unzip -o /tmp/blog-auto-post.zip -d blog-auto-post
chmod -R 755 blog-auto-post

# 5. Restart service
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions

# 6. Check logs
docker-compose logs -f edge-functions
```

### Function Environment Variables

```bash
# Navigate to functions directory
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions

# Edit .env file
nano .env

# Required variables:
# BLOG_API_KEY=your-secure-api-key-here
# SUPABASE_SERVICE_ROLE_KEY=[from main docker .env]

# Verify .env exists and has correct permissions
ls -la .env
chmod 600 .env

# Restart to apply changes
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions
```

### Test Edge Function

```bash
# From local machine (PowerShell)
.\test-api-key.ps1

# Manual curl test from server
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post from Server",
    "content": "<p>Test content</p>",
    "excerpt": "Testing edge function"
  }'

# Check function logs after test
docker-compose logs --tail=50 edge-functions
```

### Function Monitoring

```bash
# Real-time function logs
docker-compose logs -f edge-functions

# Check function errors
docker-compose logs edge-functions | grep -i error

# Check function performance
docker-compose logs edge-functions | grep "blog-auto-post"

# Function metrics (if available)
docker stats $(docker ps -q -f name=edge-functions)
```

---

## 💾 Backup & Restore

### Automated Backup Script

```bash
# Create backup script
nano ~/backup-supabase.sh
```

```bash
#!/bin/bash
# Supabase Backup Script
# Domain: supabase.carubra.com

BACKUP_DIR="/home/maskhar/backups/supabase"
DATE=$(date +%Y%m%d_%H%M%S)
DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"

# Create backup directory
mkdir -p $BACKUP_DIR

# Navigate to docker directory
cd $DOCKER_DIR

echo "Starting Supabase backup - $DATE"

# 1. Backup database
echo "Backing up database..."
docker-compose exec -T db pg_dump -U postgres postgres | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# 2. Backup storage files
echo "Backing up storage..."
tar -czf $BACKUP_DIR/storage_$DATE.tar.gz ./volumes/storage/

# 3. Backup functions
echo "Backing up edge functions..."
tar -czf $BACKUP_DIR/functions_$DATE.tar.gz ./volumes/functions/

# 4. Backup configuration
echo "Backing up configuration..."
cp .env $BACKUP_DIR/env_$DATE.backup
cp docker-compose.yml $BACKUP_DIR/docker-compose_$DATE.yml

# 5. Create backup manifest
echo "Creating manifest..."
cat > $BACKUP_DIR/manifest_$DATE.txt <<EOL
Supabase Backup
Date: $DATE
Database: db_$DATE.sql.gz
Storage: storage_$DATE.tar.gz
Functions: functions_$DATE.tar.gz
Environment: env_$DATE.backup
Docker Compose: docker-compose_$DATE.yml
EOL

# 6. Clean old backups (keep last 7 days)
echo "Cleaning old backups..."
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.backup" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR"
ls -lh $BACKUP_DIR/*$DATE*
```

```bash
# Make script executable
chmod +x ~/backup-supabase.sh

# Test backup
~/backup-supabase.sh

# Setup cron job for daily backup
crontab -e

# Add line (backup every day at 2 AM):
0 2 * * * /home/maskhar/backup-supabase.sh >> /home/maskhar/backup-supabase.log 2>&1
```

### Manual Backup

```bash
# Quick backup
cd ~/docker/supabase/supabase-1.26.05/docker

# Database only
docker-compose exec -T db pg_dump -U postgres postgres | gzip > ~/backup_$(date +%Y%m%d).sql.gz

# Everything
tar -czf ~/supabase_full_backup_$(date +%Y%m%d).tar.gz \
    ./volumes/ \
    .env \
    docker-compose.yml
```

### Restore from Backup

```bash
# Restore database
cd ~/docker/supabase/supabase-1.26.05/docker
gunzip -c ~/backups/supabase/db_20260805.sql.gz | docker-compose exec -T db psql -U postgres postgres

# Restore storage
cd ~/docker/supabase/supabase-1.26.05/docker
tar -xzf ~/backups/supabase/storage_20260805.tar.gz

# Restore functions
tar -xzf ~/backups/supabase/functions_20260805.tar.gz

# Restart services
docker-compose restart
```

---

## 🔒 Security & Maintenance

### Update Environment Keys

```bash
cd ~/docker/supabase/supabase-1.26.05/docker

# Backup current .env
cp .env .env.backup.$(date +%Y%m%d)

# Edit .env
nano .env

# Important keys to secure:
# - POSTGRES_PASSWORD
# - JWT_SECRET
# - ANON_KEY
# - SERVICE_ROLE_KEY
# - DASHBOARD_USERNAME
# - DASHBOARD_PASSWORD

# After changes, restart
docker-compose down
docker-compose up -d

# Verify services started correctly
docker-compose ps
```

### Generate New API Keys

```bash
# Generate new blog API key
openssl rand -base64 32

# Update in two places:
# 1. Local .env (VITE_BLOG_API_KEY)
# 2. Server functions/.env (BLOG_API_KEY)

# Update JWT secret (advanced)
openssl rand -base64 64

# This requires updating:
# - docker/.env (JWT_SECRET)
# - Re-issue all JWT tokens
# - Restart all services
```

### SSL Certificate Management

```bash
# Check SSL certificate expiry
echo | openssl s_client -servername supabase.carubra.com -connect supabase.carubra.com:443 2>/dev/null | openssl x509 -noout -dates

# Renew Let's Encrypt certificate (if using certbot)
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal

# Restart Kong after certificate renewal
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart kong
```

### Update Supabase

```bash
# Check current version
cd ~/docker/supabase/supabase-1.26.05/docker
grep "image:" docker-compose.yml | head -5

# Backup before update
~/backup-supabase.sh

# Pull new images
docker-compose pull

# Restart with new images
docker-compose down
docker-compose up -d

# Check logs for errors
docker-compose logs -f

# Rollback if needed
docker-compose down
# Restore from backup
docker-compose up -d
```

### Security Audit

```bash
# Check open ports
sudo netstat -tulpn | grep LISTEN

# Check failed login attempts
sudo grep "Failed password" /var/log/auth.log

# Check disk usage
df -h

# Check memory usage
free -h

# Check Docker disk usage
docker system df

# Clean up Docker
docker system prune -a --volumes

# Check for unused volumes
docker volume ls -qf dangling=true

# Remove unused volumes
docker volume prune
```

---

## 🔧 Troubleshooting

### Service Won't Start

```bash
# Check logs
docker-compose logs [service-name]

# Common issues:

# 1. Port already in use
sudo netstat -tulpn | grep [PORT]
# Kill process using port
sudo kill -9 [PID]

# 2. Disk space full
df -h
# Clean up space
docker system prune -a

# 3. Corrupted volume
docker volume ls
docker volume rm [volume-name]
# Restore from backup

# 4. Environment variable missing
grep "ERROR" .env
nano .env

# Restart services
docker-compose restart
```

### Database Connection Issues

```bash
# Test database connection
docker-compose exec db psql -U postgres -c "SELECT version();"

# Check database logs
docker-compose logs db | tail -100

# Check connections
docker-compose exec db psql -U postgres -c "SELECT * FROM pg_stat_activity;"

# Restart database
docker-compose restart db

# If database won't start, check:
# 1. Disk space
df -h
# 2. Permissions
ls -la ./volumes/db/
# 3. PostgreSQL logs
docker-compose logs db
```

### Edge Function Not Working

```bash
# Check function exists
ls -la ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/blog-auto-post/

# Check function logs
docker-compose logs edge-functions | grep "blog-auto-post"

# Check environment variables
cat ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/.env

# Restart edge functions
docker-compose restart edge-functions

# Test function
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"<p>Test</p>","excerpt":"Test"}'

# Redeploy function
cd /path/to/local/project
.\deploy-function.ps1
```

### Storage Issues

```bash
# Check storage service
docker-compose ps storage
docker-compose logs storage

# Check storage permissions
ls -la ./volumes/storage/

# Fix permissions
sudo chown -R maskhar:maskhar ./volumes/storage/
chmod -R 755 ./volumes/storage/

# Check bucket configuration
docker-compose exec db psql -U postgres -c "SELECT * FROM storage.buckets;"

# Restart storage
docker-compose restart storage imgproxy
```

### Performance Issues

```bash
# Check resource usage
docker stats

# Check system resources
top
htop

# Check disk I/O
iostat -x 1

# Check database performance
docker-compose exec db psql -U postgres -c "
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;
"

# Analyze slow queries
docker-compose exec db psql -U postgres -c "
SELECT 
    query, 
    calls, 
    mean_exec_time, 
    max_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
"
```

---

## ⚡ Performance Optimization

### Database Optimization

```sql
-- Connect to database
docker-compose exec db psql -U postgres -d postgres

-- Vacuum analyze (clean up and update statistics)
VACUUM ANALYZE;

-- Vacuum specific table
VACUUM ANALYZE "utero-artikel".blog_posts;

-- Reindex database
REINDEX DATABASE postgres;

-- Reindex specific table
REINDEX TABLE "utero-artikel".blog_posts;

-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'utero-artikel'
ORDER BY idx_scan DESC;

-- Find missing indexes
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats
WHERE schemaname = 'utero-artikel'
  AND n_distinct > 100
ORDER BY n_distinct DESC;
```

### Connection Pooling

```bash
# Edit PostgreSQL config
docker-compose exec db psql -U postgres -c "SHOW max_connections;"

# Adjust in docker-compose.yml or .env
# max_connections = 100
# shared_buffers = 256MB
# effective_cache_size = 1GB
# work_mem = 4MB
```

### Storage Optimization

```bash
# Compress old images
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/storage/blog-covers/

# Find large files
find . -type f -size +1M -ls

# Optimize images (requires imagemagick)
find . -name "*.jpg" -exec mogrify -resize 1920x1080\> -quality 85 {} \;
find . -name "*.png" -exec mogrify -resize 1920x1080\> {} \;

# Convert PNG to WebP (better compression)
find . -name "*.png" -exec sh -c 'cwebp -q 85 "$1" -o "${1%.png}.webp"' _ {} \;
```

### Cache Configuration

```bash
# Configure Kong caching
# Edit docker-compose.yml kong service environment variables

# Redis cache (if available)
docker-compose exec redis redis-cli

# Check cache hit rate
INFO stats

# Clear cache
FLUSHALL
```

### Monitoring Setup

```bash
# Install monitoring tools (optional)

# 1. Prometheus + Grafana
# Add to docker-compose.yml

# 2. pg_stat_statements for query analytics
docker-compose exec db psql -U postgres -c "CREATE EXTENSION IF NOT EXISTS pg_stat_statements;"

# 3. Setup log rotation
sudo nano /etc/logrotate.d/docker-supabase

# Add:
# /home/maskhar/docker/supabase/supabase-1.26.05/docker/logs/*.log {
#     daily
#     rotate 7
#     compress
#     missingok
#     notifempty
# }
```

---

## 📊 Useful Queries & Scripts

### Blog Statistics

```sql
-- Total articles
SELECT COUNT(*) FROM "utero-artikel".blog_posts;

-- Articles by category
SELECT 
    category, 
    COUNT(*) as total,
    COUNT(CASE WHEN published THEN 1 END) as published
FROM "utero-artikel".blog_posts
GROUP BY category
ORDER BY total DESC;

-- Articles by author
SELECT 
    author,
    COUNT(*) as total
FROM "utero-artikel".blog_posts
GROUP BY author
ORDER BY total DESC;

-- Recent articles
SELECT 
    title,
    author,
    category,
    published,
    created_at
FROM "utero-artikel".blog_posts
ORDER BY created_at DESC
LIMIT 10;

-- Articles without images
SELECT 
    id,
    title,
    slug
FROM "utero-artikel".blog_posts
WHERE cover_url IS NULL;

-- Unpublished articles
SELECT 
    title,
    author,
    created_at
FROM "utero-artikel".blog_posts
WHERE published = false
ORDER BY created_at DESC;
```

### Health Check Script

```bash
#!/bin/bash
# Supabase Health Check
# Save as: ~/health-check-supabase.sh

cd ~/docker/supabase/supabase-1.26.05/docker

echo "=== Supabase Health Check ==="
echo "Date: $(date)"
echo ""

echo "1. Docker Services Status:"
docker-compose ps
echo ""

echo "2. Database Connection:"
docker-compose exec -T db psql -U postgres -c "SELECT version();" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Database: OK"
else
    echo "❌ Database: FAILED"
fi
echo ""

echo "3. Database Size:"
docker-compose exec -T db psql -U postgres -c "SELECT pg_size_pretty(pg_database_size('postgres')) as size;"
echo ""

echo "4. Storage Status:"
echo "Storage volume size: $(du -sh ./volumes/storage/ 2>/dev/null | cut -f1)"
echo ""

echo "5. Edge Functions Status:"
docker-compose ps edge-functions | grep -q "Up"
if [ $? -eq 0 ]; then
    echo "✅ Edge Functions: Running"
else
    echo "❌ Edge Functions: Not Running"
fi
echo ""

echo "6. Disk Usage:"
df -h | grep -E "Filesystem|/$"
echo ""

echo "7. Memory Usage:"
free -h
echo ""

echo "=== Health Check Complete ==="
```

```bash
# Make executable
chmod +x ~/health-check-supabase.sh

# Run health check
~/health-check-supabase.sh

# Schedule daily health check
crontab -e
# Add: 0 8 * * * /home/maskhar/health-check-supabase.sh | mail -s "Supabase Health Report" admin@example.com
```

---

## 📞 Emergency Procedures

### Complete Service Restart

```bash
cd ~/docker/supabase/supabase-1.26.05/docker

# Stop all services
docker-compose down

# Wait 10 seconds
sleep 10

# Start all services
docker-compose up -d

# Monitor startup
docker-compose logs -f
```

### Emergency Restore

```bash
# If everything is broken, restore from latest backup

# 1. Stop services
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose down

# 2. Restore database
LATEST_DB=$(ls -t ~/backups/supabase/db_*.sql.gz | head -1)
gunzip -c $LATEST_DB | docker-compose exec -T db psql -U postgres postgres

# 3. Restore storage
LATEST_STORAGE=$(ls -t ~/backups/supabase/storage_*.tar.gz | head -1)
tar -xzf $LATEST_STORAGE

# 4. Restore functions
LATEST_FUNCTIONS=$(ls -t ~/backups/supabase/functions_*.tar.gz | head -1)
tar -xzf $LATEST_FUNCTIONS

# 5. Start services
docker-compose up -d

# 6. Verify
docker-compose ps
docker-compose logs -f
```

---

## 📚 Quick Reference

### Essential Commands

```bash
# SSH to server
ssh maskhar@supabase.carubra.com

# Navigate to Supabase
cd ~/docker/supabase/supabase-1.26.05/docker

# Check status
docker-compose ps

# View logs
docker-compose logs -f [service]

# Restart service
docker-compose restart [service]

# Backup database
docker-compose exec -T db pg_dump -U postgres postgres | gzip > backup.sql.gz

# Connect to database
docker-compose exec db psql -U postgres -d postgres

# Deploy function
cd /local/project && .\deploy-function.ps1

# Test function
.\test-api-key.ps1
```

### Important Paths

```bash
# Supabase installation
~/docker/supabase/supabase-1.26.05/docker/

# Database data
~/docker/supabase/supabase-1.26.05/docker/volumes/db/

# Storage files
~/docker/supabase/supabase-1.26.05/docker/volumes/storage/

# Edge Functions
~/docker/supabase/supabase-1.26.05/docker/volumes/functions/

# Environment config
~/docker/supabase/supabase-1.26.05/docker/.env

# Backups
~/backups/supabase/
```

### Key Environment Variables

```bash
# Main .env location
~/docker/supabase/supabase-1.26.05/docker/.env

# Important variables:
# - POSTGRES_PASSWORD
# - JWT_SECRET
# - ANON_KEY
# - SERVICE_ROLE_KEY
# - DASHBOARD_USERNAME
# - DASHBOARD_PASSWORD

# Functions .env location
~/docker/supabase/supabase-1.26.05/docker/volumes/functions/.env

# Important variables:
# - BLOG_API_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

---

## 🆘 Support Contacts

**Server Admin**: maskhar@supabase.carubra.com  
**Supabase Documentation**: https://supabase.com/docs  
**GitHub Issues**: https://github.com/supabase/supabase/issues

**PT. Utero Kreatif Indonesia**  
Email: info@uterogroup.com  
Phone: +62 812-1665-0111

---

**Document Version**: 1.0.0  
**Last Updated**: August 5, 2026  
**Domain**: supabase.carubra.com  
**Next Review**: Monthly
