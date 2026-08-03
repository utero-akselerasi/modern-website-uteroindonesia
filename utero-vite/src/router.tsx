import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ArtikelList from './pages/ArtikelList';
import ArtikelDetail from './pages/ArtikelDetail';
import NotFound from './pages/NotFound';

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
        element: <ArtikelList />,
      },
      {
        path: 'artikel/:slug',
        element: <ArtikelDetail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
