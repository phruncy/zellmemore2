import { Component, InputSignal, input } from '@angular/core';

@Component({
    selector: 'app-step01',
    template: `<div
        class="cell"
        [style.background]="'black'"
        [class.animated]="activeDescription() >= 1"></div>`,
    styleUrls: ['./step01.component.scss'],
    standalone: true,
    imports: [],
})
export class Step01Component {
    activeDescription: InputSignal<number> = input.required<number>();
}
