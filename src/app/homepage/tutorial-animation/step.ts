import { Input, Output, EventEmitter } from '@angular/core';
export abstract class Step {

    @Output() completion = new EventEmitter(true);
    protected _activeDescription = 0;
    protected descriptions: string[];

    constructor() {}

    @Input()
    set activeDescription(active: number) {
        this._activeDescription = active;
        if (this._activeDescription >= this.descriptions.length) {
            this.completion.emit();
        }
    }
}
