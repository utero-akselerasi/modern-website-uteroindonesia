import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';


function articleApiDevProxy(env: Record<string, string>): Plugin {
  const apiBaseUrl = (env.ARTIKEL_API_URL || 'https://cms.carubra.com/api/v1').replace(/\/$/, '');
  const apiKey = env.ARTIKEL_API_KEY;
  const categories = (env.ARTIKEL_API_CATEGORIES || 'news').split(',').map((slug) => ({
    name: slug.trim().replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    slug: slug.trim(),
  })).filter((category) => category.slug);

  return {
    name: 'article-api-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/categories.php', (_request, response) => {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.end(JSON.stringify({ data: categories }));
      });
      server.middlewares.use('/api/articles.php', async (request, response) => {
        if (!apiKey) {
          response.statusCode = 500;
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(JSON.stringify({ error: { code: 'SERVER_CONFIGURATION_ERROR', message: 'ARTIKEL_API_KEY is not configured for local development.' } }));
          return;
        }
        const requestUrl = new URL(request.url || '/', 'http://localhost');
        const slug = requestUrl.searchParams.get('slug');
        const upstreamUrl = slug ? apiBaseUrl + '/articles/' + encodeURIComponent(slug) : apiBaseUrl + '/articles?' + requestUrl.searchParams.toString();
        try {
          const upstreamResponse = await fetch(upstreamUrl, { headers: { Accept: 'application/json', 'x-artikel-key': apiKey } });
          response.statusCode = upstreamResponse.status;
          response.setHeader('Content-Type', upstreamResponse.headers.get('content-type') || 'application/json; charset=utf-8');
          response.end(await upstreamResponse.text());
        } catch {
          response.statusCode = 502;
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(JSON.stringify({ error: { code: 'UPSTREAM_ERROR', message: 'Article service is temporarily unavailable.' } }));
        }
      });
    },
  };
}


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
  plugins: [react(), tailwindcss(), articleApiDevProxy(env)],
  css: {
    transformer: 'postcss',
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation';
            }
            if (id.includes('react-helmet-async')) {
              return 'helmet';
            }
          }
        },
      },
    },
  },
  server: {
    port: 3002,
    open: true,
  },
  };
});
