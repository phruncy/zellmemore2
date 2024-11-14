import { Injectable } from '@angular/core';
import { AutomatonService } from './automaton.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CellMatrixService {

    private _data: number[][] = [];
    private _capacity: number;
    constructor(
                private automaton: AutomatonService,
                private http: HttpClient
                )
                { 
                    this.http.get('../assets/json/automaton-config.json').subscribe(
                        (data) => {
                            const _json: any = data;
                            this._capacity = _json.stateHistorySize;
                        }
                    );
                    this.automaton.changed$.subscribe(
                        () => {
                            this.update();
                        });
                    this.automaton.cellsChanged$.subscribe(
                        () => {
                            this._data = [];
                            this.update();
                        });
                    this.update();
                }

    get data() 
    {
        return this._data;
    }

    update() 
    {
        this._data.push(this.automaton.states.slice(0));
        if (this._data.length > this._capacity) {
            this.data.shift();
        }
    }


}
