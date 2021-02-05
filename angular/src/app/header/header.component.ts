import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.scss']
})

export class HeaderComponent {
  title = 'Alex Lenk'
  logo = '../../assets/img/logo.svg'
  logoAlt = 'AlexLenk.ru HTML/CSS/JS coder'


  OnClick() {
    /* BEGIN: Плавное прокручивание к анкору ссылки */
    /*let anchors = document.querySelectorAll('.js__go');
    let anchor;

    if (anchors.length) {
      for (anchor of anchors) {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const blockID = anchor.getAttribute('href').substr(1)

          document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        })
      }
    }*/
    /* END:  */
  }
}
