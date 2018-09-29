function Gui(viewmodel,  viewhandler)
{
    ///GUi Allgemein
    this._viewmodel = viewmodel;
    let self = this;
    this._viewhandler = viewhandler;
    let oldCellSliderValue = 0;


    //Steuerungsbuttons
    this.runPauseButton = document.getElementById("play");
    this.playpauseIcon = document.getElementById("play-pause-icon");
    this.mousepopup = document.getElementById("mouse-popup");

/*  Nur zum Testen:
    this.renderOneGenerationButton = createButton("One forward"); */
    this.saveButton = document.getElementById("save");
    this.overlayText = document.getElementById("overlay");
    
    //reset
    this.resetButton = document.getElementById("reset");
    /* 
    * wird nicht mehr benötigt:
    * this.confirmResetButton = document.getElementById("reset-confirm"); 
    */
    this.resetDropdownContent = document.getElementById("resetsettings");
    
    //this.hideAdditionalView = createButton("Standardansicht an/aus");
    //this.hideAdditionalView.class("button");

    this.closeCircleCheckbox = document.getElementById("arraytoggle");
    this.closeCircleCheckboxLabel = document.getElementById("arraytogglelabel");
    this.enterFullscreenButton = document.getElementById("fullscreen");

    //Regelanzeige und -eingabetextfeld:
    this.textInput = document.getElementById("ruletextinput");

    //Auswahl des Startzustandes
    //this.stateSelector = document.getElementById("")
    this.stateSelectorOptions = 
    [
        this.singleCellOption = document.getElementById("singlecell"),
        this.randomCellsOption = document.getElementById("random")
    ];
    
    //Slider zum Einstellen der Zellanzahl
    this.cellNumberSlider = document.getElementById("cellnumber");
    this.numberSliderLabel = document.getElementById("numberlabel");
    this.cellNumberSlider.step = "10";
    this.cellNumberSlider.max = _cellNumberMax;
    this.cellNumberSlider.min = _cellNumberMin;
    this.cellNumberSlider.value = _initialCellNumber;

    //Slider zum Einstellen der Geschwindigkeit
    this.speedSelect = document.getElementById("speed");
    
    this._checkBoxesStateArray = [0,0,0,0,0,0,0,0];
    this._checkBoxArray = 
    [
        this.checkbox111 = document.getElementById("111"),
        this.checkbox110 = document.getElementById("110"),
        this.checkbox101 = document.getElementById("101"),
        this.checkbox100 = document.getElementById("100"),
        this.checkbox011 = document.getElementById("011"),
        this.checkbox010 = document.getElementById("010"),
        this.checkbox001 = document.getElementById("001"),
        this.checkbox000 = document.getElementById("000")
    ];
    
    
    ///Callback_Methoden///////////////////////////////////////////////////////////////////////////
    this.runPauseButtonAction = function()
    {
        self._viewmodel.runPauseLoop.call(self._viewmodel);
        if(self.playpauseIcon.classList.contains("fa-play"))
        {
          self.playpauseIcon.classList.add("fa-pause");
          self.playpauseIcon.classList.remove("fa-play");

        }
        else
        {
          self.playpauseIcon.classList.add("fa-play");
          self.playpauseIcon.classList.remove("fa-pause");
        }

        if(self.mousepopup.style.display !== 'none')
        {
          self.mousepopup.style.display = 'none';
        }
    }
    
    
    // reset Button
    this.resetButtonAction = function()
    {
      self._viewhandler.clearAllViews();
      self.resetDropdownContent.display = "none";
      
    }

    /// eine Generation rendern. NUR ZUM TESTEN
   /*  this.renderOneGenerationButtonAction = function()
    {
        self._viewmodel.renderSingleGeneration.call(self._viewmodel);
    } */

    // Close-Array-Checkbox:
    // gibt dem viewmodel die Anweisung, das Array zu schließen/ zu öffnen
    // gibt Ändert die grafische Anzeige der Checkbox und den zugehörigen Infotext.
    this.closeCircleCheckboxChanged = function()
    {
        self._viewmodel.changeArrayMode.call(self._viewmodel);
        // Anzeige des Buttons ändern
        if (self.closeCircleCheckbox.checked)
        {
          self.closeCircleCheckboxLabel.innerHTML ='aktiviert';
        }
        else
        {
          self.closeCircleCheckboxLabel.innerHTML = 'deaktiviert';
        }
    }

    // TextInput:
    // überprüft, ob die eingegebene Zahl im gültigen Bereich zwischen 0 und 255 liegt.
    // gibt die Anweisung, die Regel zu ändenr an das Viewmodel
    this.textInputChanged = function()
    {
      
      try 
      {
        if (self.textInput.value >255|| self.textInput.value<0 || self.textInput.value == NaN) throw "ungüliger Wert";
        const _newRule = parseInt(this.value);
        //convertDecimaltoChecks(parseInt(_newRule));
        self._viewmodel.changeRuleSet.call(self._viewmodel,_newRule);
        return _newRule;
      }
      catch(err)
      {
        if(self.textInput.value >255)
        {
          self.textInput.value = "ungültiger Wert";
        }
        if(self.textInput.value<0 || self.textInput.value == NaN)
        {
          self.textInput.value = "ungültiger Wert";
        }
      }
    }

    //Slider:
    //überprüft, ob die neu eingestellte Zal größer oder kleiner als die vorherige ist
    //fügt dem cells-Array neue Zellen hinzu oder löscht sie
    //verbindet die nachbarn neu
    //berechnet die Zellgröße neu
    //setzt isRendered auf falsch und überzeichnet den alten Frame
    this.sliderAction = function()
    {
        self.numberSliderLabel.innerHTML = self.cellNumberSlider.value;
        let amountOfChange = self.cellNumberSlider.value -oldCellSliderValue;
        self._viewmodel.changeCellNumberAndProperties.call(self._viewmodel,amountOfChange);
        oldCellSliderValue = self.cellNumberSlider.value;
        self._viewhandler.clearAllViews();
    }

    this.speedSliderAction = function()
    {
        const newValue = parseInt(self.speedSelect.value);
        switch(newValue)
        {
            case 1: 
                frameRate(1);
                break;
            case 2:
                frameRate(4);
                break;
            case 3:
                frameRate(10);
                break;
            case 4:   
                frameRate(25);
                break;
            case 5:
                frameRate(50);
                break; 

        }
    }

    this.stateSelectAction = function()
    {
        console.log("hallo i bims")
        let _selected = 0;
        self._viewhandler.clearAllViews();
        if(self.stateSelectorOptions[0].checked)
            {_selected = 1;}     
        else    
            {_selected = 2;}
        
        self._viewmodel.setInitialState.call(self._viewmodel, _selected); 
    }

    /////Checkboxen /////////
    //Passt das checkboxarray an den Zustand der Checkboxen an
    this.setCheckBoxesStateArray = function()
    { 
        for (let i = 0; i<self._checkBoxesStateArray.length; i++)
        {
            self._checkBoxesStateArray[i] = self._checkBoxArray[i].checked? 1:0;
        }
    }
  
    //Bei Regelveränderung über das Textinputfeld:
    //Das Regelset des Automaten wird in das Checkboxarray kopiert. Es muss vorher invertiert werden, 
    //damit die Checkboxen richtig angewählt werden
    this.updateCheckboxesArray = function(obj)
    {
        const ruleCopy = obj.convertDecimalRule.call(obj, obj.decimalRule);
        self._checkBoxesStateArray = ruleCopy.reverse();
    }
  
    //Bei Regelveränderung über Textinput:
    //Überträgt den Zustand des Checkbox-State-Arrays auf die Checkboxen
    this.setCheckboxesByArrayState = function()
    {
          for (let i = 0; i< self._checkBoxArray.length; i++)
          {
            if (self._checkBoxesStateArray[i]==1)
            {self._checkBoxArray[i].checked =true;}
            else{self._checkBoxArray[i].checked =false;}
          }
    }

    ///Überträgt zuerst den Status der Checkboxen auf das Array, wandelt den array-Wert in eine Dzimalzahl um und übergibt diese
    // dem Viewmodel
  this.changeRuleByCheckbox =function()
  {
        self.setCheckBoxesStateArray(); 
        let string = '';
        self._checkBoxesStateArray.forEach(element => string = string + element);
        const newDecimal = parseInt(string, 2);
        self._viewmodel.changeRuleSet.call(self._viewmodel,newDecimal);
        self.textInput.value =newDecimal;
  }


    /////Fullscreen-Ansicht: toggleFullscreen()
    //_Canvas neu skalieren:
    ///_ resizeCAnvas
    ///_AlleGrößen neu berechnen
    ///_isrendered: false
    ///_redraw
    //_enterFullscreen(mit Fallunterscheidung für Browser);
    //enterFullscreen()

    this.enterFullscreen = function(element)
    {
        if(element.requestFullscreen) 
        {
          element.requestFullscreen();
        } 
        else if (element.msRequestFullscreen) 
        {  
          element.msRequestFullscreen();
        } 
        else if (element.mozRequestFullScreen) 
        {
          element.mozRequestFullScreen();
        } 
        else if (element.webkitRequestFullscreen) 
        {
          element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }      
    }

    this.exitFullscreen = function()
    {
        if (document.exitFullscreen) 
        {
          document.exitFullscreen();
        } 
        else if (document.msExitFullscreen) 
        {
          document.msExitFullscreen();
        } 
        else if (document.mozCancelFullScreen) 
        {
          document.mozCancelFullScreen();
        } 
        else if (document.webkitExitFullscreen) 
        {
          document.webkitExitFullscreen();
        }
    }

    this.toggleFullscreen = function()
    {
        if(!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement)
        {
          self.enterFullscreen.call(self,canvas);
        }
        else
        {
          self.exitFullscreen.call(self);
        }   
    }

    this.savePng = function()
    {
      saveCanvas( 'png');
    }
   

    /////Eventhandler
    this.runPauseButton.addEventListener("click", this.runPauseButtonAction);
    this.resetButton.addEventListener("click", this.resetButtonAction);


    /* 
    * NUR ZUM TESTEN
    * this.renderOneGenerationButton.mousePressed(this.renderOneGenerationButtonAction); 
    * */
 
    this.closeCircleCheckbox.addEventListener("change", this.closeCircleCheckboxChanged) 
    this.textInput.addEventListener("input", self.textInputChanged); 
    this.cellNumberSlider.addEventListener("change", this.sliderAction);
    this.speedSelect.addEventListener("input", this.speedSliderAction); 
    this.stateSelectorOptions.forEach(element => element.addEventListener("change", this.stateSelectAction));
    this._checkBoxArray.forEach(element => element.addEventListener("change", self.changeRuleByCheckbox));
    this.enterFullscreenButton.addEventListener("click", this.toggleFullscreen);
    this.saveButton.addEventListener("click",this.savePng);
    
    /// Fullscreen-EventListener für gängige Browser;
    document.addEventListener('fullscreenchange', this._viewhandler.toggleViewToFullscreenMode);
    document.addEventListener('webkitfullscreenchange', this._viewhandler.toggleViewToFullscreenMode);
    document.addEventListener('mozfullscreenchange', this._viewhandler.toggleViewToFullscreenMode);
    document.addEventListener('MSFullscreenChange', this._viewhandler.toggleViewToFullscreenMode);

  

    ////////////////////////////Initialisiserung und Update/////////////////////////////////////////////////

    this.update = function(obj, args)
    {
        if (args === "rule changed")
        {
          this.updateCheckboxesArray(obj);
          this.setCheckboxesByArrayState();
        }
    }


    //Initialisierung:
    //_Checkboxen posiitonieren
    //_Checkboxen in richtigen Zustand bringen
    //_CSS
    //_Textinput mit richitgem Wert beliefern
    //_ZellAnzahl-Slider-Wert speichern
    this.initialise = function()
    {
        this.updateCheckboxesArray(this._viewmodel, this._viewmodel.decimalRule);
        this.setCheckboxesByArrayState();
        
        if (!configuration.hasOwnProperty('moveMouse'))
        {
            this.mousepopup.style.display = 'none';
        }
        this.textInput.value = startRule;
        oldCellSliderValue = this.cellNumberSlider.value;
        //legt die Startgeschwindigkeit individuell für jedes Programm fest
        this.speedSelect.value = _initSpeed;
        this.speedSliderAction();
    }
  }   
  ///// Dynamische Anzeigen außerhalb der Canvas: 
  //_Generationenzahl
  //_Anzahl der Zellen
function OutsideCanvasView()
{ 
    let self = this; 
    this.generationDisplay = document.getElementById("generationdisplay");
    this.cellCountDisplay = document.getElementById("cellcountdisplay", "interface");

    this.initialise = function()
    {
      this.generationDisplay.innerHTML ='0. Generation';
      this.cellCountDisplay.innerHTML =configuration.cellNumber + ' Zellen';
    };

    this.update = function(obj, args)
    {
      if (args== "cellCount changed")
      {
        self.cellCountDisplay.innerHTML = obj.displayCellCount + " Zellen";
      }
      else if (args == "numberChanged")
      {self.generationDisplay.innerHTML = obj.displayNumber+". Generation";}
    }
}