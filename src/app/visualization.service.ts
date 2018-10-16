import { Injectable, 
          Output, 
          EventEmitter,
       } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WidgetComponent } from './widget/widget.component';
import { COMPONENTS } from './dictionary';

@Injectable({
  providedIn: 'root'
})

export class VisualizationService {

  private _visualizationToDisplay: string;
  private _hasChanged = new Subject<void>();
  private _dictionary = COMPONENTS;
  // program window component subscribes to this
  public hasChanged$ = this._hasChanged.asObservable();
  
  constructor() 
  {
  }

  get visualizationToDisplay(): string
  {
    return this._visualizationToDisplay;
  }
  
  // this is used by the visualization-selection
  // to determine the visualization to display
  // changes are detected by the program window which then 
  // adds the selected visualization as a new widget
  set visualizationToDisplay(id: string)
  {
    this._visualizationToDisplay = id;
    // tells program window about value change
    this._hasChanged.next();
  }

  provideComponent()
  {
    return COMPONENTS[this._visualizationToDisplay];
  }
}
