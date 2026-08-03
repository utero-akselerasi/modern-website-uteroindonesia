# Remove duplicate nested folders and fix style jsx
$duplicatePaths = @(
    "src\components\layout\layout",
    "src\components\sections\sections"
)

foreach ($path in $duplicatePaths) {
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force
        Write-Host "Removed: $path" -ForegroundColor Red
    }
}

# Fix <style jsx> to <style>
$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match '<style jsx') {
        $content = $content -replace '<style jsx[^>]*>', '<style>'
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "Fixed style jsx: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nCleanup complete" -ForegroundColor Cyan
