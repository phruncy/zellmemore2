import { Component, model, input } from '@angular/core';
import { animations } from 'src/app/homepage/animations';
import { Step } from '../tutorial-animation/step';
import { NgForOf, NgIf } from '@angular/common';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-tutorial-step-control',
  standalone: true,
  imports: [NgIf, NgForOf, MatRipple],
  templateUrl: './tutorial-step-control.component.html',
  styleUrls: ['./tutorial-step-control.component.scss'],
  animations: [
    animations.slideInDescription
  ]
})
export class TutorialStepControlComponent
{
    currentStep = model.required<number>();
    steps = input.required<typeof Step[]>();
    unlocked = input.required<number>();

    goToStep(step: number) 
    {
        if (step > this.unlocked() || step < 1) {
            console.log('invalid step count');
            return;
        }
        this.currentStep.set(step);
    }
}