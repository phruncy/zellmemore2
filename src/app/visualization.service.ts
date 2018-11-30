import { Injectable, 
          Output, 
          EventEmitter,
          Component,
          Type,
       } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WidgetComponent } from './widget/widget.component';
import { COMPONENTS } from './dictionary';
/* All Visualization Components */
import { TestingComponent } from './testing/testing.component';
import { Testing02Component } from './testing02/testing02.component';
import { Testing03Component } from './testing03/testing03.component';

@Injectable({
  providedIn: 'root'
})

export class VisualizationService {

    private _visualizationToDisplay: string;
    private _hasChanged = new Subject<void>();
    private _dictionary = COMPONENTS;
    // program window component subscribes to this
    public hasChanged$ = this._hasChanged.asObservable();
    private visualizationComponents =
    {
        "v001": TestingComponent,
        "v002": Testing02Component,
        "v003": Testing03Component
    };
    
    constructor() 
    {
    }

    get visualizationToDisplay(): string
    {
        return this._visualizationToDisplay;
    }
    /*
     * this is used by the visualization-selection
     * to determine the visualization to display
     * changes are detected by the program window 
     * which then adds the selected visualization as a new widget
     */
    set visualizationToDisplay(id: string)
    {
        this._visualizationToDisplay = id;
        // tells program window about value change
        this._hasChanged.next();
    }

    provideComponentId()
    {
        return COMPONENTS[this._visualizationToDisplay];
    }

    provideComponent() : any
    {
        return this.visualizationComponents[this.visualizationToDisplay];
    }
}
