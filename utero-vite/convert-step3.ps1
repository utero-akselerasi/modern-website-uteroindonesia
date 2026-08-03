# Step 3: Remove GA events and cleanup
$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        $modified = $false
        
        # Remove sendGAEvent calls
        if ($content -match 'sendGAEvent') {
            # Remove entire onClick with sendGAEvent
            $content = $content -replace 'onClick=\{\(\) => sendGAEvent\([^)]+\)\}\s*', ''
            # Remove standalone sendGAEvent calls
            $content = $content -replace '\s*sendGAEvent\([^)]+\);\s*', ''
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

Write-Host "`nStep 3 complete: GA events removed" -ForegroundColor Cyan
