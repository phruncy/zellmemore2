import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RuleConverterService } from './rule-converter.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AutomatonService 
{
    private _states: number[];
    private _rule = 0;
    private _generation = 0;
    private _isRunning = false;
    private _isCircular: boolean;
    private _fps: number;
    private _lastFrameTime = 0;
    
    /* Defines the state of the Array when initialised:
     * 0 = initialise only Middle Cell
     * 1 = initialsie random
     */
    private _initMode;
    
    /* Communication with views */
    private _changed = new Subject<void>();
    public changed$ = this._changed.asObservable();
    private _cellsChanged = new Subject<void>();
    public cellsChanged$ = this._cellsChanged.asObservable();
    private _ready = new Subject<void>();
    public ready$ = this._ready.asObservable();
    private _modeChanged = new Subject<void>();
    public modeChanged$ =  this._modeChanged.asObservable();

    private _config: any;

    constructor(
                private converter: RuleConverterService,
                private http: HttpClient
                ) 
    {
        /* functions that are called from outside the service */
        this.loop = this.loop.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
        this.generate = this.generate.bind(this);
        this.initCells = this.initCells.bind(this);
        /* load configuration */
        this.http.get('../assets/json/automaton-config.json').subscribe(
            data => {
                this._config = data;
                this._fps = this._config.fps;
                this._initMode = this._config.stateConfiguration;
                this._isCircular = this._config.circular;
                this._rule = parseInt(this._config.startRules[Math.floor(Math.random() * this._config.startRules.length)], 10);
                const cellCount = parseInt(this._config.cellNumber);
                this.initCells(cellCount);
                this._ready.next();
            }
        );
    }

    get states(): number[] { return this._states; }
    get generation(): number { return this._generation; }
    get isRunning(): boolean { return this._isRunning; }
    get isCircular(): boolean { return this._isCircular;}

    get fps() { return this._fps; }
    set fps(fps: number) { this._fps = fps; }
    
    get cellnumber() { return this._states.length; }
    set cellnumber(cells: number) {
        try 
        {
            if (!((cells >= 0) && (cells <= 300))) {
                const error = new Error('Not a valid number');
                throw error;
            }
            this.initCells(cells);
        } catch (error)
        {
            console.error(`Invalid cell number '${cells}'.`);
        }
    }

    get rule(): number { return this._rule; }
    set rule(rule: number)
    {
        this._rule = rule;
        if(rule < 0) {
            this._rule = 0;
        }
        if (rule > 255)
        {
            this._rule = 255;
        }
    }

    get initMode(): String { return this._initMode; }
    set initMode(mode: String) 
    {
        try {
            if (!(mode === "0" || mode === "1")) 
                {
                throw new Error("Invalid State");
            }
            this._initMode = mode;
            this.reset();
        } catch (error) {
            console.error(error);
            return;
        }
    }

    toggleLoop(): void
    {
        this._isRunning = !this._isRunning;
        if (this._isRunning) {
            requestAnimationFrame(this.loop);
        }
    }

    generate()
    {
        const count = this._states.length;
        const newGen: number[] = this._states.map((state, index, arr) => 
        {
            let left = arr[(index - 1 + count) % count];
            if (index === 0 && !this._isCircular)
            {
                left = 0;
            }
            let right = arr[(index + 1) % count];
            if ((index === count - 1) && !this._isCircular)
            {
                right = 0;
            }
            const newState = this.calculateState(left, state, right);
            return newState;
        });
        this._states = newGen;
        this._generation++;
        this._changed.next();
    }

    toggleArrayMode() 
    {
        this._isCircular = !this._isCircular;
        this._modeChanged.next();
    }

    reset(): void
    {
        this.initCells(this._states.length);
    }

    initCells(cellNumber: number)
    {
        this._states = Array(cellNumber).fill(0);
        this.initStates();
        this._generation = 0;
        this._cellsChanged.next();
    }

    initStates() 
    {
        if (this._initMode === "0") {
            const i = Math.floor(this._states.length / 2);
            this._states[i] = 1;
        } else {
            this._states = Array.from({length: this._states.length}, () => Math.round(Math.random()));
        }
    }

    loop(timestamp)
    {
        if (timestamp < this._lastFrameTime + (1000 / this._fps)) 
        {
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
    
    calculateState(left: number, middle: number, right: number): number
    {
        let ruleIndex = (left << 2 | middle << 1 | right) & 0b111;
        const result = (this._rule >> ruleIndex) & 0b1;
        return result;
    }
}