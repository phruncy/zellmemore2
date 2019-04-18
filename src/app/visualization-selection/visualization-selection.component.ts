import { Component, OnInit } from '@angular/core';
import { VisualizationDetailService } from '../services/visualization-detail.service';
import { VisualizationService } from '../services/visualization.service';
import { Observable } from 'rxjs';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-visualization-selection',
    templateUrl: './visualization-selection.component.html',
    styleUrls: ['./visualization-selection.component.scss']
})
export class VisualizationSelectionComponent implements OnInit {

  private _visualizations: any[] = [];
  private faPlusCircle = faPlusCircle;
  constructor(
        private visualizationDetailService: VisualizationDetailService,
        private visualizationService: VisualizationService
    ) 
    { }

  get visualizations(): any[]
  {
    return this._visualizations;
  }

  ngOnInit() 
  {
    this.fetchVisualizations();
  }

  // visualizations are loaded asynchronously
  fetchVisualizations()
  {
    this.visualizationDetailService.provideVisualizations().subscribe(
      data => {
        this._visualizations = data;
      } 
    );
  }

  // tells the visualization service which option was selected
  // function is called whenever a DOM Element associated with a 
  // _visualization-Object is clicked 
  selectVisualizationToDisplay(id: string)
  {
    this.visualizationService.visualizationToDisplay = id;
  }



}
