$("#dropdown").hover(
    function () {
        $('.transition').toggleClass("visible");
        $('.transition').toggleClass("hidden");
        $('.transition').attr({
            tabindex : "1",
            style : "display: block !important"
    }), function () {
        $('.transition').removeAttr('tabindex', "1");
        $('.transition').removeAttr('style', "display: block !important");
    }
});


$('.right.menu').on('click','.item', function(){
    if(!$(this).hasClass('dropdown')) {
        $(this).addClass('active').siblings('.item').removeClass('active');
      }
 });
 