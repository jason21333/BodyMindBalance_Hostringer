#!/bin/bash

echo "🚀 Starting Hostinger deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Are we in the right directory?"
    exit 1
fi

echo "✅ Found package.json"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. This is expected on Hostinger."
    echo "📝 Creating static files manually..."
    
    # Create basic static files
    mkdir -p public_html
    mkdir -p public_html/admin
    mkdir -p public_html/php-backend
    
    # Copy PHP backend
    if [ -d "php-backend" ]; then
        echo "📋 Copying PHP backend..."
        cp -r php-backend/* public_html/php-backend/
    fi
    
    # Create a simple index.html
    echo "📄 Creating index.html..."
    cat > public_html/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Body Mind Balance Healthcare</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .container { max-width: 600px; margin: 0 auto; }
        .btn { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏥 Body Mind Balance Healthcare</h1>
        <p>Welcome to our healthcare website!</p>
        <p>This is a temporary page while the full site is being built.</p>
        <a href="/php-backend/api/test-db.php" class="btn">Test API</a>
        <a href="/admin" class="btn">Admin Panel</a>
    </div>
</body>
</html>
EOF

    echo "✅ Static files created successfully!"
    exit 0
fi

echo "✅ Node.js is available"

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
if [ -d ".next/out" ]; then
    cp -r .next/out/* public_html/
elif [ -d "out" ]; then
    cp -r out/* public_html/
fi

if [ -d "admin-website/.next/out" ]; then
    cp -r admin-website/.next/out/* public_html/admin/
elif [ -d "admin-website/out" ]; then
    cp -r admin-website/out/* public_html/admin/
fi

# Copy PHP backend
if [ -d "php-backend" ]; then
    echo "📋 Copying PHP backend..."
    cp -r php-backend/* public_html/php-backend/
fi

# Copy .htaccess files
echo "📋 Copying .htaccess files..."
if [ -f "public_html/.htaccess" ]; then
    cp public_html/.htaccess public_html/
fi

if [ -f "public_html/admin/.htaccess" ]; then
    cp public_html/admin/.htaccess public_html/admin/
fi

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 755 public_html/
chmod -R 644 public_html/*.html 2>/dev/null || true
chmod -R 644 public_html/*.css 2>/dev/null || true
chmod -R 644 public_html/*.js 2>/dev/null || true

echo "✅ Deployment completed successfully!"
echo "📁 Files are ready in public_html/" 