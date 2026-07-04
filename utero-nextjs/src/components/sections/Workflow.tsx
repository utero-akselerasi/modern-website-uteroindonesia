"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "DIAGNOSA",
    desc: "Memahami masalah brand & tujuan bisnis.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="12" cy="7" r="3.5" stroke="var(--white)" strokeWidth="1.5" fill="none" />
        <text x="12" y="9.5" textAnchor="middle" fill="var(--white)" fontSize="6" fontWeight="bold" fontFamily="Arial">?</text>
      </svg>
    ),
  },
  {
    title: "STRATEGI",
    desc: "Menyusun strategi kreatif & komunikasi.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="var(--white)" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="7" stroke="var(--white)" strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="4" stroke="var(--white)" strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="1.5" fill="var(--white)" />
        <line x1="2" y1="2" x2="12" y2="12" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" />
        <polygon points="12,12 8.5,9.5 9.5,13" fill="var(--white)" />
      </svg>
    ),
  },
  {
    title: "KONSEP",
    desc: "Mengembangkan ide dan visual yang tepat.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="var(--white)" strokeWidth="2" fill="none" />
        <circle cx="12" cy="8.5" r="4" stroke="var(--white)" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="8.5" r="2" stroke="var(--white)" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="8.5" r="0.8" fill="var(--white)" />
      </svg>
    ),
  },
  {
    title: "AKTIVASI",
    desc: "Eksekusi dan produksi dengan presisi tinggi.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9.5" cy="9.5" r="5" stroke="var(--white)" strokeWidth="2" fill="none" />
        <circle cx="9.5" cy="9.5" r="2" fill="var(--white)" />
        <line x1="9.5" y1="4" x2="9.5" y2="5.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" />
        <line x1="9.5" y1="13.5" x2="9.5" y2="15" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="9.5" x2="5.5" y2="9.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" />
        <line x1="13.5" y1="9.5" x2="15" y2="9.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="15" r="3.5" stroke="var(--white)" strokeWidth="1.8" fill="none" />
        <circle cx="16" cy="15" r="1.5" fill="var(--white)" />
      </svg>
    ),
  },
  {
    title: "LAUNCH & IMPACT",
    desc: "Meluncurkan dan mengukur hasil nyata.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7v6c0 5.25 3.83 9.5 9 11 5.17-1.5 9-5.75 9-11V7l-9-5z" stroke="var(--white)" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d="M12 6C12 6 9.5 10 9.5 12.5C9.5 14 10.5 15 12 15C13.5 15 14.5 14 14.5 12.5C14.5 10 12 6 12 6Z" stroke="var(--white)" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="11" r="1.5" stroke="var(--white)" strokeWidth="1.2" fill="none" />
        <path d="M17 18L19 20L23 16" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export default function Workflow() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="cara-kerja"
      aria-labelledby="workflow-title"
      style={{
        background: "#fff",
        padding: "120px 64px",
        position: "relative",
      }}
      className="workflow-section"
    >
      {/* Thick solid red horizontal bar across the top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "8px",
          background: "var(--red)",
        }}
      />

      {/* Header Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
          marginBottom: "72px",
        }}
        className="workflow-header"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--red)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--red)",
              }}
            />
            PROSES KAMI
          </div>
          <h2
            id="workflow-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#111",
              margin: 0,
            }}
          >
            Dari Brief
            <br />
            Hingga <span style={{ color: "var(--red)" }}>Launch.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#111",
            opacity: 0.7,
            margin: 0,
            alignSelf: "start",
            paddingTop: "32px",
          }}
        >
          Kami tidak sekadar mengerjakan pesanan, kami membangun proses yang terstruktur untuk menghasilkan karya strategis yang siap memberikan dampak nyata.
        </motion.p>
      </div>

      {/* Steps Section */}
      <motion.div
        role="list"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "24px",
          position: "relative",
        }}
        className="workflow-steps-grid"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            role="listitem"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Connecting arrow (except last) */}
            {i < steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: "26px",
                  left: "calc(50% + 28px)",
                  width: "calc(100% - 56px)",
                  height: "2px",
                  background: "var(--red)",
                  zIndex: 1,
                }}
                className="step-arrow-line"
              >
                <div
                  style={{
                    position: "absolute",
                    right: "-2px",
                    top: "-5px",
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid var(--red)",
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                  }}
                />
              </div>
            )}

            {/* Icon in red circle */}
            <motion.div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(209,31,31,0.3)",
                marginBottom: "16px",
                position: "relative",
                zIndex: 2,
              }}
              whileHover={{
                scale: 1.08,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            >
              {/* Soft 3D inner gradient effect */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
              {step.icon}
            </motion.div>

            {/* Step Title */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 700,
                color: "#111",
                marginBottom: "8px",
                letterSpacing: "0.05em",
                lineHeight: 1.3,
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.5,
                color: "rgba(17,17,17,0.85)",
                margin: 0,
                maxWidth: "180px",
              }}
            >
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .workflow-section {
            padding: 80px 32px !important;
          }
          .workflow-header {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 48px !important;
          }
          .workflow-steps-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .step-arrow-line {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .workflow-section {
            padding: 64px 20px !important;
          }
          .workflow-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .step-arrow-line {
            display: none !important;
          }
          .workflow-step-item {
            position: relative !important;
            padding-left: 80px !important;
          }
          .workflow-step-item::before {
            content: "";
            position: absolute;
            left: 27px;
            top: 56px;
            bottom: -32px;
            width: 2px;
            background: var(--red);
            z-index: 1;
          }
          .workflow-step-item:last-child::before {
            display: none !important;
          }
          .workflow-step-item > div:first-child {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}