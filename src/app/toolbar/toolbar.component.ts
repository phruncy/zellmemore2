import { Component } from '@angular/core';
import { ToolbarToprowComponent } from './toolbar-toprow/toolbar-toprow.component';
import { MatDivider } from '@angular/material/divider';
import { AutomatonControllerComponent } from './automaton-controller/automaton-controller.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ToolbarToprowComponent, MatDivider, AutomatonControllerComponent],
  styleUrl: './toolbar.component.scss',
  template: `
    <app-toolbar-toprow [(displayController)]="controllerDisplayed"></app-toolbar-toprow>
    <mat-divider></mat-divider>
    <app-automaton-controller class="controller" [class.active]="controllerDisplayed"></app-automaton-controller>`
})
export class ToolbarComponent 
{
  controllerDisplayed = true;
}