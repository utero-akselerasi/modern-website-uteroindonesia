
import { motion } from "framer-motion";
import { sendGAEvent } from "@/compat/next";

const communities = [
  {
    name: "MCF",
    fullName: "Malang Creative Fusion",
    href: "http://mcf.or.id/",
    img: "/images/community/mcf.webp",
    alt: "Malang Creative Fusion ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â membangun budaya kreatif masyarakat Malang",
    desc: "Membangun budaya kreatif masyarakat, menciptakan jejaring kolaborasi, dan menjadi pusat informasi pengembangan industri kreatif Kota Malang.",
  },
  {
    name: "ICCN",
    fullName: "Indonesia Creative Cities Network",
    href: "https://iccn.or.id/",
    img: "/images/community/iccn.webp",
    alt: "Indonesia Creative Cities Network ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â jejaring kota kreatif Indonesia",
    desc: "Jejaring kota/kabupaten kreatif Indonesia yang berkomitmen memajukan kota kreatif melalui riset dan pengembangan ekonomi kreatif.",
  },
  {
    name: "AAM",
    fullName: "Asosiasi Advertising Malang",
    href: "https://asosiasiadvertisingmalang.wordpress.com/",
    img: "/images/community/aam.webp",
    alt: "Asosiasi Advertising Malang ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â wadah pengusaha periklanan Malang Raya",
    desc: "Wadah komunikasi dan kolaborasi pengusaha periklanan Malang Raya untuk meningkatkan daya saing dan pertumbuhan industri periklanan.",
  },
  {
    name: "ADGI",
    fullName: "Asosiasi Desainer Grafis Indonesia",
    href: "https://adgimalang.com/",
    img: "/images/community/adgi.webp",
    alt: "ADGI Malang ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â asosiasi desainer grafis Indonesia chapter Malang",
    desc: "Asosiasi yang mewadahi profesi desainer grafis Indonesia dan mendukung pengembangan ekonomi kreatif nasional.",
  },
];

export default function Community() {
  return (
    <section
      id="community"
      aria-labelledby="community-title"
      style={{
        background: "var(--white)",
        padding: "100px clamp(16px, 5vw, 64px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.8fr",
          gap: "64px",
          alignItems: "start",
        }}
        className="community-container"
      >
        {/* Left Column */}
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
            Community
          </div>

          <h2
            id="community-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.8vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--ink)",
            }}
          >
            Ekosistem &
            <br />
            <span style={{ color: "var(--red)" }}>Komunitas</span>
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--muted)",
              marginTop: "24px",
              marginBottom: "40px",
            }}
          >
            Utero Indonesia tumbuh bersama komunitas kreatif ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â dari asosiasi
            profesional hingga jejaring kota kreatif Indonesia.
          </p>
        </div>

        {/* Right Column ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 2x2 Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2px",
          }}
          className="community-grid"
        >
          {communities.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: "click_community", value: `redirect_to_${item.name.toLowerCase().replace(/\s+/g, "_")}` })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: "var(--ash)",
                border: "1px solid var(--border-color)",
                padding: "36px 28px 32px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                transition: "all 0.3s var(--ease)",
              }}
              className="community-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--white)";
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(209, 31, 31, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--ash)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <img 
                  src={item.img}
                  alt={item.alt}
                  width={76}
                  height={76}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </span>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                  lineHeight: 1.2,
                }}
              >
                {item.name}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--red)",
                  letterSpacing: "0.04em",
                  marginBottom: "12px",
                }}
              >
                {item.fullName}
              </div>

              <div
                className="community-desc"
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "var(--muted)",
                }}
              >
                {item.desc}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .community-desc {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 1024px) {
          .community-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 768px) {
          .community-card {
            padding: 24px 20px 24px !important;
          }
          .community-card span:first-child {
            width: 60px !important;
            height: 60px !important;
            margin-bottom: 16px !important;
          }
          .community-card span:first-child img {
            width: 56px !important;
            height: 56px !important;
          }
          .community-card div:nth-child(2) {
            font-size: 18px !important;
          }
          .community-card div:nth-child(3) {
            font-size: 11px !important;
          }
          .community-desc {
            font-size: 13px !important;
            -webkit-line-clamp: 2 !important;
          }
        }
        @media (max-width: 600px) {
          .community-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
