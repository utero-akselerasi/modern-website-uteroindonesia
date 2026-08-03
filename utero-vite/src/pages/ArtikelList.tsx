import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/sections/ArticleCard';
import { articles } from '../data/articles';

export default function ArtikelList() {
  return (
    <>
      <Helmet>
        <title>Artikel | Utero Indonesia - Creative Agency & Brand Consultant Malang</title>
        <meta
          name="description"
          content="Baca artikel terbaru seputar branding, desain, digital marketing, dan tips kreatif dari PT. Utero Kreatif Indonesia."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uteroindonesia.com/artikel" />
        <meta property="og:title" content="Artikel | Utero Indonesia" />
        <meta
          property="og:description"
          content="Baca artikel terbaru seputar branding, desain, digital marketing, dan tips kreatif dari PT. Utero Kreatif Indonesia."
        />
        <link rel="canonical" href="https://uteroindonesia.com/artikel" />
      </Helmet>

      <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <section
          style={{
            padding: '80px 64px 120px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
          className="artikel-page"
        >
          <div style={{ marginBottom: '48px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  background: 'var(--muted)',
                }}
              />
              Blog
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--ink)',
              }}
            >
              Artikel
            </h1>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'var(--muted)',
                marginTop: '16px',
                maxWidth: '560px',
              }}
            >
              Insight, tips, dan cerita dari PT. Utero Kreatif Indonesia
              seputar branding, desain, dan dunia kreatif.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
            className="artikel-grid"
          >
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>

          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <Link to="/" className="artikel-back-link">
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
              Kembali ke Beranda
            </Link>
          </div>
        </section>
      </main>

      <style>{`
        .artikel-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--red);
          text-decoration: none;
          transition: gap 0.2s;
        }
        .artikel-back-link:hover {
          gap: 10px;
        }
        @media (max-width: 1024px) {
          .artikel-page {
            padding: 60px 32px 80px !important;
          }
          .artikel-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .artikel-page {
            padding: 40px 20px 60px !important;
          }
          .artikel-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}