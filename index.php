<?php
/**
 * Body Mind Balance Healthcare Website
 * PHP Entry Point for Hostinger Deployment
 */

// Set error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if this is a deployment request
if (isset($_GET['deploy']) && $_GET['deploy'] === 'true') {
    echo "<h1>🚀 Starting Deployment...</h1>";
    
    // Execute the deployment script
    $output = shell_exec('chmod +x deploy-hostinger.sh && ./deploy-hostinger.sh 2>&1');
    
    echo "<pre>$output</pre>";
    echo "<h2>✅ Deployment completed!</h2>";
    echo "<p><a href='/'>Visit your website</a></p>";
    exit;
}

// Check if the built files exist
if (file_exists('public_html/index.html')) {
    // Serve the built React app
    include 'public_html/index.html';
} else {
    // Show deployment instructions
    echo "<!DOCTYPE html>
    <html>
    <head>
        <title>BMB Website - Deployment Required</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .container { background: #f5f5f5; padding: 30px; border-radius: 10px; }
            .btn { background: #007cba; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>🏥 Body Mind Balance Healthcare Website</h1>
            <p>Your website needs to be built before it can be displayed.</p>
            
            <div class='warning'>
                <strong>⚠️ Important:</strong> This is a React/Node.js project that needs to be built.
            </div>
            
            <h2>Deployment Options:</h2>
            
            <h3>Option 1: Automatic Deployment</h3>
            <p>Click the button below to trigger the build process:</p>
            <a href='?deploy=true' class='btn'>🚀 Deploy Website</a>
            
            <h3>Option 2: Manual Deployment</h3>
            <p>If automatic deployment doesn't work, you need to:</p>
            <ol>
                <li>Contact Hostinger support to enable Node.js</li>
                <li>Ask them to run these commands on your hosting:</li>
                <pre style='background: #333; color: white; padding: 15px; border-radius: 5px;'>
npm install
cd admin-website && npm install && cd ..
npm run build
cd admin-website && npm run build && cd ..
                </pre>
            </ol>
            
            <h3>Option 3: Upload Built Files</h3>
            <p>Build the project locally and upload the <code>public_html</code> folder to your hosting.</p>
        </div>
    </body>
    </html>";
}
?> 