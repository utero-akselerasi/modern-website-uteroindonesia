
import { motion } from "framer-motion";
import { sendGAEvent } from "@/compat/next";

const divisions = [
  {
    tag: "01 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Design",
    name: "Utero.id",
    desc: "Brand identity, konsultasi branding, desain grafis, dan strategi visual untuk bisnis yang ingin tampil berbeda.",
    services: ["Logo & GSM", "Brand Strategy", "Foto & Video", "Konsultan Branding"],
    href: "https://utero.id/",
  },
  {
    tag: "02 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Advertising",
    name: "Utero Malang",
    desc: "Produksi reklame, printing digital indoor & outdoor, signage, neonbox, pylon, dan branding kendaraan.",
    services: ["Billboard", "Signage 3D", "Digital Print", "Vehicle Wrap"],
    href: "https://uteroindonesia.com/",
  },
  {
    tag: "03 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Digital",
    name: "Buzzerhood",
    desc: "Manajemen media sosial, konten digital, kampanye influencer, dan strategi pemasaran online yang terukur.",
    services: ["Social Media", "Content Creator", "Digital Campaign", "Influencer"],
    href: "https://buzzerhood.com/",
  },
  {
    tag: "04 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Music",
    name: "Soundpub",
    desc: "Distribusi musik digital ke platform streaming global. Solusi untuk musisi independen dan label rekaman lokal.",
    services: ["Music Distribution", "Streaming Platforms", "Label Services", "Sync Licensing"],
    href: "https://soundpub.xyz/",
  },
  {
    tag: "05 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Media",
    name: "Epochstream",
    desc: "Platform media digital dan konten kreatif yang mendokumentasikan ekosistem kreatif Indonesia.",
    services: ["Digital Media", "Content Platform", "Storytelling", "Brand Journalism"],
    href: "https://epochstream.org/",
  },
  {
    tag: "06 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â AI Tech",
    name: "Carubra.com",
    desc: "Otomasi bisnis berbasis kecerdasan buatan. Solusi AI untuk efisiensi operasional dan pertumbuhan bisnis digital.",
    services: ["AI Automation", "Digital Product", "Tech Consulting", "Data Analytics"],
    href: "https://carubra.com/",
  },
];

export default function Divisions() {
  return (
    <section
      id="divisi"
      aria-labelledby="divisions-title"
      style={{
        background: "var(--red)",
        padding: "120px 64px",
        position: "relative",
        overflow: "hidden",
      }}
      className="divisions-section"
    >
     
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.8fr",
          gap: "64px",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
          marginTop: "-20px",
        }}
        className="divisions-container"
      >
        <div className="divisions-left-col">
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fff",
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
                background: "#fff",
              }}
            />
            <span>Ekosistem Kreatif Kami</span>
          </div>

          <h2
            id="divisions-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.8vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fff",
              marginTop: "8px",
            }}
          >
            Satu Atap,
            <br />
            Banyak Solusi.
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255, 255, 255, 0.75)",
              marginTop: "24px",
              marginBottom: "40px",
            }}
          >
            Setiap divisi Utero Indonesia berdiri dengan keahlian yang spesifik ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â
            namun bekerja secara sinergis. Apapun kebutuhan brand Anda, ada satu
            rumah untuk menyelesaikannya.
          </p>

          <a
            href="https://uteroindonesia.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: "12px 28px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "var(--red)";
              e.currentTarget.style.borderColor = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
          >
            Lihat Semua Unit ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢
          </a>
        </div>

        {/* 3-col x 2-row Grid */}
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
              background: "var(--white)",
              border: "1px solid var(--border-color)",
              padding: "32px 28px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              display: "block",
              textDecoration: "none",
              transition: "all 0.3s var(--ease)",
            }}
            className="divisions-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--ash)";
              const bar = e.currentTarget.querySelector(
                ".div-card-bar"
              ) as HTMLElement;
              if (bar) bar.style.transform = "scaleX(1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--white)";
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
              className="divisions-card-tag"
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--red)",
                marginBottom: "16px",
              }}
            >
              {div.tag}
            </div>

            <div
              className="divisions-card-name"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: 800,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                marginBottom: "12px",
                lineHeight: 1.1,
              }}
            >
              {div.name}
            </div>

            <div
              style={{
                fontSize: "13px",
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
              className="divisions-card-desc"
            >
              {div.desc}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "20px",
              }}
            >
              {div.services.map((svc) => (
                <span
                  key={svc}
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "var(--muted)",
                    border: "1px solid var(--border-color)",
                    padding: "3px 8px",
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
    </div>

      <style>{`
        @media (max-width: 1024px) {
          .divisions-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .divisions-left-col {
            position: relative !important;
            top: 0 !important;
          }
          .divisions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 900px) {
          .divisions-section {
            padding: 72px 24px !important;
          }
        }
        @media (max-width: 768px) {
          .divisions-card {
            padding: 24px 20px !important;
          }
          .divisions-card-tag {
            font-size: 10px !important;
            margin-bottom: 12px !important;
          }
          .divisions-card-name {
            font-size: 18px !important;
            margin-bottom: 10px !important;
          }
          .divisions-card-desc {
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            font-size: 12px !important;
          }
        }
        @media (max-width: 600px) {
          .divisions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .divisions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .divisions-card {
            padding: 20px 16px !important;
          }
          .divisions-card-name {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
