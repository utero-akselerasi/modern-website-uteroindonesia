# 🚨 Troubleshooting Guide - Supabase Self-Hosted
# Domain: supabase.carubra.com

Panduan lengkap untuk mengatasi masalah umum pada Supabase self-hosted instance.

---

## 📋 Daftar Isi

1. [Service Issues](#service-issues)
2. [Database Problems](#database-problems)
3. [Edge Functions Issues](#edge-functions-issues)
4. [Storage Problems](#storage-problems)
5. [Network & Connectivity](#network--connectivity)

---

## 🔧 Service Issues

### Problem: Service Won't Start

**Diagnosis:**
```bash
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose ps
docker-compose logs [service-name]
```

**Solutions:**
- Check port conflicts: `sudo netstat -tulpn | grep [PORT]`
- Check .env file: `cat .env`
- Fix permissions: `sudo chown -R $USER:$USER ./volumes/`
- Restart: `docker-compose restart`

---

## 💾 Database Problems

### Can't Connect to Database

```bash
# Test connection
docker-compose exec db psql -U postgres -c "SELECT 1;"

# Check logs
docker-compose logs db | tail -100

# Restart
docker-compose restart db
```

### Slow Queries

```sql
-- Check slow queries
SELECT pid, now() - query_start as duration, query
FROM pg_stat_activity
WHERE state != 'idle'
AND now() - query_start > interval '5 seconds';

-- Optimize
VACUUM ANALYZE;
REINDEX DATABASE postgres;
```

---

## ⚡ Edge Functions Issues

### Function Not Found (404)

```bash
# Check function exists
ls -la ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/blog-auto-post/

# Redeploy (from Windows)
.\deploy-function.ps1

# Restart
docker-compose restart edge-functions
```

### Function Returns 401

```bash
# Check .env
cat ~/docker/supabase/supabase-1.26.05/docker/volumes/functions/.env

# Should contain:
# BLOG_API_KEY=your-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Restart
docker-compose restart edge-functions
```

---

## 📦 Storage Problems

### File Upload Fails

```bash
# Fix permissions
sudo chown -R $USER:$USER ./volumes/storage/
chmod -R 755 ./volumes/storage/

# Create bucket
docker-compose exec db psql -U postgres -c "
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;"

# Restart
docker-compose restart storage imgproxy
```

---

## 🌐 Network & Connectivity

### Can't Access Domain

```bash
# Test DNS
nslookup supabase.carubra.com

# Test SSL
curl -I https://supabase.carubra.com

# Check firewall
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp

# Restart Kong
docker-compose restart kong
```

---

## 🆘 Emergency Recovery

```bash
# 1. Stop services
docker-compose down

# 2. Restore from backup
LATEST_DB=$(ls -t ~/backups/supabase/db_*.sql.gz | head -1)
gunzip -c $LATEST_DB | docker-compose exec -T db psql -U postgres postgres

# 3. Start services
docker-compose up -d

# 4. Check status
docker-compose ps
```

---

**Version**: 1.0.0  
**Domain**: supabase.carubra.com
