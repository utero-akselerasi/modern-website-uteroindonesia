"use client";

import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import { useMemo, useState } from "react";

const handleWhatsAppClick = () => {
  sendGAEvent({ event: "generate_lead", value: "whatsapp_click" });
};

const handleEmailClick = (email: string) => {
  sendGAEvent({ event: "email_click", value: email });
};

const emailOptions = [
  { key: "marketing", email: "marketingutero@gmail.com", label: "Koorporate" },
  { key: "branding", email: "uterobranding@gmail.com", label: "Konsultasi" },
  { key: "info", email: "info@uteroindonesia.com", label: "Khusus" },
];

const contacts = [
  {
    icon: "💬",
    label: "WhatsApp",
    value: "Pilih nomor WhatsApp",
    href: "#",
    ariaLabel: "Pilih nomor WhatsApp",
    onClick: undefined,
    type: "wa_dropdown",
  },
  {
    icon: "🤖",
    label: "AI Agent",
    value: "Carubra Agent AI",
    href: "#",
    ariaLabel: "Pilih AI Agent Carubra",
    onClick: undefined,
    type: "ai_dropdown",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "Pilih alamat email",
    href: "#",
    ariaLabel: "Hubungi via Email",
    onClick: undefined,
  },
  {
    icon: "📍",
    label: "Kantor Malang",
    value: "Rumah Merah Oxyz, Jln. Bantaran 1, No. 25, Kota Malang",
    href: "https://maps.google.com",
    ariaLabel: "Kunjungi kantor kami",
  },
];

export default function Contact() {
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isWaOpen, setIsWaOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const emailDropdownItems = useMemo(() => {
    return emailOptions.map((opt) => {
      const mailto = `mailto:${opt.email}`;
      return { ...opt, mailto };
    });
  }, []);

  const waDropdownItems = useMemo(() => {
    return [
      {
        key: "tari",
        phone: "+62 896-2143-9416",
        label: "CS Jasa",
        href: "https://wa.me/6289621439416",
      },
      {
        key: "siti",
        phone: "+62 817-388-616",
        label: "CS Produk",
        href: "https://wa.me/62817388616",
      },
      {
        key: "alvi",
        phone: "+62 895-1789-8767",
        label: "Public Relation",
        href: "https://wa.me/6289517898767",
      },
      {
        key: "utama",
        phone: "+62 819-9990-0900",
        label: "All Information",
        href: "https://wa.me/6281999900900",
      },
    ];
  }, []);

  const aiDropdownItems = useMemo(() => {
    return [
      {
        key: "sales",
        label: "Sales & Service",
        href: "https://elynk.xyz/sales",
      },
      {
        key: "branding",
        label: "Brand Consultant",
        href: "https://elynk.xyz/branding",
      },
    ];
  }, []);


  return (
    <section id="kontak" aria-labelledby="cta-title"
      style={{ background: "#ffffff", padding: "120px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
      className="contact-section">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 id="cta-title" style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(40px, 4.5vw, 64px)",
          fontWeight: 800, letterSpacing: "-0.03em", color: "#111", lineHeight: 1.05, marginBottom: "24px",
        }}>
          Siap Bicara<br />Tentang <span style={{ color: "var(--red)" }}>Brand Anda?</span>
        </h2>
        <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(17,17,17,0.6)" }}>
          Konsultasi pertama gratis. Tidak perlu brief yang sempurna -- cukup ceritakan bisnis Anda dan kami akan bantu menemukan arah yang tepat.
        </p>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {contacts.map((c, i) => {
          if (c.label === "Email") {
            return (
              <div key={c.value} style={{ position: "relative" }}>
                <motion.a
                  href="#"
                  aria-label={c.ariaLabel}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEmailOpen((prev) => !prev);
                    setIsWaOpen(false);
                    setIsAiOpen(false);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px 24px",
                    border: "1px solid rgba(17,17,17,0.12)",
                    color: "#111",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--red)";
                    e.currentTarget.style.background = "rgba(209,31,31,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "var(--red)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                    >
                      <span>{c.label}</span>
                      <span style={{ color: "var(--red)", fontSize: 12, fontWeight: 800 }}>
                        {isEmailOpen ? "▲" : "▼"}
                      </span>
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>{c.value}</div>
                  </div>
                </motion.a>

                {isEmailOpen && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "12px 14px",
                      border: "1px solid rgba(17,17,17,0.12)",
                      borderRadius: 8,
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {emailDropdownItems.map((opt) => (
                      <a
                        key={opt.key}
                        href={opt.mailto}
                        aria-label={`Kirim email ke ${opt.email}`}
                        onClick={() => handleEmailClick(opt.email)}
                        style={{
                          textDecoration: "none",
                          color: "#111",
                          fontWeight: 700,
                          fontSize: 14,
                          padding: "8px 10px",
                          borderRadius: 6,
                          transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(209,31,31,0.08)";
                          e.currentTarget.style.color = "var(--red)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#111";
                        }}
                      >
                        {opt.email} - {opt.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (c.type === "wa_dropdown" || c.type === "wa_dropdown_cs") {
            return (
              <div key={c.value} style={{ position: "relative" }}>
                <motion.a
                  href="#"
                  aria-label={c.ariaLabel}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsWaOpen((prev) => !prev);
                    setIsEmailOpen(false);
                    setIsAiOpen(false);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px 24px",
                    border: "1px solid rgba(17,17,17,0.12)",
                    color: "#111",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--red)";
                    e.currentTarget.style.background = "rgba(209,31,31,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "var(--red)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <span>{c.label}</span>
                      <span style={{ color: "var(--red)", fontSize: 12, fontWeight: 800 }}>
                        {isWaOpen ? "▲" : "▼"}
                      </span>
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>{c.value}</div>
                  </div>
                </motion.a>

                {isWaOpen && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "12px 14px",
                      border: "1px solid rgba(17,17,17,0.12)",
                      borderRadius: 8,
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {waDropdownItems.map((opt) => (
                      <a
                        key={opt.key}
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Hubungi via WhatsApp ${opt.label}`}
                        onClick={handleWhatsAppClick}
                        style={{
                          textDecoration: "none",
                          color: "#111",
                          fontWeight: 700,
                          fontSize: 14,
                          padding: "8px 10px",
                          borderRadius: 6,
                          transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(209,31,31,0.08)";
                          e.currentTarget.style.color = "var(--red)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#111";
                        }}
                      >
                        {opt.phone} - {opt.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (c.type === "ai_dropdown") {
            return (
              <div key={c.value} style={{ position: "relative" }}>
                <motion.a
                  href="#"
                  aria-label={c.ariaLabel}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAiOpen((prev) => !prev);
                    setIsWaOpen(false);
                    setIsEmailOpen(false);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px 24px",
                    border: "1px solid rgba(17,17,17,0.12)",
                    color: "#111",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--red)";
                    e.currentTarget.style.background = "rgba(209,31,31,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "var(--red)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <span>{c.label}</span>
                      <span style={{ color: "var(--red)", fontSize: 12, fontWeight: 800 }}>
                        {isAiOpen ? "▲" : "▼"}
                      </span>
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>{c.value}</div>
                  </div>
                </motion.a>

                {isAiOpen && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "12px 14px",
                      border: "1px solid rgba(17,17,17,0.12)",
                      borderRadius: 8,
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {aiDropdownItems.map((opt) => (
                      <a
                        key={opt.key}
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Buka ${opt.label}`}
                        onClick={() =>
                          sendGAEvent({ event: "click_ai_agent", value: opt.key })
                        }
                        style={{
                          textDecoration: "none",
                          color: "#111",
                          fontWeight: 700,
                          fontSize: 14,
                          padding: "8px 10px",
                          borderRadius: 6,
                          transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(209,31,31,0.08)";
                          e.currentTarget.style.color = "var(--red)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#111";
                        }}
                      >
                        {opt.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <motion.a
              key={c.value}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.ariaLabel}
              onClick={c.onClick}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "20px 24px",
                border: "1px solid rgba(17,17,17,0.12)",
                color: "#111",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.background = "rgba(209,31,31,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--red)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "4px",
                  }}
                >
                  {c.label}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>{c.value}</div>
              </div>
            </motion.a>
          );
        })}
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-section { grid-template-columns: 1fr !important; padding: 72px 24px !important; }
        }
      `}</style>
    </section>
  );
}
