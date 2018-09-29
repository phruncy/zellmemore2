function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;

  this.initialise = function()
  {
      background(255);
      noStroke();
  }

  //Stapel für Stapel berechnen:
  //_Größe des Stapels erfassen
  //_anzeigen
  this.render = function(automaton)
  {
    background(255);

    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }
    for (let i = 0; i<this._vm._numOfObjectsToUpdate; i++)
    {
        this._vm.setActiveCellHistoryNumber(i);
        this._vm._cellHistoryStackArray[i].display(this._scalingY);
    }  
    this.setIsRendered(true);
  }

}


