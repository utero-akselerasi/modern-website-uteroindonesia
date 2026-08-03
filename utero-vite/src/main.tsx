import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { router } from './router';
import './index.css';

// Initialize Google Analytics
ReactGA.initialize('G-7V5HTNW1TC');

function App() {
  useEffect(() => {
    // Track page views
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

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