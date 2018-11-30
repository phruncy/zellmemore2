import { Injectable } from '@angular/core';
import { Cell } from './cell';
import { AutomatonConfigurationService } from './automaton-configuration.service';
import { RuleConverterService } from './rule-converter.service';
@Injectable({
  providedIn: 'root'
})
export class AutomatonService {

    /*cLoop properties */ 
    private _generation = 0;
    private _lastFrameTime = 0;
    private _fps = 2;
    private _isRunning = false;

    /* Cell properties */
    private _cells: Cell[];
    private _cellnumber;
    private _ruleset: number[];

    constructor(
                private configuration: AutomatonConfigurationService,
                private converter: RuleConverterService
                ) {
        this.loop = this.loop.bind(this);
        this.toggleLoop = this.toggleLoop.bind(this);
     }
    get fps() {
        return this._fps;
    }

    loop(timestamp) {
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

    toggleLoop(): void {
        if (this._isRunning) {
            this._isRunning = false;
        } else {
            this._isRunning = true;
            requestAnimationFrame(this.loop);
        }
    }

    generate(): void {
        console.log('Generation: ' + this._generation);
        this._generation++;
    }

    /* Only executed when Program Window is loaded */
    initialise(): void {
        this._cellnumber = 10; // !!!!
        this._ruleset = this.converter.decimalToBinary              [this.configuration.provideStartRule()];
        /* clear cells[] first */
        this._cells = [];
        for (let i = 0; i < this._cellnumber; i++) {
            this._cells.push(new Cell(0));
        }
        this.initialiseMiddle();
        console.log(JSON.stringify(this._cells));
    }
    initialiseRandom() {}
    initialiseMiddle() {}
    reset(): void {}
    setNeighbours() {}
    reconnectNeighbours() {}
    disconnectNeighbours() {}
    closeRingGrid() {}
    disconnectsRingGrid() {}
    changeCellnumber() {}
    changeRule() {}





}


