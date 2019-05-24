import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import { animations } from '../animations';

@Component({
  selector: 'app-step03',
  templateUrl: './step03.component.html',
  styleUrls: ['./step03.component.scss'],
  animations: [
    animations.slideInDescription
  ]
})
export class Step03Component extends Step implements OnInit {
    
    constructor() {
        super();
        this.descriptions = [
            'To understand the ruleset, pick out a trio of three cells.',
            'The left and right cells are the middle cell\'s neighbourhood. In an elementary cellular automaton, a cell determines its next state solely by its own current state and the states of its neighbours.',
            'The ruleset defines which state the middle cell is going to have for any combination of states.',
        ];
    }

    ngOnInit() {
    }

}
