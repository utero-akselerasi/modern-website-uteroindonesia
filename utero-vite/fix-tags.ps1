$files = Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx"
foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  $original = $content
  
  # Replace Link href to "to"
  $content = $content -replace '<Link\s+href=', '<Link to='
  
  # Replace Image with img tags (simple replacement)
  $content = $content -replace '<Image\s+', '<img '
  $content = $content -replace '\s+width=\{[^\}]+\}', ''
  $content = $content -replace '\s+height=\{[^\}]+\}', ''
  $content = $content -replace '\s+priority\s*', ''
  $content = $content -replace '\s+quality=\{[^\}]+\}', ''
  $content = $content -replace '\s+loading="eager"', ''
  $content = $content -replace '\s+placeholder="[^"]*"', ''
  $content = $content -replace '\s+blurDataURL="[^"]*"', ''
  
  if ($content -ne $original) {
    [System.IO.File]::WriteAllText($file.FullName, $content)
    Write-Host "Updated: $($file.Name)" -ForegroundColor Green
  }
}
Write-Host "`nDone fixing Image and Link tags!" -ForegroundColor Cyan
