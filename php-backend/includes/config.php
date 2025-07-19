<?php
// Toggle this for dev/prod
// true = file-based storage (dev), false = MySQL (prod)
define('USE_FILE_STORAGE', true); // Set to true for local testing

$pdo = null; // Initialize globally

if (!USE_FILE_STORAGE) {
    // Remote database config for Hostinger
    $db_host = '193.203.184.74'; // Hostinger MySQL server IP
    $db_name = 'u166239076_25Bit';
    $db_user = 'u166239076_BMB_ARCHIVE';
    $db_pass = 'p[QB7]JY#3';
    
    try {
        $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
    }
}
?> 