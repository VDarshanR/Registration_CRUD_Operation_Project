<?php
include("connection.php");
if(isset($_POST))
{
    if($_POST["action"] == "getdelete")
    {
        $query = "select * from user_record where UserId=".$_POST["id"]."";
        $result = mysqli_query($conn,$query);
        while($row=mysqli_fetch_assoc($result))
        {
          echo $row['UserId'].','.$row['UserName'].','.$row['UserEmail'].','.$row['UserPhoneNumber']."\n";
        }   
    }
    if($_POST["action"] == "delete")
    {
        $query = "delete from user_record where UserId = ".$_POST["id"]."";
        if(mysqli_query($conn, $query))
        echo json_encode(array("result"=>"success"));
        else
        echo json_encode(array("result"=>"failed"));
    }
}
?>

			
