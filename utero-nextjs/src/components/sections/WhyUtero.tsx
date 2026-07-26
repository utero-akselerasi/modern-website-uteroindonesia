"use client";

import { motion } from "framer-motion";

function IconLightning() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.6667 4L8 17.3333H16L14.6667 28L26 13.3333H18L18.6667 4Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

function IconHouse() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14L16 3L28 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 14V27H24V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 27V19H18V27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="2"/>
      <circle cx="16" cy="16" r="5" stroke="white" strokeWidth="2"/>
      <circle cx="16" cy="16" r="1.5" fill="white"/>
      <line x1="16" y1="4" x2="16" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="25" x2="16" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4" y1="16" x2="7" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="25" y1="16" x2="28" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="16" r="9" stroke="white" strokeWidth="2"/>
      <circle cx="20" cy="16" r="9" stroke="white" strokeWidth="2"/>
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  lightning: <IconLightning />,
  house: <IconHouse />,
  target: <IconTarget />,
  handshake: <IconHandshake />,
};

const whyItems = [
  { icon: "lightning", title: "25+ Track Record", desc: "Lebih dari dua dekade kami dipercaya mendampingi perusahaan, institusi, dan komunitas dari berbagai sektor. Setiap kolaborasi menjadi pengalaman yang memperkaya cara kami berpikir dan bekerja. Pengalaman tersebut menjadi fondasi untuk terus menghadirkan kualitas terbaik di setiap proyek." },
  { icon: "house", title: "One-Stop Creative House", desc: "Kami menghadirkan ekosistem layanan kreatif yang terintegrasi dalam satu rumah. Branding, desain, produksi, digital, musik, hingga solusi berbasis AI dapat dikelola oleh satu tim yang saling terhubung. Proses menjadi lebih efisien, komunikasi lebih sederhana, dan hasil lebih konsisten." },
  { icon: "target", title: "Paham Pasar Lokal", desc: "Berakar di Malang, kami memahami karakter pasar Jawa Timur sekaligus dinamika bisnis di Indonesia. Pengalaman bersama pelaku usaha, komunitas, dan berbagai institusi membentuk perspektif yang dekat dengan kebutuhan pasar. Setiap strategi kami dirancang agar relevan, tepat sasaran, dan mampu memberikan nilai tambah." },
  { icon: "handshake", title: "Mitra, Bukan Vendor", desc: "Hubungan kami dengan klien tidak berhenti saat proyek selesai. Kami terus mendampingi, mengevaluasi, dan mencari peluang baru untuk mendukung pertumbuhan bisnis Anda. Karena bagi kami, keberhasilan klien adalah ukuran keberhasilan Utero Indonesia." },
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
          <p style={{
            fontSize: "14px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)",
            marginTop: "20px", maxWidth: "400px",
          }}>
            Lebih dari sekadar penyedia jasa, kami adalah mitra kreatif yang tumbuh bersama klien. Kami memahami kebutuhan, merumuskan strategi, dan menghadirkan solusi yang relevan bagi bisnis Anda. Fokus kami adalah membangun kolaborasi jangka panjang yang memberikan dampak nyata.
          </p>
        </div>
        <div role="list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}
          className="why-items">
          {whyItems.map((item, i) => (
            <motion.div key={item.title} role="listitem"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div style={{ marginBottom: "14px" }}>{icons[item.icon]}</div>
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
