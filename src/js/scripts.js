//= lib/jquery-3.5.1.slim.min.js
//= lib/svgxuse.min.js


$(document).ready(function () {
    $(".menu-toggle").click(
        function () {
            $('body').toggleClass('nav-opened');
        }
    );

    $(function () {
        $("a[href^='#']").click(function () {
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top + "px"});
            return false;
        });
    });
});
