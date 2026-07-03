import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import About from "@/components/sections/About";
import KnowUsMore from "@/components/sections/KnowUsMore";
import Divisions from "@/components/sections/Divisions";
import Clients from "@/components/sections/Clients";
import Portfolio from "@/components/sections/Portfolio";
import WhyUtero from "@/components/sections/WhyUtero";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <KnowUsMore />
      <Divisions />
      <Clients />
      <Portfolio />
      <WhyUtero />
      <Contact />
      <Footer />

      {/* Hidden SEO content for indexing */}
      <div className="sr-only" aria-hidden="true">
        <h2>Creative Agency Malang — Utero Indonesia</h2>
        <p>
          Utero Indonesia adalah creative agency dan brand consultant terbaik di
          Malang, Jawa Timur. Berpengalaman lebih dari 25 tahun sejak 1998 dalam
          bidang branding, desain grafis, advertising, signage, digital marketing,
          dan teknologi. Melayani klien dari UMKM hingga perusahaan nasional.
          Kantor tersedia di Malang, Mojokerto, dan Madiun.
        </p>
      </div>
    </>
  );
}
