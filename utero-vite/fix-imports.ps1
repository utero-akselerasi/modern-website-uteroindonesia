# Fix missing imports
$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $hasGAEvent = $content -match 'sendGAEvent\('
    $hasImportFromCompat = $content -match 'from "@/compat/next"'
    
    if ($hasGAEvent -and -not $hasImportFromCompat) {
        # Add sendGAEvent import
        $lines = Get-Content $file.FullName
        $newLines = @()
        $importAdded = $false
        
        foreach ($line in $lines) {
            if (-not $importAdded -and $line -match '^import .*from.*react' -and $line -notmatch '@/compat') {
                $newLines += $line
                $newLines += 'import { sendGAEvent } from "@/compat/next";'
                $importAdded = $true
            } else {
                $newLines += $line
            }
        }
        
        $newLines | Set-Content $file.FullName -Encoding UTF8
        Write-Host "✓ Added import to: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nImports fixed" -ForegroundColor Cyan
