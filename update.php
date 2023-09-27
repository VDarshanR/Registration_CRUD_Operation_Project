<?php
include("connection.php");
if(isset($_POST))
{
    if($_POST["action"] == "getupdate")
    {
        $query = "select * from user_record where UserId=".$_POST["id"]."";
        $result = mysqli_query($conn,$query);
        while($row=mysqli_fetch_assoc($result))
        {
          echo $row['UserId'].','.$row['UserName'].','.$row['UserEmail'].','.$row['UserPhoneNumber'].','.$row['UserPassword'].','.$row['UserConfirmPassword']."\n";
        }   
    }

    if ($_POST["action"] == "update") 
    {
        $UserName = $_POST['username'];
        $UserEmail = $_POST['useremail'];
        $UserPhoneNumber = $_POST['userphonenumber'];
        $UserPassword = $_POST['userpassword'];
        $UserConfirmPassword = $_POST['userconfirmpassword'];

        $Namepattern = '/^[A-Za-z]+$/';
        $Phonepattern = '/^[6-9][0-9]{9}$/';
        $Passwordpattern = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/';
        $errors = array();

        $emailQuery = "SELECT * FROM user_record WHERE UserEmail = '$UserEmail' AND UserId != ".$_POST["id"];
        $emailResult = mysqli_query($conn, $emailQuery);
        $emailRowCount = mysqli_num_rows($emailResult);

        $phoneQuery = "SELECT * FROM user_record WHERE UserPhoneNumber = '$UserPhoneNumber' AND UserId != ".$_POST["id"];
        $phoneResult = mysqli_query($conn, $phoneQuery);
        $phoneRowCount = mysqli_num_rows($phoneResult);

        if (!empty($UserName) && !empty($UserEmail) && !empty($UserPhoneNumber) && !empty($UserPassword) && !empty($UserConfirmPassword)) 
        {
            if (!preg_match($Namepattern, $UserName)) {
                $errors[] = "Username must contain only characters";
            }

            if (filter_var($UserEmail, FILTER_VALIDATE_EMAIL)) {
                if ($emailRowCount > 0) {
                    $errors[] = "Useremail is already taken";
                }
            } else {
                $errors[] = "Useremail address is invalid";
            }

            if (preg_match($Phonepattern, $UserPhoneNumber)) {
                if ($phoneRowCount > 0) {
                    $errors[] = "Phone number is already taken";
                }  
            } else {
                $errors[] = "Phone number must have 10 digits and should start with 6, 7, 8, or 9"; 
            }
        
            if (preg_match($Passwordpattern, $UserPassword)) {
                if ($UserPassword != $UserConfirmPassword) {
                    $errors[] = "Password and confirm password must match";
                }
            } else {
                $errors[] = "Password should be at least 4 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char";
            }
        } 
        else 
        {
            $errors[] = "Please enter all fields";
        }
        if (!empty($errors)) {
            $response['error'] = '<ul class="error-list"><li>' . implode('</li><li>', $errors) . '</li></ul>';
        }
        else 
        {   
            $query = "UPDATE user_record SET UserName='$UserName', UserEmail='$UserEmail', UserPhoneNumber='$UserPhoneNumber', UserPassword='$UserPassword', UserConfirmPassword='$UserConfirmPassword' WHERE UserId=".$_POST["id"];
            $result = mysqli_query($conn, $query);
            if ($result) {
                $response['success'] = "Record has been updated successfully";
            } else {
                $response['error'] = "Failed to update a record so please check your query or for any errors in the code";
            }
        }
        echo json_encode($response);
    }
}
?>