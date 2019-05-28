import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import { animations } from '../../animations';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-step-final',
  templateUrl: './step-final.component.html',
  styleUrls: ['./step-final.component.scss'],
  animations: [
      animations.slideInDescription
  ]
})
export class StepFinalComponent extends Step implements OnInit {

    faAngleRight = faAngleRight;
    constructor() {
      super();
      this.descriptions = [
        'The program on this website provides visualizations of one dimensional cellular automata that depict the cells and their states in multiple ways. Feel free to experiment with different rules, cell numbers and edge behaviours!'
    ];
   }

  ngOnInit() {
  }

}
