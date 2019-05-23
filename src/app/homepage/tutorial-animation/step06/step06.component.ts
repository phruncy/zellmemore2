import { Component, OnInit } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-step06',
  templateUrl: './step06.component.html',
  styleUrls: ['./step06.component.scss']
})
export class Step06Component extends Step implements OnInit {

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
