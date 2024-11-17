import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
import { ChaosComponent } from '../widget-content/chaos/chaos.component';
import { ContentBase } from '../content-base/contentBase.component';

@Injectable({
  providedIn: 'root'
})

export class VisualizationService {

    private _visualizationToDisplay: string;
    private _selectionChanged = new Subject<void>();
    // program window component subscribes to this
    public selectionChanged$ = this._selectionChanged.asObservable();
    // list of all displayed visualizations in the DOM
    private _activeComponentsChanged = new Subject<void>();
    public $activeComponentsChanged = this._activeComponentsChanged.asObservable();
    private _activeComponents = [];
    private visualizationComponents =
    {
        "v001": VizDefaultComponent,
        "v002": Testing02Component,
        "v003": VizFrequencyComponent,
        "v004": VizPunchcardComponent,
        "v005": VizThreadsComponent,
        "v006": VizSignalsComponent,
        "v007": VizVortexComponent,
        "v008": ChaosComponent,
        "v009": VizWaves01Component,
        "v010": VizWaves02Component,
        "v011": VizWaves03Component,
    };

    constructor() {}

    get visualizationToDisplay(): string
    {
        return this._visualizationToDisplay;
    }

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
        this._selectionChanged.next();
    }

    get activeComponents() 
    {
        return this._activeComponents;
    }

    getComponentById(id) 
    {
        return this.visualizationComponents[id];
    }

    provideComponent() : any
    {
        return this.visualizationComponents[this.visualizationToDisplay];
    }

    addToActive(component: ContentBase) 
    {
        const id = this.visualizationToDisplay;
        this._activeComponents.push(id);
        const sub = component.$onDestroy.subscribe(
            () => {
                this.removeFromActive(id);
                sub.unsubscribe();
            }
        );
        this._activeComponentsChanged.next();
    }

    removeFromActive(id: string) 
    {
        const index = this._activeComponents.indexOf(id);
        if (index === 0) {
            this._activeComponents.shift();
        } else {
            this._activeComponents.splice(index, 1);
        }
        this._activeComponentsChanged.next();
    }
}
