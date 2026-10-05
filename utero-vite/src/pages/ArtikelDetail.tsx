import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchArticleBySlug, type Article, type ArticleAddon } from '../lib/articleService';
import { sanitizeHtml } from '../lib/sanitize';
import TableOfContents from '../components/TableOfContents';

const categoryColors: Record<string, string> = {
  Profil: '#d11f1f',
  Layanan: '#2563eb',
  Portofolio: '#059669',
  Kesehatan: '#059669',
  Tips: '#f59e0b',
  Artikel: '#6366f1',
};

function ArticleAddons({ addons }: { addons: ArticleAddon[] }) {
  const [lightbox, setLightbox] = useState<{ images: Array<{ url?: string | null; alt_text?: string }>; index: number } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowLeft') setLightbox((current) => current && ({ ...current, index: (current.index - 1 + current.images.length) % current.images.length }));
      if (event.key === 'ArrowRight') setLightbox((current) => current && ({ ...current, index: (current.index + 1) % current.images.length }));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [lightbox]);

  return (
    <div className="artikel-addons">
      {addons.map((addon, addonIndex) => {
        const key = addon.id || `${addon.addon_type}-${addonIndex}`;

        if (addon.addon_type === 'image_slider' || addon.addon_type === 'gallery') {
          const directImages = addon.config?.media ?? [];
          const savedGalleryImages = (addon.config?.gallery?.gallery_items ?? []).map(
            (item) => item.media_assets ?? {},
          );
          const images = [...savedGalleryImages, ...directImages].filter((media) => media.url);
          if (images.length === 0) return null;

          return (
            <section key={key} className="artikel-addon">
              {addon.title && <h2>{addon.title}</h2>}
              <div className="artikel-image-gallery">
                {images.map((media, imageIndex) => (
                  <button key={`${key}-${imageIndex}`} type="button" className="artikel-image-button" onClick={() => setLightbox({ images, index: imageIndex })} aria-label={`Buka gambar ${imageIndex + 1}`}>
                  <img
                    src={media.url || undefined}
                    alt={`${addon.title || 'Galeri artikel'} ${imageIndex + 1}`}
                    loading="lazy"
                  />
                  </button>
                ))}
              </div>
            </section>
          );
        }

        if (addon.addon_type === 'pdf_viewer' && addon.config?.url) {
          return (
            <section key={key} className="artikel-addon">
              {addon.title && <h2>{addon.title}</h2>}
              <iframe
                className="artikel-pdf-viewer"
                src={addon.config.url}
                title={addon.title || 'Dokumen PDF artikel'}
                loading="lazy"
              />
              {addon.config.show_download !== false && (
                <a className="artikel-pdf-link" href={addon.config.url} target="_blank" rel="noreferrer">
                  Buka atau unduh PDF
                </a>
              )}
            </section>
          );
        }

        if (addon.addon_type === 'file_download' && addon.config?.url) {
          return (
            <section key={key} className="artikel-addon">
              {addon.title && <h2>{addon.title}</h2>}
              <a className="artikel-pdf-link" href={addon.config.url} target="_blank" rel="noreferrer">
                Unduh file
              </a>
            </section>
          );
        }

        return null;
      })}
      {lightbox && <div className="artikel-lightbox" role="dialog" aria-modal="true" aria-label="Pratinjau gambar" onClick={(event) => event.target === event.currentTarget && setLightbox(null)}><button type="button" className="artikel-lightbox-close" onClick={() => setLightbox(null)} aria-label="Tutup">×</button>{lightbox.images.length > 1 && <button type="button" className="artikel-lightbox-prev" onClick={() => setLightbox((current) => current && ({ ...current, index: (current.index - 1 + current.images.length) % current.images.length }))} aria-label="Gambar sebelumnya">‹</button>}<img src={lightbox.images[lightbox.index].url || undefined} alt={lightbox.images[lightbox.index].alt_text || ""} />{lightbox.images.length > 1 && <button type="button" className="artikel-lightbox-next" onClick={() => setLightbox((current) => current && ({ ...current, index: (current.index + 1) % current.images.length }))} aria-label="Gambar berikutnya">›</button>}</div>}
    </div>
  );
}

export default function ArtikelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchArticleBySlug(slug);
        
        if (!data) {
          setNotFound(true);
        } else {
          setArticle(data);
        }
      } catch (error) {
        console.error('Failed to load article:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '80px 64px',
            textAlign: 'center',
            color: 'var(--muted)',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 600 }}>
            Memuat artikel...
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/artikel" replace />;
  }

  const catColor = categoryColors[article.category] || '#d11f1f';
  const sortedAddons = [...(article.addons ?? [])].sort(
    (left, right) => (left.sort_order ?? 0) - (right.sort_order ?? 0),
  );
  const beforeContentAddons = sortedAddons.filter((addon) => addon.placement === 'before_content');
  const afterContentAddons = sortedAddons.filter((addon) => addon.placement !== 'before_content');
  const articleContent = article.content.replace(/<p>\s*\[Add-on:[^\]]+\]\s*<\/p>/gi, '');
  let headingIndex = 0;
  const articleContentWithHeadingIds = articleContent.replace(/<(h[1-3])([^>]*)>/gi, (_match, tag, attrs) => {
    const id = `heading-${headingIndex}`;
    headingIndex += 1;
    return `<${tag}${attrs} id=\"${id}\">`;
  });

  return (
    <>
      <Helmet>
        <title>{article.title} | Utero Indonesia</title>
        <meta name="description" content={article.excerpt} />
        {article.robots && <meta name="robots" content={article.robots} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={article.canonical_url || `https://uteroindonesia.com/artikel/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        {(article.og_image_path || article.cover_url) && <meta property="og:image" content={article.og_image_path || article.cover_url || undefined} />}
        <meta property="og:site_name" content="Utero Indonesia" />
        <meta property="og:locale" content="id_ID" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        {(article.og_image_path || article.cover_url) && <meta name="twitter:image" content={article.og_image_path || article.cover_url || undefined} />}
        <link rel="canonical" href={article.canonical_url || `https://uteroindonesia.com/artikel/${article.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            url: article.canonical_url || `https://uteroindonesia.com/artikel/${article.slug}`,
            ...(article.cover_url ? { image: article.cover_url } : {}),
            author: { '@type': 'Person', name: article.author || 'Utero Indonesia' },
            publisher: {
              '@type': 'Organization',
              name: 'Utero Indonesia',
              logo: { '@type': 'ImageObject', url: 'https://uteroindonesia.com/images/logo-utero-transparent.webp' },
            },
            datePublished: article.published_at,
            dateModified: article.updated_at || article.published_at,
            inLanguage: 'id-ID',
          })}
        </script>
      </Helmet>

      <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <article
          style={{
            width: 'calc(100vw - 48px)',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '64px 56px 120px',
          }}
          className="artikel-detail"
        >
          <div style={{ marginBottom: '40px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <Link to="/artikel" className="artikel-back-link">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Semua Artikel
              </Link>

              <span
                style={{
                  display: 'inline-block',
                  background: catColor,
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '2px',
                }}
              >
                {article.category}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--ink)',
                marginBottom: '16px',
              }}
            >
              {article.title}
            </h1>

            <div
              style={{
                fontSize: '14px',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {article.date}
              </div>
              {article.author && (
                <>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {article.author}
                  </div>
                </>
              )}
            </div>
          </div>

          {article.cover_url ? (
            <div
              className="artikel-hero"
            >
              <img src={article.cover_url} alt={article.title} />
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                height: '320px',
                background: `linear-gradient(135deg, ${catColor}15, ${catColor}05)`,
                borderRadius: '4px',
                marginBottom: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '80px',
                  fontWeight: 800,
                  color: `${catColor}12`,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                }}
              >
                {article.category.charAt(0)}
              </span>
            </div>
          )}

          <ArticleAddons addons={beforeContentAddons} />

          <TableOfContents content={articleContent} />

          <div
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--ink-soft)',
            }}
            className="artikel-content"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(articleContentWithHeadingIds) }}
          />

          <ArticleAddons addons={afterContentAddons} />

          <div
            style={{
              marginTop: '64px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <Link to="/artikel" className="artikel-back-link red">
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
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Kembali ke Semua Artikel
            </Link>
          </div>
        </article>
      </main>

      <style>{`
        .artikel-hero { position: relative; width: 100%; margin-left: 0; transform: none; margin-bottom: 48px; overflow: hidden; background: #111; }
        .artikel-hero img { display: block; width: 100%; height: auto; object-fit: contain; }
        .artikel-image-button { display: block; width: 100%; padding: 0; border: 0; cursor: zoom-in; background: none; }
        .artikel-lightbox { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 40px; background: rgba(0,0,0,.92); }
        .artikel-lightbox img { max-width: 92vw; max-height: 88vh; object-fit: contain; }
        .artikel-lightbox button { position: absolute; border: 0; background: rgba(255,255,255,.12); color: #fff; cursor: pointer; font-size: 42px; line-height: 1; }
        .artikel-lightbox-close { top: 20px; right: 24px; padding: 4px 14px 10px; }
        .artikel-lightbox-prev { left: 24px; top: 50%; padding: 0 14px 8px; }
        .artikel-lightbox-next { right: 24px; top: 50%; padding: 0 14px 8px; }
        .artikel-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          margin-bottom: 0;
          transition: color 0.2s;
        }
        .artikel-back-link:hover {
          color: var(--red);
        }
        .artikel-back-link.red {
          font-size: 14px;
          color: var(--red);
          margin-bottom: 0;
        }
        .artikel-back-link.red:hover {
          gap: 10px;
        }
        .artikel-content h2 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          margin-top: 32px;
          margin-bottom: 16px;
          color: var(--ink);
        }
        .artikel-content h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          margin-top: 24px;
          margin-bottom: 12px;
          color: var(--ink);
        }
        .artikel-content p {
          margin-bottom: 16px;
        }
        .artikel-content ul, .artikel-content ol {
          margin-left: 24px;
          margin-bottom: 16px;
        }
        .artikel-content li {
          margin-bottom: 8px;
        }
        .artikel-content a {
          color: var(--red);
          text-decoration: underline;
        }
        .artikel-content a:hover {
          text-decoration: none;
        }
        .artikel-content img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 24px 0;
        }
        .artikel-addons {
          display: grid;
          gap: 40px;
          margin-top: 40px;
        }
        .artikel-addon h2 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--ink);
        }
        .artikel-image-gallery {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .artikel-image-gallery img {
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          border-radius: 4px;
        }
        .artikel-pdf-viewer {
          width: 100%;
          height: min(75vh, 720px);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: #fff;
        }
        .artikel-pdf-link {
          display: inline-flex;
          margin-top: 12px;
          color: var(--red);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }
        @media (max-width: 1024px) {
          .artikel-detail {
            padding: 60px 32px 80px !important;
          }
        }
        @media (max-width: 640px) {
          .artikel-detail { width: 100% !important; padding-left: 20px !important; padding-right: 20px !important; }
          .artikel-hero { width: calc(100% + 40px); margin-left: -20px; }
          .artikel-lightbox { padding: 20px; }
          .artikel-detail {
            padding: 40px 20px 60px !important;
          }
          .artikel-image-gallery {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
