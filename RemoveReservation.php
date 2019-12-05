<?php
$servername = "";
$username = null;
$password = null;
$database = "";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error){
    die(500);
}

try
{
$sql = $conn->prepare("DELETE FROM Reservation WHERE reservation_id = ?");
$sql->bind_param('i', $_POST['reservation_id']);
$sql->execute();
} catch(mysqli_sql_exception $e) {
    die(500);
}

$conn->close();
?>