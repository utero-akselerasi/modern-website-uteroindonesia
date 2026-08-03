# Safe converter - only fix imports, no JSX manipulation
$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $lines = Get-Content $file.FullName
    $newLines = @()
    
    foreach ($line in $lines) {
        # Skip "use client"
        if ($line -eq '"use client";') {
            continue
        }
        
        # Replace imports only
        if ($line -match '^import Link from "next/link"') {
            $newLines += 'import { Link } from "react-router-dom";'
        }
        elseif ($line -match '^import Image from "next/image"') {
            # Skip this line
            continue
        }
        elseif ($line -match '^import \{ sendGAEvent \} from "@next/third-parties/google"') {
            # Skip this line
            continue
        }
        else {
            $newLines += $line
        }
    }
    
    $newLines | Set-Content $file.FullName -Encoding UTF8
    Write-Host "✓ $($file.Name)" -ForegroundColor Green
}

Write-Host "`nSafe conversion complete" -ForegroundColor Cyan
