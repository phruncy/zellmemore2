import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProgramWindowComponent} from './program-window/program-window.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

const routes: Routes =
[
  {path: 'home', component: HomeComponent},
  {path: 'program-window', component: ProgramWindowComponent},
  {path: 'data-disclaimer', component: DisclaimerComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule(
  {
    imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
}
        )],
    exports: [RouterModule]
  }
)
export class AppRoutingModule { }
