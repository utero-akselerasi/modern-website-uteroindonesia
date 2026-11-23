param(
    [string]$EnvFile = (Join-Path $PSScriptRoot '..\.env')
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $EnvFile)) {
    throw "File konfigurasi tidak ditemukan: $EnvFile"
}

$settings = @{}
foreach ($line in Get-Content -LiteralPath $EnvFile) {
    if ($line -match '^\s*(ARTIKEL_API_KEY|ARTIKEL_API_URL)\s*=\s*(.*?)\s*$') {
        $settings[$Matches[1]] = $Matches[2].Trim('"', "'")
    }
}

if (-not $settings['ARTIKEL_API_KEY']) {
    throw 'ARTIKEL_API_KEY belum diisi dalam .env.'
}

$baseUrl = if ($settings['ARTIKEL_API_URL']) { $settings['ARTIKEL_API_URL'].TrimEnd('/') } else { 'https://cms.carubra.com/api/v1' }
if (-not $baseUrl.EndsWith('/api/v1')) {
    $baseUrl += '/api/v1'
}

$uri = "$baseUrl/articles?category=tips&page=1&limit=1"
$response = Invoke-WebRequest -Uri $uri -Headers @{ 'X-Artikel-Key' = $settings['ARTIKEL_API_KEY']; Accept = 'application/json' } -SkipHttpErrorCheck

if ($response.StatusCode -ne 200) {
    $errorCode = try { ($response.Content | ConvertFrom-Json).error.code } catch { $null }
    if ($response.StatusCode -eq 401 -and $errorCode -eq 'INVALID_API_KEY') {
        throw 'CMS menolak ARTIKEL_API_KEY (INVALID_API_KEY). Terbitkan kunci baca website baru di CMS Artikel, perbarui .env, lalu ulangi pemeriksaan.'
    }
    throw "Pemeriksaan API artikel gagal (HTTP $($response.StatusCode), kode: $errorCode)."
}

Write-Output 'Kunci baca CMS Artikel valid (HTTP 200).'
