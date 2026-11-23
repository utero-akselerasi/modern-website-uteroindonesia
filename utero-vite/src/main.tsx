import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './router';
import { initializeAnalytics } from './lib/analytics';
import './index.css';

let analyticsStarted = false;
const startAnalytics = () => {
  if (analyticsStarted) return;
  analyticsStarted = true;
  const schedule = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 1));
  schedule(() => initializeAnalytics(), { timeout: 3000 });
};

if (document.readyState === 'complete') startAnalytics();
else window.addEventListener('load', startAnalytics, { once: true });
window.addEventListener('scroll', startAnalytics, { once: true, passive: true });
window.addEventListener('pointerdown', startAnalytics, { once: true, passive: true });
window.addEventListener('keydown', startAnalytics, { once: true });

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
