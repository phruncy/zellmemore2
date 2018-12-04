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
  private _id;
  // private _history: any;

  constructor(initialState: number, id: number)
  {
    this._state = initialState;
    this._formerState = initialState;
    this._age = 0;
    this._leftNeighbour = null;
    this._rightNeighbour = null;
    this._id = id;
    // this._history = [];
  }

  get age(): number
  {
      return this._age;
  }

  set age(newAge: number)
  {
      this._age = newAge;
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

  set formerState(newState)
  {
      this._formerState = newState;
  }

  get leftNeighbour(): Cell
  {
    return this._leftNeighbour;
  }

  set leftNeighbour (cell: Cell)
  {
      this._leftNeighbour = cell;
  }

  get rightNeighbour(): Cell {
      return this._rightNeighbour;
  }

  set rightNeighbour (cell: Cell)
  {
      this._rightNeighbour = cell;
  }

  get position(): number
  {
      return this._position;
  }

  set position(position: number)
  {
      this._position = position;
  }


  reset(): void
  {
      this._state = 0;
      this._age = 0;
      this._formerState = 0;
  }
}