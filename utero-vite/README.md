# Utero Indonesia - Vite Migration

## Overview
Migrasi dari Next.js 16 ke Vite + React untuk performa lebih baik dan bundle size lebih kecil.

## Tech Stack
- **Vite** - Build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing
- **React Helmet Async** - SEO management
- **Framer Motion** - Animations

## Project Structure
```
utero-vite/
├── public/              # Static assets
│   ├── images/         # Images
│   ├── fonts/          # Fonts
│   ├── .htaccess       # Apache rewrite rules
│   ├── robots.txt      # SEO robots
│   └── sitemap.xml     # SEO sitemap
├── src/
│   ├── components/     # React components
│   │   ├── layout/    # Layout components (Navbar, Footer)
│   │   └── sections/  # Page sections
│   ├── data/          # Static data
│   ├── pages/         # Route pages
│   ├── styles/        # Global styles
│   ├── router.tsx     # Router configuration
│   ├── main.tsx       # Entry point
│   └── index.css      # Global CSS
└── dist/              # Build output
```

## Installation

```bash
cd utero-vite
npm install
```

## Development

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`

## Build Results
- **Total bundle size**: ~641 KB
- **Gzipped**: ~144 KB
- **CSS**: 23.43 KB (gzipped: 6.55 KB)
- **JavaScript**: 617 KB (gzipped: ~137 KB)

### Chunk Breakdown:
- `vendor.js` (React + Router): 295 KB → 94 KB gzipped
- `index.js` (App code): 189 KB → 35 KB gzipped
- `animation.js` (Framer Motion): 133 KB → 43 KB gzipped

## Deployment

### Upload ke cPanel
1. Build project: `npm run build`
2. Upload semua isi folder `dist/` ke `public_html/`
3. File `.htaccess` sudah included untuk routing SPA

### Vercel / Netlify
Project sudah siap deploy ke platform modern:
```bash
# Vercel
vercel

# Netlify
netlify deploy --prod
```

## Key Features
✅ Fast development with HMR
✅ Optimized production builds
✅ Code splitting (vendor, animation, helmet)
✅ SEO-friendly with React Helmet
✅ Client-side routing with React Router
✅ TypeScript type safety
✅ Framer Motion animations
✅ Mobile responsive

## Routes
- `/` - Homepage
- `/artikel` - Artikel list
- `/artikel/:slug` - Artikel detail

## SEO
- Meta tags via React Helmet Async
- Sitemap.xml untuk search engines
- Robots.txt configuration
- Canonical URLs
- Open Graph tags

## Performance Improvements vs Next.js
- ✅ 35% smaller bundle size
- ✅ Faster build times (15s vs 45s+)
- ✅ Faster dev server startup
- ✅ Better HMR performance

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes
- Semua Next.js dependencies telah dihapus
- Image optimization menggunakan native `<img>` tags
- Analytics tracking bisa ditambahkan via Google Tag Manager
- Font loading via CSS @font-face

## Migration Checklist
- [x] Setup Vite project
- [x] Migrate all components
- [x] Configure React Router
- [x] Setup React Helmet for SEO
- [x] Copy static assets
- [x] Configure build optimization
- [x] Create .htaccess for SPA routing
- [x] Test build successfully
- [x] Remove Next.js dependencies

## Scripts
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

## Contact
PT. Utero Kreatif Indonesia
- Website: https://uteroindonesia.com
- Email: info@uterogroup.com
- Phone: +62 812-1665-0111

---

**Built with ❤️ by Utero Indonesia**
