import { Injectable, 
       } from '@angular/core';
import { Observable, Subject } from 'rxjs';
/* All Visualization Components */
import { Testing02Component } from '../widget-content/barcodes/testing02.component';
import { VizDefaultComponent } from '../widget-content/default/viz-default.component';
import { VizPunchcardComponent } from '../widget-content/punchcard/viz-punchcard.component';
import { VizThreadsComponent } from '../widget-content/threads/viz-threads.component';
import { VizFrequencyComponent } from '../widget-content/frequency/viz-frequency.component';
import { VizVortexComponent } from '../widget-content/vortex/viz-vortex.component';
import { VizSignalsComponent } from '../widget-content/signals/viz-signals.component';
import { VizWaves01Component } from '../widget-content/waves01/viz-waves01.component';
import { VizWaves02Component } from '../widget-content/waves02/viz-waves02.component';
import { VizWaves03Component } from '../widget-content/waves03/viz-waves03.component';
import { VizWaves04Component } from '../widget-content/waves04/viz-waves04.component';

@Injectable({
  providedIn: 'root'
})

export class VisualizationService {

    private _visualizationToDisplay: string;
    private _hasChanged = new Subject<void>();
    // program window component subscribes to this
    public hasChanged$ = this._hasChanged.asObservable();
    private visualizationComponents =
    {
        "v001": VizDefaultComponent,
        "v002": Testing02Component,
        "v003": VizFrequencyComponent,
        "v004": VizPunchcardComponent,
        "v005": VizThreadsComponent,
        "v006": VizSignalsComponent,
        "v007": VizVortexComponent,
        "v009": VizWaves01Component,
        "v010": VizWaves02Component,
        "v011": VizWaves03Component,
        "v012": VizWaves04Component
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
            const unknownComponent = new Error('Oops, this component doesn\'t exist.');
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

    /* returns the component for the currently selected id */
    provideComponent() : any
    {
        return this.visualizationComponents[this.visualizationToDisplay];
    }
}
