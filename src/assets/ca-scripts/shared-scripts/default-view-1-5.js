///////////////////////////////// NICHT ÄNDERN ////////////////////////////////////////////
///Standard-Vidualisierung des Automaten
///Kann bei Bedarf dazugeschalten oder ausgeblendet werden

function DefaultView(viewModel, canvas)
{
  let self = this;
  this._vm = viewModel;
  this._canvas = canvas;
  this._context = this._canvas.getContext("2d");
  this._context.imageSmoothingEnabled = false;
  this.translationY = 0;

  this.setBufferIsDisplayed = function(value)
  {
    this._bufferIsDisplayed = value;
  }

  this.initialise = function()
  {
  }

  this.update = function (obj, args)
  {
    this.render();
  };

 /*  
  Alte Rendermethode ohne Scrollen:
  this.render = function()
  {
    for(let i =0; i<this._vm.currentStatesArray.length; i++)
    {      
      if(this._vm.currentStatesArray[i] ===1)
      {
        this._buffer.fill(100);
        this._buffer.strokeWeight(0.1);
        this._buffer.stroke(100);
        this._buffer.rect(this._vm.getCellPositionX(i), this._vm.getCellPositionY(), this._vm._cellWidth, this._vm._cellWidth);
      }
    }
  }; */

  //Render mit Scrollen:

  //Alte Renderfunktion über einen Buffer, der auf der Huapt-canvas abgebildet wird:
  /* this.render = function()
  {
    this._buffer.background(255);  
    for (let row = 0; row < this._vm.displayMatrix.length; row++)
      {
        for (let i = 0; i< this._vm.currentStatesArray.length; i++)
        {
          if(this._vm.displayMatrix[row][i] === 1)
          {
            this._buffer.fill(100);
            this._buffer.strokeWeight(0.1);
            this._buffer.stroke(100);
            this._buffer.rect(this._vm.getCellPositionX(i), this._vm.getCellPositionY(row), this._vm._cellWidth, this._vm._cellWidth);
          }
        }
      }    
  } */


  //Rendert Die Rechtecke direkt auf die zusätzliche Canvas
  this.render = function()
  {
    this._context.clearRect(0,0,this._canvas.width, this._canvas.height); 
    for (let row = 0; row < this._vm.displayMatrix.length; row++)
    {
        for (let i = 0; i< this._vm.currentStatesArray.length; i++)
        {
            if(this._vm.displayMatrix[row][i] === 1)
            {
                this._context.fillRect(this._vm.getCellPositionX(i), this._vm.getCellPositionY(row), this._vm._cellWidth, this._vm._cellWidth);
            }
        }
    }    
  }

  this.clearAll = function()
  {
      self._context.clearRect(0,0,this._canvas.width, this._canvas._height);
  };

}
