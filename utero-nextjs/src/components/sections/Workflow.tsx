"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Diagnosa",
    desc: "Kami pahami bisnis, kompetitor, dan target market Anda secara mendalam. Tanpa ini, semua langkah berikutnya sia-sia.",
  },
  {
    num: "02",
    title: "Strategi",
    desc: "Menyusun positioning brand, tone of voice, dan roadmap komunikasi yang relevan dan konsisten.",
  },
  {
    num: "03",
    title: "Konsep",
    desc: "Mengembangkan ide kreatif, moodboard visual, dan core concept unik untuk membedakan brand Anda dari kompetitor.",
  },
  {
    num: "04",
    title: "Aktivasi",
    desc: "Mengeksekusi ide kreatif ke berbagai media promosi pilihan secara presisi dan terintegrasi secara in-house.",
  },
  {
    num: "05",
    title: "Launch & Impact",
    desc: "Serah terima hasil akhir, monitoring performa di pasar, serta evaluasi dampak nyata bagi pertumbuhan bisnis Anda.",
  },
];

function LocationPin() {
  return (
    <motion.div
      style={{
        position: "relative",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        cursor: "pointer",
      }}
      whileHover="hover"
    >
      {/* Ripple ring effect */}
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "2px solid var(--red)",
          opacity: 0,
        }}
        variants={{
          hover: {
            scale: [1, 1.4],
            opacity: [0.6, 0],
            transition: {
              repeat: Infinity,
              duration: 1.2,
              ease: "easeOut",
            },
          },
        }}
      />
      
      {/* SVG Map Pin */}
      <motion.svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={{
          hover: {
            y: -6,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          },
        }}
      >
        <defs>
          <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="rgba(209,31,31,0.4)" />
          </filter>
        </defs>
        <path
          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
          fill="var(--red)"
          stroke="var(--white)"
          strokeWidth="2"
          filter="url(#pin-shadow)"
        />
        <circle cx="12" cy="9" r="3" fill="var(--white)" />
      </motion.svg>
    </motion.div>
  );
}

export default function Workflow() {
  // Container animation for sequential step appearance
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

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1.5, ease: "easeInOut" as const },
    },
  };

  return (
    <section
      id="cara-kerja"
      aria-labelledby="workflow-title"
      style={{
        background: "var(--white)",
        padding: "120px 64px",
        position: "relative",
        overflow: "hidden",
      }}
      className="workflow-section"
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "end",
          marginBottom: "80px",
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
            Cara Kerja Kami
          </div>
          <h2
            id="workflow-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--ink)",
            }}
          >
            Dari Brief
            <br />
            Hingga Launch.
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
            color: "var(--ink)",
            opacity: 0.7,
            alignSelf: "end",
          }}
        >
          Kami tidak sekadar mengerjakan pesanan. Kami memahami bisnis Anda secara
          mendalam sebelum membuat satu goresan desain — karena strategi yang
          salah lebih mahal dari desain yang buruk.
        </motion.p>
      </div>

      {/* Steps Horizontal Flow */}
      <div style={{ position: "relative", marginTop: "40px" }} className="timeline-container">
        
        {/* Continuous Horizontal Line behind steps */}
        <div
          style={{
            position: "absolute",
            top: "24px", // matches center of the 48px pin
            left: "5%",
            right: "5%",
            height: "2px",
            background: "rgba(var(--ink), 0.08)",
            borderTop: "1px dashed var(--border-color)",
            zIndex: 1,
          }}
          className="timeline-line-bg"
        />

        {/* Animated line drawing over the dashed line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={lineVariants}
          style={{
            position: "absolute",
            top: "24px",
            left: "5%",
            width: "90%",
            height: "2px",
            background: "var(--red)",
            zIndex: 1,
            originX: 0,
          }}
          className="timeline-line-active"
        />

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
            zIndex: 2,
          }}
          className="workflow-grid"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={itemVariants}
              role="listitem"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              className="workflow-step"
            >
              {/* Pin Node on the line */}
              <div
                style={{
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <LocationPin />
              </div>

              {/* Step Details */}
              <div style={{ padding: "0 10px" }} className="step-content">
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "40px",
                    fontWeight: 800,
                    color: "var(--ash)",
                    lineHeight: 1,
                    marginBottom: "12px",
                    opacity: 0.6,
                  }}
                  className="step-number"
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "13.5px",
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .workflow-section {
            padding: 80px 32px !important;
          }
          .workflow-header {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 60px !important;
          }
          .timeline-line-bg,
          .timeline-line-active {
            display: none !important;
          }
          .workflow-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .workflow-step {
            flex-direction: row !important;
            align-items: flex-start !important;
            text-align: left !important;
            position: relative;
            padding-left: 28px;
          }
          .workflow-step::before {
            content: "";
            position: absolute;
            left: 23px;
            top: 48px;
            bottom: -56px;
            width: 2px;
            border-left: 2px dashed var(--border-color);
            z-index: 1;
          }
          .workflow-step:last-child::before {
            display: none !important;
          }
          .workflow-step > div:first-child {
            margin-bottom: 0 !important;
            margin-right: 20px;
            flex-shrink: 0;
          }
          .step-content {
            padding: 0 !important;
          }
          .step-number {
            font-size: 32px !important;
            margin-bottom: 6px !important;
          }
        }
        @media (max-width: 480px) {
          .workflow-section {
            padding: 72px 20px !important;
          }
          .workflow-step {
            padding-left: 12px;
          }
          .workflow-step::before {
            left: 7px;
          }
          .workflow-step > div:first-child {
            margin-right: 12px;
          }
        }
      `}</style>
    </section>
  );
}
