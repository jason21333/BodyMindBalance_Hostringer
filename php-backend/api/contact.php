<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Basic validation
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'All fields are required']);
        exit;
    }
    
    // Sanitize inputs
    $name = htmlspecialchars($data['name']);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($data['message']);
    
    // You can add email sending logic here using PHP mail() or PHPMailer
    // For now, we'll just return success
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message. We will get back to you soon!'
    ]);
    exit;
}

// For GET requests, return contact info
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'success' => true,
        'contact' => [
            'phone' => '+1 (555) 123-4567',
            'email' => 'info@bmbclinic.com',
            'address' => '123 Medical Center Dr, Healthcare City, HC 12345'
        ]
    ]);
    exit;
}
?> 