import { Component, OnInit } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-step04',
  templateUrl: './step04.component.html',
  styleUrls: ['./step04.component.scss']
})
export class Step04Component extends Step implements OnInit {

    private descriptions = [
        'test 1',
        'test 2'
    ];

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
