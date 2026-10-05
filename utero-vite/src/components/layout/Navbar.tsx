import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#hero", label: "Beranda" },
  { href: "/#know-us", label: "Lini Bisnis" },
  { href: "/#divisi", label: "Divisi" },
  { href: "/#cara-kerja", label: "Alur Kerja" },
  { href: "/#Partnership", label: "Partnership" },
  { href: "/artikel", label: "Artikel" },
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
  { icon: "layers", label: "Artikel", href: "/artikel", desc: "Blog & berita" },
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
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Handle scroll ke section setelah navigate dari halaman lain
    if (location.pathname === "/" && location.hash) {
      setTimeout(() => {
        const targetId = location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(2);
      
      // Jika sudah di home page, langsung scroll
      if (location.pathname === "/") {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      } else {
        // Jika di halaman lain, navigate ke home dulu dengan hash
        navigate(href);
      }
    }
    // Untuk link non-hash (seperti /artikel), biarkan react-router handle
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled
            ? "rgba(255, 255, 255, 0.97)"
            : "rgba(255, 255, 255, 0.92)",
          borderBottom: isScrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid rgba(0,0,0,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition:
            "background 0.3s cubic-bezier(0.4,0,0.2,1), border 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-label="Main navigation"
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 64px",
            height: "88px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="nav-container"
        >
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
            aria-label="Utero Indonesia Home"
          >
            <img
              className="nav-brand-logo"
              src="/images/utero-02.webp"
              alt="Utero Indonesia"
              style={{
                height: "72px",
                width: "auto",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            />
          </Link>

          <ul
            style={{
              display: "flex",
              gap: "32px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
            className="nav-desktop"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s",
                    position: "relative",
                    display: "inline-block",
                  }}
                  className="nav-desktop-link"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--red)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink)";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/6281216650111?text=Halo%20Utero%2C%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  background: "var(--red)",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: "2px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red2)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Konsultasi Gratis
              </a>
            </li>
          </ul>

          <button
            ref={hamburgerRef}
            onClick={() => setIsMobileOpen(true)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
            className="nav-hamburger"
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
            }}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(400px, 85vw)",
              background: "#fff",
              zIndex: 2001,
              overflowY: "auto",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div style={{ padding: "32px 24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "32px",
                }}
              >
                <img
                  className="nav-brand-logo"
              src="/images/utero-02.webp"
                  alt="Utero Indonesia"
                  style={{ height: "56px", width: "auto" }}
                />
                <button
                  ref={closeBtnRef}
                  onClick={closeMenu}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Close menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--ink)"
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
                  display: "grid",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {menuCards.map((card) => (
                  <Link
                    key={card.href}
                    to={card.href}
                    onClick={(e) => {
                      handleNavClick(e, card.href);
                      closeMenu();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px",
                      background: "var(--ash)",
                      borderRadius: "4px",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--red)";
                      const icon = e.currentTarget.querySelector("svg");
                      const text = e.currentTarget.querySelectorAll("div");
                      if (icon) (icon as SVGElement).style.stroke = "#fff";
                      text.forEach((t) => ((t as HTMLElement).style.color = "#fff"));
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--ash)";
                      const icon = e.currentTarget.querySelector("svg");
                      const text = e.currentTarget.querySelectorAll("div");
                      if (icon) (icon as SVGElement).style.stroke = "var(--red)";
                      text.forEach((t, idx) => {
                        (t as HTMLElement).style.color =
                          idx === 0 ? "var(--ink)" : "var(--muted)";
                      });
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MenuIcon name={card.icon} size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--ink)",
                          marginBottom: "2px",
                          transition: "color 0.2s",
                        }}
                      >
                        {card.label}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--muted)",
                          transition: "color 0.2s",
                        }}
                      >
                        {card.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <a
                href="https://wa.me/6281216650111?text=Halo%20Utero%2C%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "16px",
                  background: "var(--red)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  textAlign: "center",
                  borderRadius: "4px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--red2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                }}
              >
                Konsultasi Gratis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 32px !important;
          }
          .nav-desktop {
            gap: 24px !important;
          }
        }
        @media (max-width: 900px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .nav-container {
            padding: 0 20px !important;
            height: 72px !important;
          }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </>
  );
}
