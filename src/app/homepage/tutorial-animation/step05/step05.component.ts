import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import { animations } from '../animations';

@Component({
    selector: 'app-step05',
    templateUrl: './step05.component.html',
    styleUrls: ['./step05.component.scss'],
    animations: [
        animations.slideInDescription
    ]
})
export class Step05Component extends Step implements OnInit {

    private trios = [
        {id: 1, left: 1, middle: 1, right: 1},
        {id: 2, left: 1, middle: 1, right: 0},
        {id: 3, left: 1, middle: 0, right: 1},
        {id: 4, left: 1, middle: 0, right: 0},
        {id: 5, left: 0, middle: 1, right: 1},
        {id: 6, left: 0, middle: 1, right: 0},
        {id: 7, left: 0, middle: 0, right: 1},
        {id: 8, left: 0, middle: 0, right: 0}
    ];

    constructor() {
        super();
        this.descriptions = [
            'Fortunately, there are only eight possible configurations for three cells: ',
            'A complete ruleset contains an instruction for the middle cell for each of these configurations.'
        ];
     }
    ngOnInit() {
    }
}
