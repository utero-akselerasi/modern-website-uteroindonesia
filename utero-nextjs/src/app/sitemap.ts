import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://uteroindonesia.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Tambahkan URL halaman lain di sini jika kedepannya ada halaman tambahan (misal: /about, /services)
  ];
}
