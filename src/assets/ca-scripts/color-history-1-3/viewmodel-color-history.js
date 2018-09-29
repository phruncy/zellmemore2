function ViewModel(automato) 
{
  ////////////////////////////////////////NICHT ÄNDERN/////////////////////////////////////////

  let self = this; ///kann benutzt werden, wenn die Bezeichnung "this" missverständlich ist
  this._automaton = automato;
  this._isLooping = false;
  this.observers = [];

  this._cellWidth = 5;///Startwert
  this._scaling = 1;
  this._colorHistory = [];


  this._radius = height/2;

  this._bufferWidth = width;


  //Klassenmethoden
  this.initialise = function()
  {
    this.initialiseDefault();
  };

  this.update = function(obj, args)
  {
    this.updateDefault();  
    this.updateColorHistory();
    if (this._colorHistory.length > height)
    {
      this._colorHistory.shift();
    }
    this.notifyObservers(this, args);
  };

  this.reset = function ()
  {
    ////hier alle viewModel-Daten auf 0 setzen
    this.displayMatrix = [];
    this._colorHistory = [];
    this._automaton.resetAutomaton();
  };

  ////////////////////////////Programmabhängige Methoden für Custom View hier einfügen//////////

  this.calculateR = function()
  {
    let rString = "";
    for (let i = 0; i<8; i++)
    {
      rString = rString+ this.currentStatesArray[i];
    }
    let rValue = parseInt(rString,2);
    return rValue;
  };
  
  this.calculateG = function()
  {
    let gString = "";
    for (let i = 8; i<16; i++)
    {
      gString = gString+ this.currentStatesArray[i];
    }
    let gValue = parseInt(gString,2);
    return gValue;
  };
  
  this.calculateB = function()
  {
    let bString = "";
    for (let i = 16; i<this._automaton._cells.length; i++)
    {
      bString = bString+ this.currentStatesArray[i];
    }
    let bValue = parseInt(bString,2);
    return bValue;
  };

  //fügt die letzte Berechnete Farbe dem Farb-Array hinzu.
  this.updateColorHistory = function()
  {
    const newColor = [this.calculateR(), this.calculateG(), this.calculateB()];
    this._colorHistory.push (newColor);  
  }

  // DIe Darstellung der gesamten AUtomatenhistorie nimmt jeweils die komplette Höhe der Canvas ein:
  // Mit jeder neuen Generation schrumpft daher die Dicke eines einzelnen Balkens  
  this._getBarWidth = function()
    {
        const barwidth =  height/ this._colorHistory.length;//(this._automaton._generationCount+1);
        return barwidth;
    }

    this.getBarPositionY = function(index)
    {
      const pos = this._getBarWidth() * index;
      return pos;
    }

  //Kreisförmige Darstellung:
  this.getGenerationRadius = function(index)
  {
      const radius = ((height-10)/ this._colorHistory.length/* (this._automaton._generationCount+1) */)* index; 
      return radius;
  }

}
