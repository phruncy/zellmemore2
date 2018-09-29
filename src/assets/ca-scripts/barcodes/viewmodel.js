function ViewModel(automato) 
{
  let self = this; ///kann benutzt werden, wenn die Bezeichnung "this" missverständlich ist
  this._automaton = automato;
  this._isLooping = false;
  this.observers = [];

  this._cellWidth = 0;
  this._edge = 0;

  this._bufferWidth = width;

  //Klassenmethoden
  this.initialise = function()
  {
    this.initialiseDefault();
  };  
}
