"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "Mie Gacoan", url: "https://miegacoan.com/" },
  { name: "Indosat", url: "https://ioh.co.id/" },
  { name: "Pertamina", url: "https://www.pertamina.com/" },
  { name: "Honda", url: "https://www.astra-honda.com/" },
  { name: "BRI", url: "https://bri.co.id/" },
  { name: "Telkomsel", url: "https://www.telkomsel.com/" },
  { name: "Sampoerna", url: "https://www.sampoerna.com/" },
  { name: "Coca Cola", url: "https://www.coca-cola.co.id/" },
  { name: "Universitas Brawijaya", url: "https://ub.ac.id/" },
  { name: "Bank Mandiri", url: "https://bankmandiri.co.id/" },
  { name: "Pegadaian", url: "https://www.pegadaian.co.id/" },
  { name: "Acer", url: "https://www.acer.com/id-id/" },
  { name: "Nokia", url: "https://www.nokia.com/id_id/" },
  { name: "Indomart", url: "https://indomaret.co.id/" },
  { name: "Daihatsu", url: "https://astra-daihatsu.id/" },
  { name: "OPPO", url: "https://www.oppo.com/id/" },
  { name: "Realme", url: "https://www.realme.com/id/" },
  { name: "Dana", url: "https://www.dana.id/" },
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
        {clients.map((client) => (
          <a key={client.name} href={client.url} target="_blank" rel="noopener noreferrer" role="listitem" style={{
            fontSize: "13px", fontWeight: 600, color: "var(--muted)", padding: "10px 20px",
            border: "1px solid var(--border-color)", letterSpacing: "0.06em", transition: "all 0.2s", cursor: "pointer",
            textDecoration: "none"
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border-color)"; }}>
            {client.name}
          </a>
        ))}
      </motion.div>
      <style jsx global>{`
        @media (max-width: 900px) { .clients-section { padding: 60px 24px !important; } }
      `}</style>
    </section>
  );
}
