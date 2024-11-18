import { Input, Directive, output } from '@angular/core';

@Directive()
export abstract class Step 
{
    protected _activeSlide = 0;
    protected descriptions: string[];
    completed = output<boolean>();

    @Input()
    set activeDescription(active: number) 
    {
        this._activeSlide = active;
        if (this._activeSlide >= this.descriptions.length) 
        {
            this.completed.emit(true);
        }
    }
}