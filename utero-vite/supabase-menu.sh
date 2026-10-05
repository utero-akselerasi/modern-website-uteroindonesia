#!/bin/bash
# Quick Access Menu for Supabase Management
# Domain: supabase.carubra.com
# Version: 1.0.0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

DOCKER_DIR="/home/maskhar/docker/supabase/supabase-1.26.05/docker"

# Function to show header
show_header() {
    clear
    echo -e "${CYAN}========================================${NC}"
    echo -e "${CYAN}   Supabase Management Menu${NC}"
    echo -e "${CYAN}   Domain: supabase.carubra.com${NC}"
    echo -e "${CYAN}========================================${NC}"
    echo ""
}

# Function to show main menu
show_menu() {
    show_header
    echo -e "${GREEN}[1]${NC} View Service Status"
    echo -e "${GREEN}[2]${NC} View Logs (Real-time)"
    echo -e "${GREEN}[3]${NC} Restart Services"
    echo -e "${GREEN}[4]${NC} Database Management"
    echo -e "${GREEN}[5]${NC} Backup & Restore"
    echo -e "${GREEN}[6]${NC} Health Check"
    echo -e "${GREEN}[7]${NC} View Statistics"
    echo -e "${GREEN}[8]${NC} Cleanup & Optimize"
    echo ""
    echo -e "${YELLOW}[9]${NC} Open Documentation"
    echo -e "${RED}[0]${NC} Exit"
    echo ""
    echo -n "Select option: "
}

# Function: View Service Status
view_status() {
    show_header
    echo -e "${YELLOW}Service Status:${NC}"
    echo ""
    cd $DOCKER_DIR
    docker-compose ps
    echo ""
    read -p "Press Enter to continue..."
}

# Function: View Logs
view_logs() {
    show_header
    echo "Select service to view logs:"
    echo ""
    echo "1) All services"
    echo "2) Database"
    echo "3) Edge Functions"
    echo "4) Storage"
    echo "5) Auth"
    echo "6) Kong (API Gateway)"
    echo "0) Back"
    echo ""
    echo -n "Select: "
    read log_choice
    
    cd $DOCKER_DIR
    case $log_choice in
        1) docker-compose logs -f ;;
        2) docker-compose logs -f db ;;
        3) docker-compose logs -f edge-functions ;;
        4) docker-compose logs -f storage imgproxy ;;
        5) docker-compose logs -f auth ;;
        6) docker-compose logs -f kong ;;
        0) return ;;
        *) echo "Invalid option"; sleep 2 ;;
    esac
}

# Function: Restart Services
restart_services() {
    show_header
    echo "Select service to restart:"
    echo ""
    echo "1) All services"
    echo "2) Database"
    echo "3) Edge Functions"
    echo "4) Storage"
    echo "5) Auth"
    echo "6) API (REST + Realtime)"
    echo "0) Back"
    echo ""
    echo -n "Select: "
    read restart_choice
    
    cd $DOCKER_DIR
    case $restart_choice in
        1) 
            echo -e "${YELLOW}Restarting all services...${NC}"
            docker-compose restart
            echo -e "${GREEN}Done!${NC}"
            ;;
        2) docker-compose restart db ;;
        3) docker-compose restart edge-functions ;;
        4) docker-compose restart storage imgproxy ;;
        5) docker-compose restart auth ;;
        6) docker-compose restart rest realtime ;;
        0) return ;;
        *) echo "Invalid option" ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
}

# Function: Database Management
database_menu() {
    show_header
    echo "Database Management:"
    echo ""
    echo "1) Connect to Database"
    echo "2) View Blog Posts Count"
    echo "3) View Database Size"
    echo "4) Run VACUUM ANALYZE"
    echo "5) View Active Connections"
    echo "0) Back"
    echo ""
    echo -n "Select: "
    read db_choice
    
    cd $DOCKER_DIR
    case $db_choice in
        1)
            echo -e "${YELLOW}Connecting to database...${NC}"
            docker-compose exec db psql -U postgres -d postgres
            ;;
        2)
            echo -e "${YELLOW}Blog Posts Count:${NC}"
            docker-compose exec db psql -U postgres -c 'SELECT COUNT(*) FROM "utero-artikel".blog_posts;'
            read -p "Press Enter to continue..."
            ;;
        3)
            echo -e "${YELLOW}Database Size:${NC}"
            docker-compose exec db psql -U postgres -c "SELECT pg_size_pretty(pg_database_size('postgres'));"
            read -p "Press Enter to continue..."
            ;;
        4)
            echo -e "${YELLOW}Running VACUUM ANALYZE...${NC}"
            docker-compose exec db psql -U postgres -c "VACUUM ANALYZE;"
            echo -e "${GREEN}Done!${NC}"
            read -p "Press Enter to continue..."
            ;;
        5)
            echo -e "${YELLOW}Active Connections:${NC}"
            docker-compose exec db psql -U postgres -c "SELECT COUNT(*) FROM pg_stat_activity;"
            read -p "Press Enter to continue..."
            ;;
        0) return ;;
        *) echo "Invalid option"; sleep 2 ;;
    esac
}

# Function: Backup & Restore
backup_menu() {
    show_header
    echo "Backup & Restore:"
    echo ""
    echo "1) Run Full Backup"
    echo "2) Quick Database Backup"
    echo "3) List Backups"
    echo "4) Restore from Backup"
    echo "0) Back"
    echo ""
    echo -n "Select: "
    read backup_choice
    
    case $backup_choice in
        1)
            if [ -f ~/backup-supabase.sh ]; then
                echo -e "${YELLOW}Running full backup...${NC}"
                ~/backup-supabase.sh
            else
                echo -e "${RED}backup-supabase.sh not found!${NC}"
            fi
            read -p "Press Enter to continue..."
            ;;
        2)
            cd $DOCKER_DIR
            BACKUP_FILE=~/quick_backup_$(date +%Y%m%d_%H%M%S).sql.gz
            echo -e "${YELLOW}Creating quick backup...${NC}"
            docker-compose exec -T db pg_dump -U postgres postgres | gzip > $BACKUP_FILE
            echo -e "${GREEN}Backup created: $BACKUP_FILE${NC}"
            ls -lh $BACKUP_FILE
            read -p "Press Enter to continue..."
            ;;
        3)
            echo -e "${YELLOW}Recent Backups:${NC}"
            ls -lht ~/backups/supabase/*.sql.gz 2>/dev/null | head -10
            echo ""
            ls -lht ~/quick_backup_*.sql.gz 2>/dev/null | head -5
            read -p "Press Enter to continue..."
            ;;
        4)
            echo -e "${YELLOW}Available Backups:${NC}"
            ls -1t ~/backups/supabase/db_*.sql.gz 2>/dev/null | head -5
            echo ""
            echo -n "Enter backup filename to restore (or 0 to cancel): "
            read backup_file
            if [ "$backup_file" != "0" ] && [ -f "$backup_file" ]; then
                echo -e "${RED}WARNING: This will overwrite current database!${NC}"
                echo -n "Are you sure? (yes/no): "
                read confirm
                if [ "$confirm" == "yes" ]; then
                    cd $DOCKER_DIR
                    echo -e "${YELLOW}Restoring...${NC}"
                    gunzip -c $backup_file | docker-compose exec -T db psql -U postgres postgres
                    echo -e "${GREEN}Restore complete!${NC}"
                fi
            fi
            read -p "Press Enter to continue..."
            ;;
        0) return ;;
        *) echo "Invalid option"; sleep 2 ;;
    esac
}

# Function: Health Check
health_check() {
    show_header
    if [ -f ~/health-check.sh ]; then
        ~/health-check.sh
    else
        echo -e "${YELLOW}Running basic health check...${NC}"
        echo ""
        
        cd $DOCKER_DIR
        
        echo "1. Service Status:"
        docker-compose ps | grep -E "Up|Down|Exit"
        echo ""
        
        echo "2. Disk Space:"
        df -h / | grep -E "Filesystem|/$"
        echo ""
        
        echo "3. Memory:"
        free -h
        echo ""
        
        echo "4. Database Connection:"
        docker-compose exec -T db psql -U postgres -c "SELECT 1;" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Database: OK${NC}"
        else
            echo -e "${RED}✗ Database: FAILED${NC}"
        fi
        echo ""
    fi
    read -p "Press Enter to continue..."
}

# Function: Statistics
view_stats() {
    show_header
    if [ -f ~/db-stats.sh ]; then
        ~/db-stats.sh
    else
        echo -e "${YELLOW}Database Statistics:${NC}"
        cd $DOCKER_DIR
        
        echo ""
        echo "Blog Posts:"
        docker-compose exec db psql -U postgres -c '
        SELECT 
            COUNT(*) as total,
            COUNT(CASE WHEN published THEN 1 END) as published
        FROM "utero-artikel".blog_posts;'
        
        echo ""
        echo "Database Size:"
        docker-compose exec db psql -U postgres -c "
        SELECT pg_size_pretty(pg_database_size('postgres'));"
        
        echo ""
    fi
    read -p "Press Enter to continue..."
}

# Function: Cleanup
cleanup() {
    show_header
    if [ -f ~/cleanup-optimize.sh ]; then
        echo -e "${YELLOW}Running cleanup & optimization...${NC}"
        ~/cleanup-optimize.sh
    else
        echo -e "${YELLOW}Running basic cleanup...${NC}"
        docker system prune -f
        echo -e "${GREEN}Done!${NC}"
    fi
    read -p "Press Enter to continue..."
}

# Function: Documentation
show_docs() {
    show_header
    echo "Documentation Files:"
    echo ""
    echo "1) Management Guide (full)"
    echo "2) Quick Start (cheat sheet)"
    echo "3) Maintenance Scripts"
    echo "4) Troubleshooting Guide"
    echo "0) Back"
    echo ""
    echo -n "Select: "
    read doc_choice
    
    case $doc_choice in
        1) less ~/docs/supabase-management/MANAGEMENT-GUIDE.md 2>/dev/null || echo "File not found" ;;
        2) less ~/docs/supabase-management/QUICK-START.md 2>/dev/null || echo "File not found" ;;
        3) less ~/docs/supabase-management/MAINTENANCE-SCRIPTS.md 2>/dev/null || echo "File not found" ;;
        4) less ~/docs/supabase-management/TROUBLESHOOTING.md 2>/dev/null || echo "File not found" ;;
        0) return ;;
        *) echo "Invalid option"; sleep 2 ;;
    esac
}

# Main loop
while true; do
    show_menu
    read choice
    
    case $choice in
        1) view_status ;;
        2) view_logs ;;
        3) restart_services ;;
        4) database_menu ;;
        5) backup_menu ;;
        6) health_check ;;
        7) view_stats ;;
        8) cleanup ;;
        9) show_docs ;;
        0) 
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option${NC}"
            sleep 2
            ;;
    esac
done
