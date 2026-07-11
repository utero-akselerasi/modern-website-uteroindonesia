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
    
      <a
        href="https://virtual.uteroindonesia.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "relative",
          display: "inline-block",
          padding: "20px 28px",
          background: "#fff",
          color: "var(--red, #CE161E)",
          fontSize: "14px",
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
