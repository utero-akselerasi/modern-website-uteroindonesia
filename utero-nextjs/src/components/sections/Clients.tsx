"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { clients } from "@/data/clients";

const ITEM_COUNT = clients.length;

export default function Clients() {
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

  const BASE_VELOCITY = -100;

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
          translateXRef.current += BASE_VELOCITY * (delta / 1000);
          if (translateXRef.current <= -ow) {
            translateXRef.current += ow;
          }
          if (translateXRef.current > 0) {
            translateXRef.current -= ow;
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
      if (ow > 0 && Math.abs(translateXRef.current) >= ow) {
        translateXRef.current = translateXRef.current % ow;
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
      containerRef.current?.removeAttribute("data-dragging");
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

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
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
    containerRef.current?.setAttribute("data-dragging", "");
  };

  const renderItem = (c: (typeof clients)[0], index: number) => {
    const content = (
      <img
        src={c.logo}
        alt={c.name}
        className="client-scroll-logo"
        draggable={false}
        style={c.scale ? { transform: `scale(${c.scale})` } : undefined}
      />
    );
    const itemStyle = {
      display: "flex" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      width: "120px",
      height: "64px",
      flexShrink: 0,
    };
    return c.url ? (
      <a
        key={`${c.name}-${index}`}
        href={c.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...itemStyle, textDecoration: "none" }}
      >
        {content}
      </a>
    ) : (
      <div key={`${c.name}-${index}`} style={{ ...itemStyle, cursor: "default" }}>
        {content}
      </div>
    );
  };

  return (
    <section
      id="klien"
      aria-labelledby="clients-title"
      style={{ background: "var(--red)", padding: "80px 48px", textAlign: "center" }}
      className="clients-section"
    >
      <p
        id="clients-title"
        style={{
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.85)",
          marginBottom: "48px",
        }}
      >
        Sebagian Klien & Mitra yang Pernah Kami Tangani
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            padding: "24px 0",
            touchAction: "none",
          }}
          className="clients-ticker-container"
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              width: "max-content",
            }}
            className="clients-ticker-track"
          >
            {[...clients, ...clients].map((c, i) => renderItem(c, i))}
          </div>
        </div>
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
          background: rgba(255, 255, 255, 0.95);
          padding: 8px;
          border-radius: 8px;
        }
        .client-scroll-logo:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.05);
          background: rgba(255, 255, 255, 1);
        }
        .clients-ticker-track {
          will-change: transform;
        }
        .clients-ticker-container[data-dragging] .client-scroll-logo {
          pointer-events: none;
        }
        .clients-ticker-container[data-dragging] .client-scroll-logo:hover {
          filter: grayscale(100%) !important;
          opacity: 0.7 !important;
          transform: none !important;
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
