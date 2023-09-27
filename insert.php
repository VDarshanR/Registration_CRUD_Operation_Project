<?php
include("connection.php");

$UserName = $_POST['UName'];
$UserEmail = $_POST['UEmail'];
$UserPhoneNumber = $_POST['UPhno'];
$UserPassword = $_POST['UPassword'];
$UserConfirmPassword = $_POST['UConfirmPassword'];

$Namepattern = '/^[A-Za-z]+$/';
$Phonepattern = '/^[6-9][0-9]{9}$/';
$Passwordpattern = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/';
$MaskedPassword = str_repeat("*", strlen($UserPassword));
$MaskedConfirmPassword = str_repeat("*", strlen($UserConfirmPassword));
$errors = array();

$maskedPassword = str_repeat("*", strlen($UserPassword));
$emailQuery = "SELECT * FROM user_record WHERE UserEmail = '$UserEmail'";
$phoneQuery = "SELECT * FROM user_record WHERE UserPhoneNumber = '$UserPhoneNumber'";

$emailResult = mysqli_query($conn, $emailQuery);
$phoneResult = mysqli_query($conn, $phoneQuery);

$emailRowCount = mysqli_num_rows($emailResult);
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
    $query = "INSERT INTO user_record (UserName, UserEmail, UserPhoneNumber, UserPassword, UserConfirmPassword) VALUES ('$UserName', '$UserEmail', '$UserPhoneNumber', '$UserPassword', '$UserConfirmPassword')";
    $result = mysqli_query($conn, $query);
    if ($result) {
        $response['success'] = "Record has been saved successfully";
    } 
    else {
        $response['error'] = "Failed to insert a record so please check your query or for any errors in the code";
    }
}
echo json_encode($response);
?>
