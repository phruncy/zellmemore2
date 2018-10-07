import { Component, OnInit } from '@angular/core';
import { VisualizationDetailService } from '../visualization-detail.service';

@Component({
  selector: 'app-visualization-selection',
  templateUrl: './visualization-selection.component.html',
  styleUrls: ['./visualization-selection.component.css']
})
export class VisualizationSelectionComponent implements OnInit {

  private _visualizations: any[] = [];
  constructor(private visualizationDetailService: VisualizationDetailService) { }

  get visualizations(): any[]
  {
    return this._visualizations;
  }

  ngOnInit() 
  {
    this.fetchVisualizations();
  }

  //visualizations are loaded asynchronously
  fetchVisualizations()
  {
    this.visualizationDetailService.provideVisualizations().subscribe(
      data => {
        this._visualizations = data;
        console.log(data);
      } 
    );
  }

  toggleSelectionDisplay()
  {
    this._selectionDisplayed = !this._selectionDisplayed;
  }


}
