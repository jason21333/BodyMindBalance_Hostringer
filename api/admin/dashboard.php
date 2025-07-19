<?php
header('Content-Type: application/json');
require_once '../../includes/config.php';

$stats = [];
$stats['totalPatients'] = $pdo->query("SELECT COUNT(*) FROM patients")->fetchColumn();
$stats['totalAppointments'] = $pdo->query("SELECT COUNT(*) FROM appointments")->fetchColumn();
$stats['pendingAppointments'] = $pdo->query("SELECT COUNT(*) FROM appointments WHERE status = 'pending'")->fetchColumn();
$stats['recentAppointments'] = $pdo->query("SELECT * FROM appointments ORDER BY created_at DESC LIMIT 10")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'stats' => $stats]);
?> 