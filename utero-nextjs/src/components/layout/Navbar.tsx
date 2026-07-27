"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#hero", label: "Beranda" },
  { href: "/#know-us", label: "Lini Bisnis" },
  { href: "/#divisi", label: "Divisi" },
  { href: "/#cara-kerja", label: "Alur Kerja" },
  { href: "/#Partnership", label: "Partnership" },
  { href: "/#artikel", label: "Artikel" },
  { href: "/#kontak", label: "Kontak" },
];

const menuCards = [
  { icon: "home", label: "Beranda", href: "/#hero", desc: "Halaman utama" },
  { icon: "info", label: "Tentang", href: "/#tentang", desc: "Cerita kami" },
  { icon: "briefcase", label: "Lini Bisnis", href: "/#know-us", desc: "Portofolio & klien" },
  { icon: "layers", label: "Divisi", href: "/#divisi", desc: "Unit usaha aktif" },
  { icon: "zap", label: "Layanan", href: "/#cara-kerja", desc: "Alur kerja & proses" },
  { icon: "users", label: "Klien", href: "/#klien", desc: "Mitra kami" },
  { icon: "grid", label: "Portfolio", href: "/#download", desc: "Profil & portofolio" },
  { icon: "layers", label: "Artikel", href: "/#artikel", desc: "Blog & berita" },
];

function MenuIcon({ name, size = 24 }: { name: string; size?: number }) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "briefcase":
      return (
        <svg {...svgProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "layers":
      return (
        <svg {...svgProps}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "home":
      return (
        <svg {...svgProps}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "zap":
      return (
        <svg {...svgProps}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "users":
      return (
        <svg {...svgProps}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "grid":
      return (
        <svg {...svgProps}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "info":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMobileOpen]);

  useEffect(() => {
    if (isMobileOpen) {
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    }
  }, [isMobileOpen]);

  const closeMenu = () => {
    setIsMobileOpen(false);
    requestAnimationFrame(() => hamburgerRef.current?.focus());
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.04 * i, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Menu utama"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isScrolled ? "12px 48px" : "18px 48px",
          background: isScrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-color)",
          transition: "padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Image
            src="/images/utero-02.webp"
            alt="Utero Indonesia"
            width={200}
            height={80}
            className="nav-logo-img"
            style={{ objectFit: "contain", height: "80px", width: "auto", transformOrigin: "left center" }}
          />
        </Link>

        <ul
          style={{
            display: "flex",
            gap: "clamp(16px, 2.5vw, 36px)",
            listStyle: "none",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-desktop-link"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#000000",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#kontak"
              className="nav-cta-btn"
              style={{
                background: "var(--red)",
                color: "#fff",
                padding: "9px 22px",
                borderRadius: "2px",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--red2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--red)")}
            >
              Konsultasi Gratis
            </Link>
          </li>
        </ul>

        <button
          ref={hamburgerRef}
          className="nav-mobile-btn"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Buka menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "4px",
            flexDirection: "column",
            gap: "5px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--ash)";
            const bars = e.currentTarget.querySelectorAll("span");
            bars.forEach((bar) => (bar.style.background = "var(--red)"));
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            const bars = e.currentTarget.querySelectorAll("span");
            bars.forEach((bar) => (bar.style.background = "var(--ink)"));
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--ink)",
              transition: "all 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--ink)",
              transition: "all 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--ink)",
              transition: "all 0.2s",
            }}
          />
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100dvh",
              background: "var(--ash)",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 28px",
                flexShrink: 0,
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                onClick={closeMenu}
              >
                <Image
                  src="/images/utero-02.webp"
                  alt="Utero Indonesia"
                  width={130}
                  height={52}
                  style={{ objectFit: "contain", height: "52px", width: "auto", transformOrigin: "left center" }}
                />
              </Link>
              <button
                ref={closeBtnRef}
                onClick={closeMenu}
                aria-label="Tutup menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink)",
                  padding: "8px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--ash)";
                  e.currentTarget.style.color = "var(--red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "var(--ink)";
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "28px 28px 40px",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
                className="nav-mobile-grid"
              >
                {menuCards.map((card, i) => (
                  <motion.div key={card.href} variants={cardVariants} initial="hidden" animate="visible" custom={i}>
                    <Link
                      href={card.href}
                      onClick={closeMenu}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        padding: "24px 20px",
                        background: "#ffffff",
                        border: "1px solid var(--border-color)",
                        borderRadius: "4px",
                        textDecoration: "none",
                        color: "var(--ink)",
                        height: "100%",
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--red)";
                        e.currentTarget.style.borderColor = "var(--red)";
                        e.currentTarget.style.color = "#fff";
                        const icon = e.currentTarget.querySelector("span");
                        if (icon) (icon as HTMLSpanElement).style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--ash)";
                        e.currentTarget.style.borderColor = "var(--border-color)";
                        e.currentTarget.style.color = "var(--ink)";
                        const icon = e.currentTarget.querySelector("span");
                        if (icon) (icon as HTMLSpanElement).style.color = "var(--red)";
                      }}
                    >
                      <span
                        style={{
                          color: "var(--red)",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MenuIcon name={card.icon} size={24} />
                      </span>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", marginBottom: "4px" }}>{card.label}</div>
                        <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.4 }}>{card.desc}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <Link
                href="/#kontak"
                onClick={closeMenu}
                  style={{
                    display: "inline-block",
                    background: "var(--red)",
                    color: "#fff",
                    padding: "14px 48px",
                    fontWeight: 600,
                    fontSize: "14px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--red2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--red)")}
                >
                  Konsultasi Gratis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* ===== Desktop nav: 1024px+ ===== */
        /* Already visible by default */

        /* ===== Compact desktop nav: 1024-1280px (landscape tablets, small laptops) ===== */
        @media (min-width: 1025px) and (max-width: 1280px) {
          nav {
            padding: 12px 32px !important;
          }
          .nav-desktop {
            gap: 16px !important;
          }
          .nav-desktop-link {
            font-size: 11px !important;
            letter-spacing: 0.05em !important;
          }
          .nav-cta-btn {
            font-size: 11px !important;
            padding: 8px 16px !important;
          }
        }

        /* ===== Hamburger mode: <=1024px (tablets portrait, landscape phones, phones) ===== */
        @media (max-width: 1024px) {
          nav {
            padding: 14px 24px !important;
          }
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: flex !important;
          }
        }

        /* ===== Phone landscape (wider but short) ===== */
        @media (max-width: 900px) and (orientation: landscape) {
          nav {
            padding: 10px 24px !important;
          }
        }

        /* ===== Phone portrait ===== */
        @media (max-width: 480px) {
          nav {
            padding: 12px 16px !important;
          }
          .nav-mobile-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ===== Very small phones ===== */
        @media (max-width: 360px) {
          nav {
            padding: 10px 12px !important;
          }
        }

        /* ===== Mobile menu landscape adjustments ===== */
        @media (max-height: 500px) and (orientation: landscape) {
          .nav-mobile-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
          .nav-mobile-grid a {
            padding: 16px 12px !important;
          }
        }
      `}</style>
    </>
  );
}

