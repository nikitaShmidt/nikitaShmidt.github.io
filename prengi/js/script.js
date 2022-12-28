$(document).ready(function () {
    $(window).scroll(function(){
        if ($(this).scrollTop() > 800) {
            $('.pageup').fadeIn();
        }   else {
            $('.pageup').fadeOut();
        }
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
            $('.homepage').fadeOut();
        }   else {
            $('.homepage').fadeIn();
        }
    });
});
