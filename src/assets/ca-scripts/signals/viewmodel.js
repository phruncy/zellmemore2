function ViewModel(automaton) 
{
  ////////////////////////////////////////NICHT ÄNDERN/////////////////////////////////////////
  let self = this; ///kann benutzt werden, wenn die Bezeichnung "this" missverständlich ist
  this._automaton = automaton;
  this._isLooping = false;
  this.observers = [];

  this._cellWidth = 0;
  this._edge = 0;

  this._bufferWidth = width;

  this._centerX = width/2;
  this._centerY = height/2;
  this._edge = 50;

  this._agents =[];
  this._posX = [];
  this._segment = 0;
  this._radius = height/5;
  this.formerStates = [];

  this._movementPerFrame = 0;;
  this._frames = 24;

  this._backgroundColor = 0;
  this._isInitialised = true;



  //Klassenmethoden
  ///individuell für jedes VM:
  this.initialise = function()
  {
    this.initialiseDefault();
    this.updateStateArray();
    // höhe der Bewegung passt sich an Canvasgröße an;
    this._movementPerFrame = (height/2 - this._radius - 40)/ this._frames;
    this.initialiseAgents();
  };

  ////////////////////////////Programmabhängige Methoden für Custom View hier einfügen//////////

  //Former States updaten
  //Verschiebung des Kreiszentrums
  //neue X- und Y-Werte  
  this.update = function(obj, args)
    {
        if (!this._isInitialised)
        {
            this.initialise();
            this._isInitialised = true;
        }
        if (args == "newGeneration")
        {
           this.formerStates = this.currentStatesArray; 
        }
        this.updateDefault();
        //this._centerX += (mouseX - this._centerX)* 0.002;
        //this._centerY += (mouseY - this._centerY)* 0.002;
        for (let i= 0; i< this._automaton._cellCount; i++)
        {
          this._agents[i] += this.getMovement(i);
        }
        this.notifyObservers(this, args);
    }

    this.reset = function()
    {
      this._centerX =width/2;
      this._centerY =height/2;
      this.formerStates = [];
      this._posX = [];
      this._agents = [];
            for (let i= 0; i<this._automaton._cellCount; i++)

      this.displayMatrix = [];
      this._isInitialised = false;
      this._automaton.resetAutomaton();
    }

    this.recalculateProperties = function()
    {
      this.recalculateDefaultProperties();
      this._bufferWidth = width;
      this.reset();
    }

    this.initialiseAgents = function()
    {
      this._segment = (2 * Math.PI) / this._automaton._cellCount;
      for (let i= 0; i<this.currentStatesArray.length; i++)
      {
        this._posX.push(this.getPositionX(i));
        if (this.currentStatesArray[i] ===0)
          {this._agents.push(0);}          
        else 
          {this._agents.push(this._frames* this._movementPerFrame);}
      }
    }  

    this.getMovement = function(index)
    {
        if (this.formerStates.length !== 0)
        {
          if (this.formerStates[index] == this.currentStatesArray[index])
          {return 0;}
          else if (this.currentStatesArray[index] == 1)
          {return this._movementPerFrame;}
          else 
          {return 0 - this._movementPerFrame;}
        }
        return 0;
    }

    this.getPositionX = function (index)
    {
        const x = ((width-this._edge) / this._automaton._cellCount)*index + this._edge/2;
        return x;
    }

    this.getDotRadius = function()
    {
      const radius = ((width-this._edge) / this._automaton._cellCount);
      return radius;
    }

}
