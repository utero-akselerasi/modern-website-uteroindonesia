import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { articles, getArticleBySlug } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Utero Indonesia`,
    description: article.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  Profil: "#d11f1f",
  Layanan: "#2563eb",
  Portofolio: "#059669",
};

export default function ArtikelDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const catColor = categoryColors[article.category] || "#d11f1f";

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "100px", minHeight: "100vh" }}>
        <article
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "80px 64px 120px",
          }}
          className="artikel-detail"
        >
          <div style={{ marginBottom: "40px" }}>
            <Link href="/artikel" className="artikel-back-link">
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
                display: "inline-block",
                background: catColor,
                color: "#fff",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: "2px",
                marginBottom: "20px",
              }}
            >
              {article.category}
            </span>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "var(--ink)",
                marginBottom: "16px",
              }}
            >
              {article.title}
            </h1>

            <div
              style={{
                fontSize: "14px",
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
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
          </div>

          <div
            style={{
              width: "100%",
              height: "320px",
              background: `linear-gradient(135deg, ${catColor}15, ${catColor}05)`,
              borderRadius: "4px",
              marginBottom: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "80px",
                fontWeight: 800,
                color: `${catColor}12`,
                letterSpacing: "-0.04em",
                userSelect: "none",
              }}
            >
              {article.category.charAt(0)}
            </span>
          </div>

          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "var(--ink-soft)",
            }}
            className="artikel-content"
          >
            <p>{article.content}</p>
          </div>

          <div
            style={{
              marginTop: "64px",
              paddingTop: "32px",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <Link href="/artikel" className="artikel-back-link red">
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
      <Footer />

      <style>{`
        .artikel-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          margin-bottom: 32px;
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
        @media (max-width: 1024px) {
          .artikel-detail {
            padding: 60px 32px 80px !important;
          }
        }
        @media (max-width: 640px) {
          .artikel-detail {
            padding: 40px 20px 60px !important;
          }
        }
      `}</style>
    </>
  );
}
