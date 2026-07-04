"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "Branding",
  "Advertising",
  "Digital",
  "Signage",
  "Desain Grafis",
];

const items = [
  { title: "Cebro Agency", category: "Branding", desc: "Creative agency branding & identity system", url: "https://www.instagram.com/cebro.agency/", logo: "/images/portfolio/cebro-agency.webp" },
  { title: "Odigiro Consultant", category: "Branding", desc: "City branding & konsultan strategi merek", url: "https://odigiro.uteroindonesia.com/", logo: "/images/portfolio/odigiro-consultant.webp" },
  { title: "Festival Mbois", category: "Branding", desc: "Branding event tahunan Malang Creative Fusion", url: "https://festivalmbois.id/", logo: "/images/portfolio/festival-mbois.webp" },
  { title: "Osi & Ji", category: "Branding", desc: "Maskot kota Malang — branding ikon daerah", url: "http://osidanji.com/", logo: "/images/portfolio/osi-ji.webp" },
  { title: "Osiker", category: "Branding", desc: "Platform intellectual property & lisensi kreatif", url: "http://osiker.com/", logo: "/images/portfolio/osiker.webp" },
  { title: "Sawoto Reklame", category: "Advertising", desc: "Reklame, billboard, & media luar ruang", url: "https://www.instagram.com/sawoto.reklame/", logo: "/images/portfolio/sawoto-reklame.webp" },
  { title: "Mrono Branding Mobil", category: "Advertising", desc: "Branding kendaraan & mobil dinas", url: "https://www.instagram.com/brandingmobilmalang/", logo: "/images/portfolio/mrono-branding.webp" },
  { title: "Tokoneonbox", category: "Signage", desc: "Neon box custom & signage berkualitas", url: "https://www.instagram.com/tokoneonbox/", logo: "/images/portfolio/tokoneonbox.webp" },
  { title: "Ruvodo WebApps", category: "Digital", desc: "Pengembangan website & aplikasi modern", url: "http://ruvodo.com/", logo: "/images/portfolio/ruvodo-webapps.webp" },
  { title: "Epochstream", category: "Digital", desc: "Platform live streaming & konten digital", url: "http://epochstream.com", logo: "/images/portfolio/epochstream.webp" },
  { title: "Soundpub", category: "Digital", desc: "Audio branding & publikasi suara", url: "https://soundpub.uteroindonesia.com", logo: "/images/portfolio/soundpub.webp" },
  { title: "Buzzerhood", category: "Digital", desc: "Influencer marketing & buzz digital", url: "https://buzzerhood.com/", logo: "/images/portfolio/buzzerhood.webp" },
  { title: "Socioboo", category: "Digital", desc: "Paid promote & social media campaign", url: "http://socioboo.uteroindonesia.com/", logo: "/images/portfolio/socioboo.webp" },
  { title: "Malang Virtual", category: "Digital", desc: "Virtual tour 360° & digital experience", url: "https://malangvirtual.uteroindonesia.com", logo: "/images/portfolio/malang-virtual.webp" },
  { title: "Smartsuco", category: "Digital", desc: "Smart space & solusi otomasi digital", url: "https://smartsuco.utero.id", logo: "/images/portfolio/smartsuco.webp" },
  { title: "Immerstal", category: "Digital", desc: "Immersive technology & interactive media", url: "https://immerstal.uteroindonesia.com", logo: "/images/portfolio/immerstal.webp" },
  { title: "Symadeco", category: "Digital", desc: "Sistem manajemen dekorasi berbasis web", url: "http://symadeco.com/", logo: "/images/portfolio/symadeco.webp" },
  { title: "Inon  er", category: "Desain Grafis", desc: "Desain grafis & visual komunikasi", url: "http://inon.utero.id", logo: "/images/portfolio/inon-er.webp" },
  { title: "Kochiro Inexterior", category: "Desain Grafis", desc: "Desain interior & eksterior kreatif", url: "https://www.kochiro.com/", logo: "/images/portfolio/kochiro-inexterior.webp" },
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
        background: "#ffffff",
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
              color: "#111",
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
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.color = "var(--red)";
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
            <motion.a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="portfolio-card"
              style={{
                background: "var(--ash)",
                padding: "48px 32px",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "border-color 0.2s, transform 0.2s",
                textDecoration: "none",
                color: "inherit",
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
              <div className="portfolio-item-inner" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "24px", width: "100%" }}>
                <div className="portfolio-logo" style={{ width: "120px", height: "120px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.logo ? (
                    <Image src={item.logo} alt={item.title} width={120} height={120} style={{ objectFit: "contain", width: "100%", height: "100%", filter: "brightness(1.3) drop-shadow(0 0 6px rgba(255,255,255,0.06))" }} loading="lazy" />
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
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
                    className="portfolio-item-title"
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
                    className="portfolio-item-desc"
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
                </div>
              </div>
            </motion.a>
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
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .portfolio-card {
            padding: 20px 14px !important;
          }
          .portfolio-item-inner {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 8px !important;
          }
          .portfolio-item-inner .portfolio-logo {
            width: 80px !important;
            height: 80px !important;
          }
          .portfolio-item-inner .portfolio-logo img {
            width: 80px !important;
            height: 80px !important;
          }
          .portfolio-item-title {
            font-size: 17px !important;
            margin-bottom: 4px !important;
          }
          .portfolio-item-desc {
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
