# ✅ IMPLEMENTATION CHECKLIST

**Project**: Utero Indonesia Blog System  
**Issue**: Security & UX Improvements  
**Date**: August 5, 2026  

---

## 🔴 PHASE 1: SECURITY FIX (CRITICAL - DO TODAY)

### Pre-requisites
- [ ] Project cloned/accessible
- [ ] Node.js and npm installed
- [ ] Terminal/PowerShell ready
- [ ] Code editor ready (VS Code recommended)

### Step 1: Install DOMPurify (5 minutes)
- [ ] Open terminal in Utero project root
- [ ] Run: cd I:\website-devops\uteroindonesia.com\one-landing-page\utero-vite
- [ ] Run: 
pm install dompurify
- [ ] Run: 
pm install --save-dev @types/dompurify
- [ ] Verify installation in package.json

### Step 2: Create Sanitization Utility (10 minutes)
- [ ] Create new file: src/lib/sanitize.ts
- [ ] Copy code from BLOG-FEATURE-FIX.md Section 2
- [ ] Verify imports are correct
- [ ] Save file

**Code to add**:
\\\	ypescript
import DOMPurify from 'dompurify';

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'b', 'i',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'blockquote', 'a', 'img', 'code', 'pre', 'hr', 'div', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'class', 'target', 'rel',
      'width', 'height', 'title', 'id',
    ],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
};
\\\

### Step 3: Update ArtikelDetail.tsx (10 minutes)
- [ ] Open file: src/pages/ArtikelDetail.tsx
- [ ] Add import at top: import { sanitizeHtml } from '../lib/sanitize';
- [ ] Find dangerouslySetInnerHTML line (around line 260)
- [ ] Replace with: dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
- [ ] Save file

**Before**:
\\\	ypescript
<div
  className="artikel-content"
  dangerouslySetInnerHTML={{ __html: article.content }}
/>
\\\

**After**:
\\\	ypescript
<div
  className="artikel-content"
  dangerouslySetInnerHTML={{ 
    __html: sanitizeHtml(article.content || '<p>Konten tidak tersedia.</p>') 
  }}
/>
\\\

### Step 4: Test Locally (10 minutes)
- [ ] Run dev server: 
pm run dev
- [ ] Open browser: http://localhost:5173/artikel
- [ ] Click on an article
- [ ] Verify content displays correctly
- [ ] Check browser console for errors (should be none)

**Test XSS Prevention**:
- [ ] Try adding test article with: <script>alert('XSS')</script>
- [ ] Verify script doesn't execute
- [ ] Verify it's removed from rendered HTML

### Step 5: Build & Deploy (15 minutes)
- [ ] Stop dev server (Ctrl+C)
- [ ] Run build: 
pm run build
- [ ] Verify no errors in build
- [ ] Check dist folder exists
- [ ] Preview build: 
pm run preview
- [ ] Test preview site
- [ ] Deploy to production (follow your deployment process)

### Step 6: Verify Production (5 minutes)
- [ ] Visit production site
- [ ] Test artikel pages
- [ ] Verify no console errors
- [ ] Test on mobile device
- [ ] Confirm XSS protection working

**Total Time Phase 1**: ~55 minutes

---

## 🟡 PHASE 2: TABLE OF CONTENTS (DO THIS WEEK)

### Step 1: Create Component (30 minutes)
- [ ] Create new file: src/components/TableOfContents.tsx
- [ ] Copy code from BLOG-FEATURE-FIX.md Section "Table of Contents"
- [ ] Adjust styling to match Utero design
- [ ] Save file

### Step 2: Integrate Component (10 minutes)
- [ ] Open src/pages/ArtikelDetail.tsx
- [ ] Add import: import TableOfContents from '../components/TableOfContents';
- [ ] Add component before article content
- [ ] Save file

**Add this**:
\\\	ypescript
{article.content && (
  <TableOfContents content={article.content} />
)}
\\\

### Step 3: Test TOC (20 minutes)
- [ ] Run dev server
- [ ] Test with article that has 2+ headings
- [ ] Verify TOC appears
- [ ] Test smooth scrolling
- [ ] Test active section tracking
- [ ] Test on mobile
- [ ] Test on tablet
- [ ] Test on desktop

### Step 4: Deploy (10 minutes)
- [ ] Build: 
pm run build
- [ ] Preview: 
pm run preview
- [ ] Deploy to production
- [ ] Verify live

**Total Time Phase 2**: ~70 minutes

---

## 📊 PROGRESS TRACKING

### Overall Status
- [ ] Phase 1 Complete (Security)
- [ ] Phase 2 Complete (TOC)
- [ ] All tests passed
- [ ] Production verified

### Time Spent
- Phase 1: _____ minutes (target: 55 min)
- Phase 2: _____ minutes (target: 70 min)
- Total: _____ minutes (target: 125 min / ~2 hours)

### Issues Encountered
1. _______________________________________
2. _______________________________________
3. _______________________________________

### Notes
_____________________________________________
_____________________________________________
_____________________________________________

---

## 🧪 TESTING CHECKLIST

### Security Testing
- [ ] Normal HTML renders correctly
- [ ] <script> tags removed
- [ ] onclick handlers removed
- [ ] <iframe> tags removed
- [ ] Data URIs blocked
- [ ] Unknown protocols blocked
- [ ] Images still load
- [ ] Links still work
- [ ] Formatting preserved

### TOC Testing
- [ ] TOC appears with 2+ headings
- [ ] TOC hidden with 0-1 headings
- [ ] Smooth scroll works
- [ ] Active tracking works
- [ ] Indentation correct
- [ ] Styling matches design
- [ ] Mobile responsive
- [ ] Click navigation works

### Regression Testing
- [ ] Homepage works
- [ ] Article list works
- [ ] Article detail works
- [ ] Navigation works
- [ ] Images load
- [ ] SEO meta tags present
- [ ] Mobile responsive
- [ ] No console errors

---

## 🚨 ROLLBACK PLAN

If something goes wrong:

### Rollback Security Fix
1. Remove import { sanitizeHtml } from ArtikelDetail.tsx
2. Restore original dangerouslySetInnerHTML
3. Can keep DOMPurify installed (no harm)
4. Rebuild and deploy

### Rollback TOC
1. Remove <TableOfContents /> from ArtikelDetail.tsx
2. Remove import statement
3. Can keep component file (no harm)
4. Rebuild and deploy

### Complete Rollback
1. Use git: git checkout HEAD -- src/
2. Rebuild: 
pm run build
3. Deploy previous version

---

## ✅ SIGN-OFF

### Security Fix
- [ ] Implemented by: ___________________
- [ ] Tested by: ___________________
- [ ] Deployed by: ___________________
- [ ] Date: ___________________
- [ ] Production URL verified: ___________________

### TOC Feature
- [ ] Implemented by: ___________________
- [ ] Tested by: ___________________
- [ ] Deployed by: ___________________
- [ ] Date: ___________________
- [ ] Production URL verified: ___________________

---

## 📞 SUPPORT

### If You Need Help:

**Security Issues**:
- Reference: BLOG-FEATURE-FIX.md Section "CRITICAL"
- Test script provided in documentation
- DOMPurify docs: https://github.com/cure53/DOMPurify

**TOC Issues**:
- Reference: BLOG-FEATURE-FIX.md Section "MEDIUM"
- Example in SoundPub: src/components/blog/TableOfContents.tsx

**General Issues**:
- Review: BLOG-QUICK-SUMMARY.md
- Full analysis: BLOG-FEATURE-ANALYSIS.md

---

## 🎉 SUCCESS CRITERIA

You've succeeded when:

✅ DOMPurify installed and working  
✅ No XSS vulnerabilities  
✅ Normal content renders correctly  
✅ TOC appears on long articles  
✅ TOC navigation works  
✅ Production site verified  
✅ No regressions  
✅ Team informed  

---

**Checklist Version**: 1.0.0  
**Created**: August 5, 2026  
**Last Updated**: August 5, 2026 - 13:39 UTC  
**Status**: Ready for use

---

## 💡 TIPS

- Work in a branch if using git
- Test thoroughly before deploying
- Keep backup of current production
- Deploy during low-traffic hours
- Monitor logs after deployment
- Document any issues encountered
- Update this checklist with actual times
- Share learnings with team

**Good luck! 🚀**
