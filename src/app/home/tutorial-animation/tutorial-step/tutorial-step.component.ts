import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input, Type } from '@angular/core';
import { StepDescription } from '../../step-description';
import { TutorialStepContentService } from 'src/app/home/tutorial-animation/services/tutorial-step-content.service';
import { TutorialStepData } from '../TutorialStepData';
import { Observable } from 'rxjs';
import { animations } from '../../animations';

@Component({
    selector: 'app-tutorial-step',
    standalone: true,
    imports: [NgComponentOutlet, AsyncPipe],
    providers: [TutorialStepContentService],
    styleUrl: './tutorial-step.component.scss',
    animations: [animations.slideInDescription],
    template: `
        <div class="container">
            <ng-container
                *ngComponentOutlet="
                    content();
                    inputs: { activeDescription: currentSection() }
                "></ng-container>
            @if (stepData$ | async; as data) {
                <div class="tutorialText" [@slideInDescription]="animationState()">
                    {{ data[currentStep()].steps[currentSection()] }}
                </div>
            }
        </div>
    `,
})
export class TutorialStepComponent {
    content = input.required<Type<StepDescription>>();
    currentSection = input<number>(0);
    currentStep = input<number>(0);
    animationState = computed(() => `${this.currentStep()}-${this.currentSection()}`);
    stepData$: Observable<TutorialStepData[]>;

    private _contentService = inject(TutorialStepContentService);

    constructor() {
        this.stepData$ = this._contentService.fetchStepsData();
    }
}
