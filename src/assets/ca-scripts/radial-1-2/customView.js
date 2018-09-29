function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;

  this._xOrigin = this._vm._bufferWidth/2;
  this._yOrigin = height/2;  

  this.initialise = function(){
    background(255);
    noFill();
  };

  /* this.render = function(automaton){
    /////füllen
    {
      this._buffer.background(255);
      for (let row = this._vm.displayMatrix.length-1; row >= 0; row--)
      for(let i =0; i<this._vm.currentStatesArray.length; i++)
      {      
        if (this._vm.displayMatrix[row][i] ===1)
        {
          this._buffer.stroke(0);
          this._buffer.strokeWeight(this._vm._cellWidth*0.5);
          this._buffer.strokeCap(SQUARE);
          this._buffer.arc(this._xOrigin, this._yOrigin, this._vm.calculateGenerationRadius(row), 
          this._vm.calculateGenerationRadius(row), this._vm.calculateArcStart(i), this._vm.calculateArcStop(i));      
        }
      }
    }  
    this.setIsRendered(true);
  }; */

  this.render = function()
  {
    background(255);

    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }
    noFill();
    for (let row = this._vm.displayMatrix.length-1; row >= 0; row--)
    {
      for(let i =0; i<this._vm.currentStatesArray.length; i++)
      {      
        if (this._vm.displayMatrix[row][i] ===1)
        {
          stroke(0);
          strokeWeight(this._vm._cellWidth*0.5);
          strokeCap(SQUARE);
          arc(this._xOrigin, this._yOrigin, this._vm.calculateGenerationRadius(row), 
          this._vm.calculateGenerationRadius(row), this._vm.calculateArcStart(i), this._vm.calculateArcStop(i));      
        }
      }
    }
    this.setIsRendered(true);
  }

  ///////////////////
  this.renderSingleCellSegments = function(index)
  {
    const renderedCell = index;
    for (let i = this._vm._automaton._generationCount; i>=0; i--)
    {
      if (this._vm._automaton._cells[renderedCell]._history[i]==1)
      {
        this._buffer.fill(0);
      }
      else
      {
        this._buffer.fill(255);
      } 
        this._buffer.arc(this._xOrigin, this._yOrigin, this._vm.calculateGenerationRadius(i), 
        this._vm.calculateGenerationRadius(i), this._vm.calculateArcStart(renderedCell), this._vm.calculateArcStop(renderedCell));      
    }
  };
}
