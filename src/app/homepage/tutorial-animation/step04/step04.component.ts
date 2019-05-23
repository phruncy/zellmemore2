import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import { animations } from '../animations';

@Component({
    selector: 'app-step04',
    templateUrl: './step04.component.html',
    styleUrls: ['./step04.component.scss'],
    animations: [
        animations.slideInDescription
    ]
})
export class Step04Component extends Step implements OnInit {

    constructor() {
        super();
        this.descriptions = [
            'test 1',
            'test 2'
        ];
    }

    ngOnInit() {
    }

}
