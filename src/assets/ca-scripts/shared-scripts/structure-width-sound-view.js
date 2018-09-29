function StructureWidthSoundView(viewmodel)
{

    let oscillator = new p5.Oscillator();

    this.initialise = function()
    {
        oscillator.start();
        oscillator.setType('sinus');
        oscillator.freq(0);
        oscillator.amp(0.5);
    }
    this.update = function(obj, args)
    {
        if (args !== "frequency changed"){return;}
        oscillator.start();
        oscillator.freq(this.getFrequency(obj));
        oscillator.stop(0.25);
    };

    this.getFrequency = function(obj)
    {
         const frequency = obj.currentFrequency;
         return frequency;
    };
}