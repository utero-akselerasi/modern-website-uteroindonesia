"use client";

import { motion } from "framer-motion";

const whyItems = [
  { icon: "⚡", title: "25 Tahun Track Record", desc: "Sejak 1998 kami ada, belajar, dan terus berbenah. Ratusan brand sudah merasakan hasilnya." },
  { icon: "🏠", title: "One-Stop Creative House", desc: "Branding, produksi, digital, musik, hingga AI — semua ada di bawah satu atap Utero Indonesia." },
  { icon: "🎯", title: "Paham Pasar Lokal", desc: "Berbasis di Malang, kami mengerti dinamika pasar Jawa Timur dan Indonesia dengan sangat baik." },
  { icon: "🤝", title: "Mitra, Bukan Vendor", desc: "Kami berjuang bersama klien, bukan sekadar mengerjakan pesanan. Keberhasilan brand Anda adalah reputasi kami." },
];

export default function WhyUtero() {
  return (
    <section aria-labelledby="why-title"
      style={{ background: "var(--red)", color: "#fff", padding: "120px 64px" }}
      className="why-section">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }}
        className="why-grid">
        <div>
          <div style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px",
          }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
            Mengapa Utero
          </div>
          <h2 id="why-title" style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 58px)",
            fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff",
          }}>
            Kami Bukan<br />Sekadar Vendor.
          </h2>
        </div>
        <div role="list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}
          className="why-items">
          {whyItems.map((item, i) => (
            <motion.div key={item.title} role="listitem"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ fontSize: "28px", marginBottom: "14px" }}>{item.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "14px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)" }}>
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          .why-section { padding: 72px 24px !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .why-items { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
