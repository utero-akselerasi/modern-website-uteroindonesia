"use client";

import { motion } from "framer-motion";

const aboutCards = [
  { num: "1998", suffix: ".", label: "Tahun berdiri di Malang, Jawa Timur" },
  { num: "7", suffix: "+", label: "Sub-brand & divisi aktif" },
  { num: "MLG", suffix: ".", label: "Malang · Mojokerto · Madiun" },
  { num: "∞", suffix: ".", label: "Komitmen pada klien, tanpa kompromi" },
];

export default function About() {
  return (
    <section
      id="tentang"
      aria-labelledby="about-title"
      style={{
        background: "var(--ash)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
        padding: "120px 64px",
      }}
      className="about-section"
    >
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
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
          Tentang Utero Indonesia
        </div>
        <h2
          id="about-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 4vw, 58px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--ink)",
          }}
        >
          Lebih dari
          <br />
          Sekadar Agency.
        </h2>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.75,
            color: "#555",
            marginTop: "28px",
            maxWidth: "520px",
          }}
        >
          Sejak 1998, Utero Indonesia berdiri sebagai ekosistem kreatif — bukan
          hanya satu agensi, tapi sebuah keluarga besar divisi yang saling
          menopang. Dari desain logo hingga distribusi musik, dari signage fisik
          hingga otomasi AI.{" "}
          <strong style={{ color: "var(--ink)" }}>
            Kami adalah jawaban dari segala permasalahan promosi usaha di luar
            sana.
          </strong>
        </p>
      </motion.div>

      {/* Right - Cards */}
      <div
        role="list"
        aria-label="Data perusahaan"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {aboutCards.map((card, i) => (
          <motion.div
            key={card.num}
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              background: "var(--white)",
              padding: "28px",
              borderLeft: "3px solid var(--red)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "42px",
                fontWeight: 800,
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              {card.num}
              <span style={{ color: "var(--red)" }}>{card.suffix}</span>
            </div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--muted)",
                marginTop: "6px",
                lineHeight: 1.4,
              }}
            >
              {card.label}
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .about-section {
            grid-template-columns: 1fr !important;
            padding: 72px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
