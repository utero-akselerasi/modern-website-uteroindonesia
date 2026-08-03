import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import KnowUsMore from '../components/sections/KnowUsMore';
import Divisions from '../components/sections/Divisions';
import Clients from '../components/sections/Clients';
import Workflow from '../components/sections/Workflow';
import Portfolio from '../components/sections/Portfolio';
import IntellectualProperty from '../components/sections/IntellectualProperty';
import Extrapreneur from '../components/sections/Extrapreneur';
import Partners from '../components/sections/Partners';
import Community from '../components/sections/Community';
import CBP from '../components/sections/CBP';
import Download from '../components/sections/Download';
import WhyUtero from '../components/sections/WhyUtero';
import RecentArticles from '../components/sections/RecentArticles';
import Contact from '../components/sections/Contact';
import Virtual from '../components/sections/Virtual';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Utero Indonesia -- Brand Consultant & Creative Agency Malang sejak 1998</title>
        <meta
          name="description"
          content="Utero Indonesia adalah brand consultant & creative agency di Malang dengan pengalaman 25+ tahun. Layanan: branding, desain, advertising, signage, digital, teknologi."
        />
        <meta
          name="keywords"
          content="brand consultant malang, creative agency malang, desain logo malang, advertising malang, signage malang, branding UMKM, utero indonesia"
        />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uteroindonesia.com" />
        <meta property="og:title" content="Utero Indonesia | Creative Branding & Event Specialist" />
        <meta
          property="og:description"
          content="Tingkatkan nilai brand bisnis Anda bersama para ahli kreatif di Utero Indonesia."
        />
        <meta property="og:image" content="https://uteroindonesia.com/images/og-main.jpg" />
        <meta property="og:site_name" content="Utero Indonesia" />
        <meta property="og:locale" content="id_ID" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Utero Indonesia | Creative Branding & Event Specialist" />
        <meta
          name="twitter:description"
          content="Solusi satu pintu pengembangan brand bisnis Anda bersama Utero Indonesia."
        />
        <meta name="twitter:image" content="https://uteroindonesia.com/images/og-main.jpg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://uteroindonesia.com" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Utero Indonesia",
            alternateName: [
              "CV Wahyu Utero Sinar Jaya Kreasindo",
              "PT Utero Kreatif Indonesia",
            ],
            url: "https://uteroindonesia.com",
            logo: "https://uteroindonesia.com/logo.png",
            description:
              "Brand consultant & creative agency di Malang dengan pengalaman 25+ tahun. Layanan branding, desain, advertising, signage, dan teknologi digital.",
            foundingDate: "1998",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Bantaran 1 No. 25, Tulusrejo",
              addressLocality: "Malang",
              addressRegion: "Jawa Timur",
              postalCode: "65141",
              addressCountry: "ID",
            },
            telephone: "+62817388616",
            geo: {
              "@type": "GeoCoordinates",
              latitude: -7.9826,
              longitude: 112.6308,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: "08:00",
              closes: "17:00",
            },
            sameAs: [
              "https://instagram.com/uteromalang",
              "https://uterogroup.com",
            ],
          })}
        </script>
      </Helmet>

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

      {/* Hidden SEO content for indexing */}
      <div className="sr-only" aria-hidden="true">
        <h2>Creative Agency Malang - Utero Indonesia</h2>
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