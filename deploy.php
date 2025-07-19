<?php
/**
 * Body Mind Balance Healthcare Website
 * PHP Deployment Script for Hostinger
 * Last Updated: 2025-01-19 06:35:00 - Auto-Deployment Working! ✅
 */

echo "🚀 Starting Hostinger deployment...\n";

// Create basic directory structure
echo "📁 Creating directories...\n";
if (!is_dir('public_html')) {
    mkdir('public_html', 0755, true);
}
if (!is_dir('public_html/admin')) {
    mkdir('public_html/admin', 0755, true);
}
if (!is_dir('public_html/php-backend')) {
    mkdir('public_html/php-backend', 0755, true);
}

// Copy PHP backend
echo "📋 Copying PHP backend...\n";
if (is_dir('php-backend')) {
    $source = 'php-backend/';
    $dest = 'public_html/php-backend/';
    
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($source, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    
    foreach ($iterator as $item) {
        if ($item->isDir()) {
            mkdir($dest . $iterator->getSubPathName(), 0755, true);
        } else {
            copy($item, $dest . $iterator->getSubPathName());
        }
    }
    echo "✅ PHP backend copied successfully\n";
} else {
    echo "⚠️  PHP backend directory not found\n";
}

// Create main index.html
echo "📄 Creating index.html...\n";
$indexHtml = '<!DOCTYPE html>
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
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            max-width: 600px; 
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
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
        h1 { margin-bottom: 30px; font-size: 2.5em; }
        p { margin-bottom: 20px; line-height: 1.6; font-size: 1.1em; }
        .status { margin-top: 30px; font-size: 14px; opacity: 0.8; }
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
        
        <div class="status">
            <p>🚀 Deployment Status: Active</p>
            <p>📅 Last Updated: ' . date('Y-m-d H:i:s') . '</p>
        </div>
    </div>
</body>
</html>';

file_put_contents('public_html/index.html', $indexHtml);
echo "✅ Main index.html created\n";

// Create admin index.html
echo "📄 Creating admin index.html...\n";
$adminHtml = '<!DOCTYPE html>
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
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            max-width: 600px; 
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
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
        h1 { margin-bottom: 30px; font-size: 2.5em; }
        p { margin-bottom: 20px; line-height: 1.6; font-size: 1.1em; }
        .status { margin-top: 30px; font-size: 14px; opacity: 0.8; }
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
        
        <div class="status">
            <p>🔐 Admin Access: Configured</p>
            <p>📅 Last Updated: ' . date('Y-m-d H:i:s') . '</p>
        </div>
    </div>
</body>
</html>';

file_put_contents('public_html/admin/index.html', $adminHtml);
echo "✅ Admin index.html created\n";

// Set permissions
echo "🔐 Setting permissions...\n";
chmod('public_html', 0755);
chmod('public_html/admin', 0755);
chmod('public_html/php-backend', 0755);

echo "✅ Deployment completed successfully!\n";
echo "📁 Files are ready in public_html/\n";
echo "🌐 Your website should be live now!\n";
?> 