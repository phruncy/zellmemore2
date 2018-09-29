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


  //Klassenmethoden
  ///individuell für jedes VM:
  this.initialise = function()
  {
    this.initialiseDefault();
  };

  ////////////////////////////Programmabhängige Methoden für Custom View hier einfügen//////////

}
