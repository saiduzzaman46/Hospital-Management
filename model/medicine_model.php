<?php
require_once __DIR__ . '/../config/connection.php';
function addMedicine($mid, $name, $genericName, $strength, $dosageForm, $price, $stock, $manufacturer, $description)
{
    global $conn;
    date_default_timezone_set('Asia/Dhaka');
    $today = date('Y-m-d');

    $sql = "INSERT INTO medicines (mid, name, genericName, strength, dosageForm, price, stock, manufacturer, description, created_at)
            VALUES ('$mid', '$name', '$genericName', '$strength', '$dosageForm', '$price', '$stock', '$manufacturer', '$description', '$today')";

    $result = mysqli_query($conn, $sql);
    if ($result) {
        return true;
    } else {
        return false;
    }
}

function getmedicineLastId()
{
    global $conn;
    $query = "SELECT mid FROM medicines ORDER BY mid DESC LIMIT 1";
    $result = mysqli_query($conn, $query);
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        return $row['mid'];
    } else {
        return null;
    }
}
function updateMedicine($mid, $name, $genericName, $strength, $dosageForm, $price, $stock, $manufacturer, $description)
{
    global $conn;
    date_default_timezone_set('Asia/Dhaka');
    $today = date('Y-m-d');

    $query = "UPDATE `medicines` SET 
        `name` = '$name', 
        `genericName` = '$genericName', 
        `strength` = '$strength', 
        `dosageForm` = '$dosageForm', 
        `price` = $price, 
        `stock` = '$stock', 
        `manufacturer` = '$manufacturer', 
        `description` = '$description',
        `update_at` = '$today'
        WHERE `mid` = '$mid';";

    $result = mysqli_query($conn, $query);
    return $result ? true : false;
}
