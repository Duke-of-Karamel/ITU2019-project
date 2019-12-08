<?php
require 'db_connect.php';


// $sql = "INSERT INTO Reservation (user_id, room_id, description, dt_created, dt_from, dt_to) VALUES (" . "'" . $_POST['user'] . "'" . ", '" . $_POST['room'] . "'" . ", '" . $_POST['description'] . "'" . ", '" . $_POST['dt_created'] . "'" . ", '" . $_POST['dt_from'] . "'" . ", '" . $_POST['dt_to'] . "'" . ")";
// if(!$conn->query($sql)){
//     die(500);
// }

// ------ OR LIKE THIS: ------
try
{
$sql = $conn->prepare("INSERT INTO reservation (user_id, room_id, description, dt_created, dt_from, dt_to) VALUES (?, ?, ?, ?, ?, ?)");
$sql->bind_param('sisiii', $_POST['user_id'], $_POST['room_id'], $_POST['description'], time(), $_POST['dt_from'], $_POST['dt_to']);
$sql->execute();
} catch(mysqli_sql_exception $e) {
    die(500);
}


$conn->close();
?>