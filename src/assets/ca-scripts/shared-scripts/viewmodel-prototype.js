
/*
  Der ViewModel-Prototype enthält alle Methoden und Eigenschaften, die jedes Viewmodel benötigt.
  Dazu gehören alle Observer-Methoden, die Methoden für die Darstellung der Standardansicht
  und Methoden für die Kommunikation mit dem Automatenmodell.
*/

ViewModel.prototype.currentStatesArray = [];
ViewModel.prototype.displayMatrix = [];
ViewModel.prototype.maxDisplayableGenerations = 0;
ViewModel.prototype.isCyclic = false;
ViewModel.prototype.decimalRule = 0;
ViewModel.prototype._backgroundColor = 255;

/////Observer Pattern Methoden
ViewModel.prototype.update = function(obj, args)
  {
    this.updateDefault();  
    this.notifyObservers(this, args);
  };

  ViewModel.prototype.updateDefault = function()
  {
    this.updateStateArray();
    if(this._automaton._isRendered || this._automaton._generationCount ===0)
    {
        this.displayMatrix.push(this.getCurrentStatesArray());
        if (this.displayMatrix.length > this.maxDisplayableGenerations)
        {
            this.displayMatrix.shift();
        }
    }
  }

ViewModel.prototype.subscribe = function(newObserver)
  {
    this.observers.push(newObserver);
  };

ViewModel.prototype.unsubscribe = function(observer)
  {
    this.observers.filter(subscriber => subscriber !== observer);
  }

ViewModel.prototype.notifyObservers = function(obj, args)
  {
    this.observers.forEach(function(observer){observer.update(obj, args)});
  }

///generelles Setup:
//wird von jedem Viewmodel im individuellen Setup aufgerufen
ViewModel.prototype.initialiseDefault = function()
{
  this.calculateCellSize();
  this.getMaxDisplayableGenerations();
}

//////vermittelt den Wert von view._isRendered zwischen view und Automatenlogik
ViewModel.prototype.mediateIsRendered = function (value)
  {
    const givenValue = value;
    this._automaton.setIsViewModelReady(givenValue);
  }

ViewModel.prototype.setIsLooping = function(value)
  {
    this._isLooping = value;
    if (value === false)
    {
      noLoop();
    }
    else
    {
      loop();
    }
  };
  
ViewModel.prototype.reset = function ()
  {
    ////hier alle viewModel-Daten auf 0 setzen
    this.displayMatrix = [];
    this._automaton.resetAutomaton();
  };

// Neuberechnung der Standardwerte bei Änderung der Canvas
//Wird von jedem Viewmodel bei veränderter Fenstergröße aufgerufen
ViewModel.prototype.recalculateDefaultProperties = function()
{
  this.calculateCellSize();
}  

// Methode, die bei der REskalierung der Canvas aufgerufen wird.
// Wird in den meisten Ansichten von der Konstruktorfunktion mit eigenen Inhalten überschrieben.
ViewModel.prototype.recalculateProperties = function()
{
  this.recalculateDefaultProperties();
}


////Button Callbackmethoden

////// Schaltet die draw-Funtion in Abhängigkeit von IsLooping an oder ab
ViewModel.prototype.runPauseLoop = function()
  {
    const boolean = !this._isLooping;
    this.setIsLooping(boolean);
  };

ViewModel.prototype.renderSingleGeneration = function()
  {
    this.setIsLooping(false);
    this._automaton.generateGeneration();
  };

///verbindet deas Zell-Array an beiden Enden oder löst die Verbindung.
ViewModel.prototype.changeArrayMode = function ()
  {
    if (this._automaton.isCyclic == false)
    {      
      this._automaton.isCyclic = true;
      this._automaton.closeRingGrid(); 
      this.isCyclic = true;
    }
    else
    {
      this._automaton.disconnectRingGrid();
      this._automaton.isCyclic = false;
      this.isCyclic = false;
    }
    this.mediateIsRendered(false);
    background(this._backgroundColor);
    redraw();         
  };   

ViewModel.prototype.setInitialState = function(selected) 
  {
    const _selected = selected;
    switch (_selected)
    {
      case 1:
        //this._automaton.initialiseMiddleCell();
        this._automaton._initialised = 0;
        break;
      case 2:
        //this._automaton.initialiseRandomCells();
        this._automaton._initialised = 1;
    }
    this.mediateIsRendered(false);
    this.reset()
    redraw();
  };

  /// das viewmodel wird nach dem Ändern der Zelleigenschaften neu initialisiert, sodass alle viewModel-Eigenschaften
  /// mit der neuen Zellanzahl verfügbar sind.
  ViewModel.prototype.changeCellNumberAndProperties = function(difference)
  {	
    const _amountOfChange = Math.abs(difference);
    if(difference>0)
    {
      this._automaton.extendCellArray(_amountOfChange);
    }
    else
    {
      this._automaton.decreaseCellArray(_amountOfChange);
    }
    this.initialise();
    this.mediateIsRendered(false);
    redraw();
  };
////// Methoden zur Änderung der Automatenregel
  
  /*Konvertiert eine eingegebene Dezimalzahl in ein Regel-Array
   *Prüft zuerst, ob die eingegebene Zahl im gültigen Wertebereich zwischen 0 und 255 liegt.
   *Die eingegebene Zahl wird in einen String umgewandelt, der die Regelnummer als binärzahl enthält.
   *Die einzelenen Zeichen des Strings werden in umgekehrter Reihenfolge in ein Array sortiert.
   *Für Werte von decimalNumber < 128 (kleinste achtstellige binärzahl) wird das Array so lange mit 0en 
   *aufgefüllt, bis die Array-Länge 8 erreicht ist.
  */
ViewModel.prototype.convertDecimalRule= function(decimalNumber)
    {
        const decimal = decimalNumber;
        this._automaton._decimalRule = decimal;
        let ruleString = decimal.toString(2);
        let ruleArray = [];
        for (let i = 0; i< ruleString.length; i++)
        {
          ruleArray.unshift(parseInt(ruleString.charAt(i)))
        }
        while (ruleArray.length<8)
        {
          ruleArray.push(0);
        }
        this.decimalRule = decimalNumber;
        return ruleArray;
    }
  
    /*
    wird von von den Regel-Inputs aufgerufen
    als Parameter wird die Change-Funktion des jeweiligen Inputs übergeben, die die
    neue Regel als Dezimalzahl als Rückgabewert hat.
  */
ViewModel.prototype.changeRuleSet = function(newRule)
  {
    //this.setIsLooping(false);
    const _newRule = newRule; ///hier checkBoxtoDEcimal einfügen
    this._automaton._ruleset = this.convertDecimalRule(_newRule);
    this.notifyObservers.call(this,this, "rule changed");
  }   

////////Methoden der Standard-Visualisierung
ViewModel.prototype.calculateCellSize = function ()
   {
     this._cellWidth = width/ this._automaton._cellCount;
   }

ViewModel.prototype.getCellPositionX = function(indexOfCell)
   {
     let posX = indexOfCell * this._cellWidth;
     return posX;
   } 

//alt: posiition in abhängigkeit von der Generationenzahl   
/* ViewModel.prototype.getCellPositionY = function()
  {
    let posY = 0;
    posY = (this._automaton._generationCount)* this._cellWidth;
    return posY;
  }; */

//neu: Position in Abhängigkeit von der position innherhalb der Darstellungsmatrix  
ViewModel.prototype.getCellPositionY = function(index)
  {
    let posY = 0;
    posY = index* this._cellWidth;
    return posY;
  };
  
ViewModel.prototype.updateStateArray = function()
{
  this.currentStatesArray = this._automaton._cells.map(element => element._state);
};  

//berechnet die Anzahl der Generationen, die in der Standardansicht gleichzeitig dargestellt werden können
ViewModel.prototype.getMaxDisplayableGenerations = function()
{
    this.maxDisplayableGenerations = height/this._cellWidth;
}

//gibt eine Kopie der Zustände der aktuellen Generation zurück
ViewModel.prototype.getCurrentStatesArray = function()
{
    const generation = this.currentStatesArray;
    return generation;
}

