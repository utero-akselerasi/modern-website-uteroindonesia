"use client";

import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  chatFlow,
  CHATBOT_AVATAR,
  CHATBOT_NAME,
  CHATBOT_SUBTITLE,
  type ChatOption,
} from "@/data/chatbotData";

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */
interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
}

/* ═══════════════════════════════════════════════════════════
   Theme tokens
   ═══════════════════════════════════════════════════════════ */
const theme = {
  light: {
    panelBg: "#ffffff",
    headerBg: "#ffffff",
    headerBorder: "#f0f0f0",
    headerName: "#1a1a1a",
    headerSub: "#999999",
    controlIcon: "#aaaaaa",
    controlHoverIcon: "#d11f1f",
    controlHoverBg: "rgba(209,31,31,0.06)",
    bodyBg: "#fafafa",
    botBubbleBg: "#ffffff",
    botBubbleBorder: "#eaeaea",
    botBubbleText: "#333333",
    userBubbleBg: "#d11f1f",
    userBubbleText: "#ffffff",
    typingDot: "#bbbbbb",
    footerBg: "#ffffff",
    footerBorder: "#f0f0f0",
    chipBorder: "#d11f1f",
    chipText: "#d11f1f",
    chipHoverBg: "#d11f1f",
    chipHoverText: "#ffffff",
    tooltipBg: "#ffffff",
    tooltipText: "#555555",
    tooltipTitle: "#1a1a1a",
    shadow: "0 12px 48px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.06)",
    scrollThumb: "#d4d4d4",
  },
  dark: {
    panelBg: "#1e1e1e",
    headerBg: "#252525",
    headerBorder: "#333333",
    headerName: "#f0f0f0",
    headerSub: "#888888",
    controlIcon: "#777777",
    controlHoverIcon: "#ff6b6b",
    controlHoverBg: "rgba(255,107,107,0.1)",
    bodyBg: "#1a1a1a",
    botBubbleBg: "#2a2a2a",
    botBubbleBorder: "#383838",
    botBubbleText: "#e0e0e0",
    userBubbleBg: "#d11f1f",
    userBubbleText: "#ffffff",
    typingDot: "#666666",
    footerBg: "#252525",
    footerBorder: "#333333",
    chipBorder: "#ff6b6b",
    chipText: "#ff6b6b",
    chipHoverBg: "#d11f1f",
    chipHoverText: "#ffffff",
    tooltipBg: "#2a2a2a",
    tooltipText: "#bbbbbb",
    tooltipTitle: "#f0f0f0",
    shadow: "0 12px 48px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.2)",
    scrollThumb: "#444444",
  },
};

type ThemeMode = "light" | "dark";

/* ═══════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════ */
let msgIdCounter = 0;
const nextId = () => ++msgIdCounter;

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ fontWeight: 600 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function getOptionIcon(label: string) {
  const norm = label.toLowerCase();
  if (norm.includes("whatsapp")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6, flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  }
  if (norm.includes("email")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  if (norm.includes("instagram")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (norm.includes("youtube")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
      </svg>
    );
  }
  if (norm.includes("portofolio")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  if (norm.includes("lokasi")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }
  if (norm.includes("jam")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (norm.includes("hubungi") || norm.includes("konsultasi")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  if (norm.includes("kembali")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    );
  }
  return null;
}

/* ═══════════════════════════════════════════════════════════
   SVG Icons (inline for zero deps)
   ═══════════════════════════════════════════════════════════ */
const IconReset = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);
const IconSun = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMoon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconClose = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconCloseL = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */
export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentOptions, setCurrentOptions] = useState<ChatOption[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mode, setMode] = useState<ThemeMode>("light");

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const hasInitRef = useRef(false);
  const t = theme[mode];

  /* ── Show tooltip after 3s ─────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  /* ── Scroll to bottom ──────────────────────────────── */
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping, currentOptions]);

  /* ── Push bot messages with typing delay ───────────── */
  const pushBotMessages = useCallback((nodeId: string) => {
    const node = chatFlow[nodeId];
    if (!node) return;
    setIsTyping(true);
    setCurrentOptions([]);

    const botTexts = node.botMessages;
    let delay = 0;
    botTexts.forEach((text, idx) => {
      delay += Math.min(500 + text.length * 6, 1200);
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: nextId(), sender: "bot", text }]);
        if (idx === botTexts.length - 1) {
          setTimeout(() => {
            setIsTyping(false);
            setCurrentOptions(node.options);
          }, 300);
        }
      }, delay);
    });
  }, []);

  /* ── Init on first open ────────────────────────────── */
  useEffect(() => {
    if (isOpen && !hasInitRef.current) {
      hasInitRef.current = true;
      pushBotMessages("start");
    }
  }, [isOpen, pushBotMessages]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setShowTooltip(false);
    sendGAEvent({ event: "chat_widget_toggle", value: isOpen ? "close" : "open" });
  };

  const handleReset = () => {
    msgIdCounter = 0;
    setMessages([]);
    setCurrentOptions([]);
    hasInitRef.current = false;
    setTimeout(() => {
      hasInitRef.current = true;
      pushBotMessages("start");
    }, 200);
    sendGAEvent({ event: "chat_widget_reset", value: "reset" });
  };

  const handleOptionClick = (opt: ChatOption) => {
    sendGAEvent({ event: "chat_widget_option", value: opt.label });
    if (opt.href) {
      window.open(opt.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (!opt.nextNode) return;
    setMessages((prev) => [...prev, { id: nextId(), sender: "user", text: opt.label }]);
    setTimeout(() => pushBotMessages(opt.nextNode!), 400);
  };

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  /* ═════════════════════ RENDER ═════════════════════════ */
  return (
    <div className="fixed bottom-5 right-4 z-[90] flex flex-col items-end sm:bottom-6 sm:right-6">
      {/* ═══ Chat Panel ══════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "min(380px, calc(100vw - 32px))",
              maxHeight: "min(540px, calc(100vh - 140px))",
              background: t.panelBg,
              boxShadow: t.shadow,
              borderRadius: "20px",
              marginBottom: "12px",
            }}
            className="flex flex-col overflow-hidden"
          >
            {/* ──────── Header ──────────────────────── */}
            <div
              style={{
                background: t.headerBg,
                borderBottom: `1px solid ${t.headerBorder}`,
                padding: "14px 16px",
              }}
              className="flex items-center gap-3"
            >
              <div className="relative shrink-0">
                <img
                  src={CHATBOT_AVATAR}
                  alt={CHATBOT_NAME}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2.5px solid #d11f1f",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 11,
                    height: 11,
                    background: "#22c55e",
                    borderRadius: "50%",
                    border: `2px solid ${t.headerBg}`,
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: t.headerName, lineHeight: 1.3, margin: 0 }}>
                  {CHATBOT_NAME}
                </p>
                <p style={{ fontSize: 11, color: t.headerSub, margin: 0, lineHeight: 1.3 }}>
                  {CHATBOT_SUBTITLE}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {[
                  { icon: <IconReset />, onClick: handleReset, title: "Reset percakapan" },
                  { icon: mode === "light" ? <IconMoon /> : <IconSun />, onClick: toggleMode, title: mode === "light" ? "Mode gelap" : "Mode terang" },
                  { icon: <IconClose />, onClick: handleToggle, title: "Tutup" },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.onClick}
                    title={btn.title}
                    aria-label={btn.title}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "none",
                      background: "transparent",
                      color: t.controlIcon,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = t.controlHoverIcon;
                      e.currentTarget.style.background = t.controlHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = t.controlIcon;
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* ──────── Chat Body ──────────────────── */}
            <div
              ref={chatBodyRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px",
                background: t.bodyBg,
                scrollBehavior: "smooth",
                scrollbarWidth: "thin",
                scrollbarColor: `${t.scrollThumb} transparent`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 8,
                        justifyContent: isUser ? "flex-end" : "flex-start",
                      }}
                    >
                      {/* Bot avatar */}
                      {!isUser && (
                        <img
                          src={CHATBOT_AVATAR}
                          alt=""
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "1.5px solid #d11f1f",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          maxWidth: "78%",
                          padding: "10px 14px",
                          fontSize: 13,
                          lineHeight: 1.6,
                          whiteSpace: "pre-line",
                          borderRadius: isUser
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                          background: isUser ? t.userBubbleBg : t.botBubbleBg,
                          color: isUser ? t.userBubbleText : t.botBubbleText,
                          border: isUser ? "none" : `1px solid ${t.botBubbleBorder}`,
                          boxShadow: isUser
                            ? "0 2px 8px rgba(209,31,31,0.2)"
                            : "0 1px 4px rgba(0,0,0,0.04)",
                        }}
                      >
                        {!isUser ? renderBold(msg.text) : msg.text}
                      </motion.div>
                    </div>
                  );
                })}

                {/* Typing dots */}
                {isTyping && (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                    <img
                      src={CHATBOT_AVATAR}
                      alt=""
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1.5px solid #d11f1f",
                        flexShrink: 0,
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "18px 18px 18px 4px",
                        background: t.botBubbleBg,
                        border: `1px solid ${t.botBubbleBorder}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          style={{
                            display: "inline-block",
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: t.typingDot,
                            animation: "chatbot-bounce 1s ease-in-out infinite",
                            animationDelay: `${i * 160}ms`,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            </div>

            {/* ──────── Option Chips ────────────────── */}
            <AnimatePresence>
              {currentOptions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    background: t.footerBg,
                    borderTop: `1px solid ${t.footerBorder}`,
                    padding: "12px 16px 14px",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {currentOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        style={{
                          padding: "7px 16px",
                          fontSize: 12,
                          fontWeight: 500,
                          borderRadius: 50,
                          border: `1.5px solid ${t.chipBorder}`,
                          background: "transparent",
                          color: t.chipText,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          lineHeight: 1.4,
                          display: "flex",
                          alignItems: "center",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = t.chipHoverBg;
                          e.currentTarget.style.color = t.chipHoverText;
                          e.currentTarget.style.borderColor = t.chipHoverBg;
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(209,31,31,0.25)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = t.chipText;
                          e.currentTarget.style.borderColor = t.chipBorder;
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = "scale(0.96)";
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                      >
                        {getOptionIcon(opt.label)}
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Trigger Area ════════════════════════════════ */}
      <div className="flex items-end gap-2">
        {/* Tooltip speech bubble */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{ position: "relative", marginBottom: 4, marginRight: 4 }}
            >
              <div
                style={{
                  background: t.tooltipBg,
                  borderRadius: 14,
                  padding: "10px 16px",
                  maxWidth: 210,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: t.tooltipTitle, margin: 0 }}>
                  Hello..👋
                </p>
                <p style={{ fontSize: 11, color: t.tooltipText, margin: "2px 0 0", lineHeight: 1.4 }}>
                  Butuh bantuan untuk membangun brand Anda?
                </p>
              </div>
              {/* Triangle arrow → */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: -5,
                  transform: "translateY(-50%) rotate(45deg)",
                  width: 10,
                  height: 10,
                  background: t.tooltipBg,
                  boxShadow: "2px -2px 4px rgba(0,0,0,0.04)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main floating button — photo avatar */}
        <motion.button
          onClick={handleToggle}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: "none",
            padding: 0,
            cursor: "pointer",
            overflow: "hidden",
            boxShadow: "0 6px 28px rgba(209,31,31,0.4), 0 2px 10px rgba(0,0,0,0.15)",
            position: "relative",
          }}
          aria-label={isOpen ? "Tutup chat" : "Buka chat"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#d11f1f",
                  color: "#fff",
                }}
              >
                <IconCloseL />
              </motion.div>
            ) : (
              <motion.div
                key="avatar"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <img
                  src={CHATBOT_AVATAR}
                  alt="Chat Kami"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* "Chat Me" bar */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    padding: "4px 0 6px",
                    background: "linear-gradient(transparent, rgba(209,31,31,0.92) 40%)",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const }}>
                    Chat Me
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ═══ Keyframe style tag (for typing dots) ════════ */}
      <style>{`
        @keyframes chatbot-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
