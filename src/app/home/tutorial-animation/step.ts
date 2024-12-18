import { InputSignal } from '@angular/core';

export interface Step {
    readonly descriptions: string[];
    activeDescription: InputSignal<number>;
}
