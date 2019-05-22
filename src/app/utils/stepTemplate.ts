import { EventEmitter, Output } from '@angular/core'

export interface StepTemplate {
    private descriptions: string[];
    private _activeDescription: number;
}
