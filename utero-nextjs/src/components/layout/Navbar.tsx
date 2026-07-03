"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#tentang", label: "Tentang" },
  { href: "#know-us", label: "Lini Bisnis" },
  { href: "#divisi", label: "Divisi" },
  { href: "#layanan", label: "Layanan" },
  { href: "#portofolio", label: "Portofolio" },
  { href: "#kontak", label: "Kontak" },
];

const menuCards = [
  { icon: "briefcase", label: "Lini Bisnis", href: "#know-us", desc: "Portofolio & klien" },
  { icon: "layers", label: "Divisi", href: "#divisi", desc: "Unit usaha aktif" },
  { icon: "zap", label: "Layanan", href: "#layanan", desc: "Solusi kreatif" },
  { icon: "users", label: "Klien", href: "#klien", desc: "Mitra kami" },
  { icon: "info", label: "Tentang", href: "#tentang", desc: "Cerita kami" },
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
          background: isScrolled
            ? "var(--nav-bg-scrolled)"
            : "var(--nav-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-color)",
          transition: "padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Link
          href="#"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 800,
            color: "var(--ink)",
            letterSpacing: "-0.5px",
            textDecoration: "none",
          }}
        >
          UTERO<span style={{ color: "var(--red)" }}>.</span>COM
        </Link>

        <ul
          style={{
            display: "flex",
            gap: "36px",
            listStyle: "none",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--red)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted)")
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#kontak"
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
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--red2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--red)")
              }
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
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--ink)",
              transition: "all 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--ink)",
              transition: "all 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--ink)",
              transition: "all 0.3s",
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
              background: "#ffffff",
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
                href="#"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "var(--ink)",
                  letterSpacing: "-0.5px",
                  textDecoration: "none",
                }}
                onClick={closeMenu}
              >
                UTERO<span style={{ color: "var(--red)" }}>.</span>ID
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <motion.div
                    key={card.href}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    <Link
                      href={card.href}
                      onClick={closeMenu}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        padding: "24px 20px",
                        background: "var(--ash)",
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
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--ash)";
                        e.currentTarget.style.borderColor = "var(--border-color)";
                        e.currentTarget.style.color = "var(--ink)";
                      }}
                    >
                      <span style={{ color: "var(--red)", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <MenuIcon name={card.icon} size={24} />
                      </span>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", marginBottom: "4px" }}>
                          {card.label}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.4 }}>
                          {card.desc}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <Link
                  href="#kontak"
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
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--red2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--red)")
                  }
                >
                  Konsultasi Gratis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          nav {
            padding: 16px 24px !important;
          }
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .nav-mobile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}