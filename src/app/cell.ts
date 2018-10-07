import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cell {

  private _state: number;
  private _formerState: number;
  private _age: number;
  private _position: number;
  private _leftNeighbour: Cell;
  private _rightNeighbour: Cell;
  //private _history: any;
  private _isLastCell: boolean;

  constructor(initialState: number) 
  {
    this._state = initialState;
    this._age = 0;
    this._leftNeighbour = null;
    this._rightNeighbour = null;
    //this._history = [];
    this._isLastCell = false;
  }

  get age() : number
  {
      return this._age;
  }

  set age(newAge: number)
  {
      this._age = newAge
  }

  get state(): number
  {
      return this._state;
  }

  set state(state)
  {
      this._state = state;
  }

  get formerState(): number
  {
      return this._formerState;
  }

  get leftNeighbour(): Cell
  {
    return this._rightNeighbour;
  }

  set leftNeighbour (cell: Cell)
  {
      this._leftNeighbour = cell;
  }

  set rightNeighbour (cell: Cell)
  {
      this._rightNeighbour = cell;
  }

  set isLastCell (value: boolean)
  {
      this._isLastCell = value;
  }

  get position(): number
  {
      return this._position;
  }

  set position(position: number)
  {
      this._position = position;
  }

  // applies the automaton's ruleset to the Cell and changes
  // its state.
  // the string triplet is the binary representation of the
  // states of the related cells that define this cells new state.
  // *left, right: neighbour cells
  // *rule: automaton's ruleset in array form
  calculateState(left: number, right:number, rule: number[])
  {
      let triplet = ""
      // defines where to look for in the rule array
      triplet = triplet + left + this._state + right;
      const result = rule[parseInt(triplet,2)];
      return result;
  }    
  generateCellParameters(rule: number[]): void
  {
      // this is important since the edge cells have different 
      // conditions than the others  
      let left = (this._position == 0) ? 
        this._leftNeighbour.state : this._leftNeighbour.formerState;
      let right = (this._isLastCell) ? 
        this. _rightNeighbour.formerState : this._rightNeighbour.state; 
      this._formerState = this._state;
      console.log ("left " + left + ", right " + right);
      this._state = this.calculateState(left, right, rule);  
      this._age ++;  
  }

  reset(): void
  {
      this._state = 0;
      this._age = 0;
      this._formerState = 0;
  }
}