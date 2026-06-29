"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#divisi", label: "Divisi" },
  { href: "#layanan", label: "Layanan" },
  { href: "#klien", label: "Klien" },
  { href: "#tentang", label: "Tentang" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
          ? "rgba(13, 13, 13, 0.98)"
          : "rgba(13, 13, 13, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        transition: "padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* Logo */}
      <Link
        href="#"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.5px",
          textDecoration: "none",
        }}
      >
        UTERO<span style={{ color: "var(--red)" }}>.</span>ID
      </Link>

      {/* Desktop Nav Links */}
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
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--red)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
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

      {/* Mobile Hamburger */}
      <button
        className="nav-mobile-btn"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
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
            background: "#fff",
            transition: "all 0.3s",
            transform: isMobileOpen
              ? "rotate(45deg) translate(5px, 5px)"
              : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: "24px",
            height: "2px",
            background: "#fff",
            transition: "all 0.3s",
            opacity: isMobileOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: "24px",
            height: "2px",
            background: "#fff",
            transition: "all 0.3s",
            transform: isMobileOpen
              ? "rotate(-45deg) translate(5px, -5px)"
              : "none",
          }}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(13, 13, 13, 0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            zIndex: 99,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              style={{
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.7)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#kontak"
            onClick={() => setIsMobileOpen(false)}
            style={{
              background: "var(--red)",
              color: "#fff",
              padding: "14px 32px",
              fontWeight: 600,
              fontSize: "16px",
              textDecoration: "none",
              marginTop: "16px",
            }}
          >
            Konsultasi Gratis
          </Link>
        </div>
      )}

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
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
      `}</style>
    </nav>
  );
}
