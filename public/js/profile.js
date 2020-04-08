
$('#edit-profile').click(function (e) {
    
    var container = document.querySelectorAll("input[disabled]");

    console.log(container);

    container.forEach(element => {
        
        if(element.name != "role" && element.name != "first-name") {
            element.removeAttribute("disabled");
            
        }
        console.log(element);
    });

    this.setAttribute('style', 'display : none');

    $('#buttons_edit').removeAttr("hidden");
    
});


$('#cancel-profile').click( () => {

    console.log("coucou")
    
    $("input").attr("disabled");

})

