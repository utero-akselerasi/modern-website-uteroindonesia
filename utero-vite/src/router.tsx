import { createElement, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'artikel',
        element: createElement(lazy(() => import('./pages/ArtikelList'))),
      },
      {
        path: 'artikel/:slug',
        element: createElement(lazy(() => import('./pages/ArtikelDetail'))),
      },
      {
        path: 'kampanye/dari-ide-jadi-dampak',
        element: createElement(lazy(() => import('./pages/campaigns/DariIdeJadiDampak'))),
      },
      {
        path: '*',
        element: createElement(lazy(() => import('./pages/NotFound'))),
      },
    ],
  },
]);
