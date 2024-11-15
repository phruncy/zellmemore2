import { Component, OnInit } from '@angular/core';
import { VisualizationDetailService } from '../services/visualization-detail.service';

@Component({
    selector: 'app-visualization-selection',
    templateUrl: './visualization-selection.component.html',
    styleUrls: ['./visualization-selection.component.scss']
})
export class VisualizationSelectionComponent implements OnInit {

  private _visualizations: any[] = [];
  constructor(private visualizationDetailService: VisualizationDetailService,) { }

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
      data => { this._visualizations = data; } 
    );
  }
}
