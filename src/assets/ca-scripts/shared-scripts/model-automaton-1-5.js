/// Automaton Klasse
/*
  Das Automaten-Objekt existiert nur einmal und dient als Steuerungs- und Containerobjekt für die Automatenzellen.
  Der Zellularraum wird durch ein eindimensionales Array simuliert, dass die Zellobjekte enthält. Der zellularraum kann
  dabei zyklisch oder oder durch nachbarlose "tote" Zellen am Anfang und Ende des Arrays begrenzt sein.
  Die Startkonfiguration des Automaten ist nicht zyklisch.
*/
function Automaton() {
  let self = this;
  this._generationCount = 0;
  this._cells = [];
  this._ruleset = [];
  this.isCyclic = false;
  this._cellCount = 0;
  ////legt fest, ob die View den Rendervorgang beendet hat
  this._isRendered = false;
  this.observers = [];
  this._initialised = 0;
  
  //Getter/Setter
  this.setIsCyclic = function(value){
    this._isCyclic = value;
  }

  this.setCellNumber = function (value){
    this._cellCount = value;
  }

  ///Observer Pattern - Methoden
  this.subscribe = function (observer)
  {
   self.observers.push(observer);
  }

  this.unsubscribe = function(observer)
  {
    this.observers = this.observers.filter(subscriber => subscriber !== observer);
  }

  this.notifyObservers = function(obj, args)
  {
   self.observers.forEach(function(observer){observer.update(obj, args)});
  }

  

  /* Der Automat füllt sein ZellArray mit der ihm übergebenen Anzahl an Zellen und lädt die übergebene
     Startregel in das _rulset-Array.
     Die Zellen definieren nacheinander ihre Nachbarn. Der Automat wird nicht-zyklisch initialisiert, d.h. die 
     Nachbarn der Randzellen werden mit null initialisiert.   
  */
  this.initialise = function(rule, cellNumber){
    this._ruleset = rule;
    this._cellCount = cellNumber;
    for (let i = 0; i<this._cellCount; i++)
    {
      this._cells.push(new Cell(0,this));
      this._cells[i].setPosition(i);
      if (i>1 && i<this._cellCount)
      {
        this.setNeighbours(this._cells[i-1]);
      }
    }
    this.disconnectRingGrid();  
    this.initialiseMiddleCell();
    this._cells.forEach(function(element){element.initialise()});
    this.notifyObservers(this, "cellCount changed");
  };
  
  //// bringt den Automaten in seinen Initialzustand
  // eine einzele aktive Zelle als Initialzustand
  this.initialiseMiddleCell = function()
  {
    const index = parseInt(this._cells.length/2);
    this._cells[index].setState(1);
  };
  //// initialisiert die Zellen mit zufälligen Werten
  this.initialiseRandomCells = function()
  {
    this._cells.forEach(element => element._state = Math.round(Math.random()));
  };
  
  this.setNeighbours = function(cell){
    cell.leftNeighbour = this._cells[cell._position-1];
    cell.rightNeighbour = this._cells[cell._position+1];
  };

  //verbindet alle Nicht-Rand-Zellen neu und vergibt positionen neu
  //aufgerufen bei Änderungen an der Anzahl der Zellen 
  this.reconnectNeighbourhood = function()
  {
    self._cells.forEach(element=> element.leftNeighbour= null);
    self._cells.forEach(element => element.rightNeighbour = null);
    for(let n = 0; n<self._cells.length; n++)
    {
      self._cells[n].setPosition(n);
    }
    for(let m= 1; m< self._cells.length-1; m++)
    {
      self.setNeighbours(self._cells[m]);
    }
  };
  
  /// verbindet die jeweils erste und letzte zelle des Zell-Arrays als Nachbarn miteinander und schließt den linearen Zellularraum so ringförmig
  this.closeRingGrid = function(){
    this._cells[0].setLeftNeighbour(this._cells[this._cells.length-1]);
    this._cells[0].setRightNeighbour(this._cells[1]);
    this._cells[this._cells.length-1].setLeftNeighbour(this._cells[this._cells.length-2]);
    this._cells[this._cells.length-1].setRightNeighbour(this._cells[0]);
  };
  
  /// löst die nachbarschaftverbindungen der ersten und letzten Zelle des Arrays
  this.disconnectRingGrid = function(){
    this._cells[0].setLeftNeighbour(null);
    this._cells[0].setRightNeighbour(null);
    this._cells[this._cells.length-1].setLeftNeighbour(null);
    this._cells[this._cells.length-1].setRightNeighbour(null);
  };

  this.setIsViewModelReady = function(value)
  {
    this._isRendered = value;
  }
  
  ///setzt die Attribute jeder einzelnen Zelle auf null zurück und setzt zusätzlich die Generationenzahl auf 0 zurück
  ///Is Rendered wird auf false gesetzt, um  zu verhindenr, dass beim Neustart die erste generation beim rendern übersprungen wird
  ///Das history-Array jeder Zelle wird neu initialisiert.
  this.resetAutomaton = function(){
    for(let i=0; i<this._cells.length; i++){
      this._cells[i].reset();
    }
    this._generationCount = 0;
    this._cells.forEach(element => element.initialise());
    if (this._initialised ==0)
    {
      this.initialiseMiddleCell();
    }
    else
    {
      this.initialiseRandomCells();
    }
    //this._isRendered = false;
  };
  
  /*
    Ruft die generateParamters-Methode jeder einzelnen Zelle auf.
    Zellen ohne Nachbarn berechnen ihren zustand nicht neu, sodass diese im nicht-zyklischen Modus eine statische Begrenzung
    des Zellraums nach links und rechts darstellen.
    Die Methode wird nur ausgeführt, wenn '_isRendered' vom viewModel auf 'true' gesetzt wurde.
    Für Darstellungen in der View, die länger als einen Frame pro Generation benötigen, wird
    die neue Generation somit erst berechnet, wenn das Rendering der vorherigen Generation abgeshclossen ist.
  */
  this.generateGeneration = function()
  {
    let argument = "noNewGeneration";
    if(this._isRendered)
    {
      for(let i =0; i<this._cells.length; i++)
      {
        if(this._cells[i].leftNeighbour != null)
        {
          this._cells[i].generateCellParameters();
        }
      }
      this._generationCount++;
      argument = "newGeneration";
    };  
    this.notifyObservers(this, argument);  
  }

  //Vergrößert das Zellarray nach beiden Seiten und passt die verknüpfungen zwischen den Zellen an.
  //@amountOfChange: Anzahl der Zellen, um die das Array verlängert wird
  //die gesamte Nachbarschaft muss nach einer Änderung am Zell-Array neu verbunden werden
  //cellcount wird angepasst
  //Wert von isCyclic wird übernommen: die Nachbarschaft wird entsprechend dem Wert neu initialisiert
  this.extendCellArray = function(amountOfChange)
  {
    for (let i = 0; i<amountOfChange; i= i+2)
    {
      self._cells.push(new Cell(0,self));
      self._cells.unshift(new Cell(0,self));      
    }
    self.reconnectNeighbourhood();
    if(self.isCyclic === true)
    {
      self.closeRingGrid();
    }
    else
    {self.disconnectRingGrid();}
    self._cellCount = self._cells.length;
    self.notifyObservers(self, "cellCount changed");
  }

  //Verkleinert das Zell-Array auf beiden Seiten und passt Verknüfungen zwischen den Zellen an.
  //@amountOfChange: Anzahl der Zellen, um die das Array verlängert wird
  //die gesamte Nachbarschaft muss nach einer Änderung am Zell-Array neu verbunden werden
  //cellcount wird angepasst 
  //Wert von isCyclic wird übernommen: die Nachbarschaft wird entsprechend dem Wert neu initialisiert
  this.decreaseCellArray = function(amountOfChange)
  {
    for(let i = 0; i<amountOfChange; i=i+2)
    {
      self._cells.pop();
      self._cells.shift();
    }
    self.reconnectNeighbourhood();
    if(self.isCyclic === true)
    {
      self.closeRingGrid();
    }
    else
    {
      self.disconnectRingGrid();
    }
    self._cellCount = self._cells.length;
    self.notifyObservers(self, "cellCount changed");
  }

}
