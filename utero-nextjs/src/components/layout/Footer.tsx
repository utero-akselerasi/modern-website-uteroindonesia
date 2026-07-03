"use client";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

const footerLinks = {
  navigasi: [
    { name: "Home", href: "#hero" },
    { name: "Tentang", href: "#tentang" },
    { name: "Lini Bisnis", href: "#know-us" },
    { name: "Divisi", href: "#divisi" },
    { name: "Layanan", href: "#layanan" },
    { name: "Portofolio", href: "#portofolio" },
    { name: "Kontak", href: "#kontak" },
  ],
  liniBisnis: [
    { name: "Utero.id", href: "https://utero.id/" },
    { name: "Utero Advertising", href: "https://uteroindonesia.com/" },
    { name: "Buzzerhood", href: "https://buzzerhood.com/" },
    { name: "Soundpub", href: "http://soundpub.uteroindonesia.com/" },
    { name: "Carubra.com", href: "https://carubra.com/" },
    { name: "Epochstream", href: "https://epochstream.org/" },
  ],
};

const socialLinks = [
  { label: "Instagram Utero Malang", href: "https://instagram.com/uteromalang", icon: "IG" },
  { label: "Facebook Utero Indonesia", href: "https://facebook.com/uteromalang", icon: "FB" },
  { label: "LinkedIn Utero Indonesia", href: "https://linkedin.com/company/utero-indonesia", icon: "LI" },
  { label: "YouTube Utero Indonesia", href: "https://youtube.com/@uteromalang", icon: "YT" },
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
          gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
          gap: "64px",
          marginBottom: "64px",
        }}
      >
        {/* Brand Info */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            UTERO<span style={{ color: "var(--red)" }}>.</span>ID
          </div>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.65,
              color: "rgba(255, 255, 255, 0.5)",
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
            {socialLinks.map((social) => (
              <a
              key={social.icon}
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
                  color: "rgba(255, 255, 255, 0.6)",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: 700,
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
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
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
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "20px",
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
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255, 255, 255, 0.5)")
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
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "20px",
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
                    color: "rgba(255, 255, 255, 0.5)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255, 255, 255, 0.5)")
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

        {/* Contact & Newsletter */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "20px",
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
              marginBottom: "28px",
            }}
          >
            <li>
              <a href="https://wa.me/6281999900900" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
                +62 819 999 00900
              </a>
            </li>
            <li>
              <a href="mailto:info@uteroindonesia.com" style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
                info@uteroindonesia.com
              </a>
            </li>
            <li>
              <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.5)" }}>
                Jl. Bantaran 1 No. 25, Malang
              </span>
            </li>
          </ul>

          {/* Newsletter */}
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "12px",
            }}
          >
            Newsletter
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="email"
              placeholder="Email Anda"
              aria-label="Email untuk newsletter"
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(255, 255, 255, 0.08)",
                color: "#fff",
                fontSize: "13px",
                outline: "none",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              type="submit"
              aria-label="Berlangganan newsletter"
              style={{
                padding: "10px 18px",
                background: "#fff",
                color: "var(--red)",
                border: "none",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              Kirim
            </button>
          </form>
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
            color: "rgba(255, 255, 255, 0.35)",
          }}
        >
          © 2025 PT Utero Kreatif Indonesia. Hak cipta dilindungi.
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.25)",
          }}
        >
          Creative Agency Malang · Brand Consultant Malang · Desain Logo Malang
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr 1fr !important;
          }
          footer {
            padding: 48px 24px 32px !important;
          }
        }
        @media (max-width: 480px) {
          .footer-top {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}