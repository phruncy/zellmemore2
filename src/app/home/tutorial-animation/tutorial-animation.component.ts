import { Component } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Step01Component } from './step01/step01.component';
import { Step02Component } from './step02/step02.component';
import { Step03Component } from './step03/step03.component';
import { Step04Component } from './step04/step04.component';
import { Step05Component } from './step05/step05.component';
import { Step06Component } from './step06/step06.component';
import { StepFinalComponent } from './step-final/step-final.component';
import { TutorialStepControlComponent } from './tutorial-step-control/tutorial-step-control.component';
import { animations } from '../animations';
import { NgIf } from '@angular/common';
import { TutorialStepComponent } from './tutorial-step/tutorial-step.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StepDescription } from '../step-description';
import { StepIntroComponent } from './step-intro/step-intro.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-tutorial-animation',
    standalone: true,
    imports: [
        NgIf,
        TutorialStepControlComponent,
        TutorialStepComponent,
        FontAwesomeModule,
        MatButtonModule,
    ],
    templateUrl: './tutorial-animation.component.html',
    styleUrls: ['./tutorial-animation.component.scss'],
    animations: [animations.slideInOut],
})
export class TutorialAnimationComponent {
    readonly faAngleDown = faAngleDown;
    readonly faAngleUp = faAngleUp;
    readonly steps: StepDescription[] = [
        { component: StepIntroComponent, sectionCount: 1 },
        { component: Step01Component, sectionCount: 2 },
        { component: Step02Component, sectionCount: 2 },
        { component: Step03Component, sectionCount: 3 },
        { component: Step04Component, sectionCount: 1 },
        { component: Step05Component, sectionCount: 2 },
        { component: Step06Component, sectionCount: 4 },
        { component: StepFinalComponent, sectionCount: 1 },
    ];

    private _currentSection: number = 0;
    get currentSection(): number {
        return this._currentSection;
    }

    private _unlockedSteps = 0;
    get unlockedSteps() {
        return this._unlockedSteps;
    }

    private _activeStep: number = 0;
    get activeStep() {
        return this._activeStep;
    }
    set activeStep(step: number) {
        if (step > this.steps.length) {
            return;
        }
        this._currentSection = 0;
        this._activeStep = step;
    }

    get isAtEnd(): boolean {
        return this._activeStep >= this.steps.length;
    }
    get activeStepDescription(): StepDescription {
        return this.steps[this._activeStep];
    }

    advance() {
        if (this.isAtEnd) return;
        this._currentSection++;
        if (this._currentSection >= this.steps[this.activeStep].sectionCount) {
            this.addStep();
        }
    }

    previous() {
        if (this._currentSection === 0) {
            this.activeStep--;
            return;
        }
        this._currentSection--;
    }

    addStep() {
        if (this._activeStep >= this.steps.length) {
            return;
        }
        this.activeStep++;
        this._currentSection = 0;
        if (this.activeStep > this._unlockedSteps) {
            this._unlockedSteps++;
        }
    }
}
