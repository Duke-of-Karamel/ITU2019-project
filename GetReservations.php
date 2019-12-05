<?php
$servername = "";
$username = null;
$password = null;
$database = "";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error){
    die($conn->connect_error);
}


$sql = "SELECT * FROM Reservation;";
$select = $conn->query($sql);
if ( $select > 0){
    $rows = array();
    while($row = $select->fetch_assoc()){
        $rows[] = $row;
    }
    $json_result = json_encode($rows);
    echo $json_result;
}

$conn->close();
?>