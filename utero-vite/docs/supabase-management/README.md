# 📚 Supabase Management Documentation
**Domain**: supabase.carubra.com  
**Project**: Utero Indonesia

---

## 📖 Dokumentasi Tersedia

### 1. **MANAGEMENT-GUIDE.md** - Panduan Lengkap
Panduan komprehensif untuk mengelola Supabase self-hosted instance.

**Isi:**
- Akses & Monitoring
- Database Management
- Storage Management
- Edge Functions Management
- Backup & Restore
- Security & Maintenance
- Performance Optimization
- Troubleshooting

**Kapan Digunakan:** Referensi lengkap untuk semua operasi management.

---

### 2. **QUICK-START.md** - Cheat Sheet Harian
Panduan cepat untuk operasi sehari-hari.

**Isi:**
- Common tasks (status, logs, restart)
- Database quick commands
- Edge Functions deployment
- Storage management
- Troubleshooting quick fixes
- Most used commands

**Kapan Digunakan:** Daily operations, quick reference.

---

### 3. **MAINTENANCE-SCRIPTS.md** - Automated Scripts
Kumpulan script untuk maintenance otomatis.

**Scripts Tersedia:**
- `backup-supabase.sh` - Automated backup
- `health-check.sh` - System health monitoring
- `cleanup-optimize.sh` - Cleanup & optimization
- `db-stats.sh` - Database statistics
- `restart-services.sh` - Service restart manager

**Kapan Digunakan:** Setup automation, scheduled tasks.

---

### 4. **TROUBLESHOOTING.md** - Problem Solving
Panduan mengatasi masalah umum.

**Isi:**
- Service issues
- Database problems
- Edge Functions errors
- Storage problems
- Network connectivity
- Emergency recovery

**Kapan Digunakan:** Ketika ada masalah atau error.

---

## 🚀 Quick Start

### Pertama Kali Setup

```bash
# 1. SSH ke server
ssh maskhar@supabase.carubra.com

# 2. Download & setup scripts
cd ~
# Upload scripts dari local (Windows PowerShell):
# scp *.sh maskhar@supabase.carubra.com:~/

# 3. Make executable
chmod +x ~/*.sh

# 4. Setup automated backup
crontab -e
# Add: 0 2 * * * /home/maskhar/backup-supabase.sh >> /home/maskhar/logs/backup.log 2>&1
```

### Daily Operations

```bash
# Check status
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose ps

# View logs
docker-compose logs -f edge-functions

# Restart service
docker-compose restart edge-functions

# Quick backup
docker-compose exec -T db pg_dump -U postgres postgres | gzip > backup.sql.gz
```

---

## 📋 Workflow Umum

### Deploy Edge Function

**From Windows:**
```powershell
# 1. Edit function code
code .\supabase\functions\blog-auto-post\index.ts

# 2. Deploy
.\deploy-function.ps1

# 3. Test
.\test-api-key.ps1
```

**Manual:**
```bash
# 1. SSH to server
ssh maskhar@supabase.carubra.com

# 2. Navigate
cd ~/docker/supabase/supabase-1.26.05/docker

# 3. Backup old function
mv volumes/functions/blog-auto-post volumes/functions/blog-auto-post.backup

# 4. Upload new function
# (use scp from local machine)

# 5. Restart
docker-compose restart edge-functions
```

### Database Maintenance

```bash
# Weekly maintenance
ssh maskhar@supabase.carubra.com
cd ~/docker/supabase/supabase-1.26.05/docker

# 1. Backup
docker-compose exec -T db pg_dump -U postgres postgres | gzip > backup.sql.gz

# 2. Optimize
docker-compose exec db psql -U postgres -c "VACUUM ANALYZE;"

# 3. Check stats
docker-compose exec db psql -U postgres -c "
SELECT pg_size_pretty(pg_database_size('postgres'));"

# 4. Check blog posts
docker-compose exec db psql -U postgres -c '
SELECT COUNT(*) FROM "utero-artikel".blog_posts;'
```

### Monitoring

```bash
# Daily health check
~/health-check.sh

# Check disk space
df -h

# Check memory
free -h

# Check Docker stats
docker stats --no-stream

# Check recent logs
docker-compose logs --tail=100 edge-functions
```

---

## 🔧 Troubleshooting Flow

### Step 1: Identify Problem

```bash
# Check service status
docker-compose ps

# Check recent logs
docker-compose logs --tail=200 [service-name]

# Check system resources
df -h
free -h
```

### Step 2: Quick Fixes

```bash
# Try restart first
docker-compose restart [service-name]

# Check logs after restart
docker-compose logs -f [service-name]
```

### Step 3: Deeper Investigation

```bash
# Check configuration
cat .env

# Check permissions
ls -la ./volumes/

# Check database
docker-compose exec db psql -U postgres -c "SELECT 1;"
```

### Step 4: Restore if Needed

```bash
# Restore from backup
cd ~/backups/supabase
ls -lt | head -10

# Restore database
gunzip -c db_YYYYMMDD.sql.gz | docker-compose exec -T db psql -U postgres postgres
```

---

## 📞 Support & Resources

### Documentation Files
- `MANAGEMENT-GUIDE.md` - Full management guide
- `QUICK-START.md` - Daily operations cheat sheet
- `MAINTENANCE-SCRIPTS.md` - Automation scripts
- `TROUBLESHOOTING.md` - Problem solving guide

### External Resources
- **Supabase Docs**: https://supabase.com/docs
- **GitHub**: https://github.com/supabase/supabase
- **Discord**: https://discord.supabase.com

### Server Info
- **Domain**: supabase.carubra.com
- **SSH**: `ssh maskhar@supabase.carubra.com`
- **Docker Path**: `~/docker/supabase/supabase-1.26.05/docker`
- **Backup Path**: `~/backups/supabase/`

### Contact
**PT. Utero Kreatif Indonesia**  
Email: info@uterogroup.com  
Phone: +62 812-1665-0111

---

## 🎓 Best Practices

### Security
- ✅ Keep API keys secure
- ✅ Regular password rotation
- ✅ Monitor access logs
- ✅ Use SSH keys (not passwords)
- ✅ Keep backups encrypted

### Backups
- ✅ Daily automated backups
- ✅ Test restores regularly
- ✅ Keep 7 days of backups
- ✅ Store backups off-server
- ✅ Document restore procedures

### Monitoring
- ✅ Daily health checks
- ✅ Monitor disk space
- ✅ Track database size
- ✅ Check service logs
- ✅ Alert on failures

### Maintenance
- ✅ Weekly database VACUUM
- ✅ Monthly cleanup old data
- ✅ Update documentation
- ✅ Review security settings
- ✅ Test disaster recovery

---

## 📈 Metrics to Monitor

### System Health
- Disk usage < 80%
- Memory usage < 80%
- CPU usage < 70%
- All services running
- No error logs

### Database Health
- Database size growth
- Active connections < 50
- Query response time < 1s
- No slow queries
- Regular backups

### Application Health
- API response time < 500ms
- Edge function success rate > 95%
- Storage upload success rate > 99%
- Zero downtime
- User satisfaction

---

**Documentation Version**: 1.0.0  
**Last Updated**: August 5, 2026  
**Next Review**: Monthly

**Maintained by**: Utero Indonesia DevOps Team
