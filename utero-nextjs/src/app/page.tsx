import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import KnowUsMore from "@/components/sections/KnowUsMore";
import Divisions from "@/components/sections/Divisions";
import Clients from "@/components/sections/Clients";
import Workflow from "@/components/sections/Workflow";
import Portfolio from "@/components/sections/Portfolio";
import IntellectualProperty from "@/components/sections/IntellectualProperty";
import Extrapreneur from "@/components/sections/Extrapreneur";
import Partners from "@/components/sections/Partners";
import Community from "@/components/sections/Community";
import CBP from "@/components/sections/CBP";
import Download from "@/components/sections/Download";
import WhyUtero from "@/components/sections/WhyUtero";
import RecentArticles from "@/components/sections/RecentArticles";
import Contact from "@/components/sections/Contact";
import Virtual from "@/components/sections/Virtual";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <KnowUsMore />
      <Divisions />
      <Workflow />
      <Clients />
      <Portfolio />
      <IntellectualProperty />
      <Community />
      <CBP />
      <Extrapreneur />
      <Partners />
      <Download />
      <WhyUtero />
      <RecentArticles />
      <Contact />
      <Virtual />
      <Footer />

      {/* Hidden SEO content for indexing */}
      <div className="sr-only" aria-hidden="true">
        <h2>Creative Agency Malang -- Utero Indonesia</h2>
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
