"use client";

import Link from "next/link";
import Image from "next/image";
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
    { name: "Soundpub Music", href: "https://soundpub.xyz/" },
    { name: "Carubra.com", href: "https://carubra.com/" },
    { name: "Epochstream Media", href: "https://epochstream.org/" },
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
    label: "TikTok Utero Indonesia",
    href: "https://www.tiktok.com/@uteroindonesia",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.22V9.4a8.16 8.16 0 0 0 4.85 1.58V7.53a4.85 4.85 0 0 1-1-.84z" />
      </svg>
    ),
  },
  {
    label: "X Utero Indonesia",
    href: "https://x.com/uteroindonesia",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn Utero Indonesia",
    href: "https://www.linkedin.com/company/utero-indonesia/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
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
  {
    label: "YouTube Waravalerie",
    href: "https://www.youtube.com/channel/UC--Vge6YlX1y65HqjqYP8uQ",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "Behance Utero Indonesia",
    href: "https://www.behance.net/UTEROINDONESIA",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
  {
    label: "SlideShare Utero Indonesia",
    href: "https://www.slideshare.net/uteroagency",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.222.21C1.762.21 1.06 1.337 1.06 2.497v7.883c-.53-.502-1.096-.15-1.058.295.038.439.59 1.546 1.436 2.517.843.968 1.924 1.776 2.94 2.268a11.19 11.19 0 00-.491 3.598c.09 1.096.378 1.95.903 2.75.918 1.407 2.32 1.985 3.674 1.985 1.209 0 2.494-.563 2.698-2.373v-4.694c1.308.552 3.47.363 4.47-.39.19-.14.326-.207.416-.113.095.09.106.166-.113.439a5.6 5.6 0 01-3.103 1.965l.008 2.72a2.532 2.532 0 002.543 2.446c1.64.015 2.48-.556 3.148-1.164.632-.567 1.399-1.754 1.558-3.243a10.128 10.128 0 00-.454-3.926 10.358 10.358 0 002.948-2.268C23.213 12.5 24 11.185 24 10.675c0-.51-.556-.782-1.036-.302V2.497c0-.824-.48-2.29-2.135-2.29zm.423 1.35H20.41c.756 0 1.17.28 1.17 1.224v8.904a8.73 8.73 0 01-3.555 1.534c-1.606.352-2.94.087-3.666.148-.718.06-1.428.529-1.296 1.79-.491-.154-1.236-.683-1.682-1.117-.438-.428-.87-.711-1.534-.692-1.013.03-1.663.102-2.57.01a9.656 9.656 0 01-4.838-1.786V2.78c0-.87.378-1.22 1.206-1.22zm4.497 4.988a2.994 2.994 0 100 5.987 2.993 2.993 0 000-5.983zm7.71 0a2.994 2.994 0 100 5.987 2.993 2.993 0 000-5.983z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: "var(--red2)",
        padding: "64px 48px 40px",
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
              justifyContent: "flex-start",
              height: "80px",
              paddingLeft: 0,
              marginLeft: "2px",
            }}
          >
            <Image
              src="/images/utero-02.webp"
              alt="Utero Indonesia"
              width={200}
              height={80}
              style={{
                height: "120px",
                width: "auto",
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
            style={{ display: "flex", gap: "12px", flexWrap: "nowrap" }}
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
                  minWidth: "36px",
                  height: "36px",
                  padding: "0 8px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  flexShrink: 0,
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
              { name: "Malang", ig: "https://www.instagram.com/uteromalang/" },
              { name: "Mojokerto", ig: "https://www.instagram.com/utero_mojokerto/" },
              { name: "Madiun", ig: "https://www.instagram.com/utero_madiun/" },
            ].map((city) => (
              <li key={city.name}>
                <a
                  href={city.ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}
                >
                  {city.name}
                </a>
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
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}
              >
                +62 819-9990-0900
              </a>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginLeft: "6px" }}>
                All information
              </span>
            </li>
            <li>
              <a
                href="https://wa.me/6289621439416"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}
              >
                +62 896-2143-9416
              </a>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginLeft: "6px" }}>
                CS Jasa
              </span>
            </li>
            <li>
              <a
                href="https://wa.me/62817388616"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}
              >
                +62 817-388-616
              </a>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginLeft: "6px" }}>
                CS produk
              </span>
            </li>
            <li style={{ marginTop: "6px" }}>
              <a
                href="mailto:marketingutero@gmail.com"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}
              >
                marketingutero@gmail.com
              </a>
            </li>
            <li>
              <a
                href="mailto:uterobranding@gmail.com"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}
              >
                uterobranding@gmail.com
              </a>
            </li>
            <li>
              <a
                href="mailto:info@uteroindonesia.com"
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")}
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

        {/* Maps (full width, di bawah social icons) */}
        <div
          className="footer-maps-container"
          style={{
            gridColumn: "1 / 6",
            marginTop: "32px",
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
        className="footer-bottom"
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
            color: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span>Copyright © Since 1998. All rights reserved.</span>
          <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.8)" }}>
            Created with passion and creativity by{" "}
            <a
              href="https://uterogroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            >
              PT. UTERO KREATIF INDONESIA
            </a>{" "}
          </span>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.8)",
            letterSpacing: "0.05em",
          }}
        >
          Brand &amp; Identity Consultant - Creative Media Agency
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1025px) and (max-width: 1280px) {
          footer {
            padding: 64px 32px 40px !important;
          }
        }
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
            padding: 48px 24px 32px !important;
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
          .footer-top > div:first-child div[aria-label="Media sosial Utero Indonesia"] {
            gap: 8px !important;
          }
          .footer-top > div:first-child div[aria-label="Media sosial Utero Indonesia"] a {
            min-width: 32px !important;
            height: 32px !important;
            padding: 0 6px !important;
          }
          .footer-top > div:first-child div[aria-label="Media sosial Utero Indonesia"] svg {
            width: 14px !important;
            height: 14px !important;
          }
          .footer-bottom {
            justify-content: center !important;
            text-align: center !important;
          }
        }
        @media (max-width: 360px) {
          footer {
            padding: 40px 12px 24px !important;
          }
        }
      `}</style>
    </footer>
  );
}