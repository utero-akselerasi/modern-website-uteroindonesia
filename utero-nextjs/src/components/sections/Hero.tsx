"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const orbitNodes = [
  { label: "UTERO.ID", href: "https://utero.id/" },
  { label: "ADVERTISING", href: "https://uteroindonesia.com/" },
  { label: "BILLBOARD", href: "https://www.instagram.com/utero_billboard/" },
  { label: "SOUNDPUB", href: "http://soundpub.uteroindonesia.com/" },
  { label: "CARUBRA", href: "https://carubra.com/" },
  { label: "BUZZERHOOD", href: "https://buzzerhood.com/" },
  { label: "EPOCHSTREAM", href: "https://epochstream.org/" },
];

const stats = [
  { num: "25", suffix: "+", label: "Tahun Pengalaman" },
  { num: "500", suffix: "+", label: "Brand Ditangani" },
  { num: "3", suffix: "", label: "Kota Operasional" },
];

export default function Hero() {
  return (
    <header
      id="hero"
      role="banner"
      style={{
        minHeight: "min(100vh, 900px)",
        background: "var(--white)",
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        position: "relative",
        overflow: "hidden",
      }}
      className="hero-section"
    >
      {/* Large Watermark UTERO Background — centered across both columns */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(100px, 100vw, 280px)",
          fontWeight: 900,
          color: "rgba(0,0,0,0.06)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 1,
          mixBlendMode: "multiply",
        }}
      >
        UTERO
      </div>

      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(80px, 10vh, 140px) clamp(32px, 5vw, 64px) clamp(40px, 5vh, 80px)",
          position: "relative",
          zIndex: 2,
        }}
        className="hero-left"
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--red)",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "32px",
              height: "1px",
              background: "var(--red)",
            }}
          />
          Brand Consultant & Creative Agency — Malang, 1998
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 4.8vw, 4.25rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            marginBottom: "28px",
            textTransform: "uppercase",
          }}
        >
          Ide Tanpa Realisasi
          <span
            style={{
              fontStyle: "normal",
              color: "var(--red)",
              display: "block",
            }}
          >
            Sama Dengan Sampah.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.3vw, 1.125rem)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "520px",
            marginBottom: "clamp(32px, 4vw, 48px)",
          }}
        >
          Kami membantu brand tumbuh dengan strategi yang tepat, desain yang kuat,
          dan eksekusi yang nyata — dari Malang untuk Indonesia.
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <Link
            href="#kontak"
            className="btn-solid-red"
          >
            Mulai Proyek Anda
          </Link>
          <Link
            href="#divisi"
            className="btn-outline-red"
          >
            Lihat Divisi Kami
          </Link>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          role="list"
          aria-label="Statistik perusahaan"
          style={{
            display: "flex",
            gap: "clamp(24px, 4vw, 48px)",
            zIndex: 2,
            marginTop: "clamp(24px, 3vw, 48px)",
          }}
          className="hero-stats"
        >
          {stats.map((stat) => (
            <div key={stat.label} role="listitem" style={{ display: "flex", flexDirection: "column", gap: "clamp(2px, 0.3vw, 6px)" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 800,
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {stat.num}
                {stat.suffix && (
                  <span style={{ color: "var(--red)" }}>{stat.suffix}</span>
                )}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)",
                  fontWeight: 500,
                  color: "var(--muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Column with Diagonal Background and Circular Diagram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: "linear-gradient(135deg, var(--red) 0%, var(--red2) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "clamp(80px, 10vh, 140px) clamp(32px, 5vw, 64px) clamp(40px, 5vh, 80px)",
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
          zIndex: 1,
        }}
        className="hero-right"
      >
        {/* Diagram Container */}
        <div
          style={{
            position: "relative",
            width: "min(400px, 85vw)",
            height: "min(400px, 85vw)",
            aspectRatio: "1/1",
          }}
        >
          {/* Outer Ring */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "5%",
              right: "5%",
              bottom: "5%",
              borderRadius: "50%",
              border: "1px dashed rgba(255, 255, 255, 0.25)",
              animation: "spin 40s linear infinite",
            }}
          />

          {/* Inner Ring */}
          <div
            style={{
              position: "absolute",
              top: "22.5%",
              left: "22.5%",
              right: "22.5%",
              bottom: "22.5%",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              animation: "spin 30s linear infinite reverse",
            }}
          />

          {/* Nodes */}
          {orbitNodes.map((node, i) => {
            const angle = -Math.PI / 2 + (i * 2 * Math.PI) / orbitNodes.length;
            const radius = 42.5; // percent from center
            const left = 50 + radius * Math.cos(angle);
            const top = 50 + radius * Math.sin(angle);
            return (
              <a
                key={node.label}
                href={node.href}
                target="_blank"
                rel="noopener noreferrer"
                className="orbit-node"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                }}
              >
                {node.label}
              </a>
            );
          })}

          {/* Center: 7 DIVISI INTI */}
          <div className="orbit-center">
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 900,
              color: "var(--red)",
              lineHeight: 1,
            }}>
              7
            </span>
            <span style={{
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--red)",
              marginTop: "2px",
              maxWidth: "80px",
              lineHeight: 1.2,
            }}>
              Divisi Inti
            </span>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .btn-solid-red {
          background: var(--red);
          color: #ffffff !important;
          padding: clamp(12px, 1.4vw, 14px) clamp(24px, 3vw, 32px);
          font-family: var(--font-body);
          font-size: clamp(0.75rem, 1.2vw, 0.875rem);
          font-weight: 700;
          border: 1px solid var(--red);
          text-decoration: none;
          display: inline-block;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s var(--ease);
          border-radius: 4px;
        }

        .btn-solid-red:hover {
          background: var(--red2);
          border-color: var(--red2);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(209, 31, 31, 0.25);
        }

        .btn-outline-red {
          background: #ffffff;
          color: var(--red) !important;
          padding: clamp(12px, 1.4vw, 14px) clamp(24px, 3vw, 32px);
          font-family: var(--font-body);
          font-size: clamp(0.75rem, 1.2vw, 0.875rem);
          font-weight: 700;
          border: 2px solid var(--red);
          text-decoration: none;
          display: inline-block;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s var(--ease);
          border-radius: 4px;
        }

        .btn-outline-red:hover {
          background: var(--red);
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(209, 31, 31, 0.15);
        }

        .orbit-node {
          position: absolute;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 8px 14px;
          font-size: clamp(0.55rem, 0.9vw, 0.6875rem);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.3s var(--ease);
          cursor: pointer;
          text-decoration: none;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .orbit-node:hover {
          background: #ffffff;
          color: var(--red) !important;
          border-color: #ffffff;
          transform: translate(-50%, -57%) scale(1.05);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .orbit-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 28%;
          height: 28%;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 3;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.25);
          animation: pulse 3s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 0 rgba(255, 255, 255, 0.25);
          }
          70% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 15px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        @media (max-width: 1024px) {
          .hero-left {
            padding: clamp(90px, 12vh, 130px) clamp(32px, 4vw, 40px) clamp(60px, 8vh, 100px) !important;
          }
          .hero-stats {
            gap: 36px !important;
          }
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr !important;
          }
          .hero-right {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: auto !important;
          }
          .hero-left {
            padding: clamp(80px, 12vh, 100px) clamp(24px, 4vw, 32px) clamp(24px, 4vh, 32px) !important;
          }
          .hero-stats {
            margin-top: clamp(24px, 5vw, 40px) !important;
            gap: 32px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-left {
            padding: clamp(70px, 16vh, 90px) clamp(16px, 4vw, 20px) clamp(20px, 5vh, 28px) !important;
          }
          .hero-stats {
            margin-top: clamp(16px, 4vw, 24px) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </header>
  );
}
