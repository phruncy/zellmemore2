function ViewModel(automato) 
{
  let self = this; ///kann benutzt werden, wenn die Bezeichnung "this" missverständlich ist
  this._automaton = automato;
  this._isLooping = false;
  this.observers = [];

  this._cellWidth = 0;
  this._bufferWidth = width;

  this.circleGap = this._cellWidth/2;
  this.circleBasePositionY = height/2;
  this.edge = this._bufferWidth* 0.05;
  this.circleRadius = ((this._cellWidth* this._automaton._cellCount - this.edge*2)/this._automaton._cellCount) - this.circleGap;
  this.positionChangeY = this.circleRadius*1.5;
  this.circularSegment = 0;
  this.largeCircleRadius = 0;

  //Klassenmethoden
  ///individuell für jedes VM:
  this.initialise = function()
  {
    this.initialiseDefault();
    this.calculateCellSize();
    this.circleGap = this._cellWidth/2.5;
    this.circularSegment = TWO_PI/this._automaton._cellCount;
    this.largeCircleRadius = ((this._automaton._cellCount* this._cellWidth) - 2000)/2;
  };

  this.update = function(data)
  {
    this.updateDefault();
    this.updateCircleVariables();
    this.notifyObservers(self, "viewmodel finished");
  };

  this.getCirclePositionX = function(index)
  {
    const posX = (this.circleRadius+this.circleGap)*index + this.edge/1.5;
    return posX;
  }

  this.updateCircleVariables = function()
  {
    this.circleRadius = ((this._cellWidth* this._automaton._cellCount - this.edge)/this._automaton._cellCount) - this.circleGap;
    this.positionChangeY = this.circleRadius*3;
    if(this.isCyclic)
    {
      this.largeCircleRadius = ((this._automaton._cellCount* this._cellWidth)*0.75 - 150)/2;
      this.circleRadius = (TWO_PI*this.largeCircleRadius)/(this._automaton._cellCount*3);
    }
  }
}
