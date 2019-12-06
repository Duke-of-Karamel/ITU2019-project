<?php
$servername = "localhost";
$username = "60478_itu";
$password = "gdebody";
$database = "vevesoft_net_itu";

$conn = new mysqli($servername, $username, $password, $database);
$conn->set_charset("utf8");
if ($conn->connect_error){
    die(500);
}

?>