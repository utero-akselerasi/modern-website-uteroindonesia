# Step 2: Convert JSX tags
$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        $modified = $false
        
        # Replace Link href with Link to
        if ($content -match '<Link\s+href=') {
            $content = $content -replace '<Link\s+href=', '<Link to='
            $modified = $true
        }
        
        # Replace Image with img (simple cases only)
        if ($content -match '<Image\s') {
            $content = $content -replace '<Image\s', '<img '
            $modified = $true
        }
        
        # Remove Next.js specific Image props
        if ($content -match '\s+(priority|loading="eager"|quality=\{)') {
            $content = $content -replace '\s+priority\s*', ' '
            $content = $content -replace '\s+loading="eager"\s*', ' '
            $content = $content -replace '\s+quality=\{\d+\}\s*', ' '
            $content = $content -replace '\s+placeholder="[^"]*"\s*', ' '
            $content = $content -replace '\s+blurDataURL="[^"]*"\s*', ' '
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

Write-Host "`nStep 2 complete: JSX tags converted" -ForegroundColor Cyan
