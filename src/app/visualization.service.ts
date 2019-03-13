import { Injectable, 
       } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WidgetComponent } from './widget/widget.component';
import { COMPONENTS } from './dictionary';
/* All Visualization Components */
import { TestingComponent } from './testing/testing.component';
import { Testing02Component } from './testing02/testing02.component';
import { Testing03Component } from './testing03/testing03.component';
import { VizDefaultComponent } from './viz-default/viz-default.component';
import { VizPunchcardComponent } from './viz-punchcard/viz-punchcard.component';

@Injectable({
  providedIn: 'root'
})

export class VisualizationService {

    private _visualizationToDisplay: string;
    private _dictionary = COMPONENTS;
    private _hasChanged = new Subject<void>();
    // program window component subscribes to this
    public hasChanged$ = this._hasChanged.asObservable();
    private visualizationComponents =
    {
        "v001": VizDefaultComponent,
        "v002": Testing02Component,
        "v003": Testing03Component,
        "v004": VizPunchcardComponent
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
        if (!(id in this.visualizationComponents)) {
            const unknownComponent = new Error('This component doesnt exist yet.');
            throw unknownComponent;
        }
        try {
            this._visualizationToDisplay = id;
        } catch (error) {
            console.log(error);
        }
        // tells program window about value change
        this._hasChanged.next();
    }

    provideComponentId()
    {
        
        return COMPONENTS[this._visualizationToDisplay];
    }

    /* returns the component for the currently selected id */
    provideComponent() : any
    {
        return this.visualizationComponents[this.visualizationToDisplay];
    }
}
