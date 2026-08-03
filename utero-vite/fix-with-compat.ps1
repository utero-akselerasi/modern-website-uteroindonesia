# Replace Next.js imports with compat layer
$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $lines = Get-Content $file.FullName
    $newLines = @()
    $hasNextLink = $false
    $hasNextImage = $false
    $hasGAEvent = $false
    
    foreach ($line in $lines) {
        # Skip "use client"
        if ($line -eq '"use client";') {
            continue
        }
        
        # Detect Next.js imports
        if ($line -match '^import Link from "next/link"') {
            $hasNextLink = $true
            continue
        }
        elseif ($line -match '^import Image from "next/image"') {
            $hasNextImage = $true
            continue
        }
        elseif ($line -match '^import \{ sendGAEvent \} from "@next/third-parties/google"') {
            $hasGAEvent = $true
            continue
        }
        else {
            $newLines += $line
        }
    }
    
    # Add compat imports at the beginning (after other imports)
    if ($hasNextLink -or $hasNextImage -or $hasGAEvent) {
        $importLine = "import { "
        $imports = @()
        if ($hasNextLink) { $imports += "Link" }
        if ($hasNextImage) { $imports += "Image" }
        if ($hasGAEvent) { $imports += "sendGAEvent" }
        $importLine += ($imports -join ", ") + ' } from "@/compat/next";'
        
        # Find where to insert (after last import)
        $lastImportIdx = -1
        for ($i = 0; $i -lt $newLines.Count; $i++) {
            if ($newLines[$i] -match '^import ') {
                $lastImportIdx = $i
            }
        }
        
        if ($lastImportIdx -ge 0) {
            $newLines = $newLines[0..$lastImportIdx] + $importLine + $newLines[($lastImportIdx+1)..($newLines.Count-1)]
        }
    }
    
    $newLines | Set-Content $file.FullName -Encoding UTF8
    Write-Host "✓ $($file.Name)" -ForegroundColor Green
}

Write-Host "`nCompatibility layer applied" -ForegroundColor Cyan
