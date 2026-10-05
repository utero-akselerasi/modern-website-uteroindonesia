# 🔧 Blog Feature Fix - Action Plan

**Target Project**: Utero Indonesia  
**Date**: August 5, 2026  
**Priority**: HIGH (Security Issues)  

---

## 🎯 Overview

Berdasarkan analisis perbandingan dengan SoundPub, ditemukan beberapa critical issues dan missing features di Utero Indonesia yang perlu segera diperbaiki.

---

## 🔴 CRITICAL - Security Fix (DO FIRST)

### Issue: No HTML Sanitization (XSS Vulnerability)

**Current State**:
\\\	ypescript
// ArtikelDetail.tsx - VULNERABLE
<div
  className="artikel-content"
  dangerouslySetInnerHTML={{ __html: article.content }}
/>
\\\

**Risk**:
- Attacker bisa inject malicious script via blog post content
- Possible data theft, session hijacking, phishing
- Affects all users who read the article

**Solution Steps**:

#### Step 1: Install DOMPurify
\\\ash
cd I:\website-devops\uteroindonesia.com\one-landing-page\utero-vite
npm install dompurify
npm install --save-dev @types/dompurify
\\\

#### Step 2: Create Sanitization Utility
Create file: \src/lib/sanitize.ts\

\\\	ypescript
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Used for rendering user-generated HTML content from blog posts
 * 
 * @param html - Raw HTML string
 * @returns Sanitized HTML safe for rendering
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      // Text formatting
      'p', 'br', 'strong', 'em', 'u', 's', 'b', 'i',
      // Headings
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Lists
      'ul', 'ol', 'li',
      // Other
      'blockquote', 'a', 'img', 'code', 'pre', 'hr', 'div', 'span',
      // Tables (if needed)
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'class', 'target', 'rel',
      'width', 'height', 'title', 'id',
    ],
    ALLOW_DATA_ATTR: false, // Prevent data-* attributes
    ALLOW_UNKNOWN_PROTOCOLS: false, // Only allow http, https, mailto
  });
};

/**
 * Sanitize HTML with custom config
 */
export const sanitizeHtmlCustom = (
  html: string, 
  config?: DOMPurify.Config
): string => {
  return DOMPurify.sanitize(html, config);
};
\\\

#### Step 3: Update ArtikelDetail.tsx
\\\	ypescript
// Add import at top
import { sanitizeHtml } from '../lib/sanitize';

// Replace dangerouslySetInnerHTML usage
// OLD:
<div
  className="artikel-content"
  dangerouslySetInnerHTML={{ __html: article.content }}
/>

// NEW:
<div
  className="artikel-content"
  dangerouslySetInnerHTML={{ 
    __html: sanitizeHtml(article.content || '<p>Konten tidak tersedia.</p>') 
  }}
/>
\\\

#### Step 4: Test XSS Prevention
Create test file: \src/lib/__tests__/sanitize.test.ts\ (optional)

\\\	ypescript
import { sanitizeHtml } from '../sanitize';

describe('sanitizeHtml', () => {
  test('removes script tags', () => {
    const malicious = '<p>Hello</p><script>alert("XSS")</script>';
    const result = sanitizeHtml(malicious);
    expect(result).not.toContain('<script>');
    expect(result).toContain('<p>Hello</p>');
  });

  test('removes onclick handlers', () => {
    const malicious = '<div onclick="alert(\'XSS\')">Click me</div>';
    const result = sanitizeHtml(malicious);
    expect(result).not.toContain('onclick');
  });

  test('allows safe HTML', () => {
    const safe = '<p>Safe <strong>content</strong></p>';
    const result = sanitizeHtml(safe);
    expect(result).toBe(safe);
  });
});
\\\

#### Step 5: Update package.json
Verify dependencies added:
\\\json
{
  "dependencies": {
    "dompurify": "^3.x.x"
  },
  "devDependencies": {
    "@types/dompurify": "^3.x.x"
  }
}
\\\

#### Step 6: Build and Test
\\\ash
# Build
npm run build

# Test locally
npm run dev

# Navigate to artikel page and verify content renders correctly
# Test with various HTML content to ensure sanitization works
\\\

**Estimated Time**: 30 minutes  
**Priority**: 🔴 CRITICAL  
**Status**: ⏳ Pending

---

## 🟡 MEDIUM - UX Enhancement (Table of Contents)

### Issue: Missing Table of Contents Component

**Current State**: No TOC component exists

**Benefits**:
- Better UX for long articles
- Easy navigation within article
- Professional look and feel
- Improved accessibility

**Solution Steps**:

#### Step 1: Create TableOfContents Component
Create file: \src/components/TableOfContents.tsx\

\\\	ypescript
import { useMemo, useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string | null;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from HTML content
  const headings = useMemo(() => {
    if (!content) return [];
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = doc.querySelectorAll('h1, h2, h3');
    const items: TocItem[] = [];
    
    elements.forEach((el, i) => {
      const text = el.textContent?.trim() || '';
      if (!text) return;
      
      const id = \heading-\\;
      items.push({
        id,
        text,
        level: parseInt(el.tagName[1]),
      });
    });
    
    return items;
  }, [content]);

  // Inject IDs into rendered headings
  useEffect(() => {
    if (!headings.length) return;
    
    const articleContent = document.querySelector('.artikel-content');
    if (!articleContent) return;
    
    const elements = articleContent.querySelectorAll('h1, h2, h3');
    let idx = 0;
    
    elements.forEach((el) => {
      const text = el.textContent?.trim() || '';
      if (!text) return;
      el.id = \heading-\\;
      idx++;
    });
  }, [headings]);

  // Track active heading on scroll
  useEffect(() => {
    if (!headings.length) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { 
        rootMargin: '-80px 0px -60% 0px', 
        threshold: 0 
      }
    );

    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Don't render if less than 2 headings
  if (headings.length < 2) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const minLevel = Math.min(...headings.map(h => h.level));

  return (
    <nav
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '4px',
        padding: '24px',
        marginBottom: '32px',
        background: 'var(--bg-soft)',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        Daftar Isi
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {headings.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => scrollTo(h.id)}
              style={{
                all: 'unset',
                display: 'block',
                width: '100%',
                textAlign: 'left',
                fontSize: '14px',
                padding: '6px 8px',
                paddingLeft: \\px\,
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.2s',
                color: activeId === h.id ? 'var(--red)' : 'var(--muted)',
                fontWeight: activeId === h.id ? 600 : 400,
                background: activeId === h.id ? 'var(--red-bg)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (activeId !== h.id) {
                  e.currentTarget.style.background = 'var(--hover-bg)';
                  e.currentTarget.style.color = 'var(--ink)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeId !== h.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--muted)';
                }
              }}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
\\\

#### Step 2: Add CSS Variables (if needed)
Add to your CSS file or inline styles:
\\\css
:root {
  --red-bg: rgba(209, 31, 31, 0.05);
  --hover-bg: rgba(0, 0, 0, 0.03);
}
\\\

#### Step 3: Update ArtikelDetail.tsx
\\\	ypescript
// Add import
import TableOfContents from '../components/TableOfContents';

// Add before article content
{article.content && (
  <TableOfContents content={article.content} />
)}

<div
  className="artikel-content"
  dangerouslySetInnerHTML={{ 
    __html: sanitizeHtml(article.content) 
  }}
/>
\\\

#### Step 4: Test
- Create artikel with multiple H2 and H3 headings
- Verify TOC appears
- Test smooth scrolling
- Test active section highlighting
- Test on mobile

**Estimated Time**: 1 hour  
**Priority**: 🟡 MEDIUM  
**Status**: ⏳ Pending

---

## 🟢 LOW - Documentation Enhancement

### Issue: Edge Function Needs Better Documentation

**Solution**: Update \supabase/functions/blog-auto-post/index.ts\

Already well documented, but can add:
- More inline comments
- JSDoc for complex functions
- Examples in comments

**Estimated Time**: 30 minutes  
**Priority**: 🟢 LOW  
**Status**: ⏳ Pending

---

## 📋 Implementation Checklist

### Phase 1: Security Fix (TODAY)
- [ ] Install DOMPurify
- [ ] Create \src/lib/sanitize.ts\
- [ ] Update \ArtikelDetail.tsx\ with sanitization
- [ ] Test with malicious HTML
- [ ] Test with normal content
- [ ] Build and deploy

### Phase 2: UX Enhancement (THIS WEEK)
- [ ] Create \TableOfContents\ component
- [ ] Add CSS styling
- [ ] Integrate into \ArtikelDetail.tsx\
- [ ] Test with various articles
- [ ] Test responsive design
- [ ] Build and deploy

### Phase 3: Documentation (OPTIONAL)
- [ ] Add JSDoc comments
- [ ] Update README if needed
- [ ] Document new components

---

## 🧪 Testing Checklist

### Security Testing
- [ ] Test XSS prevention with \<script>alert('XSS')</script>\
- [ ] Test event handler removal \<div onclick="...">\
- [ ] Test iframe injection \<iframe src="...">\
- [ ] Test data URI schemes \<img src="data:...">\
- [ ] Verify safe HTML still renders correctly

### Functional Testing
- [ ] Articles display correctly
- [ ] Images load properly
- [ ] Links work
- [ ] Formatting preserved
- [ ] TOC appears for long articles
- [ ] TOC scrolling works
- [ ] Active section tracking works

### Responsive Testing
- [ ] Mobile view (< 640px)
- [ ] Tablet view (640px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] TOC behavior on mobile

---

## 🚀 Deployment Steps

### 1. Local Testing
\\\ash
cd I:\website-devops\uteroindonesia.com\one-landing-page\utero-vite

# Install dependencies
npm install

# Run dev server
npm run dev

# Test thoroughly
# - Visit http://localhost:5173/artikel
# - Check artikel detail pages
# - Test sanitization
# - Test TOC
\\\

### 2. Build
\\\ash
# Production build
npm run build

# Preview build
npm run preview

# Verify dist folder
ls dist
\\\

### 3. Deploy
Follow existing deployment procedure from \DEPLOYMENT-CHECKLIST.md\

### 4. Production Verification
- [ ] Visit production site
- [ ] Test artikel pages
- [ ] Verify sanitization works
- [ ] Verify TOC works
- [ ] Check browser console for errors
- [ ] Test on multiple devices

---

## 📊 Impact Assessment

### Security Fix
- **Impact**: 🔴 CRITICAL
- **Users Affected**: All users reading blog articles
- **Risk Mitigation**: Prevents XSS attacks, data theft, session hijacking
- **Business Value**: Protects user data and company reputation

### Table of Contents
- **Impact**: 🟡 MEDIUM
- **Users Affected**: Users reading long articles
- **UX Improvement**: Easier navigation, better readability
- **Business Value**: Improved user experience, increased engagement

---

## 💡 Additional Recommendations

### 1. Consider Admin Dashboard
Current status unknown for Utero. If no admin panel exists:
- Use Supabase Studio for now
- Consider building admin panel later
- Port BlogManager from SoundPub if needed

### 2. Add Content Preview
Before posting, show preview with:
- Sanitized HTML rendering
- TOC preview
- Meta tag preview

### 3. Add Content Validation
In edge function or admin:
- Minimum content length
- Required fields validation
- Image size limits
- Slug uniqueness check

### 4. Performance Optimization
- Lazy load images in articles
- Code splitting for article pages
- Cache article data
- Optimize images in storage

---

## 📞 Support & Questions

If you encounter issues:

1. **Security Issues**: Fix immediately, consult security expert if needed
2. **Technical Questions**: Review SoundPub implementation for reference
3. **Database Issues**: Check Supabase logs and RLS policies
4. **Frontend Issues**: Check browser console and React dev tools

---

## ✅ Success Criteria

### Security Fix Complete When:
- [x] DOMPurify installed
- [x] Sanitization utility created
- [x] ArtikelDetail updated
- [x] XSS tests pass
- [x] No security warnings
- [x] Deployed to production

### TOC Complete When:
- [x] Component created
- [x] Styling matches design
- [x] Smooth scrolling works
- [x] Active tracking works
- [x] Mobile responsive
- [x] Deployed to production

---

**Document Version**: 1.0.0  
**Created**: August 5, 2026  
**Status**: Ready for Implementation  
**Estimated Total Time**: 2-3 hours
