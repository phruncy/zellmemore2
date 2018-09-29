function SoundViewModel(automaton)
{
    let self = this;
    this._automaton = automaton;
    this.observers = [];
    this.structureWidth = 0;
    this.frequencyRange = 600;
    this.pitchStepsPerCell = 0;
    this.currentFrequency =0;
    this.minFrequncy = 50;

    this.initialise = function()
    {
        this.pitchStepsPerCell = this.frequencyRange/this._automaton._cellCount;
    }
    this.getStructureWidth = function(array)
    {
        let indexOfFirstOne = 0;
        let widthSoFar = 0;
        for (let i= 0; i<array.length; i++)
        {
            if(array[i]._state === 1)
            {
                if (indexOfFirstOne !== 0)
                {
                    widthSoFar = i - indexOfFirstOne + 1;
                }
                else
                {
                    indexOfFirstOne = i;
                    widthSoFar = 1;
                }
            }
        }
        this.structureWidth = widthSoFar;
    };

    this.getCurrentFrequency = function(obj)
    {
        this.getStructureWidth(obj._cells);
        this.currentFrequency = this.structureWidth* this.pitchStepsPerCell +this.minFrequncy;
        this.notifyObservers(self, "frequency changed");
        
    }



}

SoundViewModel.prototype.update = function(obj, args)
{
  if (args !== "newGeneration"){return;}
   this.getCurrentFrequency(obj);
  //this.notifyObservers(this, args);
};

SoundViewModel.prototype.subscribe = function(newObserver)
{
  this.observers.push(newObserver);
};

SoundViewModel.prototype.unsubscribe = function(observer)
{
  this.observers.filter(subscriber => subscriber !== observer);
};

SoundViewModel.prototype.notifyObservers = function(obj, args)
{
  this.observers.forEach(function(observer){observer.update(obj, args)});
};