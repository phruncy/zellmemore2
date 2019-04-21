import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProgramWindowComponent} from './program-window/program-window.component';
import { ImpressumComponent } from './impressum/impressum.component';

const routes: Routes =
[
  {path: 'home', component: HomeComponent},
  // Default-Route, wenn Seite geladen wird
  // Route zu einem Programm:
  {path: 'program-window', component: ProgramWindowComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }
)
export class AppRoutingModule { }
