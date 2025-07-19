<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($data['name']) || empty($data['email'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Name and email are required']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO patients (name, email, phone) VALUES (?, ?, ?)");
        $success = $stmt->execute([
            $data['name'],
            $data['email'],
            $data['phone'] ?? ''
        ]);
        
        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Patient added successfully!']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to add patient']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM patients ORDER BY created_at DESC");
        $patients = $stmt->fetchAll();
        echo json_encode($patients);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch patients: ' . $e->getMessage()]);
    }
    exit;
}
?> 