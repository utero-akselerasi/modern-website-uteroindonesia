"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

const cbpCities = [
  {
    name: "Malang",
    phone: "6281999900900",
    waText: "*SELAMAT DATANG DI LINKSTORE KREATIF UNTUK INDONESIA*\n\nHALO UTERO MALANG\n\nMau apa saja? KITA BISA\nKreatif model apa saja? KITA BERUPAYA\n\nkarena kami perusahaan idea & concept penuh cerita\n\n*UTERO INDONESIA*\nidea & concept factory\nwww.uteroindonesia.com",
    img: "/images/cbp/cbp-malang.webp",
    alt: "Utero Indonesia cabang Malang",
  },
  {
    name: "Surabaya",
    phone: "6281231157678",
    waText: "*SELAMAT DATANG DI LINKSTORE KREATIF UNTUK INDONESIA*\n\nHALO UTERO SURABAYA\n\nMau apa saja? KITA BISA\nKreatif model apa saja? KITA BERUPAYA\n\nkarena kami perusahaan idea & concept penuh cerita\n\n*UTERO INDONESIA*\nidea & concept factory\nwww.uteroindonesia.com",
    img: "/images/cbp/cbp-surabaya.webp",
    alt: "Utero Indonesia cabang Surabaya",
  },
  {
    name: "Madiun",
    phone: "6281217199005",
    waText: "*SELAMAT DATANG DI LINKSTORE KREATIF UNTUK INDONESIA*\n\nHALO UTERO MADIUN\n\nMau apa saja? KITA BISA\nKreatif model apa saja? KITA BERUPAYA\n\nkarena kami perusahaan idea & concept penuh cerita\n\n*UTERO INDONESIA*\nidea & concept factory\nwww.uteroindonesia.com",
    img: "/images/cbp/cbp-madiun.webp",
    alt: "Utero Indonesia cabang Madiun",
  },
  {
    name: "Mojokerto",
    phone: "628155221124",
    waText: "*SELAMAT DATANG DI LINKSTORE KREATIF UNTUK INDONESIA*\n\nHALO UTERO MOJOKERTO\n\nMau apa saja? KITA BISA\nKreatif model apa saja? KITA BERUPAYA\n\nkarena kami perusahaan idea & concept penuh cerita\n\n*UTERO INDONESIA*\nidea & concept factory\nwww.uteroindonesia.com",
    img: "/images/cbp/cbp-mojokerto.webp",
    alt: "Utero Indonesia cabang Mojokerto",
  },
  {
    name: "Jakarta",
    phone: "6281400741813",
    waText: "*SELAMAT DATANG DI LINKSTORE KREATIF UNTUK INDONESIA*\n\nHALO UTERO JAKARTA\n\nMau apa saja? KITA BISA\nKreatif model apa saja? KITA BERUPAYA\n\nkarena kami perusahaan idea & concept penuh cerita\n\n*UTERO INDONESIA*\nidea & concept factory\nwww.uteroindonesia.com",
    img: "/images/cbp/cbp-jaktim.webp",
    alt: "Utero Indonesia cabang Jakarta",
  },
];

export default function CBP() {
  const [current, setCurrent] = useState(4);
  const [cardsPerView, setCardsPerView] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isWrapping, setIsWrapping] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 500) setCardsPerView(1);
      else if (w < 768) setCardsPerView(2);
      else if (w < 1024) setCardsPerView(3);
      else setCardsPerView(4);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setCurrent(cardsPerView);
  }, [cardsPerView]);

  const gap = 24;
  const cardWidth =
    containerWidth > 0
      ? (containerWidth - gap * (cardsPerView - 1)) / cardsPerView
      : (1100 - gap * 3) / 4;
  const step = cardWidth + gap;

  const realStart = cardsPerView;
  const realEnd = cardsPerView + cbpCities.length - 1;
  const minIndex = realStart - 1;
  const maxIndex = realEnd + 1;

  const displayCities = [
    ...cbpCities.slice(-cardsPerView),
    ...cbpCities,
    ...cbpCities.slice(0, cardsPerView),
  ];

  useLayoutEffect(() => {
    if (isWrapping) setIsWrapping(false);
  }, [isWrapping]);

  const wrappingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Prevent wrap loop: ignore if we just performed a wrap.
    if (isWrapping) return;

    if (current === minIndex || current === maxIndex) {
      const target = current === maxIndex ? realStart : realEnd;

      // Avoid visible gap, but schedule after the state flush to prevent
      // immediate re-trigger of this effect.
      setIsWrapping(true);
      if (wrappingTimeoutRef.current) {
        window.clearTimeout(wrappingTimeoutRef.current);
      }
      wrappingTimeoutRef.current = window.setTimeout(() => {
        setCurrent(target);
        requestAnimationFrame(() => {
          setIsWrapping(false);
        });
      }, 0);
    }

    return () => {
      if (wrappingTimeoutRef.current) {
        window.clearTimeout(wrappingTimeoutRef.current);
        wrappingTimeoutRef.current = null;
      }
    };
  }, [current, minIndex, maxIndex, realStart, realEnd, isWrapping]);

  const goPrev = () => {
    setCurrent((p) => Math.max(p - 1, minIndex));
  };
  const goNext = () => {
    setCurrent((p) => Math.min(p + 1, maxIndex));
  };

  return (
    <section
      id="cbp"
      aria-labelledby="cbp-title"
      style={{
        background: "var(--ash)",
        padding: "100px clamp(16px, 5vw, 64px)",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--red)",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "var(--red)",
            }}
          />
          Community Business Partner
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "var(--red)",
            }}
          />
        </div>
        <h2
          id="cbp-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--ink)",
          }}
        >
          Tersedia di <span style={{ color: "var(--red)" }}>5 Kota</span>
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "600px",
            margin: "20px auto 0",
          }}
        >
          Utero Indonesia hadir di berbagai kota untuk melayani kebutuhan
          kreatif dan advertising Anda.
        </p>
      </motion.div>

      <div
        style={{
          position: "relative",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          ref={containerRef}
          style={{ overflow: "hidden", borderRadius: "8px" }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              transform: `translateX(${-current * step}px)`,
              transition: isWrapping
                ? "none"
                : "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {displayCities.map((city, i) => (
              <a
                key={`cbp-${i}`}
                href={`https://wa.me/${city.phone}?text=${encodeURIComponent(city.waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  sendGAEvent({
                    event: "click_cbp",
                    value: `wa_${city.name.toLowerCase()}`,
                  })
                }
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  background: "var(--white)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "all 0.3s var(--ease)",
                  padding: "40px 16px 32px",
                }}
                className="cbp-card"
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "var(--red)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s var(--ease)",
                  }}
                  className="cbp-card-bar"
                />

                <span
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid var(--border-color)",
                    transition: "border-color 0.3s var(--ease)",
                    flexShrink: 0,
                  }}
                  className="cbp-img-wrap"
                  aria-hidden="true"
                >
                  <Image
                    src={city.img}
                    alt={city.alt}
                    width={100}
                    height={100}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </span>

                <span
                  className="cbp-label"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    transition: "color 0.3s var(--ease)",
                    marginBottom: "8px",
                  }}
                >
                  {city.name}
                </span>

                <span
                  className="cbp-wa-label"
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "var(--muted)",
                    letterSpacing: "0.04em",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.3s var(--ease)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Hubungi via WhatsApp
                </span>
              </a>
            ))}
          </div>
        </div>

        <button
          onClick={goPrev}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: "-35px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(225, 225, 225, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.25s var(--ease)",
            zIndex: 2,
            padding: 0,
            outline: "none",
          }}
          className="cbp-arrow cbp-arrow-prev"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              fill: "#a81420",
              transition: "fill 0.25s var(--ease)",
            }}
            className="cbp-arrow-icon"
          >
            <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" />
          </svg>
        </button>

        <button
          onClick={goNext}
          aria-label="Next"
          style={{
            position: "absolute",
            right: "-35px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(225, 225, 225, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.25s var(--ease)",
            zIndex: 2,
            padding: 0,
            outline: "none",
          }}
          className="cbp-arrow cbp-arrow-next"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              fill: "#a81420",
              transition: "fill 0.25s var(--ease)",
            }}
            className="cbp-arrow-icon"
          >
            <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" />
          </svg>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ textAlign: "center", marginTop: "48px" }}
      >
        <a
          href="https://docs.google.com/forms/u/1/d/e/1FAIpQLSfFx9lZWabByBmtSDcQBjmc53jdeTzLDxB2moUpli7J3BBTWQ/viewform"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            sendGAEvent({
              event: "click_cbp_daftar",
              value: "redirect_to_daftar_cbp",
            })
          }
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--red)",
            color: "#fff",
            padding: "14px 36px",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.2s",
            borderRadius: "4px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--red2)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(209,31,31,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--red)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Daftar CBP →
        </a>
      </motion.div>

      <style jsx global>{`
        .cbp-card:hover {
          transform: translateY(-6px) !important;
          border-color: var(--red) !important;
          box-shadow: 0 12px 28px rgba(209, 31, 31, 0.12) !important;
        }
        .cbp-card:hover .cbp-card-bar {
          transform: scaleX(1) !important;
        }
        .cbp-card:hover .cbp-img-wrap {
          border-color: var(--red) !important;
        }
        .cbp-card:hover .cbp-label {
          color: var(--red) !important;
        }
        .cbp-card:hover .cbp-wa-label {
          color: var(--red) !important;
        }

        .cbp-arrow:hover {
          background: rgba(225, 225, 225, 0.5) !important;
        }

        @media (max-width: 768px) {
          #cbp {
            padding: 72px 24px !important;
          }
          .cbp-card {
            padding: 28px 12px 24px !important;
          }
          .cbp-card .cbp-img-wrap {
            width: 76px !important;
            height: 76px !important;
            margin-bottom: 14px !important;
          }
          .cbp-card .cbp-img-wrap img {
            width: 76px !important;
            height: 76px !important;
          }
          .cbp-card .cbp-label {
            font-size: 13px !important;
          }
          .cbp-card .cbp-wa-label {
            font-size: 10px !important;
          }
          .cbp-arrow {
            width: 50px !important;
            height: 50px !important;
            left: -25px !important;
          }
          .cbp-arrow-next {
            left: auto !important;
            right: -25px !important;
          }
          .cbp-arrow svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
