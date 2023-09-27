<?php
  require_once('connection.php');
  $query = "select * from user_record ";
  $result = mysqli_query($conn,$query);
  while($row=mysqli_fetch_assoc($result))
  {
    echo $row['UserId'].','.$row['UserName'].','.$row['UserEmail'].','.$row['UserPhoneNumber'].','.$row['UserPassword'].','.$row['UserConfirmPassword']."\n";
  }   
?>