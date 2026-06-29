"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const orbitNodes = [
  { label: "UTERO.ID", top: "10%", left: "50%" },
  { label: "ADVERTISING", top: "30%", left: "90%" },
  { label: "SOUNDPUB", top: "70%", left: "88%" },
  { label: "CARUBRA", top: "88%", left: "50%" },
  { label: "BUZZERHOOD", top: "70%", left: "12%" },
  { label: "EPOCHSTREAM", top: "30%", left: "10%" },
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
        minHeight: "100vh",
        background: "var(--black)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        overflow: "hidden",
      }}
      className="hero-section"
    >
      {/* Background Text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(120px, 18vw, 260px)",
          fontWeight: 800,
          color: "rgba(255, 255, 255, 0.03)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.02em",
          pointerEvents: "none",
          userSelect: "none",
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
          padding: "140px 64px 80px",
          position: "relative",
          zIndex: 2,
        }}
        className="hero-left"
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: "11px",
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
          Brand Consultant &amp; Creative Agency — Malang, 1998
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 5.5vw, 80px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "28px",
          }}
        >
          Ide Tanpa
          <br />
          Realisasi
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
            fontSize: "16px",
            lineHeight: 1.7,
            color: "rgba(255, 255, 255, 0.5)",
            maxWidth: "420px",
            marginBottom: "48px",
          }}
        >
          Kami membantu brand tumbuh dengan strategi yang tepat, desain yang kuat,
          dan eksekusi yang nyata — dari Malang untuk Indonesia.
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link
            href="#kontak"
            style={{
              background: "var(--red)",
              color: "#fff",
              padding: "14px 32px",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              textDecoration: "none",
              display: "inline-block",
              letterSpacing: "0.04em",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--red2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--red)")
            }
          >
            Mulai Proyek Anda
          </Link>
          <Link
            href="#divisi"
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#fff")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")
            }
          >
            Lihat Divisi Kami →
          </Link>
        </div>
      </motion.div>

      {/* Right - Orbit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 64px 80px",
        }}
        className="hero-right"
      >
        <div
          style={{
            position: "relative",
            width: "380px",
            height: "380px",
          }}
        >
          {/* Outer Ring */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              animation: "spin 28s linear infinite",
            }}
          />
          {/* Inner Ring */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "30px",
              right: "30px",
              bottom: "30px",
              borderRadius: "50%",
              border: "1px solid rgba(209, 31, 31, 0.2)",
              animation: "spin 20s linear infinite reverse",
            }}
          />

          {/* Nodes */}
          {orbitNodes.map((node) => (
            <div
              key={node.label}
              style={{
                position: "absolute",
                top: node.top,
                left: node.left,
                transform: "translate(-50%, -50%)",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "8px 14px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.7)",
                whiteSpace: "nowrap",
                backdropFilter: "blur(4px)",
                transition: "all 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--red)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "var(--red)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                e.currentTarget.style.borderColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
            >
              {node.label}
            </div>
          ))}

          {/* Center */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "140px",
              height: "140px",
              background: "var(--red)",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "36px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              7
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.7)",
                marginTop: "4px",
              }}
            >
              Divisi Aktif
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        role="list"
        aria-label="Statistik perusahaan"
        style={{
          position: "absolute",
          bottom: "0px",
          left: "64px",
          display: "flex",
          gap: "48px",
          zIndex: 2,
        }}
        className="hero-stats"
      >
        {stats.map((stat) => (
          <div key={stat.label} role="listitem">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "36px",
                fontWeight: 800,
                color: "#fff",
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
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--muted)",
                marginTop: "4px",
                letterSpacing: "0.06em",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr !important;
          }
          .hero-left {
            padding: 120px 24px 60px !important;
          }
          .hero-right {
            display: none !important;
          }
          .hero-stats {
            left: 24px !important;
            bottom: 0px !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </header>
  );
}
