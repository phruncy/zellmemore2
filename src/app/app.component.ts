import { Component } from '@angular/core';
import { ProgramWindowComponent } from './program-window/program-window.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zellmemore';
}
