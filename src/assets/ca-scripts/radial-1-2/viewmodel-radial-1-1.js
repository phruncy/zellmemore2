function ViewModel(automato) 
{
  let self = this; ///kann benutzt werden, wenn die Bezeichnung "this" missverständlich ist
  this._automaton = automato;
  this._isLooping = false;
  this.observers = [];

  this._cellWidth = 0;
  this._edge = 0;
  
  this._bufferWidth = width;

  ////Variablen für die Berechnung der Kreissegmente
  this.renderInformation = [];
  this._segmentHeight = 0;

  //Klassenmethoden
  this.initialise = function()
  {
    this.initialiseDefault();
    angleMode(RADIANS);
    this._segmentHeight = this._cellWidth*0.9;
    strokeWeight(this._cellWidth);
    this._segmentArc = TWO_PI/this._automaton._cellCount;
  };
  ////////////////////////////Programmabhängige Methoden für Custom View hier einfügen//////////
  this.calculateArcStart = function(index)
  {
    const _index = index;
    const xValue = this._automaton._cells[_index]._position* this._segmentArc;
    return xValue;
  };

  this.calculateArcStop = function(index)
  {
    const yValue = this.calculateArcStart(index) + this._segmentArc;
    return yValue;
  };

  this.calculateGenerationRadius = function(index)
  {
    const _index = index;
    const radius = (_index+1) * this._segmentHeight; 
    return radius;
  };
}
