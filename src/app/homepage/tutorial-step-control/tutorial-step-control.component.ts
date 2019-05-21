import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tutorial-step-control',
  templateUrl: './tutorial-step-control.component.html',
  styleUrls: ['./tutorial-step-control.component.scss']
})
export class TutorialStepControlComponent implements OnInit {

    @Input() private _activeStep: number;
    @Output() activeStepChange = new EventEmitter();
    @Input() steps: number[];
    @Input() unlockedSteps: number;

    faAngleDown = faAngleDown;
    faAngleUp = faAngleUp;
    constructor() { }

    set activeStep(step: number) {
        if (step > this.unlockedSteps || step < 1) {
            console.log('invalid step count');
            return;
        }
        this._activeStep = step;
        this.activeStepChange.emit(this._activeStep);
    }

    get activeStep() {
        return this._activeStep;
    }

    nextStep() {
        this.activeStep += 1;
    }

    previousStep() {
        this.activeStep -= 1;
    }

    goToStep(step: number) {
        this.activeStep = step;
    }

    ngOnInit() {
    }

}
