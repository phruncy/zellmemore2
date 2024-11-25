import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentBase } from '../content-base/contentBase.component';
import { p5barcode } from 'src/P5Sketches/p5barcode';
import { p5punchCard } from 'src/P5Sketches/p5punchCard';
import { p5default } from 'src/P5Sketches/p5default';
import { P5Sketch } from '../../P5Sketches/P5Sketch';
import { p5waves01 } from 'src/P5Sketches/p5waves01';
import { p5frequency } from 'src/P5Sketches/p5frequency';
import { p5threads } from 'src/P5Sketches/p5threads';
import { p5signals } from 'src/P5Sketches/p5signals';
import { p5waves02 } from 'src/P5Sketches/p5waves02';
import { p5waves03 } from 'src/P5Sketches/p5waves03';
import { p5chaos } from 'src/P5Sketches/p5chaos';

@Injectable({
  providedIn: 'root'
})

export class VisualizationService {

    private _visualizationToDisplay: string;
    private _selectionChanged = new Subject<void>();
    public selectionChanged$ = this._selectionChanged.asObservable();
    private _activeComponentsChanged = new Subject<void>();
    public $activeComponentsChanged = this._activeComponentsChanged.asObservable();
    private _activeComponents = [];

    private p5Sketches = 
    {
        "v001": p5default,
        "v002": p5barcode,
        "v003": p5frequency,
        "v004": p5punchCard,
        "v005": p5threads,
        "v006": p5signals,
        "v007": null,
        "v008": p5chaos,
        "v009": p5waves01,
        "v010": p5waves02,
        "v011": p5waves03,
    };
    private visualizationComponents =
    {
        /*"v001": VizDefaultComponent,
        "v002": Testing02Component,
        "v003": VizFrequencyComponent,
        "v004": VizPunchcardComponent,
        "v005": VizThreadsComponent,
        "v006": VizSignalsComponent,
        "v007": VizVortexComponent,
        "v008": ChaosComponent,
        "v009": VizWaves01Component,
        "v010": VizWaves02Component,
        "v011": VizWaves03Component,*/
    };

    constructor() {}

    get visualizationToDisplay(): string
    {
        return this._visualizationToDisplay;
    }

    set visualizationToDisplay(id: string)
    {
        if (!(id in this.p5Sketches)) {
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

    provideSketch(): P5Sketch
    {
        return this.p5Sketches[this.visualizationToDisplay];
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
