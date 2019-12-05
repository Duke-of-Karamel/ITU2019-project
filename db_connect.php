<?php
$servername = "";
$username = null;
$password = null;
$database = "";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error){
    die(500);
}
?>