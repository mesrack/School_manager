$("#dropdown").hover(
    function () {
        $('.transition').toggleClass("visible");
        $('.transition').toggleClass("hidden");
        $('.transition').attr({
            tabindex : "-1",
            style : "display: block !important"
    })
});

