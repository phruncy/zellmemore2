import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Step } from '../step';
import { animations } from '../animations';

@Component({
  selector: 'app-step01',
  templateUrl: './step01.component.html',
  styleUrls: ['./step01.component.scss'],
  animations: [
      animations.slideInDescription
  ]
})
export class Step01Component extends Step implements OnInit {
  
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
