<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../includes/config.php';

if ($pdo === null) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection not available. Check your config.php file.'
    ]);
    exit;
}

try {
    // Test database connection
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create appointments table if it doesn't exist
    $sql = "CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        service VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    
    // Test insert and select
    $testData = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '1234567890',
        'date' => '2024-01-01',
        'time' => '10:00:00',
        'service' => 'General Checkup',
        'message' => 'Test appointment'
    ];
    
    $stmt = $pdo->prepare("INSERT INTO appointments (name, email, phone, date, time, service, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$testData['name'], $testData['email'], $testData['phone'], $testData['date'], $testData['time'], $testData['service'], $testData['message']]);
    
    // Get the test appointment
    $stmt = $pdo->query("SELECT * FROM appointments ORDER BY created_at DESC LIMIT 1");
    $appointment = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Clean up test data
    $pdo->exec("DELETE FROM appointments WHERE email = 'test@example.com'");
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Database connection successful',
        'table_created' => true,
        'test_appointment' => $appointment
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
}
?> 