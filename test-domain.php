<?php
/**
 * Domain Test File
 * This file will help us verify if the domain is working
 */

echo "<!DOCTYPE html>";
echo "<html lang='en'>";
echo "<head>";
echo "    <meta charset='UTF-8'>";
echo "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>";
echo "    <title>Domain Test - Body Mind Balance</title>";
echo "    <style>";
echo "        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }";
echo "        .container { max-width: 600px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 40px; border-radius: 15px; }";
echo "        h1 { margin-bottom: 30px; }";
echo "        .status { margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.2); border-radius: 10px; }";
echo "    </style>";
echo "</head>";
echo "<body>";
echo "    <div class='container'>";
echo "        <h1>🌐 Domain Test</h1>";
echo "        <div class='status'>";
echo "            <h3>✅ Domain is Working!</h3>";
echo "            <p><strong>Domain:</strong> " . $_SERVER['HTTP_HOST'] . "</p>";
echo "            <p><strong>Server Time:</strong> " . date('Y-m-d H:i:s') . "</p>";
echo "            <p><strong>PHP Version:</strong> " . phpversion() . "</p>";
echo "        </div>";
echo "        <div class='status'>";
echo "            <h3>🔗 Quick Links</h3>";
echo "            <p><a href='/php-backend/api/test-db.php' style='color: white; text-decoration: underline;'>🔧 Test API</a></p>";
echo "            <p><a href='/admin' style='color: white; text-decoration: underline;'>👨‍⚕️ Admin Panel</a></p>";
echo "        </div>";
echo "    </div>";
echo "</body>";
echo "</html>";
?> 