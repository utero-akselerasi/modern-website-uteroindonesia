"use client";

import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

const divisions = [
  {
    tag: "01 — Design",
    name: "Utero.id",
    desc: "Brand identity, konsultasi branding, desain grafis, dan strategi visual untuk bisnis yang ingin tampil berbeda.",
    services: ["Logo & GSM", "Brand Strategy", "Foto & Video", "Konsultan Branding"],
    href: "https://utero.id/",
  },
  {
    tag: "02 — Advertising",
    name: "Utero Malang",
    desc: "Produksi reklame, printing digital indoor & outdoor, signage, neonbox, pylon, dan branding kendaraan.",
    services: ["Billboard", "Signage 3D", "Digital Print", "Vehicle Wrap"],
    href: "https://uteroindonesia.com/",
  },
  {
    tag: "03 — Digital",
    name: "Buzzerhood",
    desc: "Manajemen media sosial, konten digital, kampanye influencer, dan strategi pemasaran online yang terukur.",
    services: ["Social Media", "Content Creator", "Digital Campaign"],
    href: "https://buzzerhood.com/",
  },
  {
    tag: "04 — Music",
    name: "Soundpub",
    desc: "Distribusi musik digital ke platform streaming global. Solusi untuk musisi independen dan label rekaman lokal.",
    services: ["Music Distribution", "Streaming Platforms", "Label Services"],
    href: "http://soundpub.uteroindonesia.com/",
  },
  {
    tag: "05 — Media",
    name: "Epochstream",
    desc: "Platform media digital dan konten kreatif yang mendokumentasikan ekosistem kreatif Indonesia.",
    services: ["Digital Media", "Content Platform", "Storytelling"],
    href: "https://epochstream.org/",
  },
  {
    tag: "06 — AI Tech",
    name: "Carubra.com",
    desc: "Otomasi bisnis berbasis kecerdasan buatan. Solusi AI untuk efisiensi operasional dan pertumbuhan bisnis digital.",
    services: ["AI Automation", "Digital Product", "Tech Consulting"],
    href: "https://carubra.com/",
  },
];

export default function Divisions() {
  return (
    <section
      id="divisi"
      aria-labelledby="divisions-title"
      style={{
        background: "var(--black)",
        padding: "120px 64px",
      }}
      className="divisions-section"
    >
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
        Ekosistem Kreatif Kami
      </div>

      <h2
        id="divisions-title"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 4vw, 58px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "#fff",
        }}
      >
        Satu Atap,
        <br />
        Banyak Solusi.
      </h2>

      <p
        style={{
          fontSize: "17px",
          lineHeight: 1.7,
          color: "rgba(255, 255, 255, 0.45)",
          maxWidth: "600px",
          marginTop: "20px",
          marginBottom: "72px",
        }}
      >
        Setiap divisi Utero Indonesia berdiri dengan keahlian yang spesifik —
        namun bekerja secara sinergis. Apapun kebutuhan brand Anda, ada satu
        rumah untuk menyelesaikannya.
      </p>

      <div
        role="list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
        }}
        className="divisions-grid"
      >
        {divisions.map((div, i) => (
          <motion.a
            key={div.name}
            href={div.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendGAEvent({ event: "click_division", value: `redirect_to_${div.name.toLowerCase().replace(/\s+/g, "_")}` })}
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              padding: "40px 36px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              display: "block",
              textDecoration: "none",
              transition: "all 0.3s var(--ease)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              const bar = e.currentTarget.querySelector(
                ".div-card-bar"
              ) as HTMLElement;
              if (bar) bar.style.transform = "scaleX(1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              const bar = e.currentTarget.querySelector(
                ".div-card-bar"
              ) as HTMLElement;
              if (bar) bar.style.transform = "scaleX(0)";
            }}
          >
            {/* Bottom red bar */}
            <div
              className="div-card-bar"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "var(--red)",
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.3s var(--ease)",
              }}
            />

            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--red)",
                marginBottom: "20px",
              }}
            >
              {div.tag}
            </div>

            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "14px",
                lineHeight: 1.1,
              }}
            >
              {div.name}
            </div>

            <div
              style={{
                fontSize: "14px",
                lineHeight: 1.65,
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              {div.desc}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "24px",
              }}
            >
              {div.services.map((svc) => (
                <span
                  key={svc}
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    padding: "4px 10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {svc}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .divisions-section {
            padding: 72px 24px !important;
          }
          .divisions-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
