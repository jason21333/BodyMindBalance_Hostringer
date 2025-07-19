<?php
header('Content-Type: application/json');
require_once '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("INSERT INTO appointments (patient_name, email, phone, date, time, service, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')");
    $success = $stmt->execute([
        $data['name'], $data['email'], $data['phone'], $data['date'], $data['time'], $data['service']
    ]);
    echo json_encode(['success' => $success]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT * FROM appointments ORDER BY date DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}
?> 