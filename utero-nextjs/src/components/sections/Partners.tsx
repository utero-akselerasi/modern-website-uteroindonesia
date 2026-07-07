"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

const partners = [
  {
    name: "Pinterest",
    href: "https://id.pinterest.com/marketingutero/boards/",
    img: "/images/partner/pinterest.webp",
    alt: "Pinterest — inspirasi desain dan kreativitas",
    skipFilter: true,
  },
  {
    name: "Behance",
    href: "https://www.behance.net/UTEROINDONESIA",
    img: "/images/partner/behance.webp",
    alt: "Behance — portofolio karya desain Utero Indonesia",
    skipFilter: true,
  },
  {
    name: "Moselo",
    href: "http://www.moselo.com/ruvodo",
    img: "/images/partner/moselo.webp",
    alt: "Moselo — marketplace produk kreatif dan handmade",
    skipFilter: true,
  },
  {
    name: "Tokopedia",
    href: "https://www.tokopedia.com/utero",
    img: "/images/partner/tokopedia.webp",
    alt: "Tokopedia — official store Utero Indonesia",
    skipFilter: true,
  },
  {
    name: "Shopee",
    href: "https://shopee.co.id/utero_product",
    img: "/images/partner/shopee.webp",
    alt: "Shopee — official store produk Utero Indonesia",
    skipFilter: true,
  },
  {
    name: "Rumah Oxyz",
    href: "https://www.instagram.com/rumah_oxyz/",
    img: "/images/partner/oxyz.webp",
    alt: "Rumah Oxyz — makerspace dan coworking space kreatif",
    skipFilter: true,
  },
];

export default function Partners() {
  return (
    <section
      id="partner"
      aria-labelledby="partners-title"
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
        className="partners-container"
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
            Partners & References
          </div>

          <h2
            id="partners-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.8vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--ink)",
            }}
          >
            Platform &
            <br />
            <span style={{ color: "var(--red)" }}>Kolaborator</span>
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
            Terhubung dengan kami di berbagai platform — dari marketplace
            hingga portofolio kreatif.
          </p>

          <a
            href="http://bit.ly/PartnershipUTEROIndonesia"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendGAEvent({ event: "click_partnership", value: "redirect_to_daftar_partner" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--red)",
              border: "1px solid var(--red)",
              padding: "12px 28px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--red)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--red)";
            }}
          >
            Daftar Partner →
          </a>
        </div>

        {/* Right Column — Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
          className="partners-grid"
        >
          {partners.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: "click_partner", value: `redirect_to_${partner.name.toLowerCase().replace(/\s+/g, "_")}` })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: "var(--white)",
                border: "1px solid var(--border-color)",
                padding: "36px 20px 28px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                textDecoration: "none",
                transition: "all 0.3s var(--ease)",
              }}
              className="partner-card"
              data-skip-filter={partner.skipFilter ? "true" : undefined}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--white)";
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(209, 31, 31, 0.12)";
                if (e.currentTarget.getAttribute("data-skip-filter") !== "true") {
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.filter = "brightness(0) invert(1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--white)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                if (e.currentTarget.getAttribute("data-skip-filter") !== "true") {
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.filter = "none";
                }
              }}
            >
              <span
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
                  src={partner.img}
                  alt={partner.alt}
                  width={76}
                  height={76}
                  style={{
                    objectFit: "contain",
                    transition: "filter 0.3s",
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  transition: "color 0.3s",
                }}
              >
                {partner.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .partner-card[data-skip-filter="true"]:hover img {
          filter: none !important;
        }
        @media (max-width: 1024px) {
          .partners-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 900px) {
          .partners-section {
            padding: 72px 24px !important;
          }
        }
        @media (max-width: 768px) {
          .partner-card {
            padding: 24px 16px 20px !important;
          }
          .partner-card span:first-child {
            width: 60px !important;
            height: 60px !important;
            margin-bottom: 12px !important;
          }
          .partner-card span:first-child img {
            width: 56px !important;
            height: 56px !important;
          }
          .partner-card span:last-child {
            font-size: 12px !important;
          }
        }
        @media (max-width: 600px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 400px) {
          .partners-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
