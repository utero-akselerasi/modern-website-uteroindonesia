"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "IDENTIFIKASI",
    desc: "Memahami masalah brand & tujuan bisnis.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="7" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 16.5L21 21" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 8v6" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 11h6" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "STRATEGI",
    desc: "Menyusun strategi kreatif & komunikasi.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "KONSEP",
    desc: "Mengembangkan ide dan visual yang tepat.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.663 17h4.673M12 3v1m0 16v1m-8-9H3m18 0h-1M5.636 5.636l.707.707m12.02 12.02l.708.708M9 12a3 3 0 106 0 3 3 0 00-6 0z" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AKTIVASI",
    desc: "Eksekusi dan produksi dengan presisi tinggi.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15v-7m0 0l-3 3m3-3l3 3" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M8 19l4-4 4 4" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    title: "LAUNCH & IMPACT",
    desc: "Meluncurkan dan mengukur hasil nyata.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            color: "rgba(0,0,0,0.65)",
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
            className="workflow-step-item"
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
              className="step-icon-wrap"
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
              className="step-title"
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
              className="step-desc"
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
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            max-width: 600px;
            margin: 0 auto !important;
          }
          .step-arrow-line {
            display: none !important;
          }
          .workflow-step-item {
            position: relative !important;
            padding-left: 72px !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .workflow-step-item::before {
            content: "";
            position: absolute;
            left: 27px;
            top: 56px;
            bottom: -40px;
            width: 2px;
            background: var(--red);
            z-index: 1;
          }
          .workflow-step-item:last-child::before {
            display: none !important;
          }
          .workflow-step-item .step-icon-wrap {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            margin-bottom: 0 !important;
          }
          .workflow-step-item .step-title,
          .workflow-step-item .step-desc {
            text-align: left !important;
            max-width: none !important;
          }
        }
        @media (max-width: 640px) {
          .workflow-section {
            padding: 64px 20px !important;
          }
          .workflow-steps-grid {
            gap: 32px !important;
          }
          .workflow-step-item::before {
            bottom: -32px !important;
          }
        }
        @media (max-width: 950px) and (orientation: landscape) {
          .workflow-steps-grid {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 16px !important;
            max-width: none !important;
            margin: 0 !important;
          }
          .step-arrow-line {
            display: block !important;
            left: calc(50% + 28px) !important;
            width: calc(100% - 56px) !important;
            height: 2px !important;
            background: var(--red) !important;
            top: 26px !important;
          }
          .workflow-step-item {
            padding-left: 0 !important;
            align-items: center !important;
            text-align: center !important;
          }
          .workflow-step-item::before {
            display: none !important;
          }
          .workflow-step-item .step-icon-wrap {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            margin-bottom: 16px !important;
          }
          .workflow-step-item .step-title,
          .workflow-step-item .step-desc {
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}