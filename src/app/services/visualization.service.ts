import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';
import { defaultFactory } from 'src/app/P5Sketches/p5default';
import { p5sketch } from 'src/app/P5Sketches/P5Sketch';
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
import { widgetP5 } from '../P5Sketches/p5Widget';

interface SketchWithId {
    id: string;
    factory: (automaton: AutomatonService) => p5sketch;
}

@Injectable()
export class VisualizationService {
    private _currentSelectionId: number;

    private _numComponentInstances: WritableSignal<number[]>;
    readonly isActiveMap: Signal<boolean[]>;

    private readonly sketchfactories: SketchWithId[] = [
        { id: 'p5default', factory: defaultFactory },
        { id: 'p5barcodes', factory: barCodeFactory },
        { id: 'p5frequency', factory: frequencyFactory },
        { id: 'p5punchcard', factory: punchCardFactory },
        { id: 'p5threads', factory: threadFactory },
        { id: 'p5signals', factory: signalFactory },
        { id: 'p5vortex', factory: vortexFactory },
        { id: 'p5chaos', factory: chaosFactory },
        { id: 'p5waves01', factory: waves01Factory },
        { id: 'p5waves02', factory: waves02Factory },
        { id: 'p5waves03', factory: waves03Factory },
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

    get sketchList(): SketchWithId[] {
        return this.sketchfactories;
    }

    select(id: number) {
        if (id < 0 || id >= this.sketchfactories.length) {
            const unknownComponent = new Error("Oops, this component doesn't exist.");
            throw unknownComponent;
        }
        this._currentSelectionId = id;
    }

    provideSketch(): p5sketch {
        const factory = this.sketchfactories[this._currentSelectionId].factory;
        return factory(this.automaton);
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
