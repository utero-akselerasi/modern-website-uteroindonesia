$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"
foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  $original = $content
  
  # Remove @next/third-parties
  $content = $content -replace 'import \{ sendGAEvent \} from "@next/third-parties/google";', ''
  $content = $content -replace 'sendGAEvent\([^)]+\);?', ''
  
  if ($content -ne $original) {
    [System.IO.File]::WriteAllText($file.FullName, $content)
    Write-Host "Updated: $($file.Name)" -ForegroundColor Green
  }
}
Write-Host "`nDone removing Next.js dependencies!" -ForegroundColor Cyan
