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
  this._base = 0;

  this._agentsX =[];
  this._agentsY =[];
  this._posX = [];
  this._posY = [];
  this._segment = 0;
  this._radius = height/5;
  this.formerStates = [];

  this._movementPerFrame = 5;
  this._frames = 25;

  this._backgroundColor = 0;
  this._isInitialised = true;



  //Klassenmethoden
  ///individuell für jedes VM:
  this.initialise = function()
  {
    this.initialiseDefault();
    this.updateStateArray();
    this._base = (height/2) - (this._frames* this._movementPerFrame)/2;
    this._movementPerFrame = (height/2 - this._radius - 30)/ this._frames;
    this.initialiseAgents();
  };

  ////////////////////////////Programmabhängige Methoden für Custom View hier einfügen//////////

  //Former States updaten
  //Verschiebung des Kreiszentrums?
  //neue X-Werte für Zyklischen Modus und Y-Werte für beide Modi;  
  //formerStates wird nur mit jeder neuen Generation geupdated: 
  //Bewegung der Kurvenpunkte ändert sich nicht.
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
          this._agentsX[i] += cos(this._segment*i) * this.getMovement(i);
          this._agentsY[i] += sin(this._segment*i) * this.getMovement(i); 
          this._posY[i] =  this._posY[i] + this.getMovement(i);
        }
        this.notifyObservers(this, args);
    }

    this.reset = function()
    {
      this._centerX =width/2;
      this._centerY =height/2;
      this.formerStates = [];
      this._posX = [];
      this._posY = [];
      this._agentsX = [];
      this._agentsY = [];
      this.displayMatrix = [];
      this._isInitialised = false;
      this._automaton.resetAutomaton();
    }
    
    // packt die Positionen der Kurvenpunkte für die Startkonfiguration in ein Array.
    this.initialiseAgents = function()
    {
      this._segment = (2 * Math.PI) / this._automaton._cellCount;
      for (let i= 0; i<this.currentStatesArray.length; i++)
      {
        this._posX.push(this.getPositionX(i));
        if (this.currentStatesArray[i] ===1)
          {
              this._agentsX.push((cos(this._segment*i) * (this._radius+this._movementPerFrame*this._frames)));
              this._agentsY.push((sin(this._segment*i) * (this._radius + this._movementPerFrame * this._frames) ));
              this._posY.push(this._base + this._movementPerFrame * this._frames);
          }          
        else 
          {
            this._agentsX.push((cos(this._segment*i) * this._radius));
            this._agentsY.push((sin(this._segment*i) * this._radius));
            this._posY.push(this._base);
          }
      }
    }  

    //Bewegung der Kurvenpunkte in einem einzelnen Frame
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
    
    //posiitonierung der Kurvenpunkte in x-Richtung im nicht- zyklischen modus
    this.getPositionX = function (index)
    {
        const x = width / (this._automaton._cellCount) * index;
        return x;
    }
}
