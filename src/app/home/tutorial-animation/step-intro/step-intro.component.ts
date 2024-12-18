import { Component, input, InputSignal } from '@angular/core';
import { animations } from '../../animations';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { Step } from '../step';

@Component({
    selector: 'app-step-intro',
    standalone: true,
    imports: [],
    templateUrl: './step-intro.component.html',
    styleUrl: './step-intro.component.scss',
    animations: [
        animations.slideInDescription,
        trigger('changeState', [
            state('active', style({ background: 'black' })),
            state('inactive', style({ background: 'white' })),
            transition('active <=> inactive', [animate('1s ease-in-out')]),
        ]),
        animations.slideInDescription,
        animations.slideInOut,
    ],
})
export class StepIntroComponent implements Step {
    activeDescription: InputSignal<number> = input.required<number>();
    readonly descriptions: string[] = [
        'Of all self-organizing structures, elementary Cellular Automata are the simplest possible realization of that concept. Click the button below for a short introduction on their mechanics.',
    ];
}
