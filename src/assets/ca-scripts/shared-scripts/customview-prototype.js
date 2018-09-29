  

  // Observer Pattern Methoden
View.prototype.update = function (data)
  {
    this.render();
  }

///Kommunikation mit viewModel
  ///ruft die mediateIsRendered-Funktion des viewModels auf, die wiederum den übergebenen Wert 
  ///an die isRendered-Variable des Automaten weitergibt
  ///nur wenn isRendered = true wird die nächste generation berechnet.
View.prototype.setIsRendered = function(value)
  {
    const givenValue = value;
    this._isRendered = givenValue;
    this._vm.mediateIsRendered(givenValue);
  };
  
View.prototype.clearAll = function()
  {
    clear();
    this._vm.reset();
    this.setIsRendered(false);
    redraw();
  };


// Fullscreen Ansicht: Skalierung 
 View.prototype.isFullscreen = false;
 View.prototype._scalingX = 1;
 View.prototype._scalingY = 1;

View.prototype.setScalingX = function(value)
{
  this._scalingX = value;
}

View.prototype.setScalingY = function(value)
{
  this._scalingY = value;
}