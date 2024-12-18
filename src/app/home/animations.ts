import { trigger, style, transition, animate } from '@angular/animations';

export const animations = {
    slideInDescription: trigger('slideInDescription', [
        transition(':increment', [
            style({
                transform: 'translateX(20%)',
                opacity: 0,
            }),
            animate(
                '600ms ease-in-out',
                style({
                    transform: 'translateX(0%)',
                    opacity: 1,
                    maxHeight: '100%',
                }),
            ),
        ]),
        transition(':enter', [
            style({
                transform: 'translateX(20%)',
                opacity: 0,
            }),
            animate(
                '600ms ease-in-out',
                style({
                    transform: 'translateX(0%)',
                    opacity: 1,
                    maxHeight: '100%',
                }),
            ),
        ]),
    ]),
    dropdownCell: trigger('dropdownCell', [
        transition(':enter', [
            style({
                transform: 'translateY(-100%)',
                opacity: 0,
            }),
            animate(
                '600ms 200ms ease-out',
                style({
                    transform: 'translateY(0%)',
                    opacity: 1,
                }),
            ),
        ]),
    ]),
    slideInOut: trigger('slideInOut', [
        transition(':enter', [
            style({
                transform: 'translateY(10%)',
                opacity: 0,
            }),
            animate(
                '600ms ease-in-out',
                style({
                    transform: 'translateY(0%)',
                    opacity: 1,
                    maxHeight: '100%',
                }),
            ),
        ]),
    ]),
};
