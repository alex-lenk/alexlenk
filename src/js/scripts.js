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


let myData = "1986-10-04";

function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return number + " " + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function birthDateToAge(b) {
    let n = new Date();
    b = new Date(b);
    let age = n.getFullYear() - b.getFullYear();
    return n.setFullYear(1970) < b.setFullYear(1970) ? age - 1 : age;
}

let myAge = declOfNum(birthDateToAge(myData), ['год', 'года', 'лет']);

const js__myAge = document.querySelector('.js__my-age');

window.onload = function () {
    document.querySelector(".menu-toggle").onclick = function () {
        document.querySelector("body").classList.toggle("menu-opened");
    }

    if (anchors.length && window.screen.width < 576) {
        document.querySelector(".menu-link.go").onclick = function () {
            document.querySelector("body").classList.toggle("menu-opened");
        }
    }

    if (js__myAge) {
        js__myAge.innerHTML = myAge;
    }


  console.log();
}
