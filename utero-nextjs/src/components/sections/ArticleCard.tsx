"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Article } from "@/data/articles";

const categoryColors: Record<string, string> = {
  Profil: "#d11f1f",
  Layanan: "#2563eb",
  Portofolio: "#059669",
};

export default function ArticleCard({
  article,
  index = 0,
}: {
  article: Article;
  index?: number;
}) {
  const catColor = categoryColors[article.category] || "#d11f1f";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/artikel/${article.slug}`}
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          border: "1px solid var(--border-color)",
          borderRadius: "4px",
          overflow: "hidden",
          textDecoration: "none",
          color: "var(--ink)",
          height: "100%",
          transition: "transform 0.25s var(--ease), box-shadow 0.25s var(--ease)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div
          style={{
            width: "100%",
            height: "200px",
            background: `linear-gradient(135deg, ${catColor}22, ${catColor}08)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: `${catColor}18`,
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}
          >
            {article.category.charAt(0)}
          </span>
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: catColor,
              color: "#fff",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "2px",
            }}
          >
            {article.category}
          </span>
        </div>

        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          <div
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              fontWeight: 500,
            }}
          >
            {article.date}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "var(--ink)",
              margin: 0,
            }}
          >
            {article.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--muted)",
              margin: 0,
              flex: 1,
            }}
          >
            {article.excerpt}
          </p>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: catColor,
              marginTop: "4px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Baca Selengkapnya
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
