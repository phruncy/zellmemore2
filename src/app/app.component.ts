import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VisualizationSelectionComponent } from "./visualization-selection/visualization-selection.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet, VisualizationSelectionComponent]
})
export class AppComponent 
{
  title = 'zellmemore';
}