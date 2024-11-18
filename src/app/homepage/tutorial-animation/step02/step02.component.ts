import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import {trigger, state, style, animate, transition } from '@angular/animations';
import { animations } from 'src/app/homepage/animations';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-step02',
    templateUrl: './step02.component.html',
    styleUrls: ['./step02.component.scss'],
    animations: [
        trigger('changeState', [
            state('active', style({ background: 'black' })),
            state('inactive', style({ background: 'white' })),
            transition('active <=> inactive', [animate('1s ease-in-out')]),
        ]),
        animations.slideInDescription
    ],
    standalone: true,
    imports: [NgIf, NgFor]
})
export class Step02Component extends Step implements OnInit 
{
    private cells = 
    [
        {state : 'active'},
    ];

    constructor() 
    {
        super();
        this.descriptions = 
        [
            'Now let\s align a bunch of them one-dimensionally in a row.',
            'In discrete time intervals, the cells all change their state. Each time step is a new generation in the automaton\'s lifecyle.',
        ];
     }

    ngOnInit() 
    {
        for (let i = 0; i < 15; i++) {
            this.cells.push({state : this.provideRandomState()});
        }
    }

    toggleState(i: number) 
    {
        this.cells[i].state = (this.cells[i].state === 'active' ? 'inactive' : 'active');
    }

    provideRandomState(): string 
    {
        const random = Math.round(Math.random());
        return random === 1 ? 'active' : 'inactive';
    }
}
