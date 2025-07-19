<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stats = [];
        
        if (USE_FILE_STORAGE) {
            // File-based storage
            $appointmentsFile = __DIR__ . '/../../../shared-data/appointments.json';
            $patientsFile = __DIR__ . '/../../../shared-data/patients.json';
            
            // Get appointments
            $appointments = [];
            if (file_exists($appointmentsFile)) {
                $appointments = json_decode(file_get_contents($appointmentsFile), true) ?: [];
            }
            
            // Get patients
            $patients = [];
            if (file_exists($patientsFile)) {
                $patients = json_decode(file_get_contents($patientsFile), true) ?: [];
            }
            
            $stats['totalPatients'] = count($patients);
            $stats['totalAppointments'] = count($appointments);
            $stats['pendingAppointments'] = count(array_filter($appointments, function($app) {
                return isset($app['status']) && $app['status'] === 'pending';
            }));
            
            // Recent appointments (last 10)
            $recentAppointments = array_slice($appointments, 0, 10);
            $stats['recentAppointments'] = $recentAppointments;
            
        } else {
            // Database storage
            if (!$pdo) {
                throw new Exception('Database connection not available');
            }
            
            // Total patients
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM patients");
            $stats['totalPatients'] = $stmt->fetch()['count'];
            
            // Total appointments
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM appointments");
            $stats['totalAppointments'] = $stmt->fetch()['count'];
            
            // Pending appointments
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM appointments WHERE status = 'pending'");
            $stats['pendingAppointments'] = $stmt->fetch()['count'];
            
            // Recent appointments (last 10)
            $stmt = $pdo->query("SELECT * FROM appointments ORDER BY created_at DESC LIMIT 10");
            $stats['recentAppointments'] = $stmt->fetchAll();
        }
        
        echo json_encode([
            'success' => true, 
            'stats' => $stats
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch dashboard data: ' . $e->getMessage()]);
    }
    exit;
}
?> 