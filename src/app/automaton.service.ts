import { Injectable, OnInit } from '@angular/core';
import { AutomatonConfigurationService } from './automaton-configuration.service';
import { Cell } from './cell';

@Injectable({
  providedIn: 'root'
})
export class AutomatonService implements OnInit 
{

  private _generationCount;
  private _cells: Cell[];
  private _cellCount: number;
  private _ruleset: number[];
  private _isCylic: boolean;
  private _isRendered: boolean;
  private _initialised: number;
  observers = [];
  
  constructor(rule: number[], cellCount: number) 
  {
    this._generationCount = 0;
    this._ruleset = rule;
    this._cellCount = cellCount;
    this._isCylic = false;
    this._isRendered = false;
   }

  //wie setup
  ngOnInit()
  {
    this.initialise(this._ruleset, this._cellCount);
  }

  initialise(rule, cellCount): void
  {
    for (let i = 0; i< cellCount; i++)
    {
      this._cells.push(new Cell(0, rule));
      this._cells[i].position = i;
      // leaves out last cell because the edges 
      // get initiated seperately
      if (i>1 && i< this._cellCount)
      {
        this.setNeighbours(this._cells[i-1]);
      }
      this.defineEdgeCellNeighbours(false);
      this.initialiseMiddleCell();
    }
  }

  setNeighbours (cell: Cell)
  {
    cell.leftNeighbour = this._cells[cell.position - 1];
    cell.rightNeighbour = this._cells[cell.position + 1];
  }

  defineEdgeCellNeighbours (status: boolean)
  {
    this._cells[0].leftNeighbour 
    = this._cells[0].rightNeighbour 
    = this._cells[this._cells.length-1].leftNeighbour 
    = this._cells[this._cells.length-1].rightNeighbour
    = null;

    // true = close circle
    // false = disconnect edge Cells
    if (status)
    {
    this._cells[0].leftNeighbour = this._cells[this._cells.length-1];
    this._cells[0].rightNeighbour = this._cells[1];
    this._cells[this._cells.length-1].leftNeighbour = this._cells[this._cells.length-2];
    this._cells[this._cells.length-1].rightNeighbour= this._cells[0];
    }
  }

  reconnectNeighbourhood()
  {
    
  }

  initialiseMiddleCell(): void
  {
    const index = Math.floor(this._cells.length/2);
    this._cells[index].state = 1;
  }

  initialiseRandomCells()
  {
    this._cells.forEach(element => 
      element.state = Math.round(Math.random()));
  }



}
