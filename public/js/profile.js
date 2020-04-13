
$('#edit-profile').click(function (e) {
    
    var allInput = $(':input');

    allInput.removeAttr("disabled")
    .filter("input[name=password], input[name=teacher-number], select[name=role]")
    .attr("disabled", true);

    this.setAttribute('style', 'display : none');

    $('#button-edit').removeAttr("hidden");
    
});

// If cancel the editor, we refresh the page
$('#cancel-profile').click( () => {

    location.reload(true);

})




