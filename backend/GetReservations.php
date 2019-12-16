<?php
// ITU 2019 Project
// Authors: Lukáš Wagner <xwagne10>, Radek Veverka <xvever13>
// php script for select query

require 'db_connect.php';
mb_internal_encoding("utf-8");

$sql_reservations = "SELECT * FROM reservations ORDER BY dt_from DESC";
$sql_rooms        = "SELECT * FROM rooms";

$out = [];
$out["rooms"] = $conn->query($sql_rooms)->fetch_all(MYSQLI_ASSOC);
$out["reservations"] = [];

$select = $conn->query($sql_reservations);
if  ($select->num_rows > 0)
{
    while($row = $select->fetch_assoc()){
        $out["reservations"][] = $row;
    }
    
    $json_result = json_encode($out);
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    echo $json_result;
}

$conn->close();
?>