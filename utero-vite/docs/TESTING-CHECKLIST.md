# Testing Checklist - Utero Indonesia Vite Migration

## 🎯 Quick Start

```bash
cd utero-vite
npm run dev
```
Buka: http://localhost:3002

---

## ✅ Build & Technical Tests

### Compilation & Build
- [x] TypeScript compilation passes
- [x] Production build successful
- [x] No blocking errors
- [x] Bundle size optimized (144 KB gzipped)
- [ ] Dev server runs without errors
- [ ] Preview server runs without errors

### Code Quality
- [x] UTF-8 encoding fixed
- [x] No duplicate imports
- [x] Router properly configured
- [x] Layout structure correct
- [ ] All images load properly
- [ ] No console errors

---

## 🏠 Homepage Testing (/)

### Visual Elements
- [ ] Hero section loads
- [ ] Hero background video/image works
- [ ] CTA buttons visible and styled
- [ ] Logo and branding correct
- [ ] Navbar visible and functional
- [ ] Footer visible and complete

### Content Sections
- [ ] Know Us More section
- [ ] Divisions section (cards display)
- [ ] Workflow section
- [ ] Clients logos section
- [ ] Portfolio section
- [ ] Intellectual Property section
- [ ] Community section
- [ ] CBP section
- [ ] Extrapreneur section
- [ ] Partners logos
- [ ] Download section
- [ ] Why Utero section
- [ ] Recent Articles (3 articles)
- [ ] Contact form
- [ ] Virtual section

### Interactions
- [ ] Scroll animations work (framer-motion)
- [ ] Smooth scrolling between sections
- [ ] Hover effects on buttons
- [ ] Hover effects on cards
- [ ] Links are clickable

---

## 🗂️ Artikel List Page (/artikel)

### Layout & Design
- [ ] Page loads correctly
- [ ] Navbar present
- [ ] Footer present
- [ ] Title "Artikel" displays
- [ ] Breadcrumb/back link works

### Content
- [ ] All 3 articles display
- [ ] Article cards show:
  - [ ] Thumbnail/placeholder
  - [ ] Title
  - [ ] Excerpt
  - [ ] Date
  - [ ] Category badge
- [ ] Grid layout (3 columns desktop)
- [ ] Responsive grid (2 cols tablet, 1 col mobile)

### Navigation
- [ ] Click article card → goes to detail
- [ ] "Kembali ke Beranda" link works
- [ ] Category badges visible

---

## 📄 Artikel Detail Pages (/artikel/:slug)

Test semua 3 artikel:

### 1. /artikel/profil-perusahaan
- [ ] Page loads
- [ ] Title displays: "Profil Perusahaan..."
- [ ] Category badge: "Profil" (red)
- [ ] Date displays: "20 Januari 2025"
- [ ] Content displays
- [ ] Back to artikel list works

### 2. /artikel/layanan-kami
- [ ] Page loads
- [ ] Title displays: "Layanan Kami..."
- [ ] Category badge: "Layanan" (blue)
- [ ] Date displays: "18 Januari 2025"
- [ ] Content displays
- [ ] Back to artikel list works

### 3. /artikel/portofolio-terbaru
- [ ] Page loads
- [ ] Title displays: "Portofolio Terbaru..."
- [ ] Category badge: "Portofolio" (green)
- [ ] Date displays: "15 Januari 2025"
- [ ] Content displays
- [ ] Back to artikel list works

### Common Elements
- [ ] SEO meta tags (check with browser inspector)
- [ ] Helmet/React Helmet working
- [ ] Canonical URLs set
- [ ] OG tags present

---

## 🧭 Navigation Testing

### Navbar
- [ ] Logo visible
- [ ] Logo links to homepage
- [ ] Menu items visible
- [ ] Menu items clickable
- [ ] Smooth scroll to sections (if anchor links)
- [ ] Mobile menu toggle works (if exists)
- [ ] Navbar sticky/fixed on scroll
- [ ] Background changes on scroll

### Footer
- [ ] Company info displays
- [ ] Contact info correct
- [ ] Social media links work
- [ ] Footer links work
- [ ] Copyright year correct (2025)
- [ ] Layout not broken

### Floating WhatsApp Button
- [ ] Button visible (bottom right/left)
- [ ] WhatsApp icon displays
- [ ] Click opens WhatsApp (check URL)
- [ ] Hover animation works
- [ ] Not covering important content

---

## 📱 Responsive Testing

### Desktop (1920px)
- [ ] All sections fit properly
- [ ] No horizontal scroll
- [ ] Images not pixelated
- [ ] Text readable
- [ ] Spacing looks good

### Laptop (1366px)
- [ ] Layout adapts
- [ ] No content cut off
- [ ] Grid layouts adjust

### Tablet (768px)
- [ ] Mobile menu appears (if applicable)
- [ ] 2-column grids
- [ ] Touch targets adequate
- [ ] Padding/spacing adjusted

### Mobile (375px)
- [ ] Single column layout
- [ ] Text size readable
- [ ] Buttons easily tappable
- [ ] Images scale properly
- [ ] No horizontal scroll
- [ ] WhatsApp button not too large

---

## 📋 Forms & Interactions

### Contact Form
- [ ] All fields visible
- [ ] Input fields functional
- [ ] Validation works (if any)
- [ ] Submit button styled
- [ ] Form submission works (or shows message)
- [ ] Error messages display (if validation)

### Buttons & CTAs
- [ ] All CTA buttons styled
- [ ] Hover states work
- [ ] Click feedback
- [ ] Loading states (if any)
- [ ] Disabled states (if any)

### Links
- [ ] Internal links work (React Router)
- [ ] External links open new tab
- [ ] Download links work
- [ ] Email links (mailto:) work
- [ ] Phone links (tel:) work

---

## 🎨 Visual & Animation

### Framer Motion Animations
- [ ] Fade in animations
- [ ] Slide in animations
- [ ] Stagger animations (lists/grids)
- [ ] Scroll-triggered animations
- [ ] Hover animations
- [ ] No animation jank/lag

### Images & Media
- [ ] All images load
- [ ] No broken image icons
- [ ] Images sized correctly
- [ ] Lazy loading works (if enabled)
- [ ] Background images display
- [ ] Logo/favicon displays

### CSS & Styling
- [ ] Colors match design (red: #d11f1f)
- [ ] Fonts load correctly (Inter)
- [ ] No FOUC (Flash of Unstyled Content)
- [ ] Shadows and borders render
- [ ] No CSS warnings in console
- [ ] Dark mode (if applicable)

---

## 🔍 SEO & Meta

### Homepage
- [ ] Title tag correct
- [ ] Meta description present
- [ ] OG tags present
- [ ] Canonical URL set

### Artikel List
- [ ] Title: "Artikel | Utero Indonesia..."
- [ ] Meta description
- [ ] OG tags

### Artikel Detail (all 3)
- [ ] Dynamic title per article
- [ ] Dynamic description (excerpt)
- [ ] OG type: "article"
- [ ] Canonical URL per article

### Static Files
- [ ] robots.txt accessible (/robots.txt)
- [ ] sitemap.xml accessible (/sitemap.xml)
- [ ] favicon displays

---

## ⚠️ Error Handling

### 404 Page
- [ ] Navigate to /invalid-url
- [ ] 404 page displays
- [ ] Shows "404" heading
- [ ] "Halaman tidak ditemukan" message
- [ ] "Kembali ke Beranda" button works
- [ ] Navbar/Footer present (or not, by design)

### Invalid Article Slug
- [ ] Navigate to /artikel/non-existent
- [ ] Redirects to /artikel (or shows 404)
- [ ] No crash/white screen

### Console Errors
- [ ] No React errors
- [ ] No router errors
- [ ] No missing key warnings
- [ ] No deprecation warnings (critical ones)

---

## 🧹 Cleanup Tasks

### Duplicate Folders
- [ ] Delete `src/data/data/`
  ```bash
  rm -rf src/data/data
  ```
- [ ] Delete `public/public/`
  ```bash
  rm -rf public/public
  ```

### Verify After Cleanup
- [ ] Build still succeeds
- [ ] No import errors
- [ ] Images still load

---

## 🚀 Performance

### Load Times
- [ ] Homepage loads < 3 seconds
- [ ] Artikel list loads < 2 seconds
- [ ] Artikel detail loads < 2 seconds
- [ ] Navigation feels instant

### Bundle Analysis
- [x] Total bundle: 641 KB (144 KB gzipped) ✓
- [ ] No unnecessary dependencies
- [ ] Code splitting working (vendor, animation chunks)

### Lighthouse (Optional)
- [ ] Performance > 80
- [ ] Accessibility > 90
- [ ] Best Practices > 80
- [ ] SEO > 90

---

## ✅ Final Checks Before Deploy

### Code Quality
- [ ] No console.log() left in code
- [ ] No commented code blocks
- [ ] No TODO comments unresolved
- [ ] Duplicate folders deleted

### Documentation
- [x] MIGRATION-FIXES.md created
- [x] BEFORE-AFTER-COMPARISON.md created
- [x] TESTING-CHECKLIST.md (this file)
- [ ] README.md updated (if needed)

### Deployment Files
- [ ] .htaccess present in dist/
- [ ] robots.txt in dist/
- [ ] sitemap.xml in dist/
- [ ] favicon in dist/

### Backup
- [ ] Old Next.js version backed up (utero-nextjs/)
- [ ] Git commit created
- [ ] Branch pushed to remote (if applicable)

---

## 📝 Testing Notes

**Tester:** _______________  
**Date:** _______________  
**Browser(s) Tested:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Critical Issues Found:**
```
1. 
2. 
3. 
```

**Minor Issues:**
```
1. 
2. 
3. 
```

**Sign Off:**
- [ ] All critical tests passed
- [ ] Ready for staging
- [ ] Ready for production

---

## 🎉 Success Criteria

✅ Build completes without errors  
✅ All pages load correctly  
✅ Navigation works across all routes  
✅ No console errors  
✅ Mobile responsive  
✅ Forms functional  
✅ SEO tags present  

**Status:** ⏳ In Testing

---
**Last Updated:** 2026-08-02  
**Version:** 1.0