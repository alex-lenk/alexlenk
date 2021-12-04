'use strict'

const BODY = document.querySelector('body')


/* BEGIN: Плавное прокручивание к анкору ссылки */
const anchors = document.querySelectorAll('.js__go')

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


/* BEGIN: Инициализация плавающего блока на странице */
let navFly = 'nav__fly'
let navFlyInterval = 'nav__fly-interval'

if (window.screen.width > 800) {
  /*
  window.addEventListener('scroll', function () {
    if (pageYOffset > 700) {
      BODY.classList.add(navFly);
    } else if (pageYOffset > 450) {
      console.log('450')
    } else {
      BODY.classList.remove(navFly);
    }
  })
  */

  const throttle = (func, ms) => { // объявляем функцию throttle
    let locked = false // переменная которая отвечает за блокировку вызова функции

    return function () { // эта функция запускается при каждом событии движения курсора
      if (locked) return // если заблокировано, то прекращаем выполнение этой функции

      const context = this // запоминаем передаваемую функцию func
      const args = arguments // запоминаем параметры передаваемой функции func

      locked = true // блокируем вызов функции

      setTimeout(() => { // устанавливаем время ожидания

        func.apply(context, args) // выполняем переданную функцию func
        locked = false // снимаем блокировку
      }, ms) // подставляем значение параметра ms
    }
  }

  document.addEventListener('scroll', throttle(function () {
    if (pageYOffset > 300) {
      ///console.log('nav__fly-interval');
      BODY.classList.add(navFlyInterval);
    }
    if (pageYOffset > 900) {
      //console.log('add');
      BODY.classList.add(navFly);
    } else if (pageYOffset < 900) {
      //console.log('pageScrollUp');
      BODY.classList.remove(navFlyInterval);
      BODY.classList.remove(navFly);
    }
  }, 900))
}
/* END */


/* BEGIN: Открытие и закрытие панели меню */
const jsNavMenu = '.js-nav__menu'
const jsNavToggle = '.js-nav__toggle'

let menuOpened = 'menu-opened';

function toggleMenu() {
  BODY.classList.toggle(menuOpened);
}

document.querySelector('.js-nav__toggle').addEventListener('click', () => toggleMenu())

BODY.addEventListener('click', e => { // при клике в любом месте окна браузера
  const target = e.target // находим элемент, на котором был клик
  if (BODY.classList.contains(menuOpened) && !target.closest(jsNavMenu) && !target.closest(jsNavToggle)) {
    // если этот элемент или его родительские элементы не окно навигации и не кнопка
    toggleMenu()
  }
})
/* END:  */


/* BEGIN: Высчитываем сколько мне полных лет по моей дате рождения */
let js__myAge = document.querySelector('.js__my-age')

const getMyAge = () => {
  let
    currentDate = new Date(), //Текущая дата
    getCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), //Текущая дата без времени
    dateBirth = new Date(1986, 10, 4), //Дата рождения
    dateBirthCurrent = new Date(getCurrentDate.getFullYear(), dateBirth.getMonth(), dateBirth.getDate()), //Дата рождения в текущем году
    myAge = getCurrentDate.getFullYear() - dateBirth.getFullYear();//Возраст = текущий год - год рождения

  if (getCurrentDate < dateBirthCurrent) {
//Если ДР в этом году ещё предстоит, то вычитаем из age один год
    myAge = myAge - 1;
    js__myAge.innerHTML = "" + myAge;
  } else {
    js__myAge.innerHTML = "" + myAge;
  }
}

if (js__myAge) getMyAge()
/* END:  */


/* BEGIN: Получаем актуальный год и вставляет в селектор подвала */
let js__getYear = document.querySelector('.js__get-year');
if (js__getYear) {
  js__getYear.innerHTML = String(new Date().getFullYear());
}
/* END */
