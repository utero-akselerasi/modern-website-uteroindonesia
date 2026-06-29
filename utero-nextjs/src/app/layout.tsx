import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./global.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Utero Indonesia — Brand Consultant & Creative Agency Malang sejak 1998",
  description:
    "Utero Indonesia adalah brand consultant & creative agency di Malang dengan pengalaman 25+ tahun. Layanan: branding, desain, advertising, signage, digital, teknologi.",
  keywords: [
    "brand consultant malang",
    "creative agency malang",
    "desain logo malang",
    "advertising malang",
    "signage malang",
    "branding UMKM",
    "utero indonesia",
  ],
  openGraph: {
    type: "website",
    url: "https://uteroindonesia.com",
    title: "Utero Indonesia | Creative Branding & Event Specialist",
    description:
      "Tingkatkan nilai brand bisnis Anda bersama para ahli kreatif di Utero Indonesia.",
    images: ["/images/og-main.jpg"],
    siteName: "Utero Indonesia",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utero Indonesia | Creative Branding & Event Specialist",
    description:
      "Solusi satu pintu pengembangan brand bisnis Anda bersama Utero Indonesia.",
    images: ["/images/og-main.jpg"],
  },
  alternates: {
    canonical: "https://uteroindonesia.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${syne.variable} antialiased`}
    >
      <head>
        <meta name="theme-color" content="#d11f1f" />
        <link rel="manifest" href="/images/manifest.json" />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      </head>
      <body>
        {/* JSON-LD Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
