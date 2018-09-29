/*
  Enthält alle Methoden des Viewmodel-Prototyps.
  Callback-Funktionen sind nicht Teil des Protoyps (bis das this-Problem gelöst ist...)
*/ 

function ViewModel(automato)
{
/////////////////////////NICHT ÄNDERN//////////////////////////////////////
  let self = this; 
  this._automaton = automato;
  this._isLooping = false;
  this.observers = [];

  this._cellWidth = 0;
  this._edge = 0;

  this._bufferWidth = width;

//// programmabhängige Variablen
  this.displayPositions = [];  
/////////////////////////////////

  this.initialise = function()
  {
    this.initialiseDefault();
    this.displayPositions = [];
    for (let i = 0; i<this._automaton._cells.length; i++)
    {
      this.displayPositions.push(i);
    }
    this.shuffleArray(this.displayPositions);
    console.log("Cell width: "+this._cellWidth);
  };

  this.shuffleArray = function(array)
  {
    const _array = array;
    for (let i = _array.length-2; i>0; i--)
    {
      let randomIndex = 1+ Math.floor(Math.random()*i);
      let elementAtIndex = _array[randomIndex];
      array[randomIndex] = array[i];
      _array[i]= elementAtIndex;
    }
  }

  this.getShuffledCellPositionX = function(index)
  {
    let posX = this._cellWidth* this.displayPositions[index];
    return posX;
  };
}
