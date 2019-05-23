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
