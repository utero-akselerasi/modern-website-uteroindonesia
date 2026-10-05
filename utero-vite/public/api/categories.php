<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=300');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    respond(405, ['error' => ['code' => 'METHOD_NOT_ALLOWED', 'message' => 'Only GET requests are allowed.']]);
}

$config = loadConfig();
$categories = $config['categories'] ?? [];

if (!is_array($categories) || count($categories) === 0) {
    respond(500, ['error' => ['code' => 'SERVER_CONFIGURATION_ERROR', 'message' => 'Article categories are not configured.']]);
}

$data = [];
foreach ($categories as $category) {
    if (is_string($category)) {
        $slug = trim($category);
        $name = ucwords(str_replace('-', ' ', $slug));
    } elseif (is_array($category)) {
        $slug = trim((string) ($category['slug'] ?? ''));
        $name = trim((string) ($category['name'] ?? ucwords(str_replace('-', ' ', $slug))));
    } else {
        continue;
    }

    if (preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) {
        $data[] = ['name' => $name, 'slug' => $slug];
    }
}

if (count($data) === 0) {
    respond(500, ['error' => ['code' => 'SERVER_CONFIGURATION_ERROR', 'message' => 'No valid article categories are configured.']]);
}

respond(200, ['data' => $data]);

function loadConfig(): array
{
    $categorySlugs = array_filter(array_map('trim', explode(',', getenv('ARTIKEL_API_CATEGORIES') ?: '')));
    $config = ['categories' => array_map(
        static fn (string $slug): array => [
            'name' => ucwords(str_replace('-', ' ', $slug)),
            'slug' => $slug,
        ],
        $categorySlugs
    )];
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

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
