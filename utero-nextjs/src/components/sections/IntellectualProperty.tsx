"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const ipItems = [
  { name: "OSIKER", href: "http://osiker.com/", img: "/images/ip/osiker.webp", alt: "Platform Intellectual Property & lisensi kreatif" },
  { name: "Osiaeker", href: "http://osiaeker.uteroindonesia.com", img: "/images/ip/osiaeker.webp", alt: "Kanal konten kreatif dan entertainment" },
  { name: "Chang", href: "http://bit.ly/YTDADIKWAHYUCHANG", img: "/images/ip/chang.webp", alt: "Vlog dan konten kreatif Dadik Wahyu Chang" },
  { name: "Mbois", href: "https://festivalmbois.mcf.or.id/", img: "/images/ip/mbois.webp", alt: "Festival Mbois — brand event Malang Creative Fusion" },
  { name: "Osi & Ji", href: "http://osidanji.com/", img: "/images/ip/osi-ji.webp", alt: "Maskot kota Malang — Osi & Ji" },
  { name: "Utero", href: "https://www.youtube.com/channel/UCkdJC5Tw0bk0xK9sUR80xnA", img: "/images/ip/utero.webp", alt: "Channel YouTube resmi Utero Indonesia" },
  { name: "Waraalvaro", href: "https://www.youtube.com/channel/UCfQ6A2Q5rZ09uWQDRD97G2g", img: "/images/ip/waraalvaro.webp", alt: "Kanal gaming dan entertainment anak" },
  { name: "Waravalerie", href: "https://www.youtube.com/channel/UCZh3QudxIClo8VHYEPPvS6w", img: "/images/ip/waravalerie.webp", alt: "Kanal beauty dan kreativitas anak" },
  { name: "Socioboo", href: "https://www.youtube.com/channel/UCCHRTqXGcNJnKuI42cE5d7A", img: "/images/ip/socioboo.webp", alt: "Platform paid promote dan influencer marketing" },
  { name: "Dinar Weddover", href: "https://www.youtube.com/channel/UCBylfhhGHOLKQ52vTLxT0xg", img: "/images/ip/dinar-weddover.webp", alt: "Wedding organizer dan makeup artist" },
  { name: "Multiverse", href: "https://www.instagram.com/multiverse.co.id/", img: "/images/ip/multiverse.webp", alt: "Komunitas gaming dan esport" },
  { name: "Grotesk", href: "https://grotesk.uteroindonesia.com", img: "/images/ip/grotesk.webp", alt: "Brand cycling dan apparel kreatif" },
  { name: "Red Valley", href: "https://www.youtube.com/@RedValley_band/videos", img: "/images/ip/red-valley.webp", alt: "Band metal/rock asal Malang" },
];

const ITEM_COUNT = ipItems.length;

export default function IntellectualProperty() {
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
      id="intelektual"
      aria-labelledby="ip-title"
      style={{
        padding: "20px clamp(16px, 5vw, 64px) 80px",
        background: "var(--red)",
      }}
    >
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
            color: "#fff",
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
              background: "rgba(255,255,255,0.5)",
            }}
          />
          Intellectual Property
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "rgba(255,255,255,0.5)",
            }}
          />
        </div>
        <h2
          id="ip-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#fff",
          }}
        >
          Karya & <span style={{ color: "var(--black)" }}>Kreasi</span> Utero
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.7)",
            maxWidth: "600px",
            margin: "20px auto 0",
          }}
        >
          Dari konten digital hingga brand fashion — setiap Intellectual Property adalah bukti bahwa
          kreativitas tidak pernah berhenti melahirkan sesuatu yang baru.
        </p>
      </motion.div>

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
        className="ip-ticker-container"
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
        <div
          ref={trackRef}
          className="ip-ticker-track"
          style={{
            display: "flex",
            width: "max-content",
          }}
        >
          {[...ipItems, ...ipItems].map((item, index) => (
            <a
              key={`${item.name}-${index}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "40px 24px 36px",
                background: "var(--ash)",
                border: "1px solid var(--border-color)",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                width: "260px",
                flexShrink: 0,
                borderRadius: "2px",
              }}
              className="ip-ticker-item"
              draggable={false}
              data-skip-filter={item.name === "Waraalvaro" || item.name === "Waravalerie" || item.name === "Multiverse" ? "true" : undefined}
              onMouseEnter={(e) => {
                if (isDraggingRef.current) return;
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                if (isDraggingRef.current) return;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={(e) => {
                if (wasDraggedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  wasDraggedRef.current = false;
                }
              }}
            >
              <span
                className="ip-ticker-icon"
                style={{
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
                aria-hidden="true"
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  width={96}
                  height={96}
                  draggable={false}
                  style={{
                    objectFit: "contain",
                    transition: "filter 0.3s",
                  }}
                />
              </span>
              <span
                className="ip-ticker-label"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  transition: "color 0.3s",
                }}
              >
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .ip-ticker-track {
          will-change: transform;
          gap: 20px;
        }
        .ip-ticker-container img,
        .ip-ticker-container svg {
          -webkit-user-drag: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .ip-ticker-container[data-dragging] .ip-ticker-item {
          transition: none !important;
        }
        .ip-ticker-container[data-dragging] .ip-ticker-item:hover {
          background: var(--ash) !important;
          border-color: var(--border-color) !important;
          transform: none !important;
          box-shadow: none !important;
        }
        .ip-ticker-container[data-dragging] .ip-ticker-item:hover .ip-ticker-label {
          color: var(--ink) !important;
        }
        .ip-ticker-container[data-dragging] .ip-ticker-item:hover img {
          filter: none !important;
        }
        .ip-ticker-item[data-skip-filter="true"]:hover img {
          filter: none !important;
        }

        @media (max-width: 768px) {
          .ip-ticker-item {
            width: 180px !important;
            padding: 28px 16px 24px !important;
          }
          .ip-ticker-item .ip-ticker-icon {
            width: 72px !important;
            height: 72px !important;
            margin-bottom: 12px !important;
          }
          .ip-ticker-item .ip-ticker-icon img {
            width: 68px !important;
            height: 68px !important;
          }
          .ip-ticker-item .ip-ticker-label {
            font-size: 12px !important;
          }
          .ip-ticker-track {
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .ip-ticker-item {
            width: 160px !important;
            padding: 24px 12px 20px !important;
          }
          .ip-ticker-item .ip-ticker-icon {
            width: 60px !important;
            height: 60px !important;
          }
          .ip-ticker-item .ip-ticker-icon img {
            width: 56px !important;
            height: 56px !important;
          }
          .ip-ticker-item .ip-ticker-label {
            font-size: 11px !important;
          }
          .ip-ticker-track {
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
