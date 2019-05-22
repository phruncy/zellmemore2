import { Component, OnInit } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-step03',
  templateUrl: './step03.component.html',
  styleUrls: ['./step03.component.scss']
})
export class Step03Component extends Step implements OnInit {

    private descriptions= [
        'test 1',
        'test 2'
    ]

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
