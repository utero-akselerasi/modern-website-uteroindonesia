import { Outlet, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { trackPageView } from '../../lib/analytics';
import Navbar from './Navbar';
import Footer from './Footer';
const FloatingWhatsApp = lazy(() => import('./FloatingWhatsApp'));

export default function Layout() {
  const location = useLocation();
  const isCampaignPage = location.pathname.startsWith('/kampanye/');
  const [showChat, setShowChat] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    const reveal = () => setShowChat(true);
    const timer = window.setTimeout(reveal, 8000);
    window.addEventListener('scroll', reveal, { once: true, passive: true });
    window.addEventListener('pointerdown', reveal, { once: true, passive: true });
    window.addEventListener('keydown', reveal, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('pointerdown', reveal);
      window.removeEventListener('keydown', reveal);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    const frame = requestAnimationFrame(() => {
      trackPageView(`${location.pathname}${location.search}${location.hash}`, document.title);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.search, location.hash]);

  return (
    <div id="root-layout">
      <Navbar />
      <Suspense fallback={<main style={{ minHeight: '100vh', paddingTop: '100px' }} aria-label="Memuat halaman" />}>
        <Outlet />
      </Suspense>
      <Footer />
      {!isCampaignPage && (showChat ? (
        <Suspense fallback={null}><FloatingWhatsApp initiallyOpen={openChat} /></Suspense>
      ) : (
        <button
          type="button"
          aria-label="Chat Me"
          onClick={() => { setOpenChat(true); setShowChat(true); }}
          style={{ position: 'fixed', right: 24, bottom: 24, width: 72, height: 72, zIndex: 90, border: 0, borderRadius: '50%', background: '#d11f1f', overflow: 'hidden', cursor: 'pointer' }}
        >
          <img src="/images/photos/chatbot-avatar-180.webp" alt="" width="72" height="72" />
          <span aria-hidden="true" style={{ position: 'absolute', inset: 'auto 0 0', padding: '4px 0 6px', color: '#fff', background: 'linear-gradient(transparent, rgba(209,31,31,0.92) 40%)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Chat Me</span>
        </button>
      ))}
    </div>
  );
}
