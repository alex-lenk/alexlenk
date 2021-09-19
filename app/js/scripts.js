'use strict';

/* BEGIN: Плавное прокручивание к анкору ссылки */
const anchors = document.querySelectorAll('.js__go');

if (anchors.length) {
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }
}
/* END:  */


/* BEGIN: Высчитываем сколько мне полных лет по моей дате рождения */
let myData = '1986-10-04';

function declOfNum(number, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function birthDateToAge(b) {
  let n = new Date();
  b = new Date(b);
  let age = n.getFullYear() - b.getFullYear();
  return n.setFullYear(1970) < b.setFullYear(1970) ? age - 1 : age;
}

let myAge = declOfNum(birthDateToAge(myData), ['год', 'года', 'лет']);

const js__myAge = document.querySelector('.js__my-age');

if (js__myAge) {
  js__myAge.innerHTML = myAge;
}
/* END:  */


window.onload = function () {
  /* BEGIN: Открытие и закрытие панели меню */
  document.querySelector('.menu-toggle').onclick = function () {
    document.querySelector('body').classList.toggle('menu-opened');
  }

  document.querySelector('.menu-float__box').addEventListener('click', function () {
    document.querySelector('body').classList.toggle('menu-opened');
  });
  /* END:  */


  /* BEGIN: Закрытие панели меню на мобильном при клике на анкор */
  if (anchors.length && window.screen.width < 576) {
    let js__goMenu = document.querySelectorAll('.js__go-menu');

    [].forEach.call(js__goMenu, function (e) {
      e.addEventListener('click', function () {
        document.querySelector('body').classList.remove('menu-opened');
      });
    });
  }
  /* END:  */


  /* BEGIN: Инициализация плавающего блока на странице */
  window.addEventListener('scroll', function () {
    if (pageYOffset >= 700) {
      document.querySelector('body').classList.add('menu-fly');
    } else {
      document.querySelector('body').classList.remove('menu-fly');
    }
  });
  /* END */


  /* BEGIN: Получаем актуальный год и вставляет в селектор подвала */
  //document.querySelector('.js__get-year').innerHTML = String(new Date().getFullYear());
  /* END */

  $(document).ready(function () {
    // Removing AjaxForm success message
    if (typeof (AjaxForm) != 'undefined') {
      AjaxForm.Message.success = function () {
      };
    }
  });
}

// Show AjaxForm success message in modal
$(document).on('af_complete', function (event, response) {
  var form = response.form;
  if (response.success) {
    $.fancybox.close();
    $.fancybox.open('<div class="popup" id="popup-call"><div class="popup-title">' + response.message + '</div></div>');
  }
});
