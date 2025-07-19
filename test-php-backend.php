<?php
// Simple test script to verify PHP backend is working
echo "PHP Backend Test\n";
echo "================\n\n";

// Test 1: Check if PHP is working
echo "✓ PHP is working\n";

// Test 2: Check if we can include the config
try {
    require_once 'includes/config.php';
    echo "✓ Database config loaded\n";
} catch (Exception $e) {
    echo "✗ Database config failed: " . $e->getMessage() . "\n";
}

// Test 3: Test database connection
try {
    if (isset($pdo)) {
        $result = $pdo->query("SELECT 1")->fetch();
        echo "✓ Database connection successful\n";
    } else {
        echo "✗ Database connection failed - PDO not available\n";
    }
} catch (Exception $e) {
    echo "✗ Database connection failed: " . $e->getMessage() . "\n";
}

// Test 4: Test appointments endpoint
echo "\nTesting API Endpoints:\n";
echo "=====================\n";

// Test appointments endpoint
$appointments_url = 'http://localhost:3001/api/appointments.php';
$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => 'Content-Type: application/json'
    ]
]);

$response = @file_get_contents($appointments_url, false, $context);
if ($response !== false) {
    echo "✓ Appointments endpoint responding\n";
} else {
    echo "✗ Appointments endpoint not responding\n";
}

echo "\nTest completed!\n";
?> 