# ============================================================================
# Test Blog Auto-Post API
# ============================================================================
# Script untuk test Edge Function blog-auto-post
# Bisa menggunakan .env file atau hardcoded values
# ============================================================================

# Load environment variables dari .env file jika ada
if (Test-Path ".env") {
    Write-Host "Loading configuration from .env file..." -ForegroundColor Cyan
    Get-Content .env | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            Set-Item -Path "env:$name" -Value $value
        }
    }
    Write-Host "Configuration loaded!" -ForegroundColor Green
    Write-Host ""
}

# Configuration
$apiKey = if ($env:VITE_BLOG_API_KEY) { $env:VITE_BLOG_API_KEY } else { "76fd5b95720c6f4554542e5cf67fde46f69bee3972e8d013db4a644f3dc58b6c" }
$baseUrl = if ($env:VITE_SUPABASE_URL) { $env:VITE_SUPABASE_URL } else { "https://supabase.carubra.com" }
$url = "$baseUrl/functions/v1/blog-auto-post"

# Request headers
$headers = @{
    "x-api-key" = $apiKey
    "Content-Type" = "application/json"
}

# Generate unique slug dengan timestamp
$timestamp = Get-Date -Format 'yyyyMMddHHmmss'

# Request body
$body = @{
    title = "Test Artikel API Key - $timestamp"
    content = @"
<h2>Test Content</h2>
<p>Ini test artikel untuk validasi API key.</p>
<p>Timestamp: $timestamp</p>
<ul>
    <li>Server: Self-hosted Supabase</li>
    <li>Function: blog-auto-post</li>
    <li>Schema: utero-artikel</li>
</ul>
"@
    slug = "test-artikel-api-key-$timestamp"
    excerpt = "Test excerpt untuk artikel validasi API key"
    author = "Test Author"
    category = "Test"
} | ConvertTo-Json

# Display test info
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing Blog Auto-Post API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  URL       : $url" -ForegroundColor White
Write-Host "  API Key   : $($apiKey.Substring(0,20))..." -ForegroundColor White
Write-Host "  Timestamp : $timestamp" -ForegroundColor White
Write-Host ""
Write-Host "Sending request..." -ForegroundColor Yellow
Write-Host ""

try {
    # Send request
    $response = Invoke-RestMethod -Uri $url -Method POST -Headers $headers -Body $body -ContentType "application/json"
    
    # Success response
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Response Data:" -ForegroundColor Yellow
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
    Write-Host ""
    
    if ($response.success -and $response.data) {
        Write-Host "Blog Post Created:" -ForegroundColor Green
        Write-Host "  ID     : $($response.data.id)" -ForegroundColor White
        Write-Host "  Slug   : $($response.data.slug)" -ForegroundColor White
        Write-Host "  URL    : $($response.data.url)" -ForegroundColor White
        Write-Host "  Schema : $($response.data.schema)" -ForegroundColor White
        
        if ($response.data.cover_url) {
            Write-Host "  Cover  : $($response.data.cover_url)" -ForegroundColor White
        }
    }
    
} catch {
    # Error response
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERROR!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "Status Code: $statusCode" -ForegroundColor Red
    Write-Host "Error Message: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    
    # Try to read response body
    if ($_.Exception.Response) {
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            $reader.Close()
            
            Write-Host "Response Body:" -ForegroundColor Yellow
            
            # Try to parse as JSON
            try {
                $errorData = $responseBody | ConvertFrom-Json
                $errorData | ConvertTo-Json -Depth 10 | Write-Host
                
                # Display specific error
                if ($errorData.error) {
                    Write-Host ""
                    Write-Host "Error Details:" -ForegroundColor Red
                    Write-Host "  $($errorData.error)" -ForegroundColor White
                }
            } catch {
                # Not JSON, display as text
                Write-Host $responseBody
            }
        } catch {
            Write-Host "Could not read response body" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "Common Issues:" -ForegroundColor Yellow
    
    if ($statusCode -eq 401) {
        Write-Host "  - Invalid API key" -ForegroundColor White
        Write-Host "  - Check BLOG_API_KEY in .env" -ForegroundColor White
        Write-Host "  - Verify API key in server: volumes/functions/.env" -ForegroundColor White
    } elseif ($statusCode -eq 500) {
        Write-Host "  - Server configuration error" -ForegroundColor White
        Write-Host "  - Check Edge Functions logs: docker-compose logs edge-functions" -ForegroundColor White
        Write-Host "  - Verify BLOG_API_KEY is set on server" -ForegroundColor White
    } elseif ($statusCode -eq 404) {
        Write-Host "  - Function not found or not deployed" -ForegroundColor White
        Write-Host "  - Run: .\deploy-function.ps1" -ForegroundColor White
    } elseif ($statusCode -eq 409) {
        Write-Host "  - Duplicate slug" -ForegroundColor White
        Write-Host "  - Slug already exists in database" -ForegroundColor White
    }
    
    Write-Host ""
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Completed" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
