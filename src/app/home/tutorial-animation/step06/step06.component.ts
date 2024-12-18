import { Component, OnInit, input } from '@angular/core';
import { Step } from '../step';
import { animations } from 'src/app/home/animations';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { faInfinity, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { NgIf, NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-step06',
    templateUrl: './step06.component.html',
    styleUrls: ['./step06.component.scss'],
    animations: [
        animations.slideInDescription,
        trigger('changeState', [
            state('active', style({ background: 'black' })),
            state('inactive', style({ background: 'white' })),
            transition('active <=> inactive', [animate('0.3s 1s ease-in-out')]),
        ]),
        animations.slideInDescription,
        animations.slideInOut,
    ],
    standalone: true,
    imports: [NgIf, FaIconComponent, NgFor],
})
export class Step06Component implements Step, OnInit {
    activeDescription = input.required<number>();

    readonly faInfinity = faInfinity;
    readonly faQuestion = faQuestion;

    readonly descriptions = [
        'In theory, cellular automata may have an infinite width, so that each cell will always have two adjacent neighbours.',
        'Practically, there are two ways to deal with a finite number of cells. ',
        'The first option treats the first and last cells as edges with only one neighbour. They remain forever static and will always keep the same state.',
        'The second version connects the two marginal cells with each other and treats them as nieghbours, thus creating a boundless ring-like structure.',
    ];

    cells = [{ state: 'active' }];
    private edges = [{ state: 'inactive' }, { state: 'active' }];

    get icon() {
        if (this.activeDescription() === 0) {
            return this.faInfinity;
        }
        return this.faQuestion;
    }

    ngOnInit() {
        for (let i = 0; i < 15; i++) {
            this.cells.push({ state: this.provideRandomState() });
        }
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
