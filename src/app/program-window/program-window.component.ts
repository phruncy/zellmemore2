import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AutomatonConfigurationService } from '../automaton-configuration.service';
import { VisualizationSelectionComponent } from '../visualization-selection/visualization-selection.component';

@Component({
  selector: 'app-program-window',
  templateUrl: './program-window.component.html',
  styleUrls: ['./program-window.component.css']
}
)

export class ProgramWindowComponent implements OnInit {

  private _selectionDisplayed: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private configurationService: AutomatonConfigurationService,
    private location: Location,
  ) {
    }
  
  get selectionDisplayed(): boolean
  {
    return this._selectionDisplayed;
  }
    
  ngOnInit()
  {}  

  toggleSelection()
  {
    this._selectionDisplayed = !this._selectionDisplayed;
  }

  addWidget()
  {
    console.log("widget added");
  }

  removeWidget()
  {

  }


}
