import { NgComponentOutlet, NgIf } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { StepDescription } from '../../step-description';

@Component({
  selector: 'app-tutorial-step',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './tutorial-step.component.html',
  styleUrl: './tutorial-step.component.scss'
})
export class TutorialStepComponent 
{
  content = input.required<StepDescription>(); 
  currentSection = input<number>(0); 
}
