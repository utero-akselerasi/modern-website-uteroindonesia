# Replace Image with img and Link href with to
$problemFiles = @(
    "src\components\layout\Footer.tsx",
    "src\components\sections\CBP.tsx",
    "src\components\sections\Community.tsx",
    "src\components\sections\Download.tsx",
    "src\components\sections\KnowUsMore.tsx",
    "src\components\sections\Partners.tsx",
    "src\components\sections\Divisions.tsx"
)

foreach ($file in $problemFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Replace Image import and usage
        $content = $content -replace 'import \{ Image, ([^}]+) \} from "@/compat/next";', 'import { $1 } from "@/compat/next";'
        $content = $content -replace 'import \{ Image \} from "@/compat/next";', ''
        $content = $content -replace '<Image\s', '<img '
        
        # Replace Link href with to  
        $content = $content -replace '(<Link[^>]*)\shref=', '$1 to='
        
        # Add sendGAEvent import if missing
        if ($content -match 'sendGAEvent\(' -and $content -notmatch 'import.*sendGAEvent') {
            $content = $content -replace '(import \{ Link \} from "react-router-dom";)', '$1\nimport { sendGAEvent } from "@/compat/next";'
        }
        
        [System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "✓ Fixed: $file" -ForegroundColor Green
    }
}

Write-Host "`nAll fixes applied" -ForegroundColor Cyan
