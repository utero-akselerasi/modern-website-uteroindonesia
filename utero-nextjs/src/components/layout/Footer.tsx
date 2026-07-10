"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

const footerLinks = {
  navigasi: [
    { name: "Home", href: "#hero" },
    { name: "Tentang", href: "#tentang" },
    { name: "Lini Bisnis", href: "#know-us" },
    { name: "Divisi", href: "#divisi" },
    { name: "Alur Kerja", href: "#cara-kerja" },
    { name: "Partnership", href: "#Partnership" },
    { name: "Kontak", href: "#kontak" },
  ],
  liniBisnis: [
    { name: "Utero.id", href: "https://utero.id/" },
    { name: "Utero Advertising", href: "https://uteroindonesia.com/" },
    { name: "Buzzerhood", href: "https://buzzerhood.com/" },
    { name: "Soundpub", href: "https://soundpub.xyz/" },
    { name: "Carubra.com", href: "https://carubra.com/" },
    { name: "Epochstream", href: "https://epochstream.org/" },
  ],
};

const socialLinks = [
  {
    label: "Instagram Utero Indonesia",
    href: "https://www.instagram.com/uteroindonesia/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook Utero Indonesia",
    href: "https://www.facebook.com/share/18rS2T8mgU/?mibextid=wwXIfr",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn Utero Indonesia",
    href: "https://www.linkedin.com/company/utero-indonesia/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube Utero Indonesia",
    href: "https://www.youtube.com/@uteroindonesia",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: "var(--red)",
        padding: "64px 64px 40px",
      }}
    >
      <div
        className="footer-top"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr",
          gap: "64px",
          marginBottom: "64px",
        }}
      >
        {/* Brand Info */}
        <div>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src="/images/uteroindonesia.webp"
              alt="Utero Indonesia"
              style={{
                height: "120px",
                width: "auto",
                display: "block",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.65,
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "24px",
              maxWidth: "320px",
            }}
          >
            Brand Consultant & Creative Agency berbasis di Malang, aktif sejak
            1998. Membantu brand Indonesia tumbuh dengan strategi, desain, dan
            eksekusi yang nyata.
          </p>
          {/* Social Media Icons */}
          <div
            style={{ display: "flex", gap: "12px" }}
            aria-label="Media sosial Utero Indonesia"
          >
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "#fff";
                  e.currentTarget.style.color = "var(--red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            Navigasi
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {footerLinks.navigasi.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255, 255, 255, 0.8)")
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>



        {/* Lini Bisnis */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            Lini Bisnis
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {footerLinks.liniBisnis.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255, 255, 255, 0.8)")
                  }
                  onClick={() =>
                    sendGAEvent({
                      event: "click_footer_division",
                      value: `redirect_to_${item.name
                        .toLowerCase()
                        .replace(/\s+/g, "_")}`,
                    })
                  }
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cabang */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            Cabang
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: 0,
            }}
          >
            {[
              "Malang",
              "Mojokerto",
              "Madiun",
            ].map((city) => (
              <li key={city}>
                <span
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {city}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            Kontak
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: 0,
            }}
          >
            <li>
              <a
                href="https://wa.me/6281999900900"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                }}
              >
                +62 819 999 00900
              </a>
            </li>
            <li>
              <a
                href="mailto:info@uteroindonesia.com"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                }}
              >
                info@uteroindonesia.com
              </a>
            </li>
            <li>
              <span
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                Jl. Bantaran 1 No. 25, Malang
              </span>
            </li>
          </ul>
        </div>

        {/* Maps (di bawah Cabang & Kontak) */}
        <div
          className="footer-maps-container"
          style={{
            gridColumn: "4 / 6",
            marginTop: "-150px",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "transparent",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              padding: "12px 16px",
              background: "#ffffff",
              fontWeight: 700,
              color: "#111",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "16px" }}>📍</span>
            <span>Kantor Malang - Jl. Bantaran 1 No. 25, Lowokwaru</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.7!2d112.6344653!3d-7.950188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629c5e8a2021:0x3ff201ddaa440c96!2sPT+UTERO+KREATIF+INDONESIA!5e0!3m2!1sid!2sid!4v1717670400000"
            width="100%"
            height="230"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          © 2025 PT Utero Kreatif Indonesia. Hak cipta dilindungi.
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          Creative Agency Malang · Brand Consultant Malang · Desain Logo Malang
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .footer-top {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .footer-maps-container {
            grid-column: 1 / -1 !important;
            margin-top: 24px !important;
          }
          footer {
            padding: 48px 32px 32px !important;
          }
        }
        @media (max-width: 480px) {
          .footer-top {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-maps-container {
            grid-column: 1 / -1 !important;
            margin-top: 16px !important;
          }
          footer {
            padding: 40px 16px 24px !important;
          }
        }
      `}</style>
    </footer>
  );
}