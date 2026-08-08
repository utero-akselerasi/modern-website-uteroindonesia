"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

const downloadItems = [
  {
    label: "Profile Founder",
    desc: "CV Dadik Wahyu Chang — Founder Utero Indonesia",
    href: "https://uteroindonesia.com/files/CV%20DADIK%20WAHYU%202022_compressed.pdf",
    img: "/images/download/dadik.webp",
    alt: "Download CV Dadik Wahyu Chang — Founder Utero Indonesia",
  },
  {
    label: "Profile Utero Indonesia",
    desc: "Company profile PT Utero Kreatif Indonesia",
    href: "https://drive.google.com/file/d/1ZNCF85avgIIQn9nC-HX6FjcE_gkL7N8j/view?usp=sharing",
    img: "/images/download/utero-indonesia.webp",
    alt: "Download company profile Utero Indonesia",
  },
  {
    label: "Profile Utero Design",
    desc: "Company profile divisi desain Utero",
    href: "https://uteroindonesia.com/files/COMPRO%20UTERO%20DESIGN.pdf",
    img: "/images/download/utero-design.webp",
    alt: "Download company profile Utero Design",
  },
  {
    label: "E-book Dadik",
    desc: "E-book gratis dari Dadik Wahyu Chang",
    href: "https://bit.ly/ebookgratisutero",
    img: "/images/download/balikjungkir.webp",
    alt: "Download e-book gratis Dadik Wahyu Chang",
  },
  {
    label: "Profile Utero Advertising",
    desc: "Company profile divisi advertising Utero",
    href: "/images/download/Utero_Advertising.pdf",
    img: "/images/download/utero-advertising.svg",
    alt: "Download company profile Utero Advertising",
  },
  {
    label: "Profile Utero Billboard",
    desc: "Company profile divisi billboard Utero",
    href: "/images/download/Utero_3.0_Red_Energy.pdf",
    img: "/images/download/utero-billboard.svg",
    alt: "Download company profile Utero Billboard",
  },
  {
    label: "Profile Utero Legal",
    desc: "Company profile divisi legal Utero",
    href: "/images/download/UTERO_Legal_Business_Solutions.pdf",
    img: "/images/download/utero-legal.svg",
    alt: "Download company profile Utero Legal",
  },
  {
    label: "Profile Utero Academy",
    desc: "Company profile divisi academy Utero",
    href: "",
    img: "/images/download/utero-academy.svg",
    alt: "Download company profile Utero Academy",
  },
  {
    label: "Profile Carubra",
    desc: "Company profile Carubra",
    href: "",
    img: "/images/download/carubra.svg",
    alt: "Download company profile Carubra",
  },
  {
    label: "Profile Buzzerhood",
    desc: "Company profile Buzzerhood",
    href: "",
    img: "/images/download/buzzerhood.svg",
    alt: "Download company profile Buzzerhood",
  },
  {
    label: "Profile Soundpub",
    desc: "Company profile Soundpub",
    href: "/images/download/compro Soundpub_Music_Ecosystem.pdf",
    img: "/images/download/soundpub.svg",
    alt: "Download company profile Soundpub",
  },
  {
    label: "Profile Smartsuco",
    desc: "Company profile Smartsuco",
    href: "",
    img: "/images/download/smartsuco.svg",
    alt: "Download company profile Smartsuco",
  },
];

export default function Download() {
  return (
    <section
      id="download"
      aria-labelledby="download-title"
      style={{
        background: "var(--ash)",
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
        className="download-container"
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
            Download
          </div>

          <h2
            id="download-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.8vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--ink)",
            }}
          >
            Unduh
            <br />
            <span style={{ color: "var(--red)" }}>Profil & Portofolio</span>
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
            Kenali lebih dekat Utero Indonesia melalui profil perusahaan,
            portofolio founder, dan e-book inspiratif.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2px",
          }}
          className="download-grid"
        >
           {downloadItems.filter((item) => item.href).map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              onClick={() =>
                sendGAEvent({
                  event: "click_download",
                  value: `download_${item.label
                    .toLowerCase()
                    .replace(/\s+/g, "_")}`,
                })
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: "var(--white)",
                border: "1px solid var(--border-color)",
                padding: "32px 24px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                transition: "all 0.25s var(--ease)",
              }}
              className="download-card"
            >
              <span
                style={{
                  width: "72px",
                  height: "72px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
                aria-hidden="true"
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  width={72}
                  height={72}
                  style={{
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </span>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  marginBottom: "16px",
                }}
              >
                {item.desc}
              </div>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--red)",
                  marginTop: "auto",
                }}
              >
                Unduh →
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .download-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 8px 24px rgba(209, 31, 31, 0.12) !important;
          border-color: var(--red) !important;
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .download-grid {
            gap: 16px !important;
          }
          .download-card {
            padding: 40px 32px !important;
            border-radius: 16px !important;
          }
          .download-card span:first-child {
            width: 80px !important; height: 80px !important;
          }
          .download-card span:first-child img {
            width: 80px !important; height: 80px !important;
          }
          .download-card div:first-of-type {
            font-size: 20px !important;
          }
          .download-card div:nth-of-type(2) {
            font-size: 14px !important;
            margin-bottom: 20px !important;
          }
          .download-card > span:last-child {
            transition: transform 0.25s var(--ease) !important;
          }
          .download-card:hover > span:last-child {
            transform: translateX(4px) !important;
          }
        }
        @media (min-width: 1025px) {
          #download {
            padding: 100px clamp(16px, 6vw, 80px) !important;
          }
          .download-container {
            display: block !important;
            max-width: 1520px !important;
            margin: 0 auto !important;
          }
          .download-container > div:first-child {
            margin-bottom: 48px;
          }
          .download-grid {
            gap: 28px !important;
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .download-card {
            min-height: 220px !important;
            border-radius: 18px !important;
            padding: 24px !important;
          }
          .download-card span:first-child {
            width: 64px !important; height: 64px !important;
          }
          .download-card span:first-child img {
            width: 64px !important; height: 64px !important;
          }
          .download-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: 0 12px 32px rgba(209, 31, 31, 0.15) !important;
            border-color: var(--red) !important;
          }
          .download-card > span:last-child {
            transition: transform 0.25s var(--ease) !important;
          }
          .download-card:hover > span:last-child {
            transform: translateX(4px) !important;
          }
        }
        @media (max-width: 1024px) {
          .download-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 900px) {
          #download {
            padding: 72px 24px !important;
          }
        }
        @media (max-width: 768px) {
          .download-card {
            padding: 24px 20px !important;
          }
          .download-card span:first-child {
            width: 60px !important;
            height: 60px !important;
            margin-bottom: 12px !important;
          }
          .download-card span:first-child img {
            width: 60px !important;
            height: 60px !important;
          }
          .download-card div:first-of-type {
            font-size: 16px !important;
          }
          .download-card div:nth-of-type(2) {
            font-size: 12px !important;
            margin-bottom: 12px !important;
          }
        }
        @media (max-width: 600px) {
          .download-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}