"use client";

const tickerItems = [
  "BRAND GOALS, START WITH US",
  "GRAHAYANA RESORT MALANG",
  "CREATIVE AGENCY MALANG",
  "BRAND CONSULTANT INDONESIA",
  "DIGITAL MARKETING STRATEGY",
  "SIGNAGE & ADVERTISING",
  "AI AUTOMATION SOLUTIONS",
];

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: "var(--red)",
        padding: "16px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 0,
          animation: "marquee 25s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fff",
              padding: "0 48px",
              display: "flex",
              alignItems: "center",
              gap: "48px",
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