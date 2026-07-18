"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRecentArticles } from "@/data/articles";
import ArticleCard from "./ArticleCard";

export default function RecentArticles() {
  const recentArticles = getRecentArticles(3);

  return (
    <section
      id="artikel"
      aria-labelledby="recent-articles-title"
      style={{ padding: "120px 64px", background: "var(--ash)" }}
      className="recent-articles-section"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "48px",
        }}
        className="recent-articles-header"
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--muted)",
              }}
            />
            Blog
          </div>
          <h2
            id="recent-articles-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--ink)",
            }}
          >
            Artikel Terbaru
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/artikel"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--red)",
              textDecoration: "none",
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = "10px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = "6px";
            }}
          >
            Lihat Semua
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
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px",
        }}
        className="recent-articles-grid"
      >
        {recentArticles.map((article, i) => (
          <ArticleCard key={article.slug} article={article} index={i} />
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .recent-articles-section {
            padding: 80px 32px !important;
          }
          .recent-articles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .recent-articles-section {
            padding: 64px 20px !important;
          }
          .recent-articles-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .recent-articles-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
