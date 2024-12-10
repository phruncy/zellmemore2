import { Component, model, input } from '@angular/core';
import { animations } from 'src/app/home/animations';
import { NgForOf } from '@angular/common';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-tutorial-step-control',
  standalone: true,
  imports: [NgForOf, MatRipple],
  templateUrl: './tutorial-step-control.component.html',
  styleUrls: ['./tutorial-step-control.component.scss'],
  animations: [
    animations.slideInDescription
  ]
})
export class TutorialStepControlComponent
{
    currentStep = model.required<number>();
    unlocked = input<number>(0);
    
    get unlockedSteps(): number[]
    {
      return [...Array(this.unlocked()).keys()];
    } 

    goToStep(step: number) 
    {
        if (step > this.unlocked() || step < 0) {
            console.error(`invalid step number '${step}'.`);
            return;
        }
        this.currentStep.set(step);
    }
}