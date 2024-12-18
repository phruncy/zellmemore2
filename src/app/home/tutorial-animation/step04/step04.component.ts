import { Component, input } from '@angular/core';
import { Step } from '../step';
import { animations } from 'src/app/home/animations';

@Component({
    selector: 'app-step04',
    templateUrl: './step04.component.html',
    styleUrls: ['./step04.component.scss'],
    animations: [animations.slideInDescription],
    standalone: true,
})
export class Step04Component implements Step {
    activeDescription = input.required<number>();
    readonly descriptions = [
        'This change does not happen randomly, but follows a specific ruleset.',
    ];
}
