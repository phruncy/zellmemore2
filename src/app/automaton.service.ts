import { Injectable, OnInit } from '@angular/core';
import { AutomatonConfigurationService } from './automaton-configuration.service';
import { Cell } from './cell';

@Injectable({
  providedIn: 'root'
})
export class AutomatonService
{

  private _cells: Cell[];
  private _generationCount: number;
  private _cellCount: number;
  private _ruleset: number[];
  private _isCylic: boolean;
  private _isRendered: boolean;
  private _initialised: number;
  
  constructor() 
  {
    this._cells = [];
    this._generationCount = 0;
    this._ruleset = [1,0,0,1,0,1,1,0];
    this._cellCount = 10;
    this._isCylic = false;
    this._isRendered = false;
    console.log(this._ruleset);
   }

   get generationCount(): number
   {
     return this._generationCount;
   }

  
   setNeighbours (cell: Cell)
   {
     cell.leftNeighbour = this._cells[cell.position - 1];
     cell.rightNeighbour = this._cells[cell.position + 1];
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

  initialise (cellcount: number)
  {
    for (let i = 0; i< cellcount; i++)
    {
      this._cells.push(new Cell(0));
      this._cells[i].position = i;
      // leaves out last cell because the edges 
      // get initiated seperately
      if (i>1 && i< cellcount)
      {
        this.setNeighbours(this._cells[i-1]);
      }
      if (i == cellcount - 1)
      {
        this._cells[i].isLastCell = true;
      }
      this.defineEdgeCellNeighbours(false);
    }
    this.initialiseMiddleCell();
  }

  reset()
  {
    for(let i = 0; i< this._cells.length; i++)
    {
      this._cells[i].reset();
    }
    this._generationCount = 0; 
  }
  
  provideStates(): number[]
  {
    let states = [];
    this._cells.forEach(cell => states.push(cell.state)); 
    return states;
  }

  calculateGeneration()
  {
    const self = this;
    this._cells.forEach(function(element){
      if (element.leftNeighbour !== null)
      {
        element.generateCellParameters(self._ruleset);
      }
    } );
    this._generationCount ++;
  }
} 
