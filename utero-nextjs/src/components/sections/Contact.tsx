"use client";

import { motion } from "framer-motion";

const contacts = [
  { icon: "💬", label: "WhatsApp", value: "0819 999 00900", href: "https://wa.me/6281999900900", ariaLabel: "Hubungi via WhatsApp" },
  { icon: "✉️", label: "Email", value: "hello@uteroindonesia.com", href: "mailto:hello@uteroindonesia.com", ariaLabel: "Hubungi via Email" },
  { icon: "📍", label: "Kantor Malang", value: "Jl. Bantaran 1 No. 25, Lowokwaru", href: "https://maps.google.com", ariaLabel: "Kunjungi kantor kami" },
];

export default function Contact() {
  return (
    <section id="kontak" aria-labelledby="cta-title"
      style={{ background: "var(--ink)", padding: "120px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
      className="contact-section">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 id="cta-title" style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(40px, 4.5vw, 64px)",
          fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05, marginBottom: "24px",
        }}>
          Siap Bicara<br />Tentang <span style={{ color: "var(--red)" }}>Brand Anda?</span>
        </h2>
        <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>
          Konsultasi pertama gratis. Tidak perlu brief yang sempurna — cukup ceritakan bisnis Anda dan kami akan bantu menemukan arah yang tepat.
        </p>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {contacts.map((c, i) => (
          <motion.a key={c.label} href={c.href} aria-label={c.ariaLabel}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px",
              border: "1px solid rgba(255,255,255,0.08)", color: "#fff", textDecoration: "none",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.background = "rgba(209,31,31,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "transparent"; }}>
            <div style={{
              width: "40px", height: "40px", background: "var(--red)", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0,
            }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "4px" }}>
                {c.label}
              </div>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>{c.value}</div>
            </div>
          </motion.a>
        ))}
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-section { grid-template-columns: 1fr !important; padding: 72px 24px !important; }
        }
      `}</style>
    </section>
  );
}
