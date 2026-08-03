# Converter untuk mengubah komponen Next.js ke React standar
$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        $modified = $false
        
        # 1. Remove "use client" directive
        if ($content -match '"use client";') {
            $content = $content -replace '(?m)^"use client";\r?\n', ''
            $modified = $true
        }
        
        # 2. Replace Next.js Link import
        if ($content -match 'import Link from "next/link"') {
            $content = $content -replace 'import Link from "next/link";', 'import { Link } from "react-router-dom";'
            $modified = $true
        }
        
        # 3. Replace Next.js Image import (just remove it, we'll use regular img)
        if ($content -match 'import Image from "next/image"') {
            $content = $content -replace 'import Image from "next/image";\r?\n', ''
            $modified = $true
        }
        
        # 4. Replace Google Analytics import
        if ($content -match '@next/third-parties/google') {
            $content = $content -replace 'import \{ sendGAEvent \} from "@next/third-parties/google";\r?\n', ''
            $modified = $true
        }
        
        if ($modified) {
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
            Write-Host "✓ $($file.Name)" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "✗ $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nStep 1 complete: Imports fixed" -ForegroundColor Cyan
