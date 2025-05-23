import { Component, input } from '@angular/core';
import { animations } from 'src/app/home/animations';

@Component({
    selector: 'app-step04',
    styleUrls: ['./step04.component.scss'],
    animations: [animations.slideInDescription],
    standalone: true,
    template: `<div class="container"></div>`,
})
export class Step04Component {
    activeDescription = input.required<number>();
}
