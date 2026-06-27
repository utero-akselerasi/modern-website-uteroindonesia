const tickerItems = [
  "Brand Consultant",
  "Creative Agency Malang",
  "Desain Logo",
  "Advertising & Signage",
  "Digital Marketing",
  "Music Distribution",
  "AI Automation",
];

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: "var(--red)",
        padding: "14px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 0,
          animation: "marquee 20s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#fff",
              padding: "0 40px",
              display: "flex",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {item}
            <span style={{ fontSize: "8px", opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
