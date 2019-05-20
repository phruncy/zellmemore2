import { Component, OnInit, NgZone, ViewChild, ViewContainerRef, TemplateRef, ViewRef } from '@angular/core';
import { Animations } from './animations';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { _MatChipListMixinBase } from '@angular/material';
import { Step } from './step';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tutorial-animation',
  templateUrl: './tutorial-animation.component.html',
  styleUrls: ['./tutorial-animation.component.scss'],
  animations: [
    Animations.changeState,
    //Animations.fadeIn,
  ]
})
export class TutorialAnimationComponent implements OnInit {

    @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
    @ViewChild('step01') step01: TemplateRef<any>;
    @ViewChild('step02') step02: TemplateRef<any>;
    @ViewChild('step03') step03: TemplateRef<any>;
    @ViewChild('step04') step04: TemplateRef<any>;
    @ViewChild('step05') step05: TemplateRef<any>;
    @ViewChild('step06') step06: TemplateRef<any>;

    private faAngleDown = faAngleDown;
    private isBlack = false;
    private _tutorialStep: number;
    private _currentTotalSteps = 0;
    private steps: Step[];
    private multipleCells = [];
    private _scrollSubscription: Subscription;
    
    constructor(
                private scrollDispatcher: ScrollDispatcher,
                private zone: NgZone) {
                    this._tutorialStep = 0;
                }

        set tutorialStep(step: number) {
            this._tutorialStep = step;
            console.log(step);
        }

    ngOnInit() {
        this.steps = [
            {step: this.step01, name: 'What is a cell?'},
            {step: this.step02, name: 'What is an automaton?'},
            {step: this.step03, name: 'What is a cell?'},
            {step: this.step04, name: 'What is an automaton?'},
            {step: this.step05, name: 'What is a cell?'},
            {step: this.step06, name: 'What is an automaton?'}
        ];
        this._scrollSubscription = this.scrollDispatcher.scrolled(100).subscribe(
          () => {
            console.log("scrolled");
            this.zone.run<void>(
                () => {
                    this.addTwoSmallCellsToAnimation();
                });
        });
    }

    triggerChange() {
        this.isBlack = !this.isBlack;
    }

    addTwoSmallCellsToAnimation() {
        if (this.multipleCells.length < 17) {
            this.multipleCells.push(Math.round(Math.random()));
            this.multipleCells.unshift(Math.round(Math.random()));
        } else {
            this._scrollSubscription.unsubscribe();
        }
    }

    addStep(stepId) {
        const stepEntry = this.steps[stepId];
        if (this._currentTotalSteps >= this.steps.length) {
            console.log('already existent');
            return;
        }
        const stepToAdd = stepEntry.step.createEmbeddedView(this);
        this.entry.insert(stepToAdd);
        this._currentTotalSteps++;
        this.tutorialStep += 1;
    }
}
