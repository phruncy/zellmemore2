import { Component, input } from '@angular/core';
import { animations } from 'src/app/home/animations';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { faInfinity, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { NgTemplateOutlet } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-step06',
    templateUrl: './step06.component.html',
    styleUrls: ['./step06.component.scss'],
    animations: [
        trigger('changeState', [
            state('active', style({ background: 'black' })),
            state('inactive', style({ background: 'white' })),
            transition('active <=> inactive', [animate('0.3s 1s ease-in-out')]),
        ]),
        animations.slideInOut,
    ],
    standalone: true,
    imports: [FaIconComponent, NgTemplateOutlet],
})
export class Step06Component {
    activeDescription = input.required<number>();

    readonly faInfinity = faInfinity;
    readonly faQuestion = faQuestion;
    readonly edges = [{ state: 'inactive' }, { state: 'active' }];

    cells = [{ state: 'active' }];

    constructor() {
        for (let i = 0; i < 15; i++) {
            this.cells.push({ state: this.provideRandomState() });
        }
    }

    get icon() {
        return this.activeDescription() === 0 ? this.faInfinity : this.faQuestion;
    }

    provideRandomState(): string {
        const random = Math.round(Math.random());
        return random === 1 ? 'active' : 'inactive';
    }

    toggleState(i: number) {
        this.cells[i].state = this.cells[i].state === 'active' ? 'inactive' : 'active';
    }

    toggleEdges(i: number) {
        this.edges[i].state = this.edges[i].state === 'active' ? 'inactive' : 'active';
    }
}
