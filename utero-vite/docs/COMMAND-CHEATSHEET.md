# Self-Hosted Supabase - Command Cheat Sheet

Quick reference untuk command yang sering dipakai saat bekerja dengan self-hosted Supabase.

---

## 🖥️ SSH & Server Access

```bash
# SSH ke server
ssh maskhar@supabase-server

# SSH dengan specific port
ssh -p 22 maskhar@supabase-server

# SCP file ke server
scp local-file.txt maskhar@supabase-server:/remote/path/

# SCP folder ke server
scp -r local-folder/ maskhar@supabase-server:/remote/path/

# SSH dengan command execution
ssh maskhar@supabase-server "cd /path && ls -la"
```

---

## 🐳 Docker Commands

### Navigate to Supabase Directory
```bash
cd ~/docker/supabase/supabase-1.26.05/docker
```

### Container Management
```bash
# List all containers
docker-compose ps

# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart edge-functions
docker-compose restart db
docker-compose restart kong
```

### Logs
```bash
# View all logs
docker-compose logs

# Follow logs (real-time)
docker-compose logs -f

# Logs for specific service
docker-compose logs edge-functions
docker-compose logs -f edge-functions

# Last 100 lines
docker-compose logs --tail=100 edge-functions

# Logs with timestamps
docker-compose logs -t edge-functions
```

### Container Shell Access
```bash
# Access Edge Functions container
docker-compose exec edge-functions sh

# Access Database container
docker-compose exec db bash

# Access Kong container
docker-compose exec kong sh
```

---

## 📂 Edge Functions

### Navigate to Functions Directory
```bash
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
```

### Function Management
```bash
# List all functions
ls -la

# View function code
cat blog-auto-post/index.ts

# Edit function .env
nano .env

# View function .env
cat .env

# Check function structure
tree blog-auto-post/
```

### Deploy Function (Manual)
```bash
# From local machine
scp -r supabase/functions/blog-auto-post maskhar@supabase-server:/tmp/

# On server
cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions
rm -rf blog-auto-post
mv /tmp/blog-auto-post .
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions
```

---

## 🗄️ Database Commands

### Access Database
```bash
# Connect to PostgreSQL
docker-compose exec db psql -U postgres -d postgres

# Connect with specific database
docker-compose exec db psql -U postgres -d your_database
```

### SQL Queries
```bash
# Execute SQL file
docker-compose exec db psql -U postgres -d postgres -f /path/to/migration.sql

# Execute SQL command
docker-compose exec db psql -U postgres -d postgres -c "SELECT * FROM blog_posts LIMIT 5;"

# Execute from stdin
cat migration.sql | docker-compose exec -T db psql -U postgres -d postgres
```

### Database Management
```bash
# List all databases
docker-compose exec db psql -U postgres -c "\l"

# List all tables
docker-compose exec db psql -U postgres -d postgres -c "\dt"

# Describe table
docker-compose exec db psql -U postgres -d postgres -c "\d blog_posts"

# Backup database
docker-compose exec db pg_dump -U postgres -d postgres > backup_$(date +%Y%m%d).sql

# Restore database
cat backup.sql | docker-compose exec -T db psql -U postgres -d postgres

# Vacuum and analyze
docker-compose exec db psql -U postgres -d postgres -c "VACUUM ANALYZE;"
```

### Common SQL Queries
```sql
-- View all blog posts
SELECT id, title, slug, published, published_at FROM blog_posts ORDER BY created_at DESC;

-- Count posts
SELECT COUNT(*) FROM blog_posts WHERE published = true;

-- Delete test posts
DELETE FROM blog_posts WHERE slug LIKE 'test-%';

-- Update post status
UPDATE blog_posts SET published = true WHERE slug = 'my-article';

-- View storage objects
SELECT * FROM storage.objects WHERE bucket_id = 'blog-covers';
```

---

## 📦 Storage Commands

### Storage Bucket Management
```bash
# List buckets (via SQL)
docker-compose exec db psql -U postgres -d postgres -c "SELECT * FROM storage.buckets;"

# List files in bucket
docker-compose exec db psql -U postgres -d postgres -c "SELECT * FROM storage.objects WHERE bucket_id = 'blog-covers';"

# Check storage directory
docker-compose exec storage ls -la /var/lib/storage
```

---

## 🔧 Configuration

### View Environment Variables
```bash
# Main .env
cat ~/docker/supabase/supabase-1.26.05/docker/.env

# Functions .env
cat ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/.env

# Grep specific variables
grep "ANON_KEY\|SERVICE_ROLE_KEY" ~/docker/supabase/supabase-1.26.05/docker/.env
```

### Edit Configuration
```bash
# Edit main .env
nano ~/docker/supabase/supabase-1.26.05/docker/.env

# Edit functions .env
nano ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/.env

# Edit docker-compose
nano ~/docker/supabase/supabase-1.26.05/docker/docker-compose.yml
```

---

## 🔍 Monitoring & Debugging

### Check Service Status
```bash
# All services
docker-compose ps

# Specific service status
docker-compose ps edge-functions

# Service health
docker-compose top
```

### Resource Usage
```bash
# Docker stats
docker stats

# Disk usage
df -h

# Check port usage
netstat -tuln | grep :8000
ss -tuln | grep :8000
```

### Test Edge Function
```bash
# Test with curl
curl -X POST https://supabase.carubra.com/functions/v1/blog-auto-post \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"<p>Test</p>"}'

# Test with verbose
curl -v https://supabase.carubra.com/functions/v1/blog-auto-post

# Test CORS
curl -H "Origin: https://example.com" \
  --head https://supabase.carubra.com/functions/v1/blog-auto-post
```

---

## 🔐 Security

### Generate API Keys
```bash
# Generate random key (32 bytes base64)
openssl rand -base64 32

# Generate random key (64 bytes hex)
openssl rand -hex 64

# Generate UUID
uuidgen

# Or in PostgreSQL
docker-compose exec db psql -U postgres -c "SELECT gen_random_uuid();"
```

### File Permissions
```bash
# Fix permissions
chmod 600 ~/docker/supabase/supabase-1.26.05/docker/.env
chmod 600 ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/.env

# Check permissions
ls -la ~/docker/supabase/supabase-1.26.05/docker/.env
```

---

## 📊 Performance

### Database Performance
```bash
# Slow queries
docker-compose exec db psql -U postgres -d postgres -c "
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
"

# Table sizes
docker-compose exec db psql -U postgres -d postgres -c "
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
"

# Index usage
docker-compose exec db psql -U postgres -d postgres -c "
SELECT 
  indexrelname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
"
```

---

## 🔄 Updates & Maintenance

### Update Docker Images
```bash
cd ~/docker/supabase/supabase-1.26.05/docker

# Pull latest images
docker-compose pull

# Restart with new images
docker-compose up -d

# Remove old images
docker image prune -a
```

### Cleanup
```bash
# Remove stopped containers
docker-compose rm

# Clean up Docker
docker system prune -a

# Clean up logs
docker-compose logs --tail=0 -f > /dev/null &
```

---

## 🚨 Emergency Commands

### Emergency Restart
```bash
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose down
docker-compose up -d
```

### Emergency Logs
```bash
# Get last 1000 lines of all logs
docker-compose logs --tail=1000 > emergency_logs.txt

# Get all container info
docker-compose ps > container_status.txt
docker stats --no-stream >> container_status.txt
```

### Database Emergency
```bash
# Force checkpoint
docker-compose exec db psql -U postgres -c "CHECKPOINT;"

# Kill long-running queries
docker-compose exec db psql -U postgres -c "
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'active' AND query_start < NOW() - INTERVAL '10 minutes';
"
```

---

## 💡 Tips & Tricks

### Aliases (Add to ~/.bashrc)
```bash
# Quick navigation
alias cdsupabase='cd ~/docker/supabase/supabase-1.26.05/docker'
alias cdfunctions='cd ~/docker/supabase/supabase-1.26.05/docker/volumes/functions'

# Quick commands
alias splog='docker-compose logs -f edge-functions'
alias spdb='docker-compose exec db psql -U postgres -d postgres'
alias sprestart='docker-compose restart edge-functions'
alias spstatus='docker-compose ps'

# Load aliases
source ~/.bashrc
```

### One-Liners
```bash
# Quick function deploy check
ssh maskhar@supabase-server "ls -la ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/blog-auto-post/"

# Quick log check
ssh maskhar@supabase-server "cd ~/docker/supabase/supabase-1.26.05/docker && docker-compose logs --tail=50 edge-functions"

# Quick restart
ssh maskhar@supabase-server "cd ~/docker/supabase/supabase-1.26.05/docker && docker-compose restart edge-functions"
```

---

## 📞 Support

**PT. Utero Kreatif Indonesia**
- Website: https://uteroindonesia.com
- Email: info@uterogroup.com

---

**Last Updated**: August 5, 2026
