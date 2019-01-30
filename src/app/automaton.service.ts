import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cell } from './cell';
import { AutomatonConfigurationService } from './automaton-configuration.service';
import { RuleConverterService } from './rule-converter.service';
@Injectable({
  providedIn: 'root'
})
export class AutomatonService {

    /*Loop properties */
    private _generation = 0;
    private _lastFrameTime = 0;
    private _fps = 3;
    private _isRunning = false;

    /* Cell properties */
    private _cells: Cell[];
    private _cellnumber;
    private _ruleset: number[];
    /* Defines the state of the Array when initialised:
     * 0 = initialise only Middle Cell
     * 1 = initialsie random
     */
    private _initialState = 0;
    private _isCircular = 0; //

    /* Communication with views */
    private _changed = new Subject<void>();
    public changed$ = this._changed.asObservable();

    constructor(
                private configuration: AutomatonConfigurationService,
                private converter: RuleConverterService
                ) {
        /* function that are called from outside the service */
        this.loop = this.loop.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
        this.changeRule = this.changeRule.bind(this);
        this.generate = this.generate.bind(this);
        this.setupCells = this.setupCells.bind(this);
    }

    get fps() {
        return this._fps;
    }

    get cellnumber() {
        return this._cellnumber;
    }

    get cells(): Cell[] {
        return this._cells;
    }

    get ruleset(): number[] {
        return this._ruleset;
    }

    loop(timestamp)
    {
        if (timestamp < this._lastFrameTime + (1000 / this._fps)) {
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

    toggleLoop(): void
    {
        if (this._isRunning) {
            this._isRunning = false;
        } else {
            this._isRunning = true;
            requestAnimationFrame(this.loop);
        }
    }

    // applies the automaton's ruleset to the Cell and changes
    // its state.
    // the string triplet is the binary representation of the
    // states of the related cells that define this cells new state.
    calculateState(left: number, middle: number, right: number): number
    {
        let triplet = '';
        // defines where to look in the rule array
        triplet = triplet + left + middle + right;
        const result = this._ruleset[parseInt(triplet, 2)];
        return result;
    }

    generate()
    {
        for (let i = 0; i < this._cells.length; i++) {
            if (this._cells[i].rightNeighbour != null) {
                const left = (i === 0) ? this._cells[i].leftNeighbour.state : this._cells[i].leftNeighbour.formerState;
                const right = (i === this._cells.length - 1) ? this._cells[i].rightNeighbour.formerState : this._cells[i].rightNeighbour.state;
                this._cells[i].formerState = this._cells[i].state;
                this._cells[i].state = this.calculateState(left, this._cells[i].state, right);
                this._cells[i].age ++;
            }
        }
        this._generation++;
        this._changed.next();
    }

    /*
     * this is called when initializing the automaton and whenever the cell
     * number changes
     */
    setupCells(cellNumber: number)
    {
        /* clear cells[] first */
        this._cells = [];
        for (let i = 0; i < cellNumber; i++) {
            this._cells.push(new Cell(0, i));
        }
        this.connectNeighbours();
        if (this._isCircular) {
            this.closeRingGrid();
        } else {
            this.disconnectRingGrid();
        }
        this._cellnumber = cellNumber;
        this._changed.next();
    }

    connectNeighbours()
    {
        for (let i = 1; i < this._cells.length - 1; i++) {
            if (this._cells[i].leftNeighbour !== null) {
                this._cells[i].rightNeighbour = null;
                this._cells[i].leftNeighbour = null;
            }
            this._cells[i].leftNeighbour = this._cells[i - 1];
            this._cells[i].rightNeighbour = this._cells[i + 1];
        }
    }

    closeRingGrid()
    {
        this._cells[0].leftNeighbour = this._cells[this._cells.length - 1];
        this._cells[0].rightNeighbour = this._cells[1];
        this._cells[this._cells.length - 1].leftNeighbour = this._cells[this._cells.length - 2];
        this._cells[this._cells.length - 1] = this._cells[0];
    }

    disconnectRingGrid()
    {
        this._cells[0].leftNeighbour = null;
        this._cells[0].rightNeighbour = null;
        this._cells[this._cells.length - 1].leftNeighbour = null;
        this._cells[this._cells.length - 1].rightNeighbour = null;
    }

    /* Only executed when Program Window is loaded */
    initialise(): void
    {
        this._cellnumber = 100; // !!!!
        this._ruleset = this.converter.decimalToBinary              (this.configuration.provideStartRule());
        this.setupCells(this.cellnumber);
        this.initialiseMiddle();
    }

    initialiseRandom()
    {
        this._cells.forEach(cell => cell.state = Math.round(Math.random()));
    }

    initialiseMiddle()
    {
        const i = Math.floor(this._cells.length / 2);
        this._cells[i].state = 1;
    }

    reset(): void
    {
        this._cells.forEach(cell => cell.reset());
        this._generation = 0;
        if (this._initialState === 0) {
            this.initialiseMiddle();
        } else {
            this.initialiseRandom();
        }
        this._changed.next();
    }

    changeRule() {}



}


