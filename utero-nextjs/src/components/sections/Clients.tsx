"use client";

import { motion } from "framer-motion";
import ScrollVelocity from "./ScrollVelocity";
import "./ScrollVelocity.css";

interface Client {
  name: string;
  url?: string;
  logo: string;
  big?: boolean;
}

const clients: Client[] = [
  { name: "Mie Gacoan", url: "https://miegacoan.com/", logo: "/images/client/mie-gacoan.webp", big: true },
  { name: "Indosat", url: "https://ioh.co.id/", logo: "/images/client/indosat.svg" },
  { name: "Pertamina", url: "https://www.pertamina.com/", logo: "/images/client/pertamina.svg" },
  { name: "Honda", url: "https://www.astra-honda.com/", logo: "/images/client/honda.webp" },
  { name: "BRI", url: "https://bri.co.id/", logo: "/images/client/bri.webp" },
  { name: "Telkomsel", url: "https://www.telkomsel.com/", logo: "/images/client/telkomsel.webp" },
  { name: "Sampoerna", url: "https://www.sampoerna.com/", logo: "/images/client/sampoerna.svg", big: true },
  { name: "Coca Cola", url: "https://www.coca-cola.co.id/", logo: "/images/client/coca-cola.svg", big: true },
  { name: "Universitas Brawijaya", url: "https://ub.ac.id/", logo: "/images/client/universitas-brawijaya.webp", big: true },
  { name: "Bank Mandiri", url: "https://bankmandiri.co.id/", logo: "/images/client/bank-mandiri.svg" },
  { name: "Pegadaian", url: "https://www.pegadaian.co.id/", logo: "/images/client/pegadaian.webp" },
  { name: "Acer", url: "https://www.acer.com/id-id/", logo: "/images/client/acer.svg" },
  { name: "Nokia", url: "https://www.nokia.com/id_id/", logo: "/images/client/nokia.svg" },
  { name: "Indomaret", url: "https://indomaret.co.id/", logo: "/images/client/indomaret.webp" },
  { name: "Daihatsu", url: "https://astra-daihatsu.id/", logo: "/images/client/daihatsu.webp", big: true },
  { name: "OPPO", url: "https://www.oppo.com/id/", logo: "/images/client/oppo.webp" },
  { name: "Realme", url: "https://www.realme.com/id/", logo: "/images/client/realme.svg", big: true },
  { name: "Dana", url: "https://www.dana.id/", logo: "/images/client/dana.svg" },
];

export default function Clients() {
  const logoRow = (
    <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
      {clients.map(c => {
        const content = (
          <img src={c.logo} alt={c.name}
            className={["Coca Cola", "Pertamina", "Telkomsel", "Sampoerna", "Daihatsu", "Honda"].includes(c.name) ? "client-scroll-logo logo-red" : "client-scroll-logo"}
          />
        );
        return c.url ? (
          <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", width: c.big ? "160px" : "120px", height: "64px",
              flexShrink: 0,
            }}>
            {content}
          </a>
        ) : (
          <div key={c.name}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: c.big ? "160px" : "120px", height: "64px",
              flexShrink: 0, cursor: "default",
            }}>
            {content}
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="klien" aria-labelledby="clients-title"
      style={{ background: "var(--red)", padding: "80px 48px", textAlign: "center" }}
      className="clients-section">
      <p id="clients-title" style={{
        fontSize: "13px", fontWeight: 600, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "rgba(255, 255, 255, 0.85)", marginBottom: "48px",
      }}>
        Sebagian Klien & Mitra yang Pernah Kami Tangani
      </p>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <ScrollVelocity
          texts={[logoRow]}
          velocity={-50}
          numCopies={4}
          scrollerStyle={{ fontSize: 0, lineHeight: "normal", fontWeight: "normal", letterSpacing: "normal", filter: "none" }}
        />
      </motion.div>
      <style jsx global>{`
        .client-scroll-logo {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: all 0.3s ease;
          filter: grayscale(100%);
          opacity: 0.7;
        }
        .client-scroll-logo:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.05);
        }
        .logo-red {
          padding: 8px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 8px;
        }
        .logo-red:hover {
          background: rgba(255, 255, 255, 1);
        }
        @media (max-width: 900px) {
          .clients-section {
            padding: 60px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
