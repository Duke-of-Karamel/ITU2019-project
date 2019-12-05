<?php
require 'db_connect.php';


$sql = "SELECT * FROM Reservation";
$select = $conn->query($sql);

if ( $select > 0){
    $rows = array();
    while($row = $select->fetch_assoc()){
        $rows[] = $row;
    }
    $json_result = json_encode($rows);
    header('Content-Type: application/json');
    echo $json_result;
}

$conn->close();
?>