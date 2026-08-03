import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function Layout() {
  return (
    <div id="root-layout">
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
