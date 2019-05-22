import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { StepTemplate } from 'src/utils/stepTemplate';
import { Step } from '../step';

@Component({
  selector: 'app-step01',
  templateUrl: './step01.component.html',
  styleUrls: ['./step01.component.scss']
})
export class Step01Component extends Step implements OnInit, StepTemplate {

    private descriptions: string[] = [
        'Teststring 1',
        'Teststring 2'
    ];
  
    constructor() { 
        super();
    }

  ngOnInit() {
  }

}
