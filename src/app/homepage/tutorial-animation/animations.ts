import {trigger, state, style, transition, animate } from '@angular/animations';

export const animations = {
    slideInDescription: trigger('slideInDescription', [
        transition(':increment', [
            style({
                transform: 'translateX(20%)',
                opacity: 0}),
            animate('600ms ease-in-out', style({
                transform: 'translateX(0%)',
                opacity: 1,
                maxHeight: '100%'}))
        ]),
    ])
};

