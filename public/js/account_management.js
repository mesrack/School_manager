function checkPass (password) {  

    let tabError = [];
    const regexMaj = new RegExp ("[A-Z]+","g")    // Capital letter
    const regexNum = new RegExp ("[0-9]+","g");   // numbers
    const regexspe = /^[\w]*$/;                   // Alphanumérique and underscore


    // check if pass is more 6 characters
    if(password.length < 6 ) {
        tabError.push(" minimum 6 characters")
    }

    // verif si il a une maj
    let tabPass = password.match(regexMaj);
    if(tabPass == null) {
        tabError.push(" capital letter")
    }

    // verif si il a une carac spé
    if(regexspe.test(password) == true) {
        tabError.push(" special characters")
    }

    // verif si il a un numéro
    tabPass = password.match(regexNum);
    if(tabPass == null) {
        tabError.push(" numbers")
    }

    return tabError;
}

/***************** Init Variables ****************/
var pass1 = '';
var pass2 = '';
var passValidated;
var identicalPass;
var userID = '';


/***************************************************** */
/***************** Modal reset password ****************/
/***************************************************** */

$('.reset').click(function () {

    $('#user-id').attr("value", this.id);
    userID = this.id;
    passValidated = false;
    identicalPass = false;
    $('#button-pass').attr('disabled', true);
    

    // For approve the new password, we check if the user write the same password 2 times
    $('.ui.modal.pass').modal({
        closable    : false,
        onApprove   : function () {

            if(passValidated === true && identicalPass === true) {
                $('#form-pass').trigger("reset");
                return true;
            }

            return false;
        },
        onDeny      : function () {
            $('#form-pass').trigger("reset");
        }
    })
    .modal('show');
})

/***************** check if user write the same password twice ****************/
$('#new-pass-2').keyup(function () {
    pass2 = this.value;
    
    if(pass2 === pass1) {
        $(this).removeAttr("style");
        identicalPass = true;
        if(passValidated === true) {
            $('#button-pass').removeAttr('disabled');
        }
    } else {
        $(this).attr("style", "color : red");
        identicalPass = false;
    }
})


/***************** event related to changes in input ****************/
$('#new-pass-1').change(function() {

    let tabError = checkPass((this).value);

    pass1 = this.value;

    $('#error-message').children().remove();

    // check if the array "tabError" is empty and activate the popup otherwise
    if(tabError.length > 0 ) {
       
        tabError.forEach(element => {
            $("#error-message").append('<li>' + element);            
        });
        $('.ui.message').removeAttr('hidden');
        passValidated = false;

    } else {
        // hide the message box and authorize the validate
        $('.ui.message').attr('hidden', 'true');
        passValidated = true;
    }
})

/***************** submit form #form-pass ****************/
$('form#form-pass').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
        type : 'post',
        url  : '/account_management/reset-pass',
        data : {
            userID : userID,
            password : pass1
        }
    }).done(function (data) {
        alert("bien effectué")
        document.location.reload(true);
        
    })
})




/***************************************************** */
/********************* Modal add user ******************/
/***************************************************** */

$('#add-user').click(function () {
    $('.ui.modal.adduser').modal({
        closable    : false,
        onApprove   : function() {
        }
    })
    .modal('show');
});


/***************** submit form #form-user ****************/
$('form#form-user').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
        type : 'post',
        url  : '/account_management/add-user',
        data : {
            firstname   : $('#first-name').val(),
            lastname    : $('#last-name').val(),
            password    : $('#password').val()
        }
    })
})

