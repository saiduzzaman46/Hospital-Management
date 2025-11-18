<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

ob_clean(); // 
header('Content-Type: application/json');

require_once '../model/medicine_model.php';
require_once '../config/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $name         = $_POST['name'] ?? '';
    $genericName  = $_POST['genericName'] ?? '';
    $strength     = $_POST['strength'] ?? '';
    $dosageForm   = $_POST['dosageForm'] ?? '';
    $price        = $_POST['price'] ?? 0;
    $stock        = $_POST['stock'] ?? 0;
    $manufacturer = $_POST['manufacturer'] ?? '';
    $description  = $_POST['description'] ?? '';

    if (isset($_POST['medicine_id'])) {
        $mid = $_POST['medicine_id'] ?? '';
        if (updateMedicine($mid, $name, $genericName, $strength, $dosageForm, $price, $stock, $manufacturer, $description)) {
            echo json_encode(['success' => true, 'message' => 'Medicine updated successfully', 'mid' => $mid]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update medicine']);
        }
    } else {
        // Default = add
        $lastMid = getmedicineLastId();
        $mid = $lastMid ? 'M' . str_pad((intval(substr($lastMid, 1)) + 1), 3, '0', STR_PAD_LEFT) : 'M001';

        if (addMedicine($mid, $name, $genericName, $strength, $dosageForm, $price, $stock, $manufacturer, $description)) {
            echo json_encode(['success' => true, 'message' => 'Medicine added successfully', 'mid' => $mid]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add medicine']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
