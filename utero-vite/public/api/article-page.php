<?php

declare(strict_types=1);

$template = file_get_contents(__DIR__ . '/../index.html');
if ($template === false) {
    http_response_code(500);
    exit;
}

$slug = trim((string) ($_GET['slug'] ?? ''));
if ($slug !== '' && !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) {
    outputErrorPage($template, 404);
}

if ($slug === '') {
    $article = [
        'title' => 'Artikel | Utero Indonesia - Creative Agency & Brand Consultant Malang',
        'excerpt' => 'Baca artikel terbaru seputar branding, desain, digital marketing, dan tips kreatif dari PT. Utero Kreatif Indonesia.',
    ];
} else {
    $apiKey = getenv('ARTIKEL_API_KEY') ?: '';
    if ($apiKey === '') {
        outputErrorPage($template, 503);
    }

    $apiBaseUrl = rtrim(getenv('ARTIKEL_API_URL') ?: 'https://cms.carubra.com/api/v1', '/');
    if (!str_ends_with($apiBaseUrl, '/api/v1')) $apiBaseUrl .= '/api/v1';

    $curl = curl_init($apiBaseUrl . '/articles/' . rawurlencode($slug));
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

    if ($status === 404) {
        outputErrorPage($template, 404);
    }
    if (!is_string($body) || $status < 200 || $status >= 300) {
        outputErrorPage($template, 503);
    }

    $payload = json_decode($body, true);
    $article = $payload['data'] ?? null;
    if (!is_array($article) || ($article['published'] ?? true) === false) {
        outputErrorPage($template, 404);
    }
}

$canonical = 'https://uteroindonesia.com/artikel' . ($slug === '' ? '' : '/' . rawurlencode($slug));
$title = trim((string) ($article['title'] ?? ''));
$description = trim((string) ($article['excerpt'] ?? $article['meta_description'] ?? ''));
$image = trim((string) ($article['og_image_url'] ?? $article['featured_image_url'] ?? $article['cover_url'] ?? ''));
if ($image === '') $image = 'https://uteroindonesia.com/images/logo-utero-transparent.webp';
if (!preg_match('~^https?://~i', $image)) $image = 'https://cms.carubra.com/' . ltrim($image, '/');
$robots = trim((string) ($article['robots'] ?? 'index,follow,max-image-preview:large'));
$fullTitle = $slug === '' ? $title : $title . ' | Utero Indonesia';

if ($title === '') {
    outputErrorPage($template, 404);
}

$tags = [
    '<title>' . escape($fullTitle) . '</title>',
    '<meta name="description" content="' . escape($description) . '">',
    '<meta name="robots" content="' . escape($robots) . '">',
    '<link rel="canonical" href="' . escape($canonical) . '">',
    '<meta property="og:type" content="' . ($slug === '' ? 'website' : 'article') . '">',
    '<meta property="og:url" content="' . escape($canonical) . '">',
    '<meta property="og:title" content="' . escape($title) . '">',
    '<meta property="og:description" content="' . escape($description) . '">',
    '<meta property="og:image" content="' . escape($image) . '">',
    '<meta property="og:site_name" content="Utero Indonesia">',
    '<meta property="og:locale" content="id_ID">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' . escape($title) . '">',
    '<meta name="twitter:description" content="' . escape($description) . '">',
    '<meta name="twitter:image" content="' . escape($image) . '">',
];

$template = preg_replace('~<title\b[^>]*>.*?</title>~is', '', $template, 1);
$template = preg_replace('~<meta\b[^>]*\bname=["\'](?:description|robots)["\'][^>]*>~i', '', $template);
$template = preg_replace('~<meta\b[^>]*\b(?:property=["\']og:[^"\']+["\']|name=["\']twitter:[^"\']+["\'])[^>]*>~i', '', $template);
$template = preg_replace('~<link\b[^>]*\brel=["\']canonical["\'][^>]*>~i', '', $template);
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: public, max-age=300');
echo str_replace('</head>', implode("\n    ", array_map(
    static fn (string $tag): string => preg_replace('/^<([a-z]+)/', '<$1 data-rh="true"', $tag),
    $tags
)) . "\n  </head>", $template);

function escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function outputErrorPage(string $template, int $status): never
{
    $template = preg_replace('~<meta\b[^>]*\bname=["\']robots["\'][^>]*>~i', '', $template);
    $template = str_replace('</head>', '<meta data-rh="true" name="robots" content="noindex,nofollow">' . PHP_EOL . '  </head>', $template);
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store');
    echo $template;
    exit;
}
