export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string | null;
}

export const articles: Article[] = [
  {
    slug: "profil-utero-kreatif-indonesia",
    title: "Profil PT. Utero Kreatif Indonesia: 25+ Tahun Berkarya di Dunia Kreatif",
    date: "10 Juli 2026",
    category: "Profil",
    excerpt:
      "Mengenal lebih dekat perjalanan PT. Utero Kreatif Indonesia sebagai creative agency dan brand consultant yang telah berkiprah sejak 1998.",
    content:
      "Tulis konten lengkap profil PT. Utero Kreatif Indonesia di sini.",
    image: null,
  },
  {
    slug: "layanan-utero-kreatif-indonesia",
    title: "Layanan PT. Utero Kreatif Indonesia: Solusi Lengkap Branding Anda",
    date: "5 Juli 2026",
    category: "Layanan",
    excerpt:
      "Mulai dari branding, signage, digital marketing, hingga event management -- semua layanan kreatif tersedia di bawah satu atap.",
    content:
      "Tulis konten lengkap layanan PT. Utero Kreatif Indonesia di sini.",
    image: null,
  },
  {
    slug: "portofolio-proyek-utero-indonesia",
    title: "Portofolio Proyek Terbaik Utero Indonesia",
    date: "1 Juli 2026",
    category: "Portofolio",
    excerpt:
      "Melihat proyek-proyek terbaik yang pernah dikerjakan Utero Indonesia untuk klien dari berbagai industri.",
    content:
      "Tulis konten lengkap portofolio proyek Utero Indonesia di sini.",
    image: null,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRecentArticles(count: number = 3): Article[] {
  return articles.slice(0, count);
}
