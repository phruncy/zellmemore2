function OutsideCanvasViewModel()
{
 let self = this;
 this.observers = [];  
 this.displayNumber = 0; 
 this.displayCellCount = 0;
}

OutsideCanvasViewModel.prototype.update = function(obj, args)
{
    if (args === "cellCount changed")
    {
        this.updateDisplayCellCount(obj._cellCount);
        this.notifyObservers(this, "cellCount changed");
    }
    else if(args !== "newGeneration")
    {
        return;
    }    
    this.updateGenerationNumber(obj._generationCount);
    this.notifyObservers(this, "numberChanged");
    
    
};

OutsideCanvasViewModel.prototype.subscribe = function(newObserver)
{
  this.observers.push(newObserver);
};

OutsideCanvasViewModel.prototype.notifyObservers = function(obj, args)
{
    
    this.observers.forEach(element => {element.update.call(this,obj, args);});
};

OutsideCanvasViewModel.prototype.updateGenerationNumber = function(value)
{
    this.displayNumber = value;
};

OutsideCanvasViewModel.prototype.updateDisplayCellCount = function(value)
{
    this.displayCellCount = value;
}