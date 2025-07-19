<?php
header('Content-Type: application/json');
require_once '../includes/config.php';
$stmt = $pdo->query("SELECT * FROM services ORDER BY name ASC");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
exit;
?> 