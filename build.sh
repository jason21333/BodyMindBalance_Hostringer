#!/bin/bash

# Build script for Hostinger deployment
echo "🚀 Starting deployment build..."

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

# Create deployment directory structure
echo "📁 Creating deployment structure..."
mkdir -p public_html
mkdir -p public_html/admin
mkdir -p public_html/php-backend

# Copy built files
echo "📋 Copying built files..."
cp -r .next/out/* public_html/
cp -r admin-website/.next/out/* public_html/admin/
cp -r php-backend/* public_html/php-backend/

# Copy environment files
echo "⚙️ Copying configuration files..."
cp .env.local public_html/.env.local 2>/dev/null || echo "No .env.local found"
cp admin-website/.env.local public_html/admin/.env.local 2>/dev/null || echo "No admin .env.local found"

# Set permissions
echo "🔐 Setting file permissions..."
find public_html -type d -exec chmod 755 {} \;
find public_html -type f -exec chmod 644 {} \;

echo "✅ Deployment build completed!"
echo "📂 Files are ready in public_html/" 