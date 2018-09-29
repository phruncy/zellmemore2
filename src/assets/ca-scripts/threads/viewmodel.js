function ViewModel(automato) 
{
  ////////////////////////////////////////NICHT ÄNDERN/////////////////////////////////////////
  let self = this; ///kann benutzt werden, wenn die Bezeichnung "this" missverständlich ist
  this._automaton = automato;
  this._isLooping = false;
  this.observers = [];

  this._cellWidth = 0;

  this.circleGap = this._cellWidth/2;
  this.circleBasePositionY = height-150;
  this.edge = width* 0.05;
  this.circleRadius = ((this._cellWidth* this._automaton._cellCount - this.edge*2)/this._automaton._cellCount) - this.circleGap;
  this.positionChangeY = this.circleRadius*1.5;
  this.circularSegment = 0;
  this.largeCircleRadius = 0;

  //Klassenmethoden
  ///individuell für jedes VM:
  this.initialise = function()
  {
    this.initialiseDefault();
    this.circleGap = this._cellWidth/2;
    this.circularSegment = TWO_PI/this._automaton._cellCount;
    this.largeCircleRadius = (this._automaton._cellCount* this._cellWidth) /10;
  };

  ////////////////////////////Programmabhängige Methoden für Custom View hier einfügen//////////
  this.update = function(obj, args)
  {
    this.updateDefault();
    this.updateStateArray();
    this.updateCircleVariables();
    this.notifyObservers(self, "viewmodel finished");
  };

  this.getCirclePositionX = function(index)
  {
    const posX = (this.circleRadius+this.circleGap)*index + this.edge/2;
    return posX;
  }

  this.updateCircleVariables = function()
  {
    this.circleRadius = ((this._cellWidth* this._automaton._cellCount - this.edge)/this._automaton._cellCount) - this.circleGap;
    this.positionChangeY = this.circleRadius*3;
    if(this.isCyclic)
    {
      this.largeCircleRadius = (this._automaton._cellCount* 2*this._cellWidth)/10;
      this.circleRadius = (TWO_PI*this.largeCircleRadius)/(this._automaton._cellCount*2);
    }
  }

  this.getAmplitude = function()
  {
    const amplitude = this.circleRadius*this._automaton._cellCount/11;
    return amplitude;
  };

  this.getStrokeWeight = function()
  {
    const cellNum = this._automaton._cellCount;
    if(cellNum > 300){return 1;}
    else if(cellNum >100){return 2;}
    else if(cellNum >50){return 3;}
    return 4;
  }
}
