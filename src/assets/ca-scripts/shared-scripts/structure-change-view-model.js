function StructureChangeViewModel(automaton)
{
    this._automaton = automaton;
    this.structureChangeArray = [];
    this.initialise = function()
    {
    };
;    this.update = function(obj, args)
    {};

}

StructureChangeViewModel.prototype.subscribe = function(newObserver)
  {
    this.observers.push(newObserver);
  };
StructureChangeViewModel.prototype.unsubscribe = function(observer)
  {
    this.observers.filter(subscriber => subscriber !== observer);
  };
StructureChangeViewModel.prototype.notifyObservers = function(obj, args)
  {
    this.observers.forEach(function(observer){observer.update(obj, args)});
  };