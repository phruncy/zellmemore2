import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';
import { defaultFactory } from 'src/app/P5Sketches/p5default';
import { P5Sketch } from 'src/app/P5Sketches/P5Sketch';
import { AutomatonService } from './automaton.service';
import { barCodeFactory } from '../P5Sketches/p5barcode';
import { frequencyFactory } from '../P5Sketches/p5frequency';
import { punchCardFactory } from '../P5Sketches/p5punchCard';
import { threadFactory } from '../P5Sketches/p5threads';
import { signalFactory } from '../P5Sketches/p5signals';
import { vortexFactory } from '../P5Sketches/p5vortex';
import { chaosFactory } from '../P5Sketches/p5chaos';
import { waves01Factory } from '../P5Sketches/p5waves01';
import { waves02Factory } from '../P5Sketches/p5waves02';
import { waves03Factory } from '../P5Sketches/p5waves03';

@Injectable()
export class VisualizationService {
    private _currentSelectionId: number;
    private _selectionChanged = new Subject<void>();
    public visualizationRequested$ = this._selectionChanged.asObservable();

    private _numComponentInstances: WritableSignal<number[]>;
    readonly isActiveMap: Signal<boolean[]>;

    /*private p5Sketches = [
        p5waves02,
        p5waves03,
    ];*/

    private sketchfactories = [
        defaultFactory,
        barCodeFactory,
        frequencyFactory,
        punchCardFactory,
        threadFactory,
        signalFactory,
        vortexFactory,
        chaosFactory,
        waves01Factory,
        waves02Factory,
        waves03Factory,
    ];

    constructor(private automaton: AutomatonService) {
        this._numComponentInstances = signal(new Array(this.sketchfactories.length).fill(0));
        this.isActiveMap = computed(() =>
            this._numComponentInstances().map((element) => element > 0),
        );
    }

    get visualizationToDisplay(): number {
        return this._currentSelectionId;
    }

    select(id: number) {
        if (id < 0 || id >= this.sketchfactories.length) {
            const unknownComponent = new Error("Oops, this component doesn't exist.");
            throw unknownComponent;
        }
        this._currentSelectionId = id;
        this._selectionChanged.next();
    }

    provideSketch(): P5Sketch {
        const factory = this.sketchfactories[this._currentSelectionId];
        const sketch = new P5Sketch(factory, this.automaton);
        return sketch;
    }

    addToActive(id: number) {
        this._numComponentInstances.update((data) => {
            const current = [...data];
            current[id]++;
            return current;
        });
    }

    removeFromActive(id: number) {
        this._numComponentInstances.update((data) => {
            if (data[id] > 0) {
                const current = [...data];
                current[id]--;
                return current;
            }
            return data;
        });
    }
}
