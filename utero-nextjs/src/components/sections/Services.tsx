"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Diagnosa",
    desc: "Kami pahami bisnis, kompetitor, dan target market Anda. Tanpa ini, semua langkah berikutnya sia-sia.",
  },
  {
    num: "02",
    title: "Strategi",
    desc: "Menyusun positioning brand, tone of voice, dan roadmap komunikasi yang relevan dan konsisten.",
  },
  {
    num: "03",
    title: "Kreasi",
    desc: "Desain dan produksi materi — dari identitas visual hingga eksekusi media, semua dikerjakan in-house.",
  },
  {
    num: "04",
    title: "Aktivasi",
    desc: "Peluncuran, monitoring, dan evaluasi. Kami tidak berhenti di serahterima file — kami kawal hasilnya.",
  },
];

export default function Services() {
  return (
    <section
      id="layanan"
      aria-labelledby="process-title"
      style={{
        background: "var(--white)",
        padding: "120px 64px",
      }}
      className="services-section"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "end",
          marginBottom: "72px",
        }}
        className="process-header"
      >
        <div>
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
            id="process-title"
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
        </div>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#666",
            alignSelf: "end",
          }}
        >
          Kami tidak sekadar mengerjakan pesanan. Kami memahami bisnis Anda secara
          mendalam sebelum membuat satu goresan desain — karena strategi yang
          salah lebih mahal dari desain yang buruk.
        </p>
      </div>

      <div
        role="list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
        className="process-steps"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              padding: "40px 32px",
              borderTop: "1px solid #e0e0e0",
              position: "relative",
            }}
          >
            {/* Arrow connector */}
            {i < steps.length - 1 && (
              <span
                style={{
                  position: "absolute",
                  right: "-12px",
                  top: "40px",
                  color: "var(--red)",
                  fontSize: "18px",
                  zIndex: 1,
                }}
                className="step-arrow"
              >
                →
              </span>
            )}

            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "52px",
                fontWeight: 800,
                color: "var(--ash)",
                lineHeight: 1,
                marginBottom: "16px",
              }}
            >
              {step.num}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "10px",
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              {step.desc}
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .services-section {
            padding: 72px 24px !important;
          }
          .process-header {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .process-steps {
            grid-template-columns: 1fr 1fr !important;
          }
          .step-arrow {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .process-steps {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
