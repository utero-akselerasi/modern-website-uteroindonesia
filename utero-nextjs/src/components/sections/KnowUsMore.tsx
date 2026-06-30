"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const knowUsItems = [
  {
    label: "Shop",
    href: "http://shop.uteroindonesia.com/",
    target: "_blank",
    icon: "shop",
    alt: "Toko merchandise dan produk kreatif Utero Indonesia",
  },
  {
    label: "Design",
    href: "https://design.uteroindonesia.com/",
    target: "_blank",
    icon: "design",
    alt: "Jasa desain logo, kemasan, grafis, dan branding",
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
  },
  {
    label: "Legal Serv.",
    href: "http://legal.uteroindonesia.com/",
    target: "_blank",
    icon: "research",
    alt: "Jasa riset, legalitas, perijinan perusahaan",
  },
  {
    label: "Academy",
    href: "http://academy.uteroindonesia.com/",
    target: "_blank",
    icon: "course",
    alt: "Kursus dan pelatihan kreatif",
  },
  {
    label: "Media",
    href: "http://media.uteroindonesia.com/",
    target: "_blank",
    icon: "technology",
    alt: "Media dan teknologi kreatif digital",
  },
];

export default function KnowUsMore() {
  return (
    <section
      id="know-us"
      aria-labelledby="know-us-title"
      style={{
        padding: "100px 64px 80px",
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

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          maxWidth: "960px",
          margin: "0 auto",
        }}
        className="know-us-grid"
      >
        {knowUsItems.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.target}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-60px" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "32px 16px 28px",
              background: "var(--ash)",
              border: "1px solid var(--border-color)",
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
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
          </motion.a>
        ))}
      </div>

      {/* Responsive */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .know-us-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 480px) {
          .know-us-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        .know-us-item:hover .know-us-label {
          color: var(--white) !important;
        }
      `}</style>
    </section>
  );
}