function ViewModel(automato) 
{
  ////////////////////////////////////////NICHT ÄNDERN/////////////////////////////////////////
  let self = this; ///kann benutzt werden, wenn die Bezeichnung "this" missverständlich ist
  this._automaton = automato;
  this._isLooping = false;
  this.observers = [];

  this._cellWidth = 0;
  this._edge = 0;
  this._backgroundcolor = color(51, 102, 204);
  this._cellHistoryStackArray = [];
  
  this._numOfObjectsToUpdate = 0;
  this._scaling = 1;

  this._bufferWidth = width;


  //Klassenmethoden
  this.initialise = function()
  {
    this.initialiseDefault();
    this._numOfObjectsToUpdate = this._automaton._cellCount;
    this.initialiseCellStackArray();
  };

  this.reset = function ()
  {
    ////hier alle viewModel-Daten auf 0 setzen
    this.resetCellStackArray();
    this.displayMatrix = [];
    this._automaton.resetAutomaton();
  };

  ////////////////////////////Programmabhängige Methoden für Custom View hier einfügen//////////

  // Defaultupdate;
  //Scaling muss angepasst werden, falls der obere Rand erreicht wurde
  this.update = function(obj, args)
  {
    this.updateDefault();
    /* if (args === "cellCount changed")
    {
        this._numOfObjectsToUpdate = this._automaton._cellCount;  
        this.initialiseCellStackArray();
    } */
    this.getScaling();
    this.notifyObservers(this, args);
  }

  //// berechnet die Position der einzelnen Balkenelemente 
  this.getBarPosition = function(cellPosition)
  {
      let barPosition = cellPosition*this._cellWidth;
      return barPosition;
  }

  this.setActiveCellHistoryNumber = function(index)
  {

      if (this.currentStatesArray[index] == 1)
      {
        this._cellHistoryStackArray[index]._stackSize ++;
      }
  }

  //erstellt ein CellHistoryStackArray mit der gleichen Anzahl an Elementen wie automaton._cells
  this.initialiseCellStackArray = function ()
  {
    this._cellHistoryStackArray = [];
    for (let i =0; i< this._numOfObjectsToUpdate; i++)
    {
        let positionX = this.getBarPosition(i);
        this._cellHistoryStackArray.push(new CellHistoryStack(positionX,0, this));
        this.resetCellStackArray();
    }
  };

  //Löscht die gespeicherte Größe aus den einzelnen Stack-Elementen und setzt die Darstellungsgröße der einzelnen Blöcke zurück.
  //Die Skalierung wird auf 1 zurückgesetzt.
  this.resetCellStackArray = function()
  { 
     this._cellHistoryStackArray.forEach(element => element.reset());
  };

  ///Verändert die skalierung, sobald die Generationenzahl größer als die Anzahl darstellbarer Zellen in y-Richtung ist. 
  this.getScaling = function()
  {
    if(this._automaton._generationCount > this.maxDisplayableGenerations)
    {
        this._scaling = this.maxDisplayableGenerations / this._automaton._generationCount;
    }
    else {this._scaling = 1;}
  }

}


////Container-Objekt für die information über einen Balken an einer Zellposition
function CellHistoryStack (positionX, initialHeight, myViewModel)
{
    this._viewModel = myViewModel;
    this._xScale = this._viewModel._cellWidth;
    this._yScale = this._xScale;
    this._scaling = 1;
    this._position = positionX;
    this._stackSize = 0;
}

//@ displayscaling: skalierung des Bildschirms im Vollbildmodus
CellHistoryStack.prototype.display = function(displayscaling)
{
    //Was für ein quatsch: Rechtecke zu einem Rehteck stapeln.
    /* this._yScale = this._xScale * this._viewModel._scaling;  
    let singleBlockPositionY = height - this._yScale;
    let i = 0;
    fill(0);
    while (i< this._stackSize )
    {
        rect(this._position,singleBlockPositionY,this._xScale, this._yScale);
        singleBlockPositionY -= this._yScale;
        i++;            
    } */

    this._yScale = this._xScale * this._viewModel._scaling * this._stackSize;
    let _positionY = height/displayscaling - this._yScale;
    fill(0);
    rect(this._position, _positionY, this._xScale, this._yScale);
}

CellHistoryStack.prototype.reset = function()
{
    this._stackSize = 0;
    this._xScale = this._viewModel._cellWidth;
    this._yScale = this._xScale;
}



