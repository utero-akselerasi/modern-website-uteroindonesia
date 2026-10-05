export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string | null;
  cover_url?: string | null;
  author?: string;
  published?: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  canonical_url?: string | null;
  robots?: string | null;
  og_image_path?: string | null;
  featured_image_url?: string | null;
  featured_image_path?: string | null;
  og_image_url?: string | null;
  article_tags?: string[];
  addons?: ArticleAddon[];
}

export interface ArticleAddon {
  id?: string;
  addon_type?: string;
  title?: string | null;
  placement?: string | null;
  sort_order?: number;
  config?: {
    media?: Array<{ url?: string | null }>;
    gallery?: {
      gallery_items?: Array<{
        media_assets?: { url?: string | null } | null;
      }>;
    } | null;
    url?: string | null;
    show_download?: boolean;
  } | null;
}

interface ApiListResponse {
  data?: RawArticle[];
  meta?: { page: number; limit: number; total: number };
}

interface ApiDetailResponse {
  data?: RawArticle;
}

interface ApiCategoryResponse {
  data?: Array<{ name: string; slug: string }>;
}

interface RawArticle {
  id?: string | number;
  slug?: string;
  title?: string;
  category?: string | { name?: string; slug?: string };
  categories?: string | { name?: string; slug?: string } | null;
  excerpt?: string | null;
  meta_description?: string | null;
  content?: string | null;
  cover_url?: string | null;
  image?: string | null;
  author?: string | { name?: string } | null;
  published?: boolean;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  canonical_url?: string | null;
  robots?: string | null;
  og_image_path?: string | null;
  featured_image_url?: string | null;
  featured_image_path?: string | null;
  og_image_url?: string | null;
  article_tags?: Array<string | { tags?: { name?: string } | null }> | null;
  addons?: ArticleAddon[] | null;
}

const API_ENDPOINT = '/api/articles.php';
const CATEGORY_ENDPOINT = '/api/categories.php';

export async function fetchArticles(): Promise<Article[]> {
  try {
    const categoryResponse = await fetchJson<ApiCategoryResponse>(CATEGORY_ENDPOINT);
    const categories = (categoryResponse.data ?? []).filter((category) => category.slug);

    const responses = await Promise.allSettled(
      categories.map((category) =>
        fetchJson<ApiListResponse>(
          `${API_ENDPOINT}?category=${encodeURIComponent(category.slug)}&page=1&limit=50`,
        ),
      ),
    );

    const successfulResponses = responses.filter((result) => result.status === 'fulfilled');
    if (categories.length > 0 && successfulResponses.length === 0) {
      throw new Error('Article Read API is unavailable');
    }

    const articles = responses.flatMap((result) =>
      result.status === 'fulfilled' ? (result.value.data ?? []).map(normalizeArticle) : [],
    );

    return deduplicateArticles(articles).sort(sortNewestFirst);
  } catch (error) {
    console.error('Failed to fetch article categories:', error);
    throw error;
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetchJson<ApiDetailResponse>(
      `${API_ENDPOINT}?slug=${encodeURIComponent(slug)}`,
    );

    return response.data ? normalizeArticle(response.data) : null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

export async function fetchRecentArticles(count: number = 3): Promise<Article[]> {
  const articles = await fetchArticles();
  return articles.slice(0, count);
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Article API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function normalizeArticle(article: RawArticle): Article {
  const publishedAt = article.published_at || article.created_at || '';
  const categoryValue = article.category ?? article.categories;
  const category = typeof categoryValue === 'string'
    ? categoryValue
    : categoryValue?.name || categoryValue?.slug || 'Artikel';
  const author = typeof article.author === 'string'
    ? article.author
    : article.author?.name;
  const image = absoluteCmsUrl(article.featured_image_url || article.cover_url || article.image || article.featured_image_path || null);

  return {
    id: String(article.id ?? article.slug ?? ''),
    slug: article.slug ?? '',
    title: article.title ?? '',
    date: formatDate(publishedAt),
    category,
    excerpt: article.excerpt || article.meta_description || '',
    content: article.content || '',
    image,
    cover_url: image,
    author,
    published: article.published ?? true,
    published_at: article.published_at || undefined,
    created_at: article.created_at || undefined,
    updated_at: article.updated_at || undefined,
    canonical_url: article.canonical_url || null,
    robots: article.robots || null,
    og_image_path: absoluteCmsUrl(article.og_image_url || article.og_image_path || null),
    og_image_url: absoluteCmsUrl(article.og_image_url || article.og_image_path || null),
    featured_image_url: image,
    article_tags: (article.article_tags ?? []).flatMap((tag) => {
      if (typeof tag === 'string') return [tag];
      return tag.tags?.name ? [tag.tags.name] : [];
    }),
    addons: article.addons ?? [],
  };
}

function absoluteCmsUrl(path: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `https://cms.carubra.com/${path.replace(/^\//, '')}`;
}

function deduplicateArticles(articles: Article[]): Article[] {
  return [...new Map(articles.filter((article) => article.slug).map((article) => [article.slug, article])).values()];
}

function sortNewestFirst(left: Article, right: Article): number {
  const leftTime = Date.parse(left.published_at || left.created_at || '') || 0;
  const rightTime = Date.parse(right.published_at || right.created_at || '') || 0;
  return rightTime - leftTime;
}

function formatDate(isoDate: string): string {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

