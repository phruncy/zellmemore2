import { Component, OnInit } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-step05',
  templateUrl: './step05.component.html',
  styleUrls: ['./step05.component.scss']
})
export class Step05Component extends Step implements OnInit {

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
