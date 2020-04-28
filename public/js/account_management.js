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

// Modal reset password
$('.reset').click(function () {

    // For approve the new password, we check if the user write the same password 2 times
    $('.ui.modal.pass').modal({
        closable    : false,
        onApprove   : function () {           

            let pass1 = $('#new-pass-1').val();
            let pass2 = $('#new-pass-2').val();
            
            if(pass2 !== pass1) {
                $('#new-pass-2').attr('style', 'color : red');
                return false;
            }
        }
    })
    .modal('show');
})

// event related to changes in input
$('#new-pass-1').change(function() {

    let passwordVerified = checkPass((this).value);

    $('#error-message').children().remove();

    // check if the array "passwordVerified" is empty and activate the popup otherwise
    if(passwordVerified.length > 0 ) {
       
        passwordVerified.forEach(element => {
            $("#error-message").append('<li>' + element);            
        });

        $('.ui.message').removeAttr('hidden');

        // Prevents validating an incorrect password
        $('.ui.modal.pass').modal({
            onApprove : function () {
                return false;
            }
        })
    }
    else {

        // hide the message box and authorize the validate
        $('.ui.message').attr('hidden', 'true');

        $('.ui.modal.pass').modal({
            onApprove : function () {
                return true;
            }
        })
    }



})


// Modal add user
$('#add-user').click(function () {
    $('.ui.modal.adduser').modal({
        closable    : false,
        onApprove   : function() {
        }
    })
    .modal('show');
});






