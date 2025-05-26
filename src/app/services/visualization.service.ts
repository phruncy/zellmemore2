import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';
import { p5barcode } from 'src/app/P5Sketches/p5barcode';
import { p5punchCard } from 'src/app/P5Sketches/p5punchCard';
import { p5default } from 'src/app/P5Sketches/p5default';
import { P5Sketch } from 'src/app/P5Sketches/P5Sketch';
import { p5waves01 } from 'src/app/P5Sketches/p5waves01';
import { p5frequency } from 'src/app/P5Sketches/p5frequency';
import { p5threads } from 'src/app/P5Sketches/p5threads';
import { p5signals } from 'src/app/P5Sketches/p5signals';
import { p5waves02 } from 'src/app/P5Sketches/p5waves02';
import { p5waves03 } from 'src/app/P5Sketches/p5waves03';
import { p5chaos } from 'src/app/P5Sketches/p5chaos';
import { p5vortex } from '../P5Sketches/p5vortex';

@Injectable()
export class VisualizationService {
    private _currentSelectionId: number;
    private _selectionChanged = new Subject<void>();
    public visualizationRequested$ = this._selectionChanged.asObservable();

    private _numComponentInstances: WritableSignal<number[]>;
    readonly isActiveMap: Signal<boolean[]>;

    private p5Sketches = [
        p5default,
        p5barcode,
        p5frequency,
        p5punchCard,
        p5threads,
        p5signals,
        p5vortex,
        p5chaos,
        p5waves01,
        p5waves02,
        p5waves03,
    ];

    constructor() {
        this._numComponentInstances = signal(new Array(this.p5Sketches.length).fill(0));
        this.isActiveMap = computed(() =>
            this._numComponentInstances().map((element) => element > 0),
        );
    }

    get visualizationToDisplay(): number {
        return this._currentSelectionId;
    }

    select(id: number) {
        if (id < 0 || id >= this.p5Sketches.length) {
            const unknownComponent = new Error("Oops, this component doesn't exist.");
            throw unknownComponent;
        }
        this._currentSelectionId = id;
        this._selectionChanged.next();
    }

    provideSketch(): P5Sketch {
        return this.p5Sketches[this._currentSelectionId];
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
