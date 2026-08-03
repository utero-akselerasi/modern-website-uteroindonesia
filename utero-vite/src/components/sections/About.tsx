import { motion } from "framer-motion";

const aboutCards = [
  {
    num: "1998",
    suffix: "",
    label: "Tahun berdiri di Malang, Jawa Timur",
    icon: "calendar",
  },
  {
    num: "7",
    suffix: "+",
    label: "Sub-brand & divisi aktif",
    icon: "layers",
  },
  {
    num: "3",
    suffix: "",
    label: "Malang Â· Mojokerto Â· Madiun",
    icon: "map-pin",
  },
  {
    num: "",
    suffix: "",
    label: "Komitmen pada klien, tanpa kompromi",
    icon: "infinity",
  },
];

function StatIcon({ name }: { name: string }) {
  const props = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "layers":
      return (
        <svg {...props}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...props}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "infinity":
      return (
        <svg {...props}>
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function About() {
  return (
    <section
      id="tentang"
      aria-labelledby="about-title"
      style={{
        background: "var(--white)",
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
            color: "var(--ink)",
            opacity: 0.7,
            marginTop: "28px",
            maxWidth: "520px",
          }}
        >
          Sejak 1998, Utero Indonesia berdiri sebagai ekosistem kreatif  bukan
          hanya satu agensi, tapi sebuah keluarga besar divisi yang saling
          menopang. Dari desain logo hingga distribusi musik, dari signage fisik
          hingga otomasi AI.{" "}
          <strong style={{ color: "var(--ink)" }}>
            Kami adalah jawaban dari segala permasalahan promosi usaha di luar
            sana.
          </strong>
        </p>
      </motion.div>

      {/* Right - 2x2 Cards with Red Icons */}
      <div
        role="list"
        aria-label="Data perusahaan"
        className="about-cards-list"
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
              background: "var(--ash)",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            className="about-card"
          >
            <span
              style={{
                width: "48px",
                height: "48px",
                background: "var(--red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                color: "#fff",
              }}
            >
              <StatIcon name={card.icon} />
            </span>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "42px",
                fontWeight: 800,
                color: "var(--ink)",
                lineHeight: 1,
                flexShrink: 0,
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
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              {card.label}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .about-section {
          padding: 100px clamp(16px, 5vw, 64px) !important;
        }
        @media (max-width: 900px) {
          .about-section {
            grid-template-columns: 1fr !important;
            padding: 72px 24px !important;
          }
        }
        @media (max-width: 768px) {
          .about-card {
            padding: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .about-cards-list {
            grid-template-columns: 1fr !important;
          }
          .about-card {
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
