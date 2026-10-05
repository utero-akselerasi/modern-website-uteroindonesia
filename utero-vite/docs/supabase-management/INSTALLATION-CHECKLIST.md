# ✅ Installation Checklist - Supabase Management Package
**Domain**: supabase.carubra.com  
**Date**: August 5, 2026

---

## 📦 Pre-Installation

### Verify Access

- [ ] SSH access to server works: `ssh maskhar@supabase.carubra.com`
- [ ] Can navigate to Supabase directory
- [ ] Docker and docker-compose are installed
- [ ] Supabase instance is running
- [ ] Have sudo/admin access if needed

### Check Current Setup

```bash
# SSH to server
ssh maskhar@supabase.carubra.com

# Check Supabase location
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose ps

# Check disk space
df -h

# Check existing backups
ls -la ~/backups/ 2>/dev/null || echo "No backup directory"
```

---

## 📤 Step 1: Upload Documentation

### From Windows PowerShell

```powershell
# Navigate to project root
cd I:\website-devops\uteroindonesia.com\one-landing-page\utero-vite

# Create remote directories (if needed)
ssh maskhar@supabase.carubra.com "mkdir -p ~/docs/supabase-management ~/backups/supabase ~/logs"

# Upload all documentation
scp -r .\docs\supabase-management\* maskhar@supabase.carubra.com:~/docs/supabase-management/

# Upload main menu script
scp .\supabase-menu.sh maskhar@supabase.carubra.com:~/
```

**Checklist:**
- [ ] README.md uploaded
- [ ] MANAGEMENT-GUIDE.md uploaded
- [ ] QUICK-START.md uploaded
- [ ] MAINTENANCE-SCRIPTS.md uploaded
- [ ] TROUBLESHOOTING.md uploaded
- [ ] INDEX.md uploaded
- [ ] supabase-menu.sh uploaded

---

## 🔧 Step 2: Create Scripts on Server

### SSH to Server

```bash
ssh maskhar@supabase.carubra.com
cd ~
```

### Create backup-supabase.sh

```bash
cat > ~/backup-supabase.sh << 'EOF'
#!/bin/bash
# Supabase Automated Backup Script
BACKUP_DIR="/home/maskhar/backups/supabase"
DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

mkdir -p $BACKUP_DIR
cd $DOCKER_DIR || exit 1

echo "Starting Supabase backup - $DATE"

# Backup database
echo "Backing up database..."
docker-compose exec -T db pg_dump -U postgres postgres | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup storage
echo "Backing up storage..."
tar -czf $BACKUP_DIR/storage_$DATE.tar.gz ./volumes/storage/ 2>/dev/null

# Backup functions
echo "Backing up functions..."
tar -czf $BACKUP_DIR/functions_$DATE.tar.gz ./volumes/functions/ 2>/dev/null

# Backup config
cp .env $BACKUP_DIR/env_$DATE.backup
cp docker-compose.yml $BACKUP_DIR/docker-compose_$DATE.yml

# Create manifest
cat > $BACKUP_DIR/manifest_$DATE.txt <<EOL
Supabase Backup
Date: $DATE
Database: db_$DATE.sql.gz
Storage: storage_$DATE.tar.gz
Functions: functions_$DATE.tar.gz
EOL

# Clean old backups
find $BACKUP_DIR -name "*.gz" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "*.backup" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: $BACKUP_DIR"
ls -lh $BACKUP_DIR/*$DATE*
EOF

chmod +x ~/backup-supabase.sh
```

**Checklist:**
- [ ] backup-supabase.sh created
- [ ] Script is executable
- [ ] Test run successful: `~/backup-supabase.sh`

### Create health-check.sh

```bash
cat > ~/health-check.sh << 'EOF'
#!/bin/bash
# Supabase Health Check Script
DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"

cd $DOCKER_DIR || exit 1

echo "=== Supabase Health Check ==="
echo "Date: $(date)"
echo ""

# Check services
echo "1. Docker Services:"
docker-compose ps

# Check database
echo ""
echo "2. Database Connection:"
docker-compose exec -T db psql -U postgres -c "SELECT 1;" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Database: OK"
else
    echo "✗ Database: FAILED"
fi

# Check disk
echo ""
echo "3. Disk Usage:"
df -h / | grep -E "Filesystem|/$"

# Check memory
echo ""
echo "4. Memory Usage:"
free -h

echo ""
echo "=== Health Check Complete ==="
EOF

chmod +x ~/health-check.sh
```

**Checklist:**
- [ ] health-check.sh created
- [ ] Script is executable
- [ ] Test run successful: `~/health-check.sh`

### Create cleanup-optimize.sh

```bash
cat > ~/cleanup-optimize.sh << 'EOF'
#!/bin/bash
# Supabase Cleanup & Optimization
DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"

cd $DOCKER_DIR || exit 1

echo "=== Supabase Cleanup & Optimization ==="
echo "Date: $(date)"
echo ""

# Docker cleanup
echo "1. Docker cleanup..."
docker system prune -f > /dev/null 2>&1
echo "✓ Docker cleanup completed"

# Database vacuum
echo ""
echo "2. Database VACUUM..."
docker-compose exec -T db psql -U postgres -c "VACUUM ANALYZE;" > /dev/null 2>&1
echo "✓ Database VACUUM completed"

# Clean logs
echo ""
echo "3. Cleaning logs..."
find ~/logs -name "*.log" -mtime +7 -delete 2>/dev/null
echo "✓ Logs cleaned"

echo ""
echo "=== Cleanup Completed ==="
EOF

chmod +x ~/cleanup-optimize.sh
```

**Checklist:**
- [ ] cleanup-optimize.sh created
- [ ] Script is executable
- [ ] Test run successful: `~/cleanup-optimize.sh`

### Create db-stats.sh

```bash
cat > ~/db-stats.sh << 'EOF'
#!/bin/bash
# Supabase Database Statistics
DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"

cd $DOCKER_DIR || exit 1

echo "=== Supabase Database Statistics ==="
echo "Date: $(date)"
echo ""

# Database size
echo "Database Size:"
docker-compose exec -T db psql -U postgres -c "
SELECT pg_size_pretty(pg_database_size('postgres')) as database_size;"

# Blog posts stats
echo ""
echo "Blog Posts Statistics:"
docker-compose exec -T db psql -U postgres -c '
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN published THEN 1 END) as published,
    COUNT(CASE WHEN NOT published THEN 1 END) as draft
FROM "utero-artikel".blog_posts;'

# Posts by category
echo ""
echo "Posts by Category:"
docker-compose exec -T db psql -U postgres -c '
SELECT category, COUNT(*) as total
FROM "utero-artikel".blog_posts
GROUP BY category
ORDER BY total DESC;'

echo ""
echo "=== Statistics Complete ==="
EOF

chmod +x ~/db-stats.sh
```

**Checklist:**
- [ ] db-stats.sh created
- [ ] Script is executable
- [ ] Test run successful: `~/db-stats.sh`

---

## ⏰ Step 3: Setup Cron Jobs

```bash
# Edit crontab
crontab -e

# Add these lines (press 'i' to insert, then ESC + ':wq' to save):

# Daily backup at 2 AM
0 2 * * * /home/maskhar/backup-supabase.sh >> /home/maskhar/logs/backup.log 2>&1

# Health check every 6 hours
0 */6 * * * /home/maskhar/health-check.sh >> /home/maskhar/logs/health.log 2>&1

# Weekly cleanup on Sunday at 3 AM
0 3 * * 0 /home/maskhar/cleanup-optimize.sh >> /home/maskhar/logs/cleanup.log 2>&1
```

**Verify Cron Jobs:**
```bash
# List cron jobs
crontab -l

# Check cron is running
sudo systemctl status cron
```

**Checklist:**
- [ ] Crontab edited
- [ ] Backup job added (2 AM daily)
- [ ] Health check job added (every 6 hours)
- [ ] Cleanup job added (Sunday 3 AM)
- [ ] Cron jobs verified with `crontab -l`

---

## ✅ Step 4: Verify Installation

### Test All Scripts

```bash
# Test backup
echo "Testing backup script..."
~/backup-supabase.sh
ls -lh ~/backups/supabase/ | tail -5

# Test health check
echo ""
echo "Testing health check..."
~/health-check.sh

# Test database stats
echo ""
echo "Testing database stats..."
~/db-stats.sh

# Test cleanup (optional - will clean system)
# ~/cleanup-optimize.sh

# Test menu
echo ""
echo "Testing interactive menu..."
~/supabase-menu.sh
# Press 0 to exit
```

**Checklist:**
- [ ] Backup script works
- [ ] Backup files created in ~/backups/supabase/
- [ ] Health check shows all OK
- [ ] Database stats display correctly
- [ ] Interactive menu launches

### Verify Documentation

```bash
# Check documentation files
ls -la ~/docs/supabase-management/

# View quick start
less ~/docs/supabase-management/QUICK-START.md

# View index
less ~/docs/supabase-management/INDEX.md
```

**Checklist:**
- [ ] All documentation files present
- [ ] Can view files with `less`
- [ ] Files are readable

### Test Edge Function Deployment

```powershell
# From Windows
cd I:\website-devops\uteroindonesia.com\one-landing-page\utero-vite

# Test deployment script
.\deploy-function.ps1

# Test API
.\test-api-key.ps1
```

**Checklist:**
- [ ] Deploy script works from Windows
- [ ] Function uploaded to server
- [ ] API test returns success
- [ ] Blog post created in database

---

## 📊 Step 5: Verify Automation

### Wait for First Automated Run

```bash
# Check when next backup will run
crontab -l | grep backup

# Monitor backup log (wait for 2 AM or trigger manually)
tail -f ~/logs/backup.log

# Check health check log
tail -f ~/logs/health.log
```

**After First Automated Run:**
- [ ] Backup log shows success
- [ ] Backup files created automatically
- [ ] Health check log updated
- [ ] No errors in logs

---

## 🎓 Step 6: Team Training

### Share Access Information

```
SSH Access: ssh maskhar@supabase.carubra.com
Documentation: ~/docs/supabase-management/
Scripts Location: ~/ (home directory)
Quick Menu: ~/supabase-menu.sh
```

### Training Tasks

- [ ] Show team how to SSH to server
- [ ] Demonstrate interactive menu
- [ ] Walk through daily operations
- [ ] Show how to read logs
- [ ] Practice troubleshooting scenarios
- [ ] Review emergency procedures

---

## 📝 Post-Installation

### Document Custom Changes

```bash
# Create notes file
nano ~/CUSTOM-NOTES.md

# Document any:
# - Custom configurations
# - Changed paths
# - Additional scripts
# - Team-specific procedures
```

### Update .env Files

```bash
# Verify all environment variables
cd ~/docker/supabase/supabase-1.26.05/docker
cat .env | grep -E "PASSWORD|KEY|SECRET"

# Verify functions .env
cat ./volumes/functions/.env
```

**Checklist:**
- [ ] All API keys present
- [ ] Passwords documented securely
- [ ] Functions .env configured
- [ ] Local .env matches server

---

## 🎉 Installation Complete!

### Summary

✅ Documentation installed  
✅ Scripts created and tested  
✅ Cron jobs configured  
✅ Automation verified  
✅ Team trained  

### Next Steps

1. **Daily**: Use `~/supabase-menu.sh` for operations
2. **Weekly**: Review backup logs
3. **Monthly**: Run security audit
4. **Ongoing**: Keep documentation updated

### Quick Reference

```bash
# Main menu
~/supabase-menu.sh

# Quick backup
~/backup-supabase.sh

# Health check
~/health-check.sh

# Database stats
~/db-stats.sh

# View docs
less ~/docs/supabase-management/INDEX.md
```

---

## 📞 Support

**Issues?**
1. Check TROUBLESHOOTING.md
2. Review logs in ~/logs/
3. Contact: info@uterogroup.com

**Documentation:**
- Full Guide: ~/docs/supabase-management/MANAGEMENT-GUIDE.md
- Quick Start: ~/docs/supabase-management/QUICK-START.md
- This Checklist: ~/docs/supabase-management/INSTALLATION-CHECKLIST.md

---

**Installation Completed**: _____________ (date)  
**Installed By**: _____________  
**Verified By**: _____________  
**Next Review**: _____________ (1 month from installation)
