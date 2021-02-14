import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {PostFormComponent} from './post-form/post-form.component'
import {PostComponent} from './post/post.component'
import {HeaderComponent} from './header/header.component'
import {AppRoutingModule} from './app-routing.module'
import { HomeComponent } from './home/home.component'
import { ExperienceComponent } from './experience/experience.component'
import { PortfolioComponent } from './portfolio/portfolio.component'
import { FooterComponent } from './include/footer/footer.component'
import { HeaderPageComponent } from './include/header-page/header-page.component'
import { MenuComponent } from './include/menu/menu.component'
import { SkillsComponent } from './skills/skills.component'
import { ContactsComponent } from './contacts/contacts.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostFormComponent,
    PostComponent,
    HomeComponent,
    ExperienceComponent,
    PortfolioComponent,
    FooterComponent,
    HeaderPageComponent,
    MenuComponent,
    SkillsComponent,
    ContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
