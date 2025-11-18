<?php
require_once '../config/connection.php';
require_once '../model/medicine_model.php';

require '../vendor/autoload.php'; // Make sure the path is correct

use PhpOffice\PhpSpreadsheet\IOFactory;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['excelFile'])) {
    $fileTmpPath = $_FILES['excelFile']['tmp_name'];
    $fileExtension = pathinfo($_FILES['excelFile']['name'], PATHINFO_EXTENSION);

    if (!in_array($fileExtension, ['xls', 'xlsx'])) {
        echo "<script>alert('Invalid file type. Please upload an Excel file.'); window.history.back();</script>";
        exit;
    }

    try {
        $spreadsheet = IOFactory::load($fileTmpPath);
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        $rowCount = 0;

        // Skip header row and loop through data
        for ($i = 1; $i < count($rows); $i++) {
            $row = $rows[$i];

            $name = trim($row[0] ?? '');
            $genericName = trim($row[1] ?? '');
            $strength = trim($row[2] ?? '');
            $dosageForm = trim($row[3] ?? '');
            $price = floatval($row[4] ?? 0);
            $stock = intval($row[5] ?? 0);
            $manufacturer = trim($row[6] ?? '');
            $description = trim($row[7] ?? '');

            // Generate auto mid
            $lastMid = getmedicineLastId();
            $mid = $lastMid ? 'M' . str_pad((intval(substr($lastMid, 1)) + 1), 3, '0', STR_PAD_LEFT) : 'M001';

            if ($name && $genericName && $strength && $dosageForm) {
                $inserted = addMedicine($mid, $name, $genericName, $strength, $dosageForm, $price, $stock, $manufacturer, $description);
                if ($inserted) $rowCount++;
            }
        }

        echo "<script>alert('Import successful: $rowCount records added.'); window.location.href = '../view/admin/adminDash.php?section=medicine&action=view';</script>";
    } catch (Exception $e) {
        echo "<script>alert('Failed to import: " . $e->getMessage() . "'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('No file uploaded.'); window.history.back();</script>";
}
