$(document).ready(function()
{
    view_record();
    $('#Deletemodal').modal({backdrop: 'static',keyboard: false});
    $('#Updatemodal').modal({backdrop: 'static',keyboard: false});
});
    
//Insert record
function insert_record() 
{
    var Name = $('#UserName').val();
    var Email = $('#UserEmail').val(); 
    var Phno = $('#UserPhoneNumber').val();
    var Password = $('#UserPassword').val();  
    var Confirmpassword = $('#ConfirmPassword').val();
    $.ajax({
        url: 'insert.php',
        method: 'post',
        data: { UName: Name, UEmail: Email, UPhno: Phno, UPassword: Password, UConfirmPassword: Confirmpassword },
        success: function(data) {
            var response = JSON.parse(data);
            if (response.error) {
                $('#RegisterMessage').html('<p class="text-danger">' + response.error + '</p>');
            } else if (response.success) {
                $('#RegisterMessage').html('<p class="text-success">' + response.success + '</p>');
                setTimeout(function() {
                    $('#Registrationmodal').find('[data-dismiss="modal"]').trigger('click');
                }, 700);
                $('form').trigger('reset');
                $('#TogglerPassword').hide();
                $('#TogglerPassword').removeClass('fa-eye-slash');
                $('#TogglerPassword').addClass('fa-eye');
                $('#UserPassword').attr('type', 'password');
                $('#TogglerConfirmPassword').hide();
                $('#TogglerConfirmPassword').removeClass('fa-eye-slash');
                $('#TogglerConfirmPassword').addClass('fa-eye');
                $('#ConfirmPassword').attr('type', 'password');
                view_record();
            }
        }
    });
}
function resetinsertmodal()
{
    $('#Registrationmodal').hide();
    $('#RegisterMessage').html('');
    $('form').trigger('reset');
    $('#TogglerPassword').hide().removeClass('fa-eye-slash').addClass('fa-eye')
    $('#UserPassword').attr('type', 'password');
    $('#TogglerConfirmPassword').hide().removeClass('fa-eye-slash').addClass('fa-eye');
    $('#ConfirmPassword').attr('type', 'password');
}
$(document).on('click','#registerButtonClose', function()
{
    resetinsertmodal();
});
$(document).on('click', '#registerClose', function()
{
    $('#Registrationmodal').find('[data-dismiss="modal"]').trigger('click');
    resetinsertmodal();
});

//Display record
function view_record() {
    $.ajax({
        url: 'view.php',
        method: 'post',
        success: function (data) {
            if (data.length <= 0) {
                $("#table").hide();
                return;
            } else {
                $("#table").show();
            }

            //clearing the existing rows from the DataTable before populating it with new data. This line is necessary because it ensures that you start with an empty table body before adding the new data rows.
            $('#dataTable tbody').empty();

            var dataArr = data.split("\n");
            for (var i = 0; i < dataArr.length; i++) {
                if (dataArr[i].trim() == "") continue;
                var dataLineArr = dataArr[i].split(",");
                var newRow = '<tr id=' + dataLineArr[0] + ' class="table-row-hover">' +
                    '<td>' + dataLineArr[1] + '</td>' +
                    '<td>' + dataLineArr[2] + '</td>' +
                    '<td>' + dataLineArr[3] + '</td>' +
                    '<td>' + dataLineArr[4] + '</td>' +
                    '<td>' + dataLineArr[5] + '</td>' +
                    '<td><i class="fas fa-edit" onclick="update_record(' + dataLineArr[0] + ');" style="cursor:pointer;"></i></td>' +
                    '<td><i class="fa fa-trash" onclick="delete_record(' + dataLineArr[0] + ');" style="cursor:pointer;"></i></td>' +
                    '</tr>';
                 $('#dataTable tbody').append(newRow);
            }
            // Initialize DataTable
            $('#dataTable').DataTable();
        }
    });
}

//Update record
function update_record(id) 
{
    $('#Updatemodal').modal('show');
    $.ajax({
        url: 'update.php',
        method: 'post',
        data:'action=getupdate&id='+id,
        success:function(data)
        {  
            var dataArr = data.split("\n");
            for(var i=0;i<dataArr.length;i++)
            {
                if(dataArr[i].trim() == "")
                continue;
                var dataLineArr = dataArr[i].split(",");
                $('#hide').val(dataLineArr[0]);
                $('#name').val(dataLineArr[1]);
                $('#email').val(dataLineArr[2]);
                $('#number').val(dataLineArr[3]);
                $('#password').val(dataLineArr[4]);
                $('#cpassword').val(dataLineArr[5]);          
            }
        }
    });
}
function updateuser()
{
    $.ajax({
        url: 'update.php',
        method: 'post',
        data:'action=update&id='+$("#hide").val()+'&username='+$("#name").val()+'&useremail='+$("#email").val()+'&userphonenumber='+$("#number").val()+'&userpassword='+$("#password").val()+'&userconfirmpassword='+$("#cpassword").val(),
        success:function(data)
        {
            var response = JSON.parse(data);
            if(response.error)
            {  
                $('#updateConfirmationMessage').hide();
                $('#updateResultMessage').html('<P class="text-danger">' + response.error +'</p>');
            }
            else if(response.success) {
                $('#updateConfirmationMessage').hide();
                $('#updateResultMessage').html('<P class="text-success">' + response.success +'</p>');
                setTimeout(function() {
                    $('#Updatemodal').modal('hide');
                    $('#updateResultMessage').html('');
                    $('#updateConfirmationMessage').show();
                    $('#TogglerUpdatePassword').removeClass('fa-eye-slash').addClass('fa-eye');
                    $('#password').attr('type', 'password');
                    $('#TogglerUpdateConfirmPassword').removeClass('fa-eye-slash').addClass('fa-eye');
                    $('#cpassword').attr('type', 'password')   
                }, 700);
                view_record();
            }
        }
    });
}
$(document).on('click',  '#updateButtonClose, #updateClose', function(){
    $('#Updatemodal').modal('hide');
    $('#updateResultMessage').html('');
    $('#password').attr('type', 'password');
    $('#TogglerUpdatePassword').removeClass('fa-eye-slash').addClass('fa-eye');
    $('#cpassword').attr('type', 'password');
    $('#TogglerUpdateConfirmPassword').removeClass('fa-eye-slash').addClass('fa-eye');

});

//Delete record
function delete_record(id)
{
    $('#Deletemodal').modal('show'); 
    $.ajax({
        url: 'delete.php',
        method: 'post',
        data:'action=getdelete&id='+id,
        success:function(data)
        {
            var dataArr = data.split("\n");
            for(var i=0;i<dataArr.length;i++)
            {
                if(dataArr[i].trim() == "")
                continue;
                var dataLineArr = dataArr[i].split(",");
                $('#hide').val(dataLineArr[0]);
                $('#username').val(dataLineArr[1]);
                $('#useremail').val(dataLineArr[2]);
                $('#userphonenumber').val(dataLineArr[3]);
            }  
        }
    });
}
function deleteuser()
{
    $.ajax({
        url: 'delete.php',
        method: 'post',
        data:'action=delete&id='+$("#hide").val(),
        success:function(data)
        {
            if(JSON.parse(data).result == "success")
            {
                $('#deleteConfirmationMessage').hide();
                $('#deleteResultMessage').html('<p class="text-success">Record has been successfully deleted</p>');
                setTimeout(function() {
                    $('#Deletemodal').modal('hide');
                    $('#deleteResultMessage').html('');
                    $('#deleteConfirmationMessage').show();
                }, 700);
                view_record();
            }
            else {
                $('#deleteResultMessage').html('<p class="text-danger">Failed to delete record so please check your query or for any errors in the code</p>');
            }
        }
    });
}
$(document).on('click', '#deleteButtonClose, #deleteClose', function() {
    $('#Deletemodal').modal('hide');
});

//Toggle Password and Confirm password
document.addEventListener("DOMContentLoaded", function() {
    var passwordInput = document.getElementById("UserPassword");
    var passwordeyeIcon = document.getElementById("TogglerPassword");
    var confirmpasswordInput = document.getElementById("ConfirmPassword");
    var confirmpasswordeyeIcon  = document.getElementById("TogglerConfirmPassword");
    var updatepasswordInput = document.getElementById("password");
    var updatepasswordeyeIcon = document.getElementById("TogglerUpdatePassword");
    var updateconfirmpasswordInput = document.getElementById("cpassword");
    var updateconfirmpasswordeyeIcon  = document.getElementById("TogglerUpdateConfirmPassword");

    passwordInput.addEventListener("input", function() {
        if (passwordInput.value !== "") {
            passwordeyeIcon.style.display = "inline-block";
        } else {
            passwordeyeIcon.style.display = "none";
            passwordInput.type = "password";
            passwordeyeIcon.classList.remove("fa-eye-slash");
            passwordeyeIcon.classList.add("fa-eye");
        }
    });
    passwordeyeIcon.addEventListener("click", function() {
        if (passwordInput.value !== "") {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                passwordeyeIcon.classList.remove("fa-eye");
                passwordeyeIcon.classList.add("fa-eye-slash");
            } else {
                passwordInput.type = "password";
                passwordeyeIcon.classList.remove("fa-eye-slash");
                passwordeyeIcon.classList.add("fa-eye");
            }
        } 
    });

    confirmpasswordInput.addEventListener("input", function() {
        if (confirmpasswordInput.value !== "") {
        confirmpasswordeyeIcon.style.display = "inline-block";
        } else {
            confirmpasswordeyeIcon.style.display = "none";
            confirmpasswordInput.type = "password";
            confirmpasswordeyeIcon.classList.remove("fa-eye-slash");
            confirmpasswordeyeIcon.classList.add("fa-eye");
        }
    });
    confirmpasswordeyeIcon.addEventListener("click", function() {
        if (confirmpasswordInput.value !== "") {
            if (confirmpasswordInput.type === "password") {
                confirmpasswordInput.type = "text";
                confirmpasswordeyeIcon.classList.remove("fa-eye");
                confirmpasswordeyeIcon.classList.add("fa-eye-slash");
            } else {
                confirmpasswordInput.type = "password";
                confirmpasswordeyeIcon.classList.remove("fa-eye-slash");
                confirmpasswordeyeIcon  .classList.add("fa-eye");
            }
        }
    });
    
    updatepasswordInput.addEventListener("input", function() {
    if (updatepasswordInput.value !== "") {
            updatepasswordeyeIcon.style.display = "inline-block";
        } else {
            updatepasswordeyeIcon.style.display = "none";
            updatepasswordInput.type = "password";
            updatepasswordeyeIcon.classList.remove("fa-eye-slash");
            updatepasswordeyeIcon.classList.add("fa-eye");
        }
    });
    updatepasswordeyeIcon.addEventListener("click", function() {
    if (updatepasswordInput.value !== "") {
            if ( updatepasswordInput.type === "password") {
                updatepasswordInput.type = "text";
                updatepasswordeyeIcon.classList.remove("fa-eye");
                updatepasswordeyeIcon.classList.add("fa-eye-slash");
            } else {
                updatepasswordInput.type = "password";
                updatepasswordeyeIcon.classList.remove("fa-eye-slash");
                updatepasswordeyeIcon.classList.add("fa-eye");
            }
        }
    });

    updateconfirmpasswordInput.addEventListener("input", function() {
    if (updateconfirmpasswordInput.value !== "") {
        updateconfirmpasswordeyeIcon.style.display = "inline-block";
        } else {
        updateconfirmpasswordeyeIcon.style.display = "none";
        updateconfirmpasswordInput.type = "password";
        updateconfirmpasswordeyeIcon.classList.remove("fa-eye-slash");
        updateconfirmpasswordeyeIcon.classList.add("fa-eye");
        }
    });
    updateconfirmpasswordeyeIcon.addEventListener("click", function() {
    if (updateconfirmpasswordInput.value !== "") {
            if (updateconfirmpasswordInput.type === "password") {
                updateconfirmpasswordInput.type = "text";
                updateconfirmpasswordeyeIcon.classList.remove("fa-eye");
                updateconfirmpasswordeyeIcon.classList.add("fa-eye-slash");
            } else {
                updateconfirmpasswordInput.type = "password";
                updateconfirmpasswordeyeIcon.classList.remove("fa-eye-slash");
                updateconfirmpasswordeyeIcon  .classList.add("fa-eye");
            }
        }
    });
});