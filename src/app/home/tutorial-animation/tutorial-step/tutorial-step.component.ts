import { NgComponentOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { StepDescription } from '../../step-description';

@Component({
  selector: 'app-tutorial-step',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `<ng-container *ngComponentOutlet="content(); inputs: {activeDescription: currentSection()}"></ng-container>`
})
export class TutorialStepComponent 
{
  content = input.required<StepDescription>(); 
  currentSection = input<number>(0); 
}