$(document).ready(function () {
    $('.menu-toggle').click(function () {
        $('body').toggleClass('menu-opened');
    });

    $(function () {
        $('a[href^="#"]').click(function () {
            var _href = $(this).attr('href');
            $('html, body').animate({scrollTop: $(_href).offset().top + 'px'});
            return false;
        });
    });
});
