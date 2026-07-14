"use client";

export default function Virtual() {
  return (
    <div
      className="virtual-uto-cta"
      style={{
        position: "relative",
        backgroundImage: "url(/images/cta-virtual.webp)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        padding: "200px 100px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <style jsx>{`
        .virtual-cta-button {
          transition: all 0.3s ease;
        }
        @media (max-width: 768px) {
          .virtual-cta-button {
            padding: 10px 12px !important;
            font-size: 10px !important;
            letter-spacing: 0.03em !important;
          }
        }
        @media (max-width: 480px) {
          .virtual-cta-button {
            padding: 8px 10px !important;
            font-size: 9px !important;
            letter-spacing: 0.02em !important;
          }
        }
      `}</style>
    
      <a
        href="https://virtual.uteroindonesia.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="virtual-cta-button"
        style={{
          position: "relative",
          display: "inline-block",
          padding: "12px 15px",
          background: "#fff",
          color: "var(--red, #CE161E)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        RASAKAN VIRTUAL UTERO DISINI
      </a>
    </div>
  );
}
