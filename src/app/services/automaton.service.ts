import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class AutomatonService {
    readonly initModes = {
        singeCell: 0,
        randomCells: 1,
    };

    private _states = signal<number[]>([]);
    private readonly _rule = signal<number>(0);
    readonly rule = this._rule.asReadonly();

    private _generation = signal<number>(0);
    private _isRunning = false;
    private _isCircular = signal<boolean>(false);
    private _fps = signal<number>(1);
    private _lastFrameTime = 0;
    private _initMode = signal<number>(0);

    private _cellsChanged = new Subject<void>();
    public cellsChanged$ = this._cellsChanged.asObservable();

    constructor(private http: HttpClient) {
        this.loop = this.loop.bind(this);
        this.initCells = this.initCells.bind(this);
        this.configure = this.configure.bind(this);
        this.http
            .get('assets/json/automaton-config.json')
            .pipe(takeUntilDestroyed())
            .subscribe(this.configure);
    }

    get states() {
        return this._states.asReadonly();
    }

    get generation() {
        return this._generation.asReadonly();
    }
    get isRunning(): boolean {
        return this._isRunning;
    }
    set isRunning(running: boolean) {
        this._isRunning = running;
        if (running) {
            requestAnimationFrame(this.loop);
        }
    }

    get isCircular() {
        return this._isCircular.asReadonly();
    }

    get fps() {
        return this._fps.asReadonly();
    }

    get cellnumber() {
        return this._states().length;
    }
    set cellnumber(cells: number) {
        try {
            if (cells < 3) {
                const error = new Error('Not a valid number');
                throw error;
            }
            this.initCells(cells);
        } catch {
            console.error(`Invalid cell number '${cells}'.`);
        }
    }

    get initMode() {
        return this._initMode.asReadonly();
    }

    setRule(rule: number): void {
        this._rule.set(rule);
        if (rule < 0) {
            this._rule.set(0);
        }
        if (rule > 255) {
            this._rule.set(255);
        }
    }

    setEdgeConnection(value: boolean) {
        this._isCircular.set(value);
    }

    setFps(fps: number) {
        this._fps.set(fps);
    }

    setInitMode(mode: number) {
        try {
            if (!(mode === this.initModes.singeCell || mode === this.initModes.randomCells)) {
                throw new Error('Invalid State');
            }
            this._initMode.set(mode);
            this.reset();
        } catch (error) {
            console.error(error);
        }
    }

    reset(): void {
        this.initCells(this._states().length);
    }

    toggle() {
        this.isRunning = !this.isRunning;
    }

    private generate() {
        const count = this._states().length;
        const newGen: number[] = this._states().map((state, index, arr) => {
            let left = arr[(index - 1 + count) % count];
            if (index === 0 && !this._isCircular()) {
                left = 0;
            }
            let right = arr[(index + 1) % count];
            if (index === count - 1 && !this._isCircular()) {
                right = 0;
            }
            const newState = this.calculateState(left, state, right);
            return newState;
        });
        this._states.set(newGen);
        this._generation.update((value) => value + 1);
    }

    private initCells(cellNumber: number) {
        this._states.set(Array(cellNumber).fill(0));
        this.initStates();
        this._generation.set(0);
        this._cellsChanged.next();
    }

    private initStates() {
        if (this._initMode() === 0) {
            const i = Math.floor(this._states().length / 2);
            this._states()[i] = 1;
        } else {
            this._states.set(
                Array.from({ length: this._states().length }, () => Math.round(Math.random())),
            );
        }
    }

    private loop(timestamp) {
        if (timestamp < this._lastFrameTime + 1000 / this._fps()) {
            requestAnimationFrame(this.loop);
            return;
        }
        this._lastFrameTime = timestamp;
        {
            if (this._isRunning) {
                this.generate();
                requestAnimationFrame(this.loop);
            }
        }
    }

    private calculateState(left: number, middle: number, right: number): number {
        const ruleIndex = ((left << 2) | (middle << 1) | right) & 0b111;
        const result = (this._rule() >> ruleIndex) & 0b1;
        return result;
    }

    private configure(data): void {
        const config = data;
        this._fps.set(config.fps);
        this._initMode.set(parseInt(config.stateConfiguration));
        this._isCircular.set(config.circular);
        this._rule.set(
            parseInt(config.startRules[Math.floor(Math.random() * config.startRules.length)], 10),
        );
        const cellCount = parseInt(config.cellNumber);
        this.initCells(cellCount);
    }
}
