#!/bin/bash

# Body Mind Balance - Hostinger Deployment Script
echo "🚀 Starting deployment..."

# Build main website
echo "📦 Building main website..."
npm install
npm run build

# Build admin website
echo "📦 Building admin website..."
cd admin-website
npm install
npm run build
cd ..

# Create deployment structure
echo "📁 Creating deployment structure..."

# Create public_html directory structure
mkdir -p public_html
mkdir -p public_html/admin
mkdir -p public_html/php-backend

# Copy built files
echo "📋 Copying built files..."

# Copy main website build
cp -r .next/out/* public_html/

# Copy admin website build
cp -r admin-website/.next/out/* public_html/admin/

# Copy PHP backend
cp -r php-backend/* public_html/php-backend/

# Copy environment files
cp .env.local public_html/.env.local
cp admin-website/.env.local public_html/admin/.env.local

# Set permissions
echo "🔐 Setting permissions..."
chmod 755 public_html
chmod 644 public_html/.env.local
chmod 644 public_html/admin/.env.local

echo "✅ Deployment ready!"
echo "📁 Files are in: public_html/"
echo "🌐 Main site: public_html/index.html"
echo "👨‍⚕️ Admin site: public_html/admin/index.html"
echo "🔧 API: public_html/php-backend/api/" 