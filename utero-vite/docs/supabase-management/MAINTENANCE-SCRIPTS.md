# 🛠️ Maintenance Scripts - Supabase
# Domain: supabase.carubra.com

Kumpulan script untuk maintenance rutin Supabase instance.

---

## 📦 Script 1: Automated Backup

### backup-supabase.sh

```bash
#!/bin/bash
# Supabase Automated Backup Script
# Domain: supabase.carubra.com
# Author: Utero Indonesia
# Version: 1.0.0

# Configuration
BACKUP_DIR="/home/maskhar/backups/supabase"
DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create backup directory
mkdir -p $BACKUP_DIR

# Navigate to docker directory
cd $DOCKER_DIR || exit 1

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Supabase Backup Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo "Date: $(date)"
echo "Backup Directory: $BACKUP_DIR"
echo ""

# 1. Backup Database
echo -e "${YELLOW}[1/5] Backing up database...${NC}"
docker-compose exec -T db pg_dump -U postgres postgres | gzip > $BACKUP_DIR/db_$DATE.sql.gz
if [ $? -eq 0 ]; then
    DB_SIZE=$(du -sh $BACKUP_DIR/db_$DATE.sql.gz | cut -f1)
    echo -e "${GREEN}✓ Database backup completed: $DB_SIZE${NC}"
else
    echo -e "${RED}✗ Database backup failed!${NC}"
    exit 1
fi

# 2. Backup Storage Files
echo -e "${YELLOW}[2/5] Backing up storage files...${NC}"
tar -czf $BACKUP_DIR/storage_$DATE.tar.gz ./volumes/storage/ 2>/dev/null
if [ $? -eq 0 ]; then
    STORAGE_SIZE=$(du -sh $BACKUP_DIR/storage_$DATE.tar.gz | cut -f1)
    echo -e "${GREEN}✓ Storage backup completed: $STORAGE_SIZE${NC}"
else
    echo -e "${RED}✗ Storage backup failed!${NC}"
fi

# 3. Backup Edge Functions
echo -e "${YELLOW}[3/5] Backing up edge functions...${NC}"
tar -czf $BACKUP_DIR/functions_$DATE.tar.gz ./volumes/functions/ 2>/dev/null
if [ $? -eq 0 ]; then
    FUNCTIONS_SIZE=$(du -sh $BACKUP_DIR/functions_$DATE.tar.gz | cut -f1)
    echo -e "${GREEN}✓ Functions backup completed: $FUNCTIONS_SIZE${NC}"
else
    echo -e "${RED}✗ Functions backup failed!${NC}"
fi

# 4. Backup Configuration Files
echo -e "${YELLOW}[4/5] Backing up configuration...${NC}"
cp .env $BACKUP_DIR/env_$DATE.backup
cp docker-compose.yml $BACKUP_DIR/docker-compose_$DATE.yml
echo -e "${GREEN}✓ Configuration backup completed${NC}"

# 5. Create Manifest File
echo -e "${YELLOW}[5/5] Creating backup manifest...${NC}"
cat > $BACKUP_DIR/manifest_$DATE.txt <<EOL
========================================
Supabase Backup Manifest
========================================
Date: $(date)
Timestamp: $DATE
Domain: supabase.carubra.com

Files Created:
- Database: db_$DATE.sql.gz ($DB_SIZE)
- Storage: storage_$DATE.tar.gz ($STORAGE_SIZE)
- Functions: functions_$DATE.tar.gz ($FUNCTIONS_SIZE)
- Environment: env_$DATE.backup
- Docker Compose: docker-compose_$DATE.yml

Backup Location: $BACKUP_DIR

Restore Commands:
----------------
# Database
gunzip -c $BACKUP_DIR/db_$DATE.sql.gz | docker-compose exec -T db psql -U postgres postgres

# Storage
tar -xzf $BACKUP_DIR/storage_$DATE.tar.gz -C $DOCKER_DIR

# Functions
tar -xzf $BACKUP_DIR/functions_$DATE.tar.gz -C $DOCKER_DIR

# Then restart services:
docker-compose restart

========================================
EOL
echo -e "${GREEN}✓ Manifest created${NC}"

# 6. Clean Old Backups
echo ""
echo -e "${YELLOW}Cleaning old backups (retention: $RETENTION_DAYS days)...${NC}"
DELETED_COUNT=0

# Delete old database backups
DELETED=$(find $BACKUP_DIR -name "db_*.sql.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
DELETED_COUNT=$((DELETED_COUNT + DELETED))

# Delete old storage backups
DELETED=$(find $BACKUP_DIR -name "storage_*.tar.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
DELETED_COUNT=$((DELETED_COUNT + DELETED))

# Delete old function backups
DELETED=$(find $BACKUP_DIR -name "functions_*.tar.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
DELETED_COUNT=$((DELETED_COUNT + DELETED))

# Delete old env backups
DELETED=$(find $BACKUP_DIR -name "env_*.backup" -mtime +$RETENTION_DAYS -delete -print | wc -l)
DELETED_COUNT=$((DELETED_COUNT + DELETED))

# Delete old compose backups
DELETED=$(find $BACKUP_DIR -name "docker-compose_*.yml" -mtime +$RETENTION_DAYS -delete -print | wc -l)
DELETED_COUNT=$((DELETED_COUNT + DELETED))

# Delete old manifests
DELETED=$(find $BACKUP_DIR -name "manifest_*.txt" -mtime +$RETENTION_DAYS -delete -print | wc -l)
DELETED_COUNT=$((DELETED_COUNT + DELETED))

echo -e "${GREEN}✓ Deleted $DELETED_COUNT old backup files${NC}"

# 7. Summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Backup Completed Successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Backup Files:"
ls -lh $BACKUP_DIR/*$DATE* | awk '{print "  " $9 " (" $5 ")"}'
echo ""
echo "Total Backup Size:"
du -sh $BACKUP_DIR/*$DATE* | awk '{sum+=$1} END {print "  " sum}'
echo ""
echo "Backup Location: $BACKUP_DIR"
echo "Manifest: $BACKUP_DIR/manifest_$DATE.txt"
echo ""
echo -e "${GREEN}========================================${NC}"

# Send completion notification (optional)
# Uncomment if you want email notifications
# echo "Backup completed at $(date)" | mail -s "Supabase Backup Success" admin@example.com

exit 0
```

### Install & Setup

```bash
# Copy script to server
scp backup-supabase.sh maskhar@supabase.carubra.com:~/

# SSH to server
ssh maskhar@supabase.carubra.com

# Make executable
chmod +x ~/backup-supabase.sh

# Test run
~/backup-supabase.sh

# Setup cron job for daily backup at 2 AM
crontab -e

# Add this line:
0 2 * * * /home/maskhar/backup-supabase.sh >> /home/maskhar/logs/backup.log 2>&1
```

---

## 🏥 Script 2: Health Check

### health-check.sh

```bash
#!/bin/bash
# Supabase Health Check Script
# Domain: supabase.carubra.com
# Version: 1.0.0

DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"
LOG_FILE="/home/maskhar/logs/health-check.log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Navigate to docker directory
cd $DOCKER_DIR || exit 1

# Create log directory if not exists
mkdir -p "$(dirname $LOG_FILE)"

# Start health check
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Supabase Health Check${NC}"
echo -e "${GREEN}========================================${NC}"
echo "Date: $(date)"
echo "Domain: supabase.carubra.com"
echo ""

# Initialize status
ALL_OK=true

# 1. Check Docker Services
echo -e "${YELLOW}[1/8] Checking Docker Services...${NC}"
SERVICES_DOWN=$(docker-compose ps | grep -c "Exit\|Down")
if [ $SERVICES_DOWN -eq 0 ]; then
    echo -e "${GREEN}✓ All Docker services are running${NC}"
else
    echo -e "${RED}✗ $SERVICES_DOWN service(s) are down!${NC}"
    docker-compose ps | grep -E "Exit|Down"
    ALL_OK=false
fi

# 2. Check Database Connection
echo -e "${YELLOW}[2/8] Checking Database Connection...${NC}"
docker-compose exec -T db psql -U postgres -c "SELECT 1;" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database connection: OK${NC}"
else
    echo -e "${RED}✗ Database connection: FAILED${NC}"
    ALL_OK=false
fi

# 3. Check Database Size
echo -e "${YELLOW}[3/8] Checking Database Size...${NC}"
DB_SIZE=$(docker-compose exec -T db psql -U postgres -t -c "SELECT pg_size_pretty(pg_database_size('postgres'));" 2>/dev/null | tr -d ' ')
if [ -n "$DB_SIZE" ]; then
    echo -e "${GREEN}✓ Database size: $DB_SIZE${NC}"
else
    echo -e "${RED}✗ Unable to get database size${NC}"
    ALL_OK=false
fi

# 4. Check Active Connections
echo -e "${YELLOW}[4/8] Checking Active Database Connections...${NC}"
CONNECTIONS=$(docker-compose exec -T db psql -U postgres -t -c "SELECT COUNT(*) FROM pg_stat_activity;" 2>/dev/null | tr -d ' ')
if [ -n "$CONNECTIONS" ]; then
    if [ $CONNECTIONS -lt 50 ]; then
        echo -e "${GREEN}✓ Active connections: $CONNECTIONS (healthy)${NC}"
    else
        echo -e "${YELLOW}⚠ Active connections: $CONNECTIONS (high)${NC}"
    fi
else
    echo -e "${RED}✗ Unable to get connection count${NC}"
    ALL_OK=false
fi

# 5. Check Blog Posts Count
echo -e "${YELLOW}[5/8] Checking Blog Posts...${NC}"
POSTS_COUNT=$(docker-compose exec -T db psql -U postgres -t -c 'SELECT COUNT(*) FROM "utero-artikel".blog_posts;' 2>/dev/null | tr -d ' ')
if [ -n "$POSTS_COUNT" ]; then
    echo -e "${GREEN}✓ Total blog posts: $POSTS_COUNT${NC}"
else
    echo -e "${RED}✗ Unable to query blog posts${NC}"
    ALL_OK=false
fi

# 6. Check Storage Volume
echo -e "${YELLOW}[6/8] Checking Storage Volume...${NC}"
if [ -d "./volumes/storage" ]; then
    STORAGE_SIZE=$(du -sh ./volumes/storage/ 2>/dev/null | cut -f1)
    echo -e "${GREEN}✓ Storage volume size: $STORAGE_SIZE${NC}"
else
    echo -e "${RED}✗ Storage volume not found${NC}"
    ALL_OK=false
fi

# 7. Check Disk Space
echo -e "${YELLOW}[7/8] Checking Disk Space...${NC}"
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -lt 80 ]; then
    echo -e "${GREEN}✓ Disk usage: ${DISK_USAGE}% (healthy)${NC}"
elif [ $DISK_USAGE -lt 90 ]; then
    echo -e "${YELLOW}⚠ Disk usage: ${DISK_USAGE}% (warning)${NC}"
else
    echo -e "${RED}✗ Disk usage: ${DISK_USAGE}% (critical!)${NC}"
    ALL_OK=false
fi

# 8. Check Memory Usage
echo -e "${YELLOW}[8/8] Checking Memory Usage...${NC}"
MEMORY_USAGE=$(free | awk 'NR==2 {printf "%.0f", $3*100/$2}')
if [ $MEMORY_USAGE -lt 80 ]; then
    echo -e "${GREEN}✓ Memory usage: ${MEMORY_USAGE}% (healthy)${NC}"
elif [ $MEMORY_USAGE -lt 90 ]; then
    echo -e "${YELLOW}⚠ Memory usage: ${MEMORY_USAGE}% (warning)${NC}"
else
    echo -e "${RED}✗ Memory usage: ${MEMORY_USAGE}% (critical!)${NC}"
    ALL_OK=false
fi

# Summary
echo ""
echo -e "${GREEN}========================================${NC}"
if [ "$ALL_OK" = true ]; then
    echo -e "${GREEN}✓ All Health Checks Passed!${NC}"
    EXIT_CODE=0
else
    echo -e "${RED}✗ Some Health Checks Failed!${NC}"
    echo -e "${YELLOW}Check logs for details${NC}"
    EXIT_CODE=1
fi
echo -e "${GREEN}========================================${NC}"

# Log to file
{
    echo "=== Health Check ==="
    echo "Date: $(date)"
    echo "Status: $([ "$ALL_OK" = true ] && echo "OK" || echo "FAILED")"
    echo "DB Size: $DB_SIZE"
    echo "Connections: $CONNECTIONS"
    echo "Posts: $POSTS_COUNT"
    echo "Storage: $STORAGE_SIZE"
    echo "Disk: ${DISK_USAGE}%"
    echo "Memory: ${MEMORY_USAGE}%"
    echo ""
} >> $LOG_FILE

exit $EXIT_CODE
```

### Install & Setup

```bash
# Copy to server
scp health-check.sh maskhar@supabase.carubra.com:~/

# Make executable
chmod +x ~/health-check.sh

# Create log directory
mkdir -p ~/logs

# Test run
~/health-check.sh

# Setup cron for every 6 hours
crontab -e

# Add:
0 */6 * * * /home/maskhar/health-check.sh
```

---

## 🧹 Script 3: Cleanup & Optimization

### cleanup-optimize.sh

```bash
#!/bin/bash
# Supabase Cleanup & Optimization Script
# Domain: supabase.carubra.com
# Version: 1.0.0

DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

cd $DOCKER_DIR || exit 1

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Supabase Cleanup & Optimization${NC}"
echo -e "${GREEN}========================================${NC}"
echo "Date: $(date)"
echo ""

# 1. Docker System Cleanup
echo -e "${YELLOW}[1/6] Docker system cleanup...${NC}"
echo "Before cleanup:"
docker system df

echo ""
echo "Cleaning up..."
docker system prune -f > /dev/null 2>&1

echo "After cleanup:"
docker system df
echo -e "${GREEN}✓ Docker cleanup completed${NC}"
echo ""

# 2. Remove Unused Volumes
echo -e "${YELLOW}[2/6] Checking for unused volumes...${NC}"
DANGLING_VOLUMES=$(docker volume ls -qf dangling=true | wc -l)
if [ $DANGLING_VOLUMES -gt 0 ]; then
    echo "Found $DANGLING_VOLUMES unused volumes"
    echo "Removing..."
    docker volume prune -f > /dev/null 2>&1
    echo -e "${GREEN}✓ Removed $DANGLING_VOLUMES unused volumes${NC}"
else
    echo -e "${GREEN}✓ No unused volumes found${NC}"
fi
echo ""

# 3. Database VACUUM
echo -e "${YELLOW}[3/6] Running database VACUUM...${NC}"
docker-compose exec -T db psql -U postgres -c "VACUUM ANALYZE;" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database VACUUM completed${NC}"
else
    echo -e "${RED}✗ Database VACUUM failed${NC}"
fi
echo ""

# 4. Reindex Database
echo -e "${YELLOW}[4/6] Reindexing database...${NC}"
docker-compose exec -T db psql -U postgres -c "REINDEX DATABASE postgres;" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database reindex completed${NC}"
else
    echo -e "${RED}✗ Database reindex failed${NC}"
fi
echo ""

# 5. Clean Old Logs
echo -e "${YELLOW}[5/6] Cleaning old logs...${NC}"
# Clean logs older than 7 days
find ~/logs -name "*.log" -mtime +7 -delete 2>/dev/null
# Truncate Docker logs
truncate -s 0 $(docker inspect --format='{{.LogPath}}' $(docker ps -qa)) 2>/dev/null
echo -e "${GREEN}✓ Old logs cleaned${NC}"
echo ""

# 6. Check and Remove Orphaned Storage Files
echo -e "${YELLOW}[6/6] Checking for orphaned storage files...${NC}"
STORAGE_DIR="./volumes/storage/blog-covers"
if [ -d "$STORAGE_DIR" ]; then
    TOTAL_FILES=$(find $STORAGE_DIR -type f | wc -l)
    echo "Total storage files: $TOTAL_FILES"
    
    # Get list of files in database
    docker-compose exec -T db psql -U postgres -c "
    COPY (
        SELECT name FROM storage.objects WHERE bucket_id = 'blog-covers'
    ) TO STDOUT;" > /tmp/db_files.txt 2>/dev/null
    
    # Compare with actual files (this is simplified)
    echo -e "${GREEN}✓ Storage check completed${NC}"
else
    echo -e "${YELLOW}⚠ Storage directory not found${NC}"
fi
echo ""

# Summary
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Cleanup & Optimization Completed!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Disk space after cleanup:"
df -h / | grep -E "Filesystem|/$"
echo ""
echo "Docker disk usage:"
docker system df
echo ""
echo -e "${GREEN}========================================${NC}"

exit 0
```

### Install & Setup

```bash
# Copy to server
scp cleanup-optimize.sh maskhar@supabase.carubra.com:~/

# Make executable
chmod +x ~/cleanup-optimize.sh

# Test run
~/cleanup-optimize.sh

# Setup cron for weekly cleanup (Sunday at 3 AM)
crontab -e

# Add:
0 3 * * 0 /home/maskhar/cleanup-optimize.sh >> /home/maskhar/logs/cleanup.log 2>&1
```

---

## 📊 Script 4: Database Stats

### db-stats.sh

```bash
#!/bin/bash
# Supabase Database Statistics Script
# Domain: supabase.carubra.com
# Version: 1.0.0

DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"

cd $DOCKER_DIR || exit 1

echo "========================================"
echo "Supabase Database Statistics"
echo "========================================"
echo "Date: $(date)"
echo "Domain: supabase.carubra.com"
echo ""

# Database Size
echo "=== Database Size ==="
docker-compose exec -T db psql -U postgres -c "
SELECT 
    pg_size_pretty(pg_database_size('postgres')) as database_size;
"
echo ""

# Schema Sizes
echo "=== Schema Sizes ==="
docker-compose exec -T db psql -U postgres -c "
SELECT 
    schema_name,
    pg_size_pretty(sum(table_size)::bigint) as size
FROM (
    SELECT 
        schemaname as schema_name,
        pg_total_relation_size(schemaname||'.'||tablename) as table_size
    FROM pg_tables
    WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
) t
GROUP BY schema_name
ORDER BY sum(table_size) DESC;
"
echo ""

# Table Sizes
echo "=== Top 10 Largest Tables ==="
docker-compose exec -T db psql -U postgres -c "
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) as indexes_size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;
"
echo ""

# Blog Posts Statistics
echo "=== Blog Posts Statistics ==="
docker-compose exec -T db psql -U postgres -c '
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN published THEN 1 END) as published,
    COUNT(CASE WHEN NOT published THEN 1 END) as draft,
    COUNT(CASE WHEN cover_url IS NOT NULL THEN 1 END) as with_image,
    COUNT(CASE WHEN cover_url IS NULL THEN 1 END) as without_image
FROM "utero-artikel".blog_posts;
'
echo ""

# Posts by Category
echo "=== Posts by Category ==="
docker-compose exec -T db psql -U postgres -c '
SELECT 
    category,
    COUNT(*) as total,
    COUNT(CASE WHEN published THEN 1 END) as published
FROM "utero-artikel".blog_posts
GROUP BY category
ORDER BY total DESC;
'
echo ""

# Posts by Author
echo "=== Posts by Author ==="
docker-compose exec -T db psql -U postgres -c '
SELECT 
    author,
    COUNT(*) as total
FROM "utero-artikel".blog_posts
GROUP BY author
ORDER BY total DESC
LIMIT 10;
'
echo ""

# Active Connections
echo "=== Active Database Connections ==="
docker-compose exec -T db psql -U postgres -c "
SELECT 
    COUNT(*) as total_connections,
    COUNT(CASE WHEN state = 'active' THEN 1 END) as active,
    COUNT(CASE WHEN state = 'idle' THEN 1 END) as idle
FROM pg_stat_activity;
"
echo ""

# Storage Statistics
echo "=== Storage Bucket Statistics ==="
docker-compose exec -T db psql -U postgres -c "
SELECT 
    bucket_id,
    COUNT(*) as file_count,
    pg_size_pretty(SUM((metadata->>'size')::bigint)) as total_size
FROM storage.objects
GROUP BY bucket_id
ORDER BY SUM((metadata->>'size')::bigint) DESC;
"
echo ""

echo "========================================"
echo "Statistics Report Completed"
echo "========================================"
```

### Install & Setup

```bash
# Copy to server
scp db-stats.sh maskhar@supabase.carubra.com:~/

# Make executable
chmod +x ~/db-stats.sh

# Run anytime to view stats
~/db-stats.sh

# Or save to file
~/db-stats.sh > ~/stats_$(date +%Y%m%d).txt
```

---

## 🔄 Script 5: Service Restart Manager

### restart-services.sh

```bash
#!/bin/bash
# Supabase Service Restart Manager
# Domain: supabase.carubra.com
# Version: 1.0.0

DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

cd $DOCKER_DIR || exit 1

# Function to show menu
show_menu() {
    clear
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Supabase Service Restart Manager${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "1) Restart All Services"
    echo "2) Restart Database"
    echo "3) Restart Edge Functions"
    echo "4) Restart Storage"
    echo "5) Restart Auth"
    echo "6) Restart API (REST + Realtime)"
    echo "7) Restart Kong (API Gateway)"
    echo "8) Show Service Status"
    echo "9) Full Stop & Start"
    echo "0) Exit"
    echo ""
    echo -n "Select option: "
}

# Function to restart service
restart_service() {
    SERVICE=$1
    echo -e "${YELLOW}Restarting $SERVICE...${NC}"
    docker-compose restart $SERVICE
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $SERVICE restarted successfully${NC}"
    else
        echo -e "${RED}✗ Failed to restart $SERVICE${NC}"
    fi
    sleep 2
}

# Main loop
while true; do
    show_menu
    read choice
    
    case $choice in
        1)
            echo -e "${YELLOW}Restarting all services...${NC}"
            docker-compose restart
            echo -e "${GREEN}✓ All services restarted${NC}"
            read -p "Press Enter to continue..."
            ;;
        2)
            restart_service "db"
            read -p "Press Enter to continue..."
            ;;
        3)
            restart_service "edge-functions"
            read -p "Press Enter to continue..."
            ;;
        4)
            restart_service "storage"
            restart_service "imgproxy"
            read -p "Press Enter to continue..."
            ;;
        5)
            restart_service "auth"
            read -p "Press Enter to continue..."
            ;;
        6)
            restart_service "rest"
            restart_service "realtime"
            read -p "Press Enter to continue..."
            ;;
        7)
            restart_service "kong"
            read -p "Press Enter to continue..."
            ;;
        8)
            echo -e "${YELLOW}Service Status:${NC}"
            docker-compose ps
            read -p "Press Enter to continue..."
            ;;
        9)
            echo -e "${YELLOW}Performing full stop and start...${NC}"
            docker-compose down
            sleep 5
            docker-compose up -d
            echo -e "${GREEN}✓ Full restart completed${NC}"
            read -p "Press Enter to continue..."
            ;;
        0)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option${NC}"
            sleep 2
            ;;
    esac
done
```

### Install & Setup

```bash
# Copy to server
scp restart-services.sh maskhar@supabase.carubra.com:~/

# Make executable
chmod +x ~/restart-services.sh

# Run interactive menu
~/restart-services.sh
```

---

## 📦 All Scripts Package

### Download All Scripts

```powershell
# From Windows, copy all scripts to server at once
$scripts = @(
    "backup-supabase.sh",
    "health-check.sh",
    "cleanup-optimize.sh",
    "db-stats.sh",
    "restart-services.sh"
)

foreach ($script in $scripts) {
    scp $script maskhar@supabase.carubra.com:~/
}
```

### Setup All at Once

```bash
# SSH to server
ssh maskhar@supabase.carubra.com

# Make all executable
chmod +x ~/*.sh

# Create logs directory
mkdir -p ~/logs

# Setup all cron jobs
crontab -e

# Add all:
# Daily backup at 2 AM
0 2 * * * /home/maskhar/backup-supabase.sh >> /home/maskhar/logs/backup.log 2>&1

# Health check every 6 hours
0 */6 * * * /home/maskhar/health-check.sh

# Weekly cleanup on Sunday at 3 AM
0 3 * * 0 /home/maskhar/cleanup-optimize.sh >> /home/maskhar/logs/cleanup.log 2>&1
```

---

**Scripts Version**: 1.0.0  
**Last Updated**: August 5, 2026  
**Domain**: supabase.carubra.com
