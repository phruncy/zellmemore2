function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;
  this._canvas = document.getElementById("defaultCanvas0");
  this.p5Context = this._canvas.getContext("2d");

  this.initialise = function()
  {
      background(255);
      noStroke();
  };

  this.render = function(automaton){
    /////füllen
    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }
    this.setIsRendered(true);
  };
}
