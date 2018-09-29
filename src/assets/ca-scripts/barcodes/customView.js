function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;

  this.initialise = function(){
    background(255);
    noStroke();
  };

  this.render = function()
  {
    /////füllen
    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }
    {
      background(255);
      for(let i =0; i<this._vm.currentStatesArray.length; i++)
      {      
        if(this._vm.currentStatesArray[i] ==1)
        {
          fill(0);
          rect(this._vm.getCellPositionX(i), 0, this._vm._cellWidth, height);
        }
      }
    }  
    this.setIsRendered(true);
  };
}
