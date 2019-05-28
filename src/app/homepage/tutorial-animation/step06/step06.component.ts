import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import { animations } from 'src/app/homepage/animations';
import {trigger, state, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-step06',
  templateUrl: './step06.component.html',
  styleUrls: ['./step06.component.scss'],
  animations: [
        animations.slideInDescription,
        trigger('changeState', [
            state('active', style ({background: 'black'})),
            state('inactive', style ({background: 'white'})),
            transition('active <=> inactive', [animate('1s ease-in-out')]),
        ]),
        animations.slideInDescription
  ]
})
export class Step06Component extends Step implements OnInit {

    private cells = [
        {state : 'active'},
    ];

    constructor() {
      super();
      this.descriptions = [
        'In theory, cellular automata may have an infinite width, so that each cell will always have two adjacent neighbours.',
        'Practically, there are two ways to deal with a finite number of cells. ',
        'The first option treats the first and last cells as edges with only one neighbour. They remain forever static.',
        'The second version connects the two marginal cells with each other, thus creating a boundless ring-like structure.'
    ];
    }

    ngOnInit() {
        for (let i = 0; i < 15; i++) {
            this.cells.push(
                {state : this.provideRandomState()}
            );
        }
    }

    provideRandomState(): string {
        const random = Math.round(Math.random());
        return random === 1 ? 'active' : 'inactive';
    }

    toggleState(i: number) {
        this.cells[i].state = (this.cells[i].state === 'active' ? 'inactive' : 'active');
    }

}
