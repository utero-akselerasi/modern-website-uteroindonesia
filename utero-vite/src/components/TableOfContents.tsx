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

  const headings = useMemo(() => {
    if (!content) return [];
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = doc.querySelectorAll('h1, h2, h3');
    const items: TocItem[] = [];
    
    elements.forEach((el, i) => {
      const text = el.textContent?.trim() || '';
      if (!text) return;
      
      const id = 'heading-' + i;
      items.push({
        id,
        text,
        level: parseInt(el.tagName[1]),
      });
    });
    
    return items;
  }, [content]);

  useEffect(() => {
    if (!headings.length) return;
    
    const articleContent = document.querySelector('.artikel-content');
    if (!articleContent) return;
    
    const elements = articleContent.querySelectorAll('h1, h2, h3');
    let idx = 0;
    
    elements.forEach((el) => {
      const text = el.textContent?.trim() || '';
      if (!text) return;
      el.id = 'heading-' + idx;
      idx++;
    });
  }, [headings]);

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

  if (headings.length < 2) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
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
        background: 'rgba(0, 0, 0, 0.02)',
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
        {headings.map((h) => {
          const paddingLeft = (h.level - minLevel) * 16 + 8 + 'px';
          const isActive = activeId === h.id;
          
          return (
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
                  paddingLeft: paddingLeft,
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'all 0.2s',
                  color: isActive ? 'var(--red)' : 'var(--muted)',
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'rgba(209, 31, 31, 0.05)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.color = 'var(--ink)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--muted)';
                  }
                }}
              >
                {h.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
