<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    respond(405, ['error' => ['code' => 'METHOD_NOT_ALLOWED', 'message' => 'Only GET requests are allowed.']]);
}

$config = loadConfig();
$apiBaseUrl = normalizeApiBaseUrl((string) ($config['api_url'] ?? 'https://cms.carubra.com/api/v1'));
$apiKey = (string) ($config['api_key'] ?? '');

if ($apiKey === '') {
    respond(500, ['error' => ['code' => 'SERVER_CONFIGURATION_ERROR', 'message' => 'Article API key is not configured.']]);
}

$slug = trim((string) ($_GET['slug'] ?? ''));
$category = trim((string) ($_GET['category'] ?? ''));
$page = filterPositiveInteger($_GET['page'] ?? null, 0);
$limit = filterPositiveInteger($_GET['limit'] ?? null, 0);

if ($slug !== '') {
    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) {
        respond(400, ['error' => ['code' => 'INVALID_REQUEST', 'message' => 'Invalid article slug.']]);
    }

    $upstreamUrl = $apiBaseUrl . '/articles/' . rawurlencode($slug);
} else {
    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $category) || $page < 1 || $limit < 1 || $limit > 50) {
        respond(400, ['error' => ['code' => 'INVALID_REQUEST', 'message' => 'Category, page, and limit are required. Limit maximum is 50.']]);
    }

    $upstreamUrl = $apiBaseUrl . '/articles?' . http_build_query([
        'category' => $category,
        'page' => $page,
        'limit' => $limit,
    ]);
}

$cacheKey = hash('sha256', $upstreamUrl);
$cacheFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'utero-articles-' . $cacheKey . '.json';
$cacheTtl = max(0, (int) ($config['cache_ttl'] ?? 60));

if ($cacheTtl > 0 && is_file($cacheFile) && filemtime($cacheFile) !== false && filemtime($cacheFile) + $cacheTtl > time()) {
    header('Cache-Control: public, max-age=' . $cacheTtl . ', stale-while-revalidate=300');
    header('X-Article-Cache: HIT');
    readfile($cacheFile);
    exit;
}

$rateLimitHeaders = [];
$curl = curl_init($upstreamUrl);
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'X-Artikel-Key: ' . $apiKey,
    ],
    CURLOPT_HEADERFUNCTION => function ($curlHandle, string $headerLine) use (&$rateLimitHeaders): int {
        $length = strlen($headerLine);
        $parts = explode(':', $headerLine, 2);
        if (count($parts) !== 2) {
            return $length;
        }

        $name = strtolower(trim($parts[0]));
        $allowed = ['x-ratelimit-limit', 'x-ratelimit-remaining', 'x-ratelimit-reset', 'retry-after'];
        if (in_array($name, $allowed, true)) {
            $rateLimitHeaders[$name] = trim($parts[1]);
        }

        return $length;
    },
]);

$body = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlError = curl_error($curl);
curl_close($curl);

if ($body === false || $curlError !== '') {
    respond(502, ['error' => ['code' => 'UPSTREAM_ERROR', 'message' => 'Article service is temporarily unavailable.']]);
}

forwardRateLimitHeaders($rateLimitHeaders);

if ($status >= 200 && $status < 300) {
    if ($cacheTtl > 0) {
        file_put_contents($cacheFile, $body, LOCK_EX);
    }
    header('Cache-Control: public, max-age=' . $cacheTtl . ', stale-while-revalidate=300');
    header('X-Article-Cache: MISS');
} else {
    header('Cache-Control: no-store');
}

http_response_code($status > 0 ? $status : 502);
echo $body;

function loadConfig(): array
{
    $config = [
        'api_url' => getenv('ARTIKEL_API_URL') ?: 'https://cms.carubra.com/api/v1',
        'api_key' => getenv('ARTIKEL_API_KEY') ?: '',
        'cache_ttl' => 60,
    ];

    $documentRoot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), DIRECTORY_SEPARATOR);
    $configFile = $documentRoot !== ''
        ? dirname($documentRoot) . DIRECTORY_SEPARATOR . 'artikel-api-config.php'
        : '';

    if ($configFile !== '' && is_file($configFile)) {
        $fileConfig = require $configFile;
        if (is_array($fileConfig)) {
            $config = array_merge($config, $fileConfig);
        }
    }

    return $config;
}

function normalizeApiBaseUrl(string $apiUrl): string
{
    $apiUrl = rtrim($apiUrl, '/');
    if (substr($apiUrl, -7) === '/api/v1') {
        return $apiUrl;
    }

    return $apiUrl . '/api/v1';
}

function filterPositiveInteger($value, int $default): int
{
    $filtered = filter_var($value, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    return $filtered === false ? $default : (int) $filtered;
}

function forwardRateLimitHeaders(array $headers): void
{
    $outputNames = [
        'x-ratelimit-limit' => 'X-RateLimit-Limit',
        'x-ratelimit-remaining' => 'X-RateLimit-Remaining',
        'x-ratelimit-reset' => 'X-RateLimit-Reset',
        'retry-after' => 'Retry-After',
    ];

    foreach ($outputNames as $sourceName => $outputName) {
        if (isset($headers[$sourceName])) {
            header($outputName . ': ' . $headers[$sourceName]);
        }
    }
}

function respond(int $status, array $payload): void
{
    http_response_code($status);
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
