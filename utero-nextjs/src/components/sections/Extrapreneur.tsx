"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const extrapreneurItems = [
  { name: "RUVODO WebApps", href: "http://ruvodo.com/", img: "/images/divisi/o-web.webp", alt: "Layanan pembuatan website dan aplikasi web" },
  { name: "Dadik Chang", href: "https://dadikwahyuchang.id/", img: "/images/divisi/o-dad.webp", alt: "Personal brand Dadik Wahyu Chang — founder Utero Indonesia" },
  { name: "Dinar Weddover", href: "http://www.dinarweddover.com", img: "/images/divisi/o-makeup.webp", alt: "Wedding organizer dan makeup artist profesional" },
  { name: "Epochstream", href: "http://epochstream.com", img: "/images/divisi/epoch-stream.webp", alt: "Platform media digital dan konten kreatif" },
  { name: "Soundpub", href: "https://soundpub.xyz/", img: "/images/divisi/soundpub.webp", alt: "Distribusi musik digital dan label services" },
  { name: "Buzzerhood", href: "https://buzzerhood.com/", img: "/images/divisi/buzzerhood.webp", alt: "Platform paid promote dan influencer marketing" },
  { name: "Immerstal", href: "https://immerstal.uteroindonesia.com", img: "/images/divisi/immerstal.webp", alt: "Studio kreatif dan produksi konten digital" },
  { name: "Odigiro Consultant", href: "https://odigiro.uteroindonesia.com/", img: "/images/divisi/o-kons.webp", alt: "Konsultan city branding dan pengembangan daerah" },
  { name: "Malang Virtual", href: "https://malangvirtual.uteroindonesia.com", img: "/images/divisi/malangvirtual.webp", alt: "Virtual tour dan digitalisasi destinasi Malang" },
  { name: "Smartsuco", href: "https://smartsuco.utero.id", img: "/images/divisi/smartsuco.webp", alt: "Platform teknologi dan solusi digital" },
  { name: "Inon Designer", href: "http://inon.utero.id", img: "/images/divisi/o-designer.webp", alt: "Jasa desain grafis dan branding kreatif" },
  { name: "Cebro Agency", href: "https://www.instagram.com/cebro_design_agency/", img: "/images/divisi/o-logo.webp", alt: "Creative agency spesialis desain logo dan identitas brand" },
  { name: "Kochiro Inexterior", href: "https://www.kochiro.com/", img: "/images/divisi/o-inex.webp", alt: "Desain interior dan eksterior profesional", skipFilter: true },
  { name: "Dinar Kebaya", href: "https://www.instagram.com/dinarkebayaku/", img: "/images/divisi/o-kebaya.webp", alt: "Kebaya modern dan fashion tradisional kontemporer" },
  { name: "Desro", href: "https://www.instagram.com/desainrombong/", img: "/images/divisi/o-rombong.webp", alt: "Desain dan produksi rombong lipat custom" },
  { name: "Symadeco", href: "http://symadeco.com/", img: "/images/divisi/o-dekor.webp", alt: "Sistem manajemen dekorasi pernikahan digital" },
  { name: "Socioboo", href: "http://socioboo.uteroindonesia.com/", img: "/images/divisi/socioboo.webp", alt: "Platform paid promote dan endorsed social media" },
  { name: "Dinkey", href: "https://www.instagram.com/dinkeyweddingplanner/", img: "/images/divisi/o-wedd.webp", alt: "Wedding planner dan organizer profesional" },
  { name: "Sawoto", href: "https://www.instagram.com/sawoto.reklame/", img: "/images/divisi/sawoto.webp", alt: "Jasa pembuatan huruf timbul dan reklame", skipFilter: true },
  { name: "Rompeda", href: "http://rompeda.utero.id/", img: "/images/divisi/rompeda.webp", alt: "Produk kreatif dan merchandise custom" },
  { name: "Mrono", href: "https://www.instagram.com/brandingmobilmalang/", img: "/images/divisi/mrono.webp", alt: "Branding mobil dan sticker kendaraan custom", skipFilter: true },
  { name: "Ono", href: "https://www.instagram.com/onomakerspace/", img: "/images/divisi/onomakerspace.webp", alt: "Maker space dan workshop kreatif" },
  { name: "Tokoneonbox", href: "https://www.instagram.com/tokoneonbox/", img: "/images/divisi/tokoneonbox.webp", alt: "Toko neon box custom dan signage LED" },
];

const ITEM_COUNT = extrapreneurItems.length;

export default function Extrapreneur() {
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
  const followRef = useRef(false);
  const lastFollowXRef = useRef(0);

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

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      containerRef.current?.removeAttribute('data-dragging');
      const speed = Math.abs(velocityRef.current);
      if (speed > 0.3) {
        let vel = velocityRef.current * 16.67 * 0.5;
        const inertia = () => {
          if (Math.abs(vel) < 0.3) return;
          translateXRef.current += vel;
          const ow = oneSetWidthRef.current;
          if (ow > 0) {
            if (translateXRef.current <= -ow) translateXRef.current += ow;
            if (translateXRef.current > 0) translateXRef.current -= ow;
          }
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(${translateXRef.current}px, 0, 0)`;
          }
          vel *= 0.92;
          requestAnimationFrame(inertia);
        };
        requestAnimationFrame(inertia);
      }
      pausedRef.current = followRef.current;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
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
      id="extrapreneur"
      aria-labelledby="extrapreneur-title"
      style={{
        padding: "20px clamp(16px, 5vw, 64px) 80px",
        background: "var(--white)",
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
          Extrapreneur
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
          id="extrapreneur-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--ink)",
          }}
        >
          Unit Usaha <span style={{ color: "var(--red)" }}>Eksternal</span>
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
          Dari teknologi hingga fashion — setiap unit adalah wujud nyata
          semangat ekopreneurship yang kami kembangkan.
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
        }}
        className="extrapreneur-ticker-container"
        onMouseEnter={(e) => {
          pausedRef.current = true;
          followRef.current = true;
          lastFollowXRef.current = e.clientX;
        }}
        onMouseMove={(e) => {
          if (!followRef.current || isDraggingRef.current) return;
          const delta = e.clientX - lastFollowXRef.current;
          if (Math.abs(delta) < 2) return;
          translateXRef.current += delta;
          const ow = oneSetWidthRef.current;
          if (ow > 0) {
            if (translateXRef.current <= -ow) translateXRef.current += ow;
            if (translateXRef.current > 0) translateXRef.current -= ow;
          }
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(${translateXRef.current}px, 0, 0)`;
          }
          lastFollowXRef.current = e.clientX;
        }}
        onMouseLeave={() => {
          followRef.current = false;
          if (!isDraggingRef.current) pausedRef.current = false;
        }}
        onPointerDown={handlePointerDown}
      >
        <div
          ref={trackRef}
          className="extrapreneur-ticker-track"
          style={{
            display: "flex",
            width: "max-content",
          }}
        >
          {[...extrapreneurItems, ...extrapreneurItems].map((item, index) => (
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
              className="extrapreneur-ticker-item"
              data-skip-filter={item.skipFilter ? "true" : undefined}
              onMouseEnter={(e) => {
                if (isDraggingRef.current) return;
                e.currentTarget.style.background = "var(--red)";
                e.currentTarget.style.borderColor = "var(--red)";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(209, 31, 31, 0.2)";
                const label = e.currentTarget.querySelector(".extrapreneur-ticker-label");
                if (label) (label as HTMLElement).style.color = "#fff";
                if (e.currentTarget.getAttribute("data-skip-filter") !== "true") {
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.filter = "brightness(0) invert(1)";
                }
              }}
              onMouseLeave={(e) => {
                if (isDraggingRef.current) return;
                e.currentTarget.style.background = "var(--ash)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                const label = e.currentTarget.querySelector(".extrapreneur-ticker-label");
                if (label) (label as HTMLElement).style.color = "var(--ink)";
                if (e.currentTarget.getAttribute("data-skip-filter") !== "true") {
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.filter = "none";
                }
              }}
            >
              <span
                className="extrapreneur-ticker-icon"
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
                  style={{
                    objectFit: "contain",
                    transition: "filter 0.3s",
                  }}
                />
              </span>
              <span
                className="extrapreneur-ticker-label"
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
        .extrapreneur-ticker-track {
          will-change: transform;
          gap: 20px;
        }
        .extrapreneur-ticker-item:hover .extrapreneur-ticker-label {
          color: #fff !important;
        }
        .extrapreneur-ticker-container[data-dragging] .extrapreneur-ticker-item {
          transition: none !important;
        }
        .extrapreneur-ticker-container[data-dragging] .extrapreneur-ticker-item:hover {
          background: var(--ash) !important;
          border-color: var(--border-color) !important;
          transform: none !important;
          box-shadow: none !important;
        }
        .extrapreneur-ticker-container[data-dragging] .extrapreneur-ticker-item:hover .extrapreneur-ticker-label {
          color: var(--ink) !important;
        }
        .extrapreneur-ticker-container[data-dragging] .extrapreneur-ticker-item:hover img {
          filter: none !important;
        }
        .extrapreneur-ticker-item[data-skip-filter="true"]:hover img {
          filter: none !important;
        }

        @media (max-width: 768px) {
          .extrapreneur-ticker-item {
            width: 180px !important;
            padding: 28px 16px 24px !important;
          }
          .extrapreneur-ticker-item .extrapreneur-ticker-icon {
            width: 72px !important;
            height: 72px !important;
            margin-bottom: 12px !important;
          }
          .extrapreneur-ticker-item .extrapreneur-ticker-icon img {
            width: 68px !important;
            height: 68px !important;
          }
          .extrapreneur-ticker-item .extrapreneur-ticker-label {
            font-size: 12px !important;
          }
          .extrapreneur-ticker-track {
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .extrapreneur-ticker-item {
            width: 160px !important;
            padding: 24px 12px 20px !important;
          }
          .extrapreneur-ticker-item .extrapreneur-ticker-icon {
            width: 60px !important;
            height: 60px !important;
          }
          .extrapreneur-ticker-item .extrapreneur-ticker-icon img {
            width: 56px !important;
            height: 56px !important;
          }
          .extrapreneur-ticker-item .extrapreneur-ticker-label {
            font-size: 11px !important;
          }
          .extrapreneur-ticker-track {
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
