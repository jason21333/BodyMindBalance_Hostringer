<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../includes/config.php';

$filepath = __DIR__ . '/../../shared-data/appointments.json';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (USE_FILE_STORAGE) {
        // File-based storage
        $appointments = [];
        if (file_exists($filepath)) {
            $appointments = json_decode(file_get_contents($filepath), true) ?: [];
        }
        $data['id'] = uniqid();
        $data['created_at'] = date('c');
        $appointments[] = $data;
        file_put_contents($filepath, json_encode($appointments, JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Appointment booked (file)!']);
    } else {
        // Database storage
        try {
            $stmt = $pdo->prepare("INSERT INTO appointments (name, email, phone, date, time, service, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
            $success = $stmt->execute([
                $data['name'],
                $data['email'],
                $data['phone'] ?? '',
                $data['date'],
                $data['time'],
                $data['service'],
                $data['message'] ?? ''
            ]);
            if ($success) {
                echo json_encode(['success' => true, 'message' => 'Appointment booked successfully!']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Failed to book appointment']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
        }
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (USE_FILE_STORAGE) {
        if (file_exists($filepath)) {
            $appointments = json_decode(file_get_contents($filepath), true) ?: [];
            echo json_encode($appointments);
        } else {
            echo json_encode([]);
        }
    } else {
        try {
            $stmt = $pdo->query("SELECT * FROM appointments ORDER BY created_at DESC");
            $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($appointments);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch appointments: ' . $e->getMessage()]);
        }
    }
    exit;
}
?> 