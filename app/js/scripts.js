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
  document.querySelector('.js__get-year').innerHTML = String(new Date().getFullYear());
  /* END */

/*
  let form = document.querySelector('.contacts-form');

  if (form.length) {

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let data = new FormData(form);

      $('#alert').text('Processing...').fadeIn(0); // Display "Processing" to let the user know that the form is being submitted

      grecaptcha.ready(function () {
        grecaptcha.execute('6LfXZCEaAAAAAO3QtLWSrG5ofpC1IMwBJqo0TCNg', {action: 'contact'}).then(function (token) {
          let recaptchaResponse = document.getElementById('recaptchaResponse');
          recaptchaResponse.value = token;

          console.log(getQueryString(data))

          const request = new XMLHttpRequest();

          // Указываем путь до файла на сервере, который будет обрабатывать наш запрос
          const url = '/php/sendmail.php';

          // Так же как и в GET составляем строку с данными, но уже без пути к файлу
          //const params = "ui_name=" + id_product + "&qty_product=" + qty_product;

          /!* Указываем что соединение	у нас будет POST, говорим что путь к файлу в переменной url, и что запрос у нас
     асинхронный, по умолчанию так и есть не стоит его указывать, еще есть 4-й параметр пароль авторизации, но этот
     параметр тоже необязателен.*!/
          request.responseType = "json";

          request.open("POST", url, true);

          //В заголовке говорим что тип передаваемых данных закодирован.
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

          request.addEventListener("readystatechange", () => {

            if (request.readyState === 4 && request.status === 200) {
              let obj = request.response;

              console.log(request.responseText);
              console.log(obj);
            }
          });

          // Вот здесь мы и передаем строку с данными, которую формировали выше. И собственно выполняем запрос.
          request.send(data);

          // Make the Ajax call here
          /!*          $.ajax({
                      url: '/php/sendmail.php',
                      type: 'post',
                      data: $('.contacts-form').serialize(),
                      dataType: 'json',
                      success: function (_response) {
                        // The Ajax request is a success. _response is a JSON object
                        var error = _response.error;
                        var success = _response.success;
                        if (error != "") {
                          // In case of error, display it to user
                          $('#alert').html(error);
                        } else {
                          // In case of success, display it to user and remove the submit button
                          $('#alert').html(success);
                          $('#submit-button').remove();
                        }
                      },
                      error: function (jqXhr, json, errorThrown) {
                        // In case of Ajax error too, display the result
                        var error = jqXhr.responseText;
                        $('#alert').html(error);
                      }
                    });*!/
        });
      });
    });


    function getQueryString(formData) {
      let pairs = [];
      for (let [key, value] of formData.entries()) {
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
      return '?' + pairs.join('&');
    }
  }*/
}
