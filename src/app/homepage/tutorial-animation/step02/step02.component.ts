import { Component, OnInit, Input, Output } from '@angular/core';
import { StepTemplate } from 'src/utils/stepTemplate';
import { EventEmitter } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-step02',
  templateUrl: './step02.component.html',
  styleUrls: ['./step02.component.scss']
})
export class Step02Component extends Step implements OnInit {

    private descriptions: string[] = [
        'Teststring 1',
        'Teststring 2'
    ];
    private cells: number[] = [];

    constructor() {
        super();
     }

    ngOnInit() {
        for (let i = 0; i < 15; i++) {
            this.cells.push(
                Math.round(Math.random()));
        }
    }
}
