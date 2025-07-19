#!/bin/bash

echo "🚀 Starting Hostinger deployment..."

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please contact Hostinger support to enable Node.js."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please contact Hostinger support to enable npm."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install dependencies for main website
echo "📦 Installing main website dependencies..."
npm install

# Install dependencies for admin website
echo "📦 Installing admin website dependencies..."
cd admin-website && npm install && cd ..

# Build main website
echo "🔨 Building main website..."
npm run build

# Build admin website
echo "🔨 Building admin website..."
cd admin-website && npm run build && cd ..

# Create deployment structure
echo "📁 Creating deployment structure..."
mkdir -p public_html
mkdir -p public_html/admin
mkdir -p public_html/php-backend

# Copy built files
echo "📋 Copying built files..."
if [ -d ".next/out" ]; then
    cp -r .next/out/* public_html/
    echo "✅ Main website files copied"
else
    echo "⚠️  Main website build not found"
fi

if [ -d "admin-website/.next/out" ]; then
    cp -r admin-website/.next/out/* public_html/admin/
    echo "✅ Admin website files copied"
else
    echo "⚠️  Admin website build not found"
fi

# Copy PHP backend
if [ -d "php-backend" ]; then
    cp -r php-backend/* public_html/php-backend/
    echo "✅ PHP backend files copied"
else
    echo "⚠️  PHP backend not found"
fi

# Copy configuration files
echo "⚙️ Copying configuration files..."
cp .env.local public_html/.env.local 2>/dev/null || echo "No .env.local found"
cp admin-website/.env.local public_html/admin/.env.local 2>/dev/null || echo "No admin .env.local found"

# Set permissions
echo "🔐 Setting file permissions..."
find public_html -type d -exec chmod 755 {} \; 2>/dev/null || echo "Permission setting skipped"
find public_html -type f -exec chmod 644 {} \; 2>/dev/null || echo "Permission setting skipped"

echo "✅ Deployment completed!"
echo "📂 Files are ready in public_html/"
echo "🌐 Your website should be live now!" 