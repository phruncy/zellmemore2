/*
  In dieser Darstellungsform wird der Zustand jeder der 24 Zellen des AUtomaten als eine Stelle eines 24-bit RGB Farbwerts
  interpretiert. Dieser wird als Farbstreifen ausgegeben. Die Höhe der Zellen in der zuschaltbaren Standarddarstellung orientiert
  sich an der einstellbaren höhe der Farbstreifen.
 */ 

function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;

  this.initialise = function(){
    background(255);
    noStroke();
  };

  this.render = function(automaton)
  { 
    //neu: mit Scrollen
    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }

    noStroke();
    background (255);
    for (let row = this._vm._colorHistory.length- 1; row>=0; row--)
    {  
      fill(this._vm._colorHistory[row][0],this._vm._colorHistory[row][1],this._vm._colorHistory[row][2]);
      if(this._vm.isCyclic)
      {
         let radius = this._vm.getGenerationRadius(row)/this._scalingX;
         push();
         translate((width/2)/this._scalingX, (height/2)/this._scalingY);
         ellipse (0,0,radius, radius);
         pop();
      }
      else
      {
        rect(0, this._vm.getBarPositionY(row), width, this._vm._getBarWidth());
        }  
    }
    this.setIsRendered(true);
  }
}
