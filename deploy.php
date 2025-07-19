<?php
/**
 * Body Mind Balance Healthcare Website
 * PHP Deployment Script for Hostinger
 * Last Updated: 2025-01-19 06:35:00 - Auto-Deployment Working! ✅
 * Domain: bodymindbalance.icu
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
            if (!is_dir($dest . $iterator->getSubPathName())) {
                mkdir($dest . $iterator->getSubPathName(), 0755, true);
            }
        } else {
            copy($item, $dest . $iterator->getSubPathName());
        }
    }
    echo "✅ PHP backend copied successfully\n";
}

// Create main index.html
echo "📄 Creating main website...\n";
$mainHtml = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Body Mind Balance Healthcare</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .container { background: rgba(255, 255, 255, 0.95); padding: 3rem; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center; max-width: 600px; }
        h1 { color: #2c3e50; margin-bottom: 1rem; font-size: 2.5rem; }
        p { color: #34495e; margin-bottom: 1rem; font-size: 1.1rem; line-height: 1.6; }
        .btn { display: inline-block; padding: 12px 24px; margin: 10px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 25px; transition: transform 0.3s; }
        .btn:hover { transform: translateY(-2px); }
        .status { margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 10px; }
        .status p { font-size: 0.9rem; margin: 0.5rem 0; }
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
            <p>🌐 Domain: bodymindbalance.icu</p>
            <p>📅 Last Updated: ' . date('Y-m-d H:i:s') . '</p>
        </div>
    </div>
</body>
</html>';

file_put_contents('public_html/index.html', $mainHtml);
echo "✅ Main website created\n";

// Create admin index.html
echo "📄 Creating admin panel...\n";
$adminHtml = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Panel - Body Mind Balance</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .container { background: rgba(255, 255, 255, 0.95); padding: 3rem; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center; max-width: 600px; }
        h1 { color: #2c3e50; margin-bottom: 1rem; font-size: 2.5rem; }
        p { color: #34495e; margin-bottom: 1rem; font-size: 1.1rem; line-height: 1.6; }
        .btn { display: inline-block; padding: 12px 24px; margin: 10px; background: linear-gradient(45deg, #2c3e50, #3498db); color: white; text-decoration: none; border-radius: 25px; transition: transform 0.3s; }
        .btn:hover { transform: translateY(-2px); }
        .status { margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 10px; }
        .status p { font-size: 0.9rem; margin: 0.5rem 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>👨‍⚕️ Admin Panel</h1>
        <p>Welcome to the Body Mind Balance Healthcare Admin Panel!</p>
        <p>This is a temporary admin interface while the full admin panel is being built.</p>
        <p>Our development team is working on the complete admin dashboard.</p>
        <div style="margin-top: 40px;">
            <a href="/php-backend/api/admin/dashboard.php" class="btn">📊 Dashboard</a>
            <a href="/php-backend/api/admin/appointments.php" class="btn">📅 Appointments</a>
            <a href="/php-backend/api/admin/patients.php" class="btn">👥 Patients</a>
        </div>
        <div class="status">
            <p>🚀 Admin Panel Status: Active</p>
            <p>🌐 Domain: bodymindbalance.icu</p>
            <p>📅 Last Updated: ' . date('Y-m-d H:i:s') . '</p>
        </div>
    </div>
</body>
</html>';

file_put_contents('public_html/admin/index.html', $adminHtml);
echo "✅ Admin panel created\n";

// Set permissions
echo "🔐 Setting permissions...\n";
chmod('public_html', 0755);
chmod('public_html/admin', 0755);
chmod('public_html/php-backend', 0755);

echo "🎉 Deployment completed successfully!\n";
echo "🌐 Your website is now available at: https://bodymindbalance.icu\n";
echo "👨‍⚕️ Admin panel: https://bodymindbalance.icu/admin\n";
echo "🔧 API endpoint: https://bodymindbalance.icu/php-backend/api\n";
?> 