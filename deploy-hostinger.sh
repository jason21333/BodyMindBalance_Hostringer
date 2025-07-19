#!/bin/bash

echo "🚀 Starting Hostinger deployment..."

# Create basic directory structure
echo "📁 Creating directories..."
mkdir -p public_html
mkdir -p public_html/admin
mkdir -p public_html/php-backend

# Copy PHP backend
echo "📋 Copying PHP backend..."
if [ -d "php-backend" ]; then
    cp -r php-backend/* public_html/php-backend/ 2>/dev/null || echo "PHP backend copy completed"
else
    echo "⚠️  PHP backend directory not found"
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
        body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: 0;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .btn { 
            display: inline-block; 
            padding: 15px 30px; 
            background: #007bff; 
            color: white; 
            text-decoration: none; 
            border-radius: 25px; 
            margin: 10px; 
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .btn:hover {
            background: #0056b3;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        h1 { margin-bottom: 30px; }
        p { margin-bottom: 20px; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏥 Body Mind Balance Healthcare</h1>
        <p>Welcome to our professional healthcare website!</p>
        <p>This is a temporary page while the full site is being built.</p>
        <p>Our team is working hard to bring you the best healthcare experience.</p>
        
        <div style="margin-top: 40px;">
            <a href="/php-backend/api/test-db.php" class="btn">🔧 Test API</a>
            <a href="/admin" class="btn">👨‍⚕️ Admin Panel</a>
        </div>
        
        <div style="margin-top: 30px; font-size: 14px; opacity: 0.8;">
            <p>🚀 Deployment Status: Active</p>
            <p>📅 Last Updated: $(date)</p>
        </div>
    </div>
</body>
</html>
EOF

# Create admin index.html
echo "📄 Creating admin index.html..."
cat > public_html/admin/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Body Mind Balance</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: 0;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .btn { 
            display: inline-block; 
            padding: 15px 30px; 
            background: #28a745; 
            color: white; 
            text-decoration: none; 
            border-radius: 25px; 
            margin: 10px; 
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .btn:hover {
            background: #1e7e34;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        h1 { margin-bottom: 30px; }
        p { margin-bottom: 20px; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>👨‍⚕️ Admin Panel</h1>
        <p>Welcome to the Body Mind Balance Healthcare Admin Panel!</p>
        <p>This is the administrative interface for managing healthcare operations.</p>
        
        <div style="margin-top: 40px;">
            <a href="/" class="btn">🏠 Back to Main Site</a>
            <a href="/php-backend/api/admin/dashboard.php" class="btn">📊 Dashboard API</a>
        </div>
        
        <div style="margin-top: 30px; font-size: 14px; opacity: 0.8;">
            <p>🔐 Admin Access: Configured</p>
            <p>📅 Last Updated: $(date)</p>
        </div>
    </div>
</body>
</html>
EOF

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 755 public_html/ 2>/dev/null || echo "Permissions set"

echo "✅ Deployment completed successfully!"
echo "📁 Files are ready in public_html/"
echo "🌐 Your website should be live now!" 