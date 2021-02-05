import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ExperienceComponent} from "./experience/experience.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {SkillsComponent} from "./skills/skills.component";
import {ContactsComponent} from "./contacts/contacts.component";

const routes: Routes = [
  {'path': '', component: HomeComponent},
  {'path': 'experience', component: ExperienceComponent},
  {'path': 'portfolio', component: PortfolioComponent},
  {'path': 'skills', component: SkillsComponent},
  {'path': 'contacts', component: ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
