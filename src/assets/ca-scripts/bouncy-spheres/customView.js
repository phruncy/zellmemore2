function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;

  this.initialise = function(){
    background(255);
    noStroke();
  };

  //rendert eine Reihe oder einen Kreis aus Punkten
  this.render = function(automaton)
  {
    
    background(255);

    if(this.isFullscreen)
    {
       if (this._vm.isCyclic)
       { 
            scale(this._scalingX, this._scalingY);
       }
    }

    let moveDirection = 0; 
      for(let i =0; i<this._vm.currentStatesArray.length; i++)
      {      
        if(this._vm.currentStatesArray[i] ===1)
        {
          moveDirection = this._vm.positionChangeY;
        }
        else
        {
          moveDirection = -this._vm.positionChangeY;
        }  
        
        noStroke();
        push()
        if (this._vm.isCyclic)
        {
          fill(0);
          translate(this._vm._bufferWidth/2, height/2);
          push();
          rotate(this._vm.circularSegment*i);
          translate(0,moveDirection);
          ellipse(0,this._vm.largeCircleRadius, this._vm.circleRadius, this._vm.circleRadius);
          strokeWeight(3);
          line(this._vm._bufferWidth/2,height/2,0,this._vm.largeCircleRadius);
          pop();
        }
        else
        {
          fill(0);
          translate(this._vm.getCirclePositionX(i), moveDirection);
          ellipse(0, this._vm.circleBasePositionY, this._vm.circleRadius, this._vm.circleRadius);
        }
        pop(); 
      }        
    this.setIsRendered(true);
   };
  
}
