import {Component} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.scss']
})

export class HeaderComponent {
  title = 'Александр'
  logo = '../../assets/img/logo.svg'
  logoAlt = 'AlexLenk.ru HTML/CSS/JS coder'
}
