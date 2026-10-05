# ============================================================================
# Deploy Supabase Edge Function to Self-Hosted Instance
# ============================================================================
# Script untuk deploy function blog-auto-post ke self-hosted Supabase
# 
# Usage:
#   .\deploy-function.ps1
#
# Prerequisites:
#   - SSH access ke server Supabase
#   - SSH key sudah di-setup
#   - Path ke Supabase instance di server
# ============================================================================

param(
    [string]$ServerUser = "maskhar",
    [string]$ServerHost = "supabase-server",
    [string]$ServerPath = "~/docker/supabase/supabase-1.26.05/docker/volumes/functions",
    [string]$FunctionName = "blog-auto-post"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deploy Supabase Edge Function" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if function exists locally
if (-not (Test-Path ".\supabase\functions\$FunctionName")) {
    Write-Host "Error: Function '$FunctionName' not found in .\supabase\functions\" -ForegroundColor Red
    exit 1
}

Write-Host "[1/4] Checking local function..." -ForegroundColor Yellow
Write-Host "Function: $FunctionName" -ForegroundColor Green
Write-Host "Path: .\supabase\functions\$FunctionName" -ForegroundColor Green
Write-Host ""

# Create temporary zip for transfer
Write-Host "[2/4] Creating archive..." -ForegroundColor Yellow
$tempZip = "$env:TEMP\$FunctionName-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip"
Compress-Archive -Path ".\supabase\functions\$FunctionName\*" -DestinationPath $tempZip -Force
Write-Host "Archive created: $tempZip" -ForegroundColor Green
Write-Host ""

# Upload to server
Write-Host "[3/4] Uploading to server..." -ForegroundColor Yellow
Write-Host "Server: $ServerUser@$ServerHost" -ForegroundColor Green

try {
    # Upload zip file
    scp $tempZip "${ServerUser}@${ServerHost}:/tmp/$FunctionName.zip"
    
    # Extract and deploy on server
    $sshCommand = @"
cd $ServerPath
rm -rf $FunctionName
unzip -o /tmp/$FunctionName.zip -d $FunctionName
rm /tmp/$FunctionName.zip
echo 'Function deployed successfully!'
"@
    
    ssh "${ServerUser}@${ServerHost}" $sshCommand
    
    Write-Host "Upload completed!" -ForegroundColor Green
    Write-Host ""
    
    # Cleanup local temp file
    Remove-Item $tempZip -Force
    
    Write-Host "[4/4] Restarting Edge Functions service..." -ForegroundColor Yellow
    $restartCommand = @"
cd ~/docker/supabase/supabase-1.26.05/docker
docker-compose restart edge-functions
"@
    
    ssh "${ServerUser}@${ServerHost}" $restartCommand
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Deployment Successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Function URL: https://your-supabase-domain.com/functions/v1/$FunctionName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Set BLOG_API_KEY in volumes/functions/.env" -ForegroundColor White
    Write-Host "2. Test the function with test-api-key.ps1" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Error during deployment: $_" -ForegroundColor Red
    
    # Cleanup temp file if exists
    if (Test-Path $tempZip) {
        Remove-Item $tempZip -Force
    }
    
    exit 1
}
