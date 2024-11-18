import { Component } from '@angular/core';
import { Step } from '../step';
import { animations } from '../../animations';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-step-final',
    templateUrl: './step-final.component.html',
    styleUrls: ['./step-final.component.scss'],
    animations: [
        animations.slideInDescription
    ],
    standalone: true,
    imports: [MatButton, RouterLink, FaIconComponent]
})
export class StepFinalComponent extends Step 
{
    readonly faAngleRight = faAngleRight;
    constructor() {
      super();
      this.descriptions = [
        'The program on this website provides visualizations of one dimensional cellular automata that depict the cells and their states in multiple ways. Feel free to experiment with different rules, cell numbers and edge behaviours!'
    ];
   }

}
