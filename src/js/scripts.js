const anchors = document.querySelectorAll('.go');

if (anchors.length) {
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
}

window.onload = function () {
    document.querySelector(".menu-toggle").onclick = function () {
        document.querySelector("body").classList.toggle("menu-opened");
    }

    if (anchors.length) {
        document.querySelector(".menu-link.go").onclick = function () {
            document.querySelector("body").classList.toggle("menu-opened");
        }
    }
}
