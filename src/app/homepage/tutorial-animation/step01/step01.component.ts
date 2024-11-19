import { Component, InputSignal, input } from '@angular/core';
import { Step } from '../step';
import { animations } from 'src/app/homepage/animations';

@Component({
    selector: 'app-step01',
    templateUrl: './step01.component.html',
    styleUrls: ['./step01.component.scss'],
    animations: [
        animations.slideInDescription
    ],
    standalone: true
})
export class Step01Component implements Step 
{
    activeDescription: InputSignal<number> = input.required<number>();
    readonly descriptions = [
        'A cellular automaton consists of identical elements that are called cells.',
        'In an elementary cellular automaton, a cell may have one of two distinguishable state: black or white, 1 or 0, active or inactive – anything is possible. Let\'s go for the black and white example here.'
    ];
}