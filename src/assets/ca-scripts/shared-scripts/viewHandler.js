function ViewHandler(view01, view02)
{
  var self = this;
  this._mainView = view01;
  this._additionalView = view02;
  this._views = [this._mainView, this._additionalView];

  self.clearAllViews = function()
  {
    self._views.forEach(function(element){element.clearAll()});
  }

  /*
    blendet die Standardansicht des Automaten ein oder aus und vergrößert die Mainview 
    Wird BufferIsDisplayed auf 'false' gesetzt, wird der Buffer im nächsten Loop in der updte-Methode
    nicht mehr aktualisiert. 'clear()' löscht den Inhalt der Canvas; setIsRendered(false)
    bewirkt, dass beim nachfolgenden Aufruf von 'redraw()' der aktuelle Zustand des Automaten 
    gerendert wird. 
 */
  
  this.toggleAdditionalView = function()
  {
    if (self._mainView.isFullscreen)
    {
      self._mainView.isFullscreen =false;
      self._mainView.setIsRendered(false);
      clear();
    }
    else
    {
      self._mainView.isFullscreen = true;
      self._mainView.setIsRendered(false);
      clear();
    }
  }; 

  //canvas wird auf Fenstergröße gebracht, sobald Standardansicht ausgeblendet wurde;
  this.rescaleCanvas = function(isFullscreen)
  {
    if(!isFullscreen)
    {   
        const w = getCanvasWidth();
        const h = getCanvasWidth()* 0.75;
        resizeCanvas(w, h);
        this._mainView.setScalingX(1);
        this._mainView.setScalingY(1);
        self._mainView.isFullscreen = false;
    }
    else
    {   
        this._mainView.setScalingX(windowHeight/height);
        this._mainView.setScalingY(windowHeight/height);
        resizeCanvas(windowHeight * (4/3), windowHeight);
        self._mainView.isFullscreen = true; 
    }  
    self._mainView.setIsRendered(false);
  }

  this.toggleViewToFullscreenMode = function()
  {
    self.toggleAdditionalView();
    self.rescaleCanvas(self._mainView.isFullscreen);
    clear();
    background(self._mainView._vm._backgroundColor);
    redraw();
  }
}
