# Add missing sendGAEvent imports
$files = @(
    "src\components\sections\Community.tsx",
    "src\components\sections\Divisions.tsx",
    "src\components\sections\Download.tsx",
    "src\components\sections\Partners.tsx"
)

foreach ($file in $files) {
    $lines = Get-Content $file
    $newLines = @()
    $importAdded = $false
    
    foreach ($line in $lines) {
        if (-not $importAdded -and $line -match '^import.*motion.*framer-motion') {
            $newLines += $line
            $newLines += 'import { sendGAEvent } from "@/compat/next";'
            $importAdded = $true
        } else {
            $newLines += $line
        }
    }
    
    $newLines | Set-Content $file -Encoding UTF8
    Write-Host "✓ Added import to: $file" -ForegroundColor Green
}

Write-Host "`nImports added" -ForegroundColor Cyan
