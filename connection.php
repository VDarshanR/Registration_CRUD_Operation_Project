<?php
$conn = mysqli_connect("localhost", "root", "", "darshan");
if(!$conn)
{
    die("Please check the connection".mysqli_connect_error());
}
?>