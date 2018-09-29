function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;
  this._frame = this._vm._frames;
  this.colors =
  [
      [239,81,81],
      [239,160,80],
      [239,239,81],
      [251,214,28],
      [80,239,63],
      [81,239,239],
      [81,160,239],
      [81,81,239],
      [160,81,239],
      [239,81,239],
      [60,34,189],
      [160,239,81],
      [219,219,219],
      [156,156,156],
      [76,76,76],
      [15,207,255]
  ];
  this._colorCycle = 0;

  noFill();
  stroke(100);
  strokeWeight(.5, 15);



  this.initialise = function()
  {
      background(255);
      this._frame = this._vm._frames;      
  };

  this.render = function(automaton)
  {
    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }
    
    const _centerX = this._vm._centerX;
    const _centerY = this._vm._centerY;
    
    //zyklischer Modus
    if (this._vm.isCyclic)
    {   
        beginShape();

        curveVertex(this._vm._agentsX[0] + _centerX, this._vm._agentsY[0] + _centerY);   
        for (let i= 0; i<this._vm._agentsX.length; i++)
            {
                curveVertex(this._vm._agentsX[i] + _centerX, this._vm._agentsY[i] + _centerY);
            }
        curveVertex(this._vm._agentsX[0] + _centerX, this._vm._agentsY[0] + _centerY);    
        endShape(CLOSE);
    }
    //nicht-zyklischer Modus
    else
    {
        beginShape();
        curveVertex(this._vm._posX[0], this._vm._posY[0] + this._vm._base); 
        for (let i= 0; i<this._vm._agentsX.length; i++)
        {
             curveVertex(this._vm._posX[i], this._vm._posY[i] + this._vm._base);
        }
        curveVertex(this._vm._posX[this._vm._posX.length -1], this._vm._posY[this._vm._posY.length - 1] + this._vm._base); 
        curveVertex(width, this._vm._base);

        endShape();
    }

    this._frame++;
    if (this._frame < this._vm._frames && this._vm._automaton._generationCount !== 0)
    {
        this.setIsRendered(false); 
    }
    else
    {
        this._frame =0;
        this.setIsRendered(true);
        stroke(this.colors[this._colorCycle][0],this.colors[this._colorCycle][1],this.colors[this._colorCycle][2]);
        if(this._colorCycle !== 15)
        {
            this._colorCycle++;
        }
        else
        {
            this._colorCycle = 0;
        }
    }
  }

  this.clearAll = function()
  {
    background(255);
    this._vm.reset();
    this._frame = this._vm._frames;
    this.setIsRendered(false);
    redraw();
    this._colorCycle = 0;
  }
}
