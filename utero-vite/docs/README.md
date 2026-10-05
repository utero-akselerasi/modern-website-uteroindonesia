# 📚 Documentation Index

Panduan lengkap untuk Utero Indonesia - Self-Hosted Supabase Project

---

## 🚀 Quick Start

**Baru mulai? Mulai dari sini:**

1. **[Quick Start Guide](./SELFHOSTED-QUICKSTART.md)** ⭐
   - Setup environment variables (2 menit)
   - Deploy Edge Function (2 menit)
   - Test API (1 menit)
   - Total: 5 menit!

2. **[.env.example](../.env.example)**
   - Copy ke `.env` dan isi konfigurasi

3. **[Test API](../test-api-key.ps1)**
   - Run `.\test-api-key.ps1` untuk test

---

## 📖 Main Documentation

### Deployment & Setup

- **[Docker Deployment](./deployment/DOCKER.md)**
  - Nginx, PHP-FPM, port, network, domain, dan reverse proxy

- **[Deployment Guide - Self-Hosted](./DEPLOYMENT-SELFHOSTED.md)** 📘
  - Full deployment guide dengan troubleshooting
  - Server setup & configuration
  - Environment variables setup
  - Deploy Edge Functions
  - Deploy Frontend
  - Testing & monitoring
  - Security checklist

- **[Quick Start - Self-Hosted](./SELFHOSTED-QUICKSTART.md)** ⚡
  - Setup cepat 5 menit
  - Command essentials
  - Troubleshooting cepat

### Database

- **[Database Schema](./DATABASE-SCHEMA.md)** 🗄️
  - Table structure (`blog_posts`)
  - RLS policies
  - Storage buckets
  - RPC functions
  - Sample queries
  - Backup & restore

### Development

- **[Command Cheat Sheet](./COMMAND-CHEATSHEET.md)** 💻
  - SSH commands
  - Docker commands
  - Database queries
  - Edge Functions management
  - Monitoring & debugging
  - Emergency commands

### Automation API

- **[Automation API Index](./automation-api/INDEX.md)**
  - Implementasi, ringkasan, dan referensi deployment Automation API

### Supabase Operations

- **[Supabase Management](./supabase-management/README.md)**
  - Operasional, troubleshooting, checklist, dan quick reference

---

## 🛠️ Scripts & Tools

### PowerShell Scripts

- **[deploy-function.ps1](../deploy-function.ps1)**
  - Deploy Edge Function ke self-hosted server
  - Usage: `.\deploy-function.ps1`

- **[test-api-key.ps1](../test-api-key.ps1)**
  - Test Blog API endpoint
  - Load config dari `.env`
  - Usage: `.\test-api-key.ps1`

---

## 📂 Additional Documentation

### Setup Guides

- **[API Key Setup Guide](./API-KEY-SETUP-GUIDE.md)**
  - Generate dan setup API keys
  - Security best practices

- **[Setup Artikel Database](./SETUP-ARTIKEL-DATABASE.md)**
  - Initial database setup
  - Create tables dan RLS

- **[Artikel Database Integration](./ARTIKEL-DATABASE-INTEGRATION.md)**
  - Integrate dengan frontend
  - API usage examples

### Migration & History

- **[Migration Summary](./MIGRATION-SUMMARY.md)**
  - Next.js to Vite migration
  - Changes & improvements

- **[Before/After Comparison](./BEFORE-AFTER-COMPARISON.md)**
  - Performance comparison
  - Bundle size comparison

- **[Migration Fixes](./MIGRATION-FIXES.md)**
  - Issues fixed during migration

### Testing & Status

- **[Testing Checklist](./TESTING-CHECKLIST.md)**
  - Complete testing checklist
  - Test scenarios

- **[Final Status](./FINAL-STATUS.md)**
  - Project completion status
  - What's working

- **[Final Summary](./FINAL-SUMMARY.md)**
  - Overall project summary

---

## 🎯 Common Tasks

### Setup dari Awal

1. Read: [Quick Start Guide](./SELFHOSTED-QUICKSTART.md)
2. Setup environment variables
3. Run: `.\deploy-function.ps1`
4. Run: `.\test-api-key.ps1`
5. Deploy frontend: `npm run build`

### Deploy Function Update

1. Edit function: `supabase/functions/blog-auto-post/index.ts`
2. Run: `.\deploy-function.ps1`
3. Check logs: See [Command Cheat Sheet](./COMMAND-CHEATSHEET.md)

### Troubleshooting

1. Check: [Deployment Guide - Troubleshooting](./DEPLOYMENT-SELFHOSTED.md#troubleshooting)
2. Use: [Command Cheat Sheet](./COMMAND-CHEATSHEET.md) untuk debug
3. Check server logs:
   ```bash
   ssh maskhar@supabase-server
   cd ~/docker/supabase/supabase-1.26.05/docker
   docker-compose logs -f edge-functions
   ```

### Database Operations

1. Read: [Database Schema](./DATABASE-SCHEMA.md)
2. Use commands dari: [Command Cheat Sheet](./COMMAND-CHEATSHEET.md#database-commands)
3. Example queries tersedia di: [Database Schema - Useful Queries](./DATABASE-SCHEMA.md#useful-queries)

---

## 🔗 Quick Links

### Server Info

- **Server**: `supabase-server`
- **User**: `maskhar`
- **Path**: `~/docker/supabase/supabase-1.26.05/docker`
- **Functions**: `volumes/functions/blog-auto-post/`

### URLs

- **Supabase Instance**: https://supabase.carubra.com
- **Blog API**: https://supabase.carubra.com/functions/v1/blog-auto-post
- **Website**: https://uteroindonesia.com

### SSH Commands

```bash
# SSH to server
ssh maskhar@supabase-server

# Quick restart function
ssh maskhar@supabase-server "cd ~/docker/supabase/supabase-1.26.05/docker && docker-compose restart edge-functions"

# Quick logs
ssh maskhar@supabase-server "cd ~/docker/supabase/supabase-1.26.05/docker && docker-compose logs --tail=50 edge-functions"
```

---

## 📋 Checklist

### Initial Setup
- [ ] Copy `.env.example` to `.env`
- [ ] Setup `VITE_SUPABASE_URL`
- [ ] Setup `VITE_SUPABASE_ANON_KEY`
- [ ] Generate dan setup `VITE_BLOG_API_KEY`
- [ ] Setup `BLOG_API_KEY` di server (`volumes/functions/.env`)
- [ ] Run `.\deploy-function.ps1`
- [ ] Run `.\test-api-key.ps1` - should return success
- [ ] Setup database tables (if not exists)
- [ ] Setup storage bucket (if not exists)
- [ ] Test frontend locally: `npm run dev`
- [ ] Build production: `npm run build`
- [ ] Deploy frontend to web server

### Maintenance
- [ ] Regular backup database
- [ ] Monitor logs untuk errors
- [ ] Check storage usage
- [ ] Update Docker images (monthly)
- [ ] Rotate API keys (quarterly)

---

## 💡 Tips

- Bookmark halaman ini untuk quick reference
- Use [Command Cheat Sheet](./COMMAND-CHEATSHEET.md) untuk copy-paste commands
- Setup bash aliases dari cheat sheet untuk productivity
- Always test di local dulu sebelum deploy ke production
- Keep backup database secara regular

---

## 📞 Support

**PT. Utero Kreatif Indonesia**
- Website: https://uteroindonesia.com
- Email: info@uterogroup.com
- Phone: +62 812-1665-0111

---

## 🔄 Last Updated

**Date**: August 5, 2026  
**Version**: 1.0.0  
**Self-hosted Supabase**: v1.26.05

---

**Happy Coding! 🚀**
