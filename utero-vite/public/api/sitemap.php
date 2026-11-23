<?php

declare(strict_types=1);

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    exit;
}

$cacheFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'utero-sitemap.xml';
$cacheTtl = 900;

if (is_file($cacheFile) && filemtime($cacheFile) !== false && filemtime($cacheFile) + $cacheTtl > time()) {
    outputSitemap((string) file_get_contents($cacheFile), 'HIT');
}

$apiKey = getenv('ARTIKEL_API_KEY') ?: '';
$apiBaseUrl = normalizeApiBaseUrl(getenv('ARTIKEL_API_URL') ?: 'https://cms.carubra.com/api/v1');
$categories = array_values(array_filter(array_map(
    'trim',
    explode(',', getenv('ARTIKEL_API_CATEGORIES') ?: 'profil,layanan,portofolio,kesehatan,tips,artikel,teknologi')
)));
$urls = [
    ['loc' => 'https://uteroindonesia.com/', 'changefreq' => 'monthly', 'priority' => '1.0'],
    ['loc' => 'https://uteroindonesia.com/artikel', 'changefreq' => 'weekly', 'priority' => '0.8'],
];
$articles = [];
$failed = $apiKey === '';

foreach ($categories as $category) {
    // ponytail: 5,000 articles per category; switch to sitemap indexes when that limit is reached.
    for ($page = 1; !$failed && $page <= 100; $page++) {
        $payload = fetchJson($apiBaseUrl . '/articles?' . http_build_query([
            'category' => $category,
            'page' => $page,
            'limit' => 50,
        ]), $apiKey);

        if ($payload === null || !is_array($payload['data'] ?? null)) {
            $failed = true;
            break;
        }

        $items = $payload['data'];
        foreach ($items as $article) {
            $slug = is_array($article) ? trim((string) ($article['slug'] ?? '')) : '';
            if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) continue;
            if (($article['published'] ?? true) === false || preg_match('/noindex/i', (string) ($article['robots'] ?? ''))) continue;

            $date = (string) ($article['updated_at'] ?? $article['published_at'] ?? '');
            $timestamp = $date !== '' ? strtotime($date) : false;
            $articles[$slug] = [
                'loc' => 'https://uteroindonesia.com/artikel/' . rawurlencode($slug),
                'lastmod' => $timestamp === false ? null : gmdate('Y-m-d', $timestamp),
                'changefreq' => 'monthly',
                'priority' => '0.7',
            ];
        }

        $total = max(0, (int) ($payload['meta']['total'] ?? 0));
        if (count($items) < 50 || ($total > 0 && $page * 50 >= $total)) break;
    }
}

if ($failed && is_file($cacheFile)) {
    outputSitemap((string) file_get_contents($cacheFile), 'STALE');
}

if (!$failed) $urls = array_merge($urls, array_values($articles));

$xml = buildSitemap($urls);
if (!$failed) file_put_contents($cacheFile, $xml, LOCK_EX);
if ($failed) http_response_code(503);
outputSitemap($xml, $failed ? 'FALLBACK' : 'MISS');

function fetchJson(string $url, string $apiKey): ?array
{
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_HTTPHEADER => ['Accept: application/json', 'X-Artikel-Key: ' . $apiKey],
    ]);
    $body = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if (!is_string($body) || $status < 200 || $status >= 300) return null;
    $payload = json_decode($body, true);
    return is_array($payload) ? $payload : null;
}

function buildSitemap(array $urls): string
{
    $lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
    foreach ($urls as $url) {
        $lines[] = '  <url>';
        $lines[] = '    <loc>' . xmlEscape((string) $url['loc']) . '</loc>';
        if (!empty($url['lastmod'])) $lines[] = '    <lastmod>' . xmlEscape((string) $url['lastmod']) . '</lastmod>';
        $lines[] = '    <changefreq>' . xmlEscape((string) $url['changefreq']) . '</changefreq>';
        $lines[] = '    <priority>' . xmlEscape((string) $url['priority']) . '</priority>';
        $lines[] = '  </url>';
    }
    $lines[] = '</urlset>';
    return implode(PHP_EOL, $lines) . PHP_EOL;
}

function xmlEscape(string $value): string
{
    return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
}

function normalizeApiBaseUrl(string $url): string
{
    $url = rtrim($url, '/');
    return str_ends_with($url, '/api/v1') ? $url : $url . '/api/v1';
}

function outputSitemap(string $xml, string $cacheStatus): never
{
    header('Content-Type: application/xml; charset=utf-8');
    header('Cache-Control: public, max-age=900, stale-if-error=86400');
    header('X-Sitemap-Cache: ' . $cacheStatus);
    echo $xml;
    exit;
}
