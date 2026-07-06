"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  Paintbrush,
  Target,
  Monitor,
  Megaphone,
  Cpu,
} from "lucide-react";

/* ---------- Division data (evenly spaced, 360/7 = 51.43° apart) ---------- */

interface Division {
  title: string;
  subtitle: string;
  angle: number;
  icon: React.ElementType;
}

const divisions: Division[] = [
  { title: "EVENT",      subtitle: "& AKTIVASI",     angle: 244, icon: CalendarDays },
  { title: "STRATEGI",   subtitle: "& KONSULTASI",   angle: 296, icon: Users },
  { title: "DESAIN",     subtitle: "& KREATIF",      angle: 347, icon: Paintbrush },
  { title: "ADVERTISING",subtitle: "& SIGNAGE",      angle:  38, icon: Target },
  { title: "DIGITAL",    subtitle: "MARKETING",      angle:  90, icon: Monitor },
  { title: "MEDIA",      subtitle: "& PUBLIKASI",    angle: 141, icon: Megaphone },
  { title: "TEKNOLOGI",  subtitle: "& SISTEM",       angle: 193, icon: Cpu },
];

const ICON_RADIUS = 44; // % from center — sits on the outer dashed ring

/* ---------- Helpers ---------- */

type Placement = "right" | "left" | "bottom" | "bottom-right" | "bottom-left" | "top";

function getPlacement(angle: number): Placement {
  const a = ((angle % 360) + 360) % 360;
  if (a > 315 || a <= 25) return "right";
  if (a > 25 && a <= 65)  return "bottom-right";
  if (a > 65 && a <= 115) return "bottom";
  if (a > 115 && a <= 155)return "bottom-left";
  if (a > 155 && a <= 260) return "left";    // left + top-left → text on left (outside)
  return "right"; // 260°–315° — top-right → text on right (outside)
}

function getLabelStyle(placement: Placement) {
  switch (placement) {
    case "right":
      return {
        left: "calc(100% + 14px)",
        right: "auto" as const,
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "left" as const,
      };
    case "left":
      return {
        left: "auto" as const,
        right: "calc(100% + 14px)",
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "right" as const,
      };
    case "bottom":
      return {
        left: "50%",
        right: "auto" as const,
        top: "calc(100% + 10px)",
        transform: "translateX(-50%)",
        textAlign: "center" as const,
      };
    case "bottom-right":
      return {
        left: "0",
        right: "auto" as const,
        top: "calc(100% + 10px)",
        transform: "none",
        textAlign: "left" as const,
      };
    case "bottom-left":
      return {
        left: "auto" as const,
        right: "0",
        top: "calc(100% + 10px)",
        transform: "none",
        textAlign: "right" as const,
      };
    case "top":
      return {
        left: "50%",
        right: "auto" as const,
        top: "auto" as const,
        bottom: "calc(100% + 8px)",
        transform: "translateX(-50%)",
        textAlign: "center" as const,
      };
  }
}

/* ---------- Component ---------- */

export default function Hero() {
  return (
    <header
      id="hero"
      role="banner"
      style={{
        minHeight: "100vh",
        background: "var(--red)",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        position: "relative",
        overflow: "hidden",
      }}
      className="hero-section"
    >
      {/* Scroll Indicator */}
      <div
        style={{
          position: "absolute",
          left: "20px",
          bottom: "10%",
          transform: "rotate(-90deg)",
          transformOrigin: "left bottom",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          zIndex: 3,
        }}
        className="scroll-indicator"
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            display: "inline-block",
          }}
        />
        <span>Scroll untuk menjelajahi</span>
      </div>


      {/* ─── LEFT COLUMN ─── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(80px, 10vh, 140px) clamp(40px, 6vw, 80px) clamp(40px, 5vh, 80px)",
          position: "relative",
          zIndex: 2,
        }}
        className="hero-left"
      >
        <div
          style={{
            fontSize: "clamp(0.7rem, 0.95vw, 0.8rem)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "24px",
          }}
        >
          Utero Indonesia
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.75rem, 5.2vw, 4.85rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            marginBottom: "24px",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "block" }}>Ide Tanpa</span>
          <span style={{ display: "block" }}>Realisasi</span>
          <span style={{ display: "block" }}>
            Sama Dengan
          </span>
          <span style={{ display: "block" }}>Sampah.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
            lineHeight: 1.7,
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "520px",
            marginBottom: "clamp(36px, 4.5vw, 48px)",
          }}
        >
          Kami membantu brand tumbuh dengan strategi yang tajam, desain yang kuat,
          dan eksekusi yang nyata — dari konsep untuk kesuksesan.
        </p>

        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="#kontak" className="btn-solid-black">
            Mulai Proyek Anda <span style={{ marginLeft: "8px" }}>→</span>
          </Link>
          <Link href="#portofolio" className="btn-outline-white">
            Lihat Portfolio <span style={{ marginLeft: "8px" }}>→</span>
          </Link>
        </div>
      </motion.div>

      {/* ─── RIGHT COLUMN — ORBIT DIAGRAM ─── */}
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
          clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)",
          zIndex: 2,
        }}
        className="hero-right"
      >
        {/* Diagram Container */}
        <div
          style={{
            position: "relative",
            width: "min(440px, 85vw)",
            height: "min(440px, 85vw)",
            aspectRatio: "1/1",
          }}
        >
          {/* Dashed guideline ring */}
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "5%",
              right: "5%",
              bottom: "5%",
              borderRadius: "50%",
              border: "1px dashed rgba(255, 255, 255, 0.25)",
              animation: "spin 50s linear infinite",
            }}
          />

          {/* Solid middle ring */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "20%",
              right: "20%",
              bottom: "20%",
              borderRadius: "50%",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
            }}
          />

          {/* Connector lines + dots — dari badge ke middle ring */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              pointerEvents: "none",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {divisions.map((div) => {
              const a = (((div.angle % 360) + 360) % 360) * (Math.PI / 180);
              const x1 = 50 + 44 * Math.cos(a);
              const y1 = 50 + 44 * Math.sin(a);
              const x2 = 50 + 30 * Math.cos(a);
              const y2 = 50 + 30 * Math.sin(a);
              return (
                <g key={div.title}>
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth={0.6}
                  />
                  <circle
                    cx={x2} cy={y2} r={0.9}
                    fill="rgba(255, 255, 255, 0.3)"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center card */}
          <div className="orbit-center">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.8vw, 2.85rem)",
                fontWeight: 900,
                color: "var(--red)",
                lineHeight: 1,
              }}
            >
              7
            </span>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1a1a1a",
                marginTop: "2px",
                maxWidth: "80px",
                lineHeight: 1.2,
              }}
            >
              Divisi Inti
            </span>
          </div>

          {/* 7 Division Nodes */}
          {divisions.map((div) => {
            const D = ((div.angle % 360) + 360) % 360;
            const rad = (D * Math.PI) / 180;
            const badgeLeft = 50 + ICON_RADIUS * Math.cos(rad);
            const badgeTop  = 50 + ICON_RADIUS * Math.sin(rad);
            const placement = getPlacement(D);
            const rataKiri = div.title === "MEDIA";

            let labelStyle: React.CSSProperties;
            if (div.title === "EVENT") {
              labelStyle = {
                left: "auto",
                right: "calc(100% + 4px)",
                top: "auto",
                bottom: "calc(100% + 8px)",
                transform: "none",
                textAlign: "right",
              };
            } else if (div.title === "STRATEGI") {
              labelStyle = {
                left: "calc(100% + 4px)",
                right: "auto",
                top: "auto",
                bottom: "calc(100% + 8px)",
                transform: "none",
                textAlign: "left",
              };
            } else {
              labelStyle = getLabelStyle(placement);
            }

            return (
              <div
                key={div.title}
                className="orbit-node-group"
                style={{
                  position: "absolute",
                  left: `${badgeLeft}%`,
                  top: `${badgeTop}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                {/* Badge — used as positioning anchor for the label */}
                <div
                  className="orbit-node-badge"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--red)",
                    }}
                  >
                    <div.icon size={16} strokeWidth={2} />
                  </div>

                  {/* Label — absolutely positioned relative to badge */}
                  <div
                    className="orbit-node-label"
                    style={{
                      position: "absolute",
                      ...labelStyle,
                      whiteSpace: "nowrap",
                      fontSize: "clamp(8px, 0.95vw, 10px)",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      lineHeight: 1.3,
                      color: "rgba(255, 255, 255, 0.9)",
                      fontFamily: "var(--font-display)",
                      textAlign: rataKiri ? "left" : labelStyle.textAlign,
                    }}
                  >
                    <span style={{ display: "block" }}>{div.title}</span>
                    <span style={{ display: "block" }}>{div.subtitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
                {/* Watermark "UTERO" — setengah terpotong di tepi kanan */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "35%",
          overflow: "hidden",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            right: "-60%",
            top: "53%",
            transform: "translateY(-50%) rotate(-90deg)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(14rem, 15vw, 12rem)",
            fontWeight: 900,
            color: "rgba(255, 255, 255, 0.12)",
            whiteSpace: "nowrap",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          UTERO
        </span>
      </div>
    
      <style jsx global>{`
        .text-outline {
          color: transparent !important;
          -webkit-text-stroke: 1.5px #ffffff;
        }

        .btn-solid-black {
          background: #000000;
          color: #ffffff !important;
          padding: clamp(12px, 1.4vw, 14px) clamp(24px, 3vw, 32px);
          font-family: var(--font-body);
          font-size: clamp(0.75rem, 1.2vw, 0.875rem);
          font-weight: 700;
          border: 1px solid #000000;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s var(--ease);
          border-radius: 4px;
        }
        .btn-solid-black:hover {
          background: #1a1a1a;
          border-color: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
        }

        .btn-outline-white {
          background: transparent;
          color: #ffffff !important;
          padding: clamp(12px, 1.4vw, 14px) clamp(24px, 3vw, 32px);
          font-family: var(--font-body);
          font-size: clamp(0.75rem, 1.2vw, 0.875rem);
          font-weight: 700;
          border: 1px solid #ffffff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s var(--ease);
          border-radius: 4px;
        }
        .btn-outline-white:hover {
          background: #ffffff;
          color: var(--red) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
        }

        /* Orbit node group — wrapper for badge + label */
        .orbit-node-group {
          transition: all 0.3s var(--ease);
        }

        /* Badge (white circle) — also serves as positioning anchor */
        .orbit-node-badge {
          position: relative;
          width: clamp(34px, 4.2vw, 42px);
          height: clamp(34px, 4.2vw, 42px);
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
          transition: all 0.3s var(--ease);
        }
        .orbit-node-group:hover .orbit-node-badge {
          transform: scale(1.15);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
        }
        .orbit-node-group:hover .orbit-node-label {
          color: #ffffff !important;
          opacity: 1 !important;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        /* Label text */
        .orbit-node-label {
          transition: all 0.3s var(--ease);
          pointer-events: none;
        }

        /* Center circle */
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
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 0 rgba(255, 255, 255, 0.2);
          }
          70% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 12px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-left {
            padding: clamp(90px, 12vh, 130px) clamp(40px, 5vw, 60px) clamp(60px, 8vh, 100px) !important;
          }
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .hero-right {
            padding: 80px 24px !important;
            clip-path: none !important;
          }
          .scroll-indicator {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .hero-left {
            padding: clamp(100px, 12vh, 120px) clamp(24px, 4vw, 36px) clamp(40px, 4vh, 60px) !important;
          }
          .hero-right {
            padding: 60px 20px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-left {
            padding: 90px 16px 30px !important;
          }
          .hero-right {
            padding: 40px 16px 60px !important;
          }
          .hero-right > div {
            width: 290px !important;
            height: 290px !important;
          }
        }
      `}</style>
    </header>
  );
}
