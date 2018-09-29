function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;
  this._frame = this._vm._frames;

  noStroke();



  this.initialise = function()
  {
      background(0);
      this._frame = this._vm._frames;
      
  };

  this.render = function(automaton)
  {
    
    const _centerX = this._vm._centerX;
    const _centerY = this._vm._centerY;
    const _dotradius = this._vm.getDotRadius();
    
    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }
    
    
    
    push();
    for (let i= 0; i<this._vm._agents.length; i++)
    {           
        
        let yPos = this._vm._agents[i];
        push();
        if (this._vm.isCyclic)
        {
            yPos = this._vm._agents[i];
            translate(_centerX, _centerY);    
            rotate(this._vm._segment*i);
        }

        else
        {
            yPos = this._vm._agents[i] * 2.75;
            translate(this._vm._posX[i],0);
        }
        ellipse(0, yPos + this._vm._radius, _dotradius/this._scalingX,_dotradius/this._scalingY) ;
        pop();
    }
    pop();

    this._frame++;
    if (this._frame < this._vm._frames && this._vm._automaton._generationCount !== 0)
    {
        this.setIsRendered(false); 
    }
    else
    {
        this._frame =0;
        this.setIsRendered(true);
        fill(random(255),random(255), random(255));
    }
  }


  this.clearAll = function()
  {
    background(0);
    this._vm.reset();
    this._frame = this._vm._frames;
    this.setIsRendered(false);
    fill(255);
    redraw();
  }
}
