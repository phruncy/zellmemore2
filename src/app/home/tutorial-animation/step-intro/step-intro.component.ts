import { Component, input, InputSignal } from '@angular/core';
import { animations } from '../../animations';
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
    selector: 'app-step-intro',
    standalone: true,
    imports: [],
    styleUrl: './step-intro.component.scss',
    animations: [
        trigger('changeState', [
            state('active', style({ background: 'black' })),
            state('inactive', style({ background: 'white' })),
            transition('active <=> inactive', [animate('1s ease-in-out')]),
        ]),
        animations.slideInDescription,
        animations.slideInOut,
    ],
    template: `
        <div class="container">
            <h2 class="headline">What are elementary cellular automata?</h2>
        </div>
    `,
})
export class StepIntroComponent {
    activeDescription: InputSignal<number> = input.required<number>();
}
