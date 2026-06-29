"use client";

import { motion } from "framer-motion";

const clientNames = [
  "Mie Gacoan", "Indosat", "Pertamina", "Honda", "BRI", "Telkomsel",
  "Sampoerna", "Coca Cola", "Universitas Brawijaya", "Bank Mandiri",
  "Pegadaian", "Acer", "Nokia", "Indomart", "Daihatsu", "OPPO",
  "Realme", "Dana",
];

export default function Clients() {
  return (
    <section id="klien" aria-labelledby="clients-title"
      style={{ background: "var(--ash)", padding: "80px 64px", textAlign: "center" }}
      className="clients-section">
      <p id="clients-title" style={{
        fontSize: "13px", fontWeight: 600, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "var(--muted)", marginBottom: "48px",
      }}>
        Sebagian Klien & Mitra yang Pernah Kami Tangani
      </p>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        role="list" aria-label="Daftar klien"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "8px" }}>
        {clientNames.map((name) => (
          <span key={name} role="listitem" style={{
            fontSize: "13px", fontWeight: 600, color: "var(--muted)", padding: "10px 20px",
            border: "1px solid var(--border-color)", letterSpacing: "0.06em", transition: "all 0.2s", cursor: "default",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border-color)"; }}>
            {name}
          </span>
        ))}
      </motion.div>
      <style jsx global>{`
        @media (max-width: 900px) { .clients-section { padding: 60px 24px !important; } }
      `}</style>
    </section>
  );
}
