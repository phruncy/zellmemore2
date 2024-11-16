import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutomatonService 
{
    readonly initModes = 
    {
        singeCell: 0,
        randomCells: 1
    };
    
    private _states: number[];
    private _rule = 0;
    private _generation = 0;
    private _isRunning = false;
    private _isCircular: boolean;
    private _fps: number;
    private _lastFrameTime = 0;
    private _initMode: number;
    
    /* Communication with views */
    private _changed = new Subject<void>();
    public changed$ = this._changed.asObservable();
    private _cellsChanged = new Subject<void>();
    public cellsChanged$ = this._cellsChanged.asObservable();
    private _ready = new Subject<void>();
    public ready$ = this._ready.asObservable();
    private _modeChanged = new Subject<void>();
    public modeChanged$ =  this._modeChanged.asObservable();

    constructor(private http: HttpClient) 
    {
        this.loop = this.loop.bind(this);
        this.generate = this.generate.bind(this);
        this.initCells = this.initCells.bind(this);
        this.configure = this.configure.bind(this);
        this.http.get('../assets/json/automaton-config.json').subscribe(this.configure);
    }

    get states(): number[] { return this._states; }
    get generation(): number { return this._generation; }
    get isRunning(): boolean { return this._isRunning; }
    set isRunning(running: boolean) 
    { 
        this._isRunning = running; 
        if (running) 
        {
            requestAnimationFrame(this.loop);
        }
    }

    get isCircular(): boolean { return this._isCircular;}
    set isCircular(value: boolean) 
    { 
        const previous = this._isCircular;
        this._isCircular = value;
        if (previous != value)
            this._modeChanged.next(); 
    } 

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

    get initMode(): number { return this._initMode; }
    set initMode(mode: number) 
    {
        try {
            if (!(mode === this.initModes.singeCell || mode === this.initModes.randomCells)) 
            {
                throw new Error("Invalid State");
            }
            this._initMode = mode;
            this.reset();
        } catch (error) 
        {
            console.error(error);
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
        if (this._initMode === 0) 
        {
            const i = Math.floor(this._states.length / 2);
            this._states[i] = 1;
        } else {
            this._states = Array.from({length: this._states.length}, () => Math.round(Math.random()));
        }
    }

    toggleLoop()
    {
        this.isRunning = !this.isRunning;
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

    configure(data): void
    {
        const config = data
        this._fps = config.fps;
        this._initMode = parseInt(config.stateConfiguration);
        this._isCircular = config.circular;
        this._rule = parseInt(config.startRules[Math.floor(Math.random() * config.startRules.length)], 10);
        const cellCount = parseInt(config.cellNumber);
        this.initCells(cellCount);
        this._ready.next();
    }
}