<?php
$servername = "";
$username = null;
$password = null;
$database = "";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error){
    die(500);
}


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