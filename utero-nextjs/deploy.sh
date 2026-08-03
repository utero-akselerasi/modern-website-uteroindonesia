#!/bin/bash

# Deploy script for cPanel
# Usage: ./deploy.sh

echo "🚀 Starting deployment process..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# 2. Build project
echo "🔨 Building Next.js project..."
pnpm build

if [ $? -ne 0 ]; then
  echo "❌ Build failed! Please fix errors and try again."
  exit 1
fi

echo "✅ Build successful!"

# 3. Create deployment package
echo "📦 Creating deployment package..."

# Create temporary directory
mkdir -p deploy-temp

# Copy necessary files
cp -r .next deploy-temp/
cp -r public deploy-temp/
cp -r src deploy-temp/
cp package.json deploy-temp/
cp pnpm-lock.yaml deploy-temp/
cp next.config.ts deploy-temp/
cp tsconfig.json deploy-temp/
cp server.js deploy-temp/

# Copy env file if exists
if [ -f .env.production ]; then
  cp .env.production deploy-temp/
fi

# Create zip file
cd deploy-temp
zip -r ../utero-nextjs-deploy.zip . -x "*.git*" "node_modules/*"
cd ..

# Clean up
rm -rf deploy-temp

echo "✅ Deployment package created: utero-nextjs-deploy.zip"
echo ""
echo "📋 Next steps:"
echo "1. Upload utero-nextjs-deploy.zip to your cPanel"
echo "2. Extract in your app directory (e.g., /home/username/utero-nextjs)"
echo "3. Setup Node.js App in cPanel"
echo "4. Run: npm install --production"
echo "5. Start the application"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
