"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import { useRef, useEffect } from "react";

const handleRedirectClick = (label: string) => {
  sendGAEvent({ event: "click_hub_redirect", value: `redirect_to_${label.toLowerCase().replace(/\s+/g, "_")}` });
};

const knowUsItems = [
  {
    label: "Shop",
    href: "http://shop.uteroindonesia.com/",
    target: "_blank",
    icon: "shop",
    alt: "Toko merchandise dan produk kreatif Utero Indonesia",
    onClick: () => handleRedirectClick("Shop"),
  },
  {
    label: "Design",
    href: "https://design.uteroindonesia.com/",
    target: "_blank",
    icon: "design",
    alt: "Jasa desain logo, kemasan, grafis, dan branding",
    onClick: () => handleRedirectClick("Design"),
  },
  {
    label: "Advertising",
    href: "https://www.instagram.com/uteromalang",
    target: "_blank",
    icon: "reklame",
    alt: "Jasa reklame, neonbox, signage, dan advertising",
  },
  {
    label: "Billboard",
    href: "https://www.instagram.com/utero_billboard/",
    target: "_blank",
    icon: "billboard",
    alt: "Sewa billboard, baliho, megatron, videotron",
  },
  {
    label: "Profile",
    href: "http://utero.id/",
    target: "_blank",
    icon: "brandconsultant",
    alt: "Brand consultant dan creative agency Malang",
    onClick: () => handleRedirectClick("Profile"),
  },
  {
    label: "Legal Serv.",
    href: "http://legal.uteroindonesia.com/",
    target: "_blank",
    icon: "research",
    alt: "Jasa riset, legalitas, perijinan perusahaan",
    onClick: () => handleRedirectClick("Legal Serv."),
  },
  {
    label: "Academy",
    href: "http://academy.uteroindonesia.com/",
    target: "_blank",
    icon: "course",
    alt: "Kursus dan pelatihan kreatif",
    onClick: () => handleRedirectClick("Academy"),
  },
  {
    label: "Media",
    href: "http://media.uteroindonesia.com/",
    target: "_blank",
    icon: "technology",
    alt: "Media dan teknologi kreatif digital",
    onClick: () => handleRedirectClick("Media"),
  },
];

const ITEM_COUNT = knowUsItems.length;

export default function KnowUsMore() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const translateXRef = useRef(0);
  const pausedRef = useRef(false);
  const animationRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTranslateRef = useRef(0);
  const lastMoveXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const oneSetWidthRef = useRef(0);
  const wasDraggedRef = useRef(false);

  const measureOneSetWidth = () => {
    if (!trackRef.current) return;
    const first = trackRef.current.children[0] as HTMLElement | null;
    const setStart = trackRef.current.children[ITEM_COUNT] as HTMLElement | null;
    if (first && setStart) {
      oneSetWidthRef.current = setStart.offsetLeft - first.offsetLeft;
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measureOneSetWidth();

    lastTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const delta = Math.min(currentTime - lastTimeRef.current, 100);
      lastTimeRef.current = currentTime;
      if (!pausedRef.current && trackRef.current) {
        const ow = oneSetWidthRef.current;
        if (ow > 0) {
          translateXRef.current -= 1.3 * (delta / 16.67);
          if (translateXRef.current <= -ow) {
            translateXRef.current += ow;
          }
        }
        trackRef.current.style.transform = `translate3d(${translateXRef.current}px, 0, 0)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      measureOneSetWidth();
      const ow = oneSetWidthRef.current;
      if (ow > 0 && translateXRef.current <= -ow) {
        translateXRef.current += ow;
      }
    });
    ro.observe(track);

    return () => {
      cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - dragStartXRef.current;
      let newTranslate = dragStartTranslateRef.current + delta;
      const ow = oneSetWidthRef.current;
      if (ow > 0) {
        if (newTranslate <= -ow) newTranslate += ow;
        if (newTranslate > 0) newTranslate -= ow;
      }
      translateXRef.current = newTranslate;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
      }
      const now = performance.now();
      const dt = now - lastMoveTimeRef.current;
      if (dt > 0) {
        velocityRef.current = (e.clientX - lastMoveXRef.current) / dt;
      }
      lastMoveXRef.current = e.clientX;
      lastMoveTimeRef.current = now;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      if (Math.abs(e.clientX - dragStartXRef.current) > 5) {
        wasDraggedRef.current = true;
      }
      containerRef.current?.removeAttribute('data-dragging');
      pausedRef.current = true;
    };

    const handleCaptureClick = (e: MouseEvent) => {
      if (wasDraggedRef.current && containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        wasDraggedRef.current = false;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('click', handleCaptureClick, true);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('click', handleCaptureClick, true);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    wasDraggedRef.current = false;
    isDraggingRef.current = true;
    pausedRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartTranslateRef.current = translateXRef.current;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = performance.now();
    velocityRef.current = 0;
    containerRef.current?.setAttribute('data-dragging', '');
  };

  return (
    <section
      id="know-us"
      aria-labelledby="know-us-title"
      style={{
        padding: "20px clamp(16px, 5vw, 64px) 80px",
        background: "var(--white)",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
        style={{ textAlign: "center", marginBottom: "56px" }}
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
          intrapreneur
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
          id="know-us-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--ink)",
          }}
        >
          Part Of <span style={{ color: "var(--red)" }}>Utero Indonesia</span>
        </h2>
      </motion.div>

      {/* Ticker Container */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          padding: "24px 0",
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        className="know-us-ticker-container"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!isDraggingRef.current) pausedRef.current = false;
        }}
        onPointerLeave={() => {
          if (isDraggingRef.current) {
            containerRef.current?.removeAttribute('data-dragging');
          }
        }}
        onPointerDown={handlePointerDown}
      >
        {/* Ticker Track */}
        <div
          ref={trackRef}
          className="know-us-ticker-track"
          style={{
            display: "flex",
            width: "max-content",
          }}
        >
          {[...knowUsItems, ...knowUsItems].map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={item.href}
              target={item.target}
              rel="noopener noreferrer"
              draggable={false}
              onClick={(e) => {
                if (wasDraggedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  wasDraggedRef.current = false;
                  return;
                }
                if (item.onClick) {
                  item.onClick();
                }
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "36px 20px 32px",
                background: "var(--ash)",
                border: "1px solid var(--border-color)",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                width: "220px",
                flexShrink: 0,
                borderRadius: "2px",
              }}
              className="know-us-item"
              onMouseEnter={(e) => {
                if (isDraggingRef.current) return;
                e.currentTarget.style.background = "var(--red)";
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(209, 31, 31, 0.2)";
                const label = e.currentTarget.querySelector(".know-us-label");
                if (label)
                  (label as HTMLElement).style.color = "var(--white)";
              }}
              onMouseLeave={(e) => {
                if (isDraggingRef.current) return;
                e.currentTarget.style.background = "var(--ash)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                const label = e.currentTarget.querySelector(".know-us-label");
                if (label)
                  (label as HTMLElement).style.color = "var(--ink)";
              }}
            >
              <span
                className="know-us-icon"
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
                aria-hidden="true"
              >
                <Image
                  src={`/images/icon/${item.icon}.webp`}
                  alt={item.alt}
                  width={76}
                  height={76}
                  draggable={false}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </span>
              <span
                className="know-us-label"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  transition: "color 0.3s",
                }}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Responsive & Animation */}
      <style jsx global>{`
        .know-us-ticker-track {
          will-change: transform;
          gap: 20px;
        }
        .know-us-ticker-container img,
        .know-us-ticker-container svg {
          -webkit-user-drag: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .know-us-item:hover .know-us-label {
          color: var(--white) !important;
        }
        .know-us-ticker-container[data-dragging] .know-us-item {
          transition: none !important;
        }
        .know-us-ticker-container[data-dragging] .know-us-item:hover {
          background: var(--ash) !important;
          border-color: var(--border-color) !important;
          transform: none !important;
          box-shadow: none !important;
        }
        .know-us-ticker-container[data-dragging] .know-us-item:hover .know-us-label {
          color: var(--ink) !important;
        }

        @media (max-width: 768px) {
          .know-us-item {
            width: 160px !important;
            padding: 24px 14px 20px !important;
          }
          .know-us-item .know-us-icon {
            width: 56px !important;
            height: 56px !important;
            margin-bottom: 12px !important;
          }
          .know-us-item .know-us-icon img {
            width: 52px !important;
            height: 52px !important;
          }
          .know-us-item .know-us-label {
            font-size: 12px !important;
          }
          .know-us-ticker-track {
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .know-us-item {
            width: 140px !important;
            padding: 20px 10px 16px !important;
          }
          .know-us-item .know-us-icon {
            width: 48px !important;
            height: 48px !important;
          }
          .know-us-item .know-us-icon img {
            width: 44px !important;
            height: 44px !important;
          }
          .know-us-item .know-us-label {
            font-size: 11px !important;
          }
          .know-us-ticker-track {
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}