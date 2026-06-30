"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "Branding",
  "Advertising",
  "Digital",
  "Signage",
  "Desain Grafis",
];

const items = [
  { title: "Cebro Agency", category: "Branding", desc: "Creative agency branding & identity system" },
  { title: "Odigiro Consultant", category: "Branding", desc: "City branding & konsultan strategi merek" },
  { title: "Festival Mbois", category: "Branding", desc: "Branding event tahunan Malang Creative Fusion" },
  { title: "Osi & Ji", category: "Branding", desc: "Maskot kota Malang — branding ikon daerah" },
  { title: "Osiker", category: "Branding", desc: "Platform intellectual property & lisensi kreatif" },
  { title: "Sawoto Reklame", category: "Advertising", desc: "Reklame, billboard, & media luar ruang" },
  { title: "Mrono Branding Mobil", category: "Advertising", desc: "Branding kendaraan & mobil dinas" },
  { title: "Tokoneonbox", category: "Signage", desc: "Neon box custom & signage berkualitas" },
  { title: "Ruvodo WebApps", category: "Digital", desc: "Pengembangan website & aplikasi modern" },
  { title: "Epochstream", category: "Digital", desc: "Platform live streaming & konten digital" },
  { title: "Soundpub", category: "Digital", desc: "Audio branding & publikasi suara" },
  { title: "Buzzerhood", category: "Digital", desc: "Influencer marketing & buzz digital" },
  { title: "Socioboo", category: "Digital", desc: "Paid promote & social media campaign" },
  { title: "Malang Virtual", category: "Digital", desc: "Virtual tour 360° & digital experience" },
  { title: "Smartsuco", category: "Digital", desc: "Smart space & solusi otomasi digital" },
  { title: "Immerstal", category: "Digital", desc: "Immersive technology & interactive media" },
  { title: "Symadeco", category: "Digital", desc: "Sistem manajemen dekorasi berbasis web" },
  { title: "Inon  er", category: "Desain Grafis", desc: "Desain grafis & visual komunikasi" },
  { title: "Kochiro Inexterior", category: "Desain Grafis", desc: "Desain interior & eksterior kreatif" },
];

export default function Portfolio() {
  const [active, setActive] = useState("Branding");

  const filtered = active === "Semua"
    ? items
    : items.filter((item) => item.category === active);

  return (
    <section
      id="portofolio"
      aria-labelledby="portfolio-title"
      style={{
        background: "#1a1a1a",
        padding: "120px 64px",
      }}
      className="portfolio-section"
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "end",
          marginBottom: "56px",
        }}
        className="portfolio-header"
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--red)",
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
                background: "var(--red)",
              }}
            />
            Portofolio
          </div>
          <h2
            id="portfolio-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
            }}
          >
            Karya Nyata,
            <br />
            Hasil Nyata.
          </h2>
        </div>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
color: "rgba(255,255,255,0.78)",
            alignSelf: "end",
          }}
        >
          Setiap proyek adalah cerita. Dari identitas merek hingga ekosistem
          digital — kami wujudkan ide menjadi karya yang berdampak.
        </p>
      </div>

      {/* Filter */}
      <div
        role="tablist"
        aria-label="Filter kategori portofolio"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "48px",
        }}
        className="portfolio-filters"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            style={{
              background: active === cat ? "var(--red)" : "transparent",
              color: active === cat ? "#fff" : "#999",
              border: active === cat ? "1px solid var(--red)" : "1px solid #444",
              padding: "10px 22px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              if (active !== cat) {
                e.currentTarget.style.borderColor = "#fff";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (active !== cat) {
                e.currentTarget.style.borderColor = "#444";
                e.currentTarget.style.color = "#999";
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div
        role="list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
        className="portfolio-grid"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.title}
              role="listitem"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "var(--ash)",
                padding: "48px 32px",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column",
                cursor: "default",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--red)",
                  marginBottom: "12px",
                }}
              >
                {item.category}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.2,
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  opacity: 0.72,
                  marginTop: "auto",
                }}
              >
                {item.desc}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 900px) {
          .portfolio-section {
            padding: 72px 24px !important;
          }
          .portfolio-header {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 600px) {
          .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
