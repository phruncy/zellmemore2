function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;


  this.initialise = function(){
      background(200);
      noStroke();
  };

  //rendert eine Reihe oder einen Kreis aus Punkten
  this.render = function(automaton)
  {
    background(255);
    if(this.isFullscreen)
    {
        if(!this._vm.isCyclic)
        {
            scale(this._scalingX, this._scalingY);
        }
    } 
    let moveDirection = 0; 
    const lineWeight = this._vm.getStrokeWeight();
      for(let i =0; i<this._vm.currentStatesArray.length; i++)
      {      
        if(this._vm.currentStatesArray[i] ===1)
        {
          moveDirection = this._vm.getAmplitude();
          stroke(86, 239, 185);
          fill(86, 239, 185);
        }
        else
        {
          moveDirection = -this._vm.getAmplitude();
          stroke(100);
          fill(100);
        }  
        
        //this._buffer.noStroke();
        push()
        if (this._vm.isCyclic)
        {
          translate(width/2, height/2);
          push();
          rotate(this._vm.circularSegment*i);
          translate(0,moveDirection);
          ellipse(0,this._vm.largeCircleRadius, this._vm.circleRadius, this._vm.circleRadius);
          strokeWeight(lineWeight);
          line(width,height,0,this._vm.largeCircleRadius);
          pop();
        }
        else
        {
          translate(this._vm.getCirclePositionX(i), moveDirection);
          ellipse(0, this._vm.circleBasePositionY, this._vm.circleRadius, this._vm.circleRadius);
          pop();
          strokeWeight(lineWeight);
          line(this._vm.getCirclePositionX(i)-moveDirection,0, this._vm.getCirclePositionX(i),this._vm.circleBasePositionY + moveDirection );
        }
        pop(); 
      }
        
    this.setIsRendered(true);
   };
  
}
