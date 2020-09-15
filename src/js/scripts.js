$(document).ready(function () {
    $('.menu-toggle').click(function () {
        $('body').toggleClass('menu-opened');
    });
});

const anchors = document.querySelectorAll('.go');

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}
