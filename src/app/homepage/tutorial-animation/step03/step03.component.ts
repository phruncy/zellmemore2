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
            'test 1',
            'test 2'
        ];
    }

    ngOnInit() {
    }

}
