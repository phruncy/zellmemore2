import {trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
    changeState:
        trigger('changeState', [
            state('one', style({background: 'black'})),
            state('zero', style({background: 'none'})),
            transition('one => zero', [
                animate('1s')
            ]),
            transition('zero => one', [
                animate('1s')
            ])
        ]),
    fadeIn:
        trigger('fadeInTrigger', [
            transition(
                ':enter', [
                    style({opacity: 0 }),
                    animate('1s', style({ opacity: 0 }))
                ]),
            transition (
                ':leave', [
                    animate('1s', style({ opacity: 0 }))
            ])
        ])
}