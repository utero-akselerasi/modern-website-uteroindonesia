# Utero Next.js - Quick Setup Checklist

## ✅ Pre-Deployment Checklist

### Local Development
- [ ] Project builds successfully (`pnpm build`)
- [ ] No TypeScript errors
- [ ] All images optimized and in `/public/images/`
- [ ] Environment variables configured (if any)
- [ ] Test locally with `node server.js`

### cPanel Requirements
- [ ] cPanel has "Setup Node.js App" feature
- [ ] Node.js version 18+ or 20+ available
- [ ] SSH access (recommended) or Terminal in cPanel
- [ ] Domain/subdomain configured
- [ ] Enough disk space (~500MB minimum)

## 🚀 Quick Deploy Steps

### Option A: Using Deploy Script (Recommended)

**Windows:**
```bash
.\deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

This creates `utero-nextjs-deploy.zip` ready to upload.

### Option B: Manual Deployment

1. **Build locally:**
   ```bash
   pnpm build
   ```

2. **Create zip manually:**
   - Include: `.next/`, `public/`, `src/`, `package.json`, `server.js`, config files
   - Exclude: `node_modules/`, `.git/`, `tests/`

3. **Upload to cPanel:**
   - File Manager → Extract zip
   - Or use FTP client

## 🔧 cPanel Setup (Step by Step)

### 1. Create Node.js Application

```
cPanel → Software → Setup Node.js App → Create Application

Application root: /home/username/utero-nextjs
Application URL: uteroindonesia.com
Application startup file: server.js
Node.js version: 20.x
Application mode: Production
Environment variables:
  - NODE_ENV=production
  - PORT=3000
```

### 2. Install Dependencies

Copy command from cPanel (looks like this):
```bash
source /home/username/nodevenv/utero-nextjs/20/bin/activate
cd /home/username/utero-nextjs
npm install --production
```

### 3. Start Application

Click "Restart" button in cPanel Node.js App interface.

Or run:
```bash
touch tmp/restart.txt
```

## 🧪 Testing

After deployment:
- [ ] Homepage loads: `https://uteroindonesia.com`
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Article pages work: `/artikel/profil-utero-kreatif-indonesia`
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] Google Analytics tracking

## 📊 Monitoring

### Check Logs
```bash
# In cPanel Terminal
cd ~/utero-nextjs
cat logs/passenger.log
```

Or via cPanel Node.js App → "Open logs"

### Common Issues

**App won't start:**
- Check Node.js version (must be 18+)
- Verify `server.js` exists
- Check logs for errors

**404 errors:**
- Verify `.next/` folder uploaded
- Check Application URL matches domain

**Images not loading:**
- Check `public/` folder uploaded
- Verify file permissions (755)

**Slow performance:**
- Enable caching (see `.htaccess.example`)
- Optimize images before upload
- Check server resources

## 🔄 Update/Redeploy

When you make changes:

1. Build locally: `pnpm build`
2. Upload only `.next/` folder (via FTP)
3. Restart app: `touch tmp/restart.txt`

No need to re-upload everything!

## 📞 Need Help?

1. Check `DEPLOYMENT.md` for detailed guide
2. Review cPanel Node.js documentation
3. Contact hosting support for Node.js setup
4. Check Next.js deployment docs: https://nextjs.org/docs/deployment

---

**Last updated: 2026-08-01**
**For: PT. Utero Kreatif Indonesia**
