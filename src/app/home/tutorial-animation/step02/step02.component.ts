import { Component, input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-step02',
    templateUrl: './step02.component.html',
    styleUrls: ['./step02.component.scss'],
    animations: [
        trigger('changeState', [
            state('active', style({ background: 'black' })),
            state('inactive', style({ background: 'white' })),
            transition('active <=> inactive', [animate('0.1s 1s ease-in-out')]),
        ]),
    ],
    standalone: true,
    imports: [],
})
export class Step02Component {
    public cells = [{ state: 'active' }];
    activeDescription = input.required<number>();

    constructor() {
        for (let i = 0; i < 15; i++) {
            this.cells.push({ state: this.provideRandomState() });
        }
    }

    toggleState(i: number) {
        this.cells[i].state = this.cells[i].state === 'active' ? 'inactive' : 'active';
    }

    provideRandomState(): string {
        const random = Math.round(Math.random());
        return random === 1 ? 'active' : 'inactive';
    }
}
