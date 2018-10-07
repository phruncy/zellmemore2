import { Component,
         OnInit, 
         Output, 
         EventEmitter,
       } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VisualizationSelectionComponent } from '../visualization-selection/visualization-selection.component';
import { VisualizationService } from '../visualization.service';

@Component({
  selector: 'app-program-window',
  templateUrl: './program-window.component.html',
  styleUrls: ['./program-window.component.css']
}
)

export class ProgramWindowComponent implements OnInit {

  @Output() onSelectionChange: EventEmitter<void> = new EventEmitter<void>();
  private _selectionDisplayed: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private visualizationService: VisualizationService,
    private location: Location,
  ) {
    }
  
  get selectionDisplayed(): boolean
  {
    return this._selectionDisplayed;
  }
    
  ngOnInit()
  {
    // a new widget is added whenever the selected visualization changes
    // change in value is induced by the selection component's
    // (click) Callback
    this.visualizationService.hasChanged$.subscribe(
      () => {
        console.log("something happened");
        this.addWidget(this.visualizationService.visualizationToDisplay);
      }      
    )
  }  

  toggleSelection()
  {
    this._selectionDisplayed = !this._selectionDisplayed;
  }

  addWidget(id: any)
  {
    console.log("widget added with id: " + id);
  }

  removeWidget()
  {

  }


}
