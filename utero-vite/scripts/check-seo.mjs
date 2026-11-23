import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const slug = url.pathname.split('/').pop();
  response.setHeader('Content-Type', 'application/json');
  if (slug === 'articles' && url.searchParams.get('category') === 'artikel') {
    response.end(JSON.stringify({ data: [
      { slug: 'test-article', title: 'Judul & Uji' },
      { slug: 'hidden-article', published: false },
      { slug: 'private-article', robots: 'noindex,follow' },
    ] }));
  } else if (slug === 'test-article') {
    response.end(JSON.stringify({ data: { slug, title: 'Judul & Uji', excerpt: 'Deskripsi & uji', cover_url: '/uploads/cover.webp' } }));
  } else {
    response.statusCode = 404;
    response.end('{}');
  }
});

async function runPhp(script, port) {
  const args = [
    'run', '--rm',
    '-e', 'ARTIKEL_API_URL=http://host.docker.internal:' + port + '/api/v1',
    '-e', 'ARTIKEL_API_KEY=test-key',
    '-e', 'ARTIKEL_API_CATEGORIES=artikel',
    '-v', path.join(root, 'public/api') + ':/var/www/html/api:ro',
    '-v', path.join(root, 'dist/index.html') + ':/var/www/html/index.html:ro',
    'php:8.3-fpm-alpine', 'php', '-r', script,
  ];
  return new Promise((resolve, reject) => {
    const child = spawn('docker', args);
    let output = '';
    let error = '';
    child.stdout.on('data', (data) => { output += data; });
    child.stderr.on('data', (data) => { error += data; });
    child.on('error', reject);
    child.on('close', (code) => code === 0 ? resolve(output) : reject(new Error(error)));
  });
}

try {
  await new Promise((resolve) => server.listen(0, '0.0.0.0', resolve));
  const port = server.address().port;
  const sitemap = await runPhp('include "/var/www/html/api/sitemap.php";', port);
  assert.equal((sitemap.match(/<loc>https:\/\/uteroindonesia.com\/artikel\/test-article<\/loc>/g) || []).length, 1, sitemap);
  assert.doesNotMatch(sitemap, /hidden-article|private-article/);
  const page = await runPhp('$_GET["slug"]="test-article"; include "/var/www/html/api/article-page.php";', port);
  assert.match(page, /<title data-rh="true">Judul &amp; Uji \| Utero Indonesia<\/title>/);
  assert.match(page, /<meta data-rh="true" property="og:image" content="https:\/\/cms.carubra.com\/uploads\/cover.webp">/);
  assert.equal((page.match(/rel="canonical"/g) || []).length, 1);
  const listPage = await runPhp('include "/var/www/html/api/article-page.php";', port);
  assert.match(listPage, /<title data-rh="true">Artikel \| Utero Indonesia/);
  assert.match(listPage, /rel="canonical" href="https:\/\/uteroindonesia.com\/artikel"/);
  console.log('SEO checks passed');
} finally {
  server.close();
}
