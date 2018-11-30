import { Component, OnInit } from '@angular/core';
import { VisualizationDetailService } from '../visualization-detail.service';
import { VisualizationService } from '../visualization.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-visualization-selection',
    templateUrl: './visualization-selection.component.html',
    styleUrls: ['./visualization-selection.component.css']
})
export class VisualizationSelectionComponent implements OnInit {

  private _visualizations: any[] = [];
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
