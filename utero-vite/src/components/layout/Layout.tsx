import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    ReactGA.send({
      hitType: 'pageview',
      page: `${location.pathname}${location.search}${location.hash}`,
      title: document.title,
    });
  }, [location.pathname, location.search, location.hash]);

  return (
    <div id="root-layout">
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
