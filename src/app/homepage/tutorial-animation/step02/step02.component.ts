import { Component, OnInit, Input, Output } from '@angular/core';
import { Step } from '../step';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { animations } from 'src/app/homepage/animations';

@Component({
  selector: 'app-step02',
  templateUrl: './step02.component.html',
  styleUrls: ['./step02.component.scss'],
  animations: [
        trigger('changeState', [
            state('active', style ({background: 'black'})),
            state('inactive', style ({background: 'white'})),
            transition('active <=> inactive', [animate('1s ease-in-out')]),
        ]),
        animations.slideInDescription
    ]
})
export class Step02Component extends Step implements OnInit {

    private cells = [
        {state : 'active'},
    ];

    constructor() {
        super();
        this.descriptions = [
            'Now let\s put a bunch of them in a row.',
            'The cells all change their state in discrete intervals. Each time step is a new generation in the automaton\'s lifecyle.',
            'This change does not happen randomly, but follows a specific ruleset.'
        ];
     }

    ngOnInit() {
        for (let i = 0; i < 15; i++) {
            this.cells.push(
                {state : this.provideRandomState()}
            );
        }
    }

    toggleState(i: number) {
        this.cells[i].state = (this.cells[i].state === 'active' ? 'inactive' : 'active');
    }

    provideRandomState(): string {
        const random = Math.round(Math.random());
        return random === 1 ? 'active' : 'inactive';
    }
}
