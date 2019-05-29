import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import { animations } from 'src/app/homepage/animations';


@Component({
    selector: 'app-step05',
    templateUrl: './step05.component.html',
    styleUrls: ['./step05.component.scss'],
    animations: [
        animations.slideInDescription,
        animations.dropdownCell
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
            'Fortunately, there are only eight possible configurations for a set of three cells: ',
            'A complete ruleset contains a total of eight instruction: one for each possible neighbourhood state.'
        ];
     }
    ngOnInit() {
    }
}
