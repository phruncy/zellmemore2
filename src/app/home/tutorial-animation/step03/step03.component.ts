import { Component, input } from '@angular/core';
import { Step } from '../step';
import { animations } from 'src/app/home/animations';

@Component({
    selector: 'app-step03',
    templateUrl: './step03.component.html',
    styleUrls: ['./step03.component.scss'],
    animations: [
        animations.slideInDescription
    ],
    standalone: true
})
export class Step03Component implements Step 
{
    activeDescription = input.required<number>();
    readonly descriptions = [
        'To understand the ruleset, pick out a trio of three cells. The middle cell has one direct neighbour both to the left and to the right.',
        'In an elementary cellular automaton, a cell determines its next state solely by its own current state and the states of its neighbourhood.',
        'The ruleset defines which state the middle cell is going to have for any combination of neighbourhood states.',
    ];
}
