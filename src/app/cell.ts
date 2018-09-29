import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cell {

  private _state: number;
  private _formerState: number;
  private _age: number;
  private _position: number;
  private _leftNeightbour: Cell;
  private _rightNeighbour: Cell;
  //private _history: any;
  private _isLastCell: boolean;
  private _rulset: any;

  constructor(initialState: number, ruleset: any) 
  {
    this._state = initialState;
    this._rulset = ruleset;
    this._age = 0;
    this._leftNeightbour = null;
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

  set leftNeighbour (cell: Cell)
  {
      this._leftNeightbour = cell;
  }

  set rightNeighbour (cell: Cell)
  {
      this._rightNeighbour = cell;
  }

  set isLastCell (value: boolean)
  {
      this._isLastCell = value;
  }

  set ruleset (rule: any)
  {
      this._rulset = rule;
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

  calculateState(left: number, right:number)
  {
      let triplet = ""
      // defines where to look for in the ruleset array
      triplet = triplet + left + this._state + right;
      const result = this._rulset[parseInt(triplet,2)];
      return result;
  }    
  generateCellParameters(): void
  {
      // this is important since the edge cells have different 
      // conditions than the others  
      let left = (this._position == 0) ? 
        this._leftNeightbour.state : this._leftNeightbour.formerState;
      let right = (this._isLastCell) ? 
        this. _rightNeighbour.formerState : this._rightNeighbour.state; 
      this._formerState = this._state;
      this.calculateState(left, right);  
      this._age ++;  
  }

  reset(): void
  {
      this._state = 0;
      this._age = 0;
      this._formerState = 0;
  }
}