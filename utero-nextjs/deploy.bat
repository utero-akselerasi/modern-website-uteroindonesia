@echo off
REM Deploy script for cPanel (Windows version)
REM Usage: deploy.bat

echo 🚀 Starting deployment process...

REM 1. Install dependencies
echo 📦 Installing dependencies...
call pnpm install

REM 2. Build project
echo 🔨 Building Next.js project...
call pnpm build

if %errorlevel% neq 0 (
  echo ❌ Build failed! Please fix errors and try again.
  exit /b 1
)

echo ✅ Build successful!

REM 3. Create deployment package
echo 📦 Creating deployment package...

REM Create temporary directory
if exist deploy-temp rmdir /s /q deploy-temp
mkdir deploy-temp

REM Copy necessary files
xcopy /E /I /Y .next deploy-temp\.next
xcopy /E /I /Y public deploy-temp\public
xcopy /E /I /Y src deploy-temp\src
copy /Y package.json deploy-temp\
copy /Y pnpm-lock.yaml deploy-temp\
copy /Y next.config.ts deploy-temp\
copy /Y tsconfig.json deploy-temp\
copy /Y server.js deploy-temp\

REM Copy env file if exists
if exist .env.production copy /Y .env.production deploy-temp\

REM Create zip file (requires PowerShell)
echo Creating zip archive...
powershell -command "Compress-Archive -Path 'deploy-temp\*' -DestinationPath 'utero-nextjs-deploy.zip' -Force"

REM Clean up
rmdir /s /q deploy-temp

echo ✅ Deployment package created: utero-nextjs-deploy.zip
echo.
echo 📋 Next steps:
echo 1. Upload utero-nextjs-deploy.zip to your cPanel
echo 2. Extract in your app directory (e.g., /home/username/utero-nextjs)
echo 3. Setup Node.js App in cPanel
echo 4. Run: npm install --production
echo 5. Start the application
echo.
echo 📖 See DEPLOYMENT.md for detailed instructions

pause
