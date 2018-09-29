function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;
  

  this.initialise = function(){
    background(255);
    noStroke();
  };

  //// die X-Position wird hier von der Methode shuffledCellPositionX() bezogen, die jeder Zelle über das geshufflete displayPositions-Array
  //// eine zufällige Position zuweist.
  this.render = function()
  {
    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }
    
    background(255);  
    for (let row = 0; row < this._vm.displayMatrix.length; row++)
    {
      for (let i = 0; i< this._vm.currentStatesArray.length; i++)
      {
        if(this._vm.displayMatrix[row][i] === 1)
        {
          fill(0);
          strokeWeight(0.1);
          stroke(0);
          rect(this._vm.getShuffledCellPositionX(i), this._vm.getCellPositionY(row), this._vm._cellWidth, this._vm._cellWidth);
        }
      }
    }
    this.setIsRendered(true);    
  }

}

