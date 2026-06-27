"use client";

import Link from "next/link";

const footerLinks = {
  layanan: [
    "Brand Consultant",
    "Desain Logo & GSM",
    "Advertising & Reklame",
    "Signage & Neonbox",
    "Digital Marketing",
  ],
  divisi: [
    "Utero.id",
    "Utero Advertising",
    "Buzzerhood",
    "Soundpub",
    "Carubra.com",
  ],
  lokasi: ["Malang", "Mojokerto", "Madiun"],
};

const socialLinks = [
  { label: "Instagram Utero Malang", href: "https://instagram.com/uteromalang", text: "IG" },
  { label: "Facebook Utero Indonesia", href: "#", text: "FB" },
  { label: "LinkedIn Utero Indonesia", href: "#", text: "LI" },
  { label: "YouTube Utero Indonesia", href: "#", text: "YT" },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: "var(--black)",
        padding: "64px 64px 40px",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div
        className="footer-top"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
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
              color: "rgba(255, 255, 255, 0.35)",
              marginBottom: "24px",
            }}
          >
            Brand Consultant & Creative Agency berbasis di Malang, aktif sejak
            1998. Membantu brand Indonesia tumbuh dengan strategi, desain, dan
            eksekusi yang nyata.
          </p>
          <div
            style={{ display: "flex", gap: "12px" }}
            aria-label="Media sosial Utero Indonesia"
          >
            {socialLinks.map((social) => (
              <a
                key={social.text}
                href={social.href}
                aria-label={social.label}
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255, 255, 255, 0.4)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.borderColor = "var(--red)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)";
                }}
              >
                {social.text}
              </a>
            ))}
          </div>
        </div>

        {/* Layanan */}
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
            Layanan
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {footerLinks.layanan.map((item) => (
              <li key={item}>
                <Link
                  href="#"
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
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Divisi */}
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
            Divisi
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {footerLinks.divisi.map((item) => (
              <li key={item}>
                <Link
                  href="#"
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
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Lokasi */}
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
            Lokasi
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {footerLinks.lokasi.map((item) => (
              <li key={item}>
                <Link
                  href="#"
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
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "20px",
              marginTop: "28px",
            }}
          >
            Temukan Kami
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <li>
              <a
                href="https://uterogroup.com"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.5)",
                  textDecoration: "none",
                }}
              >
                uterogroup.com
              </a>
            </li>
            <li>
              <a
                href="https://uteroindonesia.com"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.5)",
                  textDecoration: "none",
                }}
              >
                uteroindonesia.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
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
            color: "rgba(255, 255, 255, 0.25)",
          }}
        >
          © 2025 PT Utero Kreatif Indonesia. Hak cipta dilindungi.
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.2)",
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
