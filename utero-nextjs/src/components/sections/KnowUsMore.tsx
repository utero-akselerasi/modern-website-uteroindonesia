"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

const handleRedirectClick = (label: string) => {
  sendGAEvent({ event: "click_hub_redirect", value: `redirect_to_${label.toLowerCase().replace(/\s+/g, "_")}` });
};

const knowUsItems = [
  {
    label: "Shop",
    href: "http://shop.uteroindonesia.com/",
    target: "_blank",
    icon: "shop",
    alt: "Toko merchandise dan produk kreatif Utero Indonesia",
    onClick: () => handleRedirectClick("Shop"),
  },
  {
    label: "Design",
    href: "https://design.uteroindonesia.com/",
    target: "_blank",
    icon: "design",
    alt: "Jasa desain logo, kemasan, grafis, dan branding",
    onClick: () => handleRedirectClick("Design"),
  },
  {
    label: "Advertising",
    href: "https://www.instagram.com/uteromalang",
    target: "_blank",
    icon: "reklame",
    alt: "Jasa reklame, neonbox, signage, dan advertising",
  },
  {
    label: "Billboard",
    href: "https://www.instagram.com/utero_billboard/",
    target: "_blank",
    icon: "billboard",
    alt: "Sewa billboard, baliho, megatron, videotron",
  },
  {
    label: "Profile",
    href: "http://utero.id/",
    target: "_blank",
    icon: "brandconsultant",
    alt: "Brand consultant dan creative agency Malang",
    onClick: () => handleRedirectClick("Profile"),
  },
  {
    label: "Legal Serv.",
    href: "http://legal.uteroindonesia.com/",
    target: "_blank",
    icon: "research",
    alt: "Jasa riset, legalitas, perijinan perusahaan",
    onClick: () => handleRedirectClick("Legal Serv."),
  },
  {
    label: "Academy",
    href: "http://academy.uteroindonesia.com/",
    target: "_blank",
    icon: "course",
    alt: "Kursus dan pelatihan kreatif",
    onClick: () => handleRedirectClick("Academy"),
  },
  {
    label: "Media",
    href: "http://media.uteroindonesia.com/",
    target: "_blank",
    icon: "technology",
    alt: "Media dan teknologi kreatif digital",
    onClick: () => handleRedirectClick("Media"),
  },
];

export default function KnowUsMore() {
  return (
    <section
      id="know-us"
      aria-labelledby="know-us-title"
      style={{
        padding: "20px 64px 80px",
        background: "var(--white)",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--red)",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          Know Us More
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "var(--red)",
            }}
          />
        </div>
        <h2
          id="know-us-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--ink)",
          }}
        >
          Lini Bisnis <span style={{ color: "var(--red)" }}>Kami</span>
        </h2>
      </motion.div>

      {/* Ticker Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          padding: "24px 0",
        }}
        className="know-us-ticker-container"
      >
        {/* Fade mask */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "150px",
            background: "linear-gradient(to right, var(--white), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "150px",
            background: "linear-gradient(to left, var(--white), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Ticker Track */}
        <div
          className="know-us-ticker-track"
          style={{
            display: "flex",
            gap: "20px",
            width: "max-content",
          }}
        >
          {[...knowUsItems, ...knowUsItems].map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={item.href}
              target={item.target}
              rel="noopener noreferrer"
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                }
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "36px 20px 32px",
                background: "var(--ash)",
                border: "1px solid var(--border-color)",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                width: "220px",
                flexShrink: 0,
                borderRadius: "2px",
              }}
              className="know-us-item"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--red)";
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(209, 31, 31, 0.2)";
                const label = e.currentTarget.querySelector(".know-us-label");
                if (label)
                  (label as HTMLElement).style.color = "var(--white)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--ash)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                const label = e.currentTarget.querySelector(".know-us-label");
                if (label)
                  (label as HTMLElement).style.color = "var(--ink)";
              }}
            >
              <span
                className="know-us-icon"
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
                aria-hidden="true"
              >
                <Image
                  src={`/images/icon/${item.icon}.webp`}
                  alt={item.alt}
                  width={76}
                  height={76}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </span>
              <span
                className="know-us-label"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  transition: "color 0.3s",
                }}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Responsive & Animation */}
      <style jsx global>{`
        @keyframes knowUsMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .know-us-ticker-track {
          animation: knowUsMarquee 25s linear infinite;
        }
        .know-us-ticker-track:hover {
          animation-play-state: paused;
        }
        .know-us-item:hover .know-us-label {
          color: var(--white) !important;
        }

        @media (max-width: 768px) {
          .know-us-item {
            width: 160px !important;
            padding: 24px 14px 20px !important;
          }
          .know-us-item .know-us-icon {
            width: 56px !important;
            height: 56px !important;
            margin-bottom: 12px !important;
          }
          .know-us-item .know-us-icon img {
            width: 52px !important;
            height: 52px !important;
          }
          .know-us-item .know-us-label {
            font-size: 12px !important;
          }
          .know-us-ticker-track {
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .know-us-item {
            width: 140px !important;
            padding: 20px 10px 16px !important;
          }
          .know-us-item .know-us-icon {
            width: 48px !important;
            height: 48px !important;
          }
          .know-us-item .know-us-icon img {
            width: 44px !important;
            height: 44px !important;
          }
          .know-us-item .know-us-label {
            font-size: 11px !important;
          }
          .know-us-ticker-track {
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}