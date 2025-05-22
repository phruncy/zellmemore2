import { Component, computed, effect, model, OnInit } from '@angular/core';
import { AutomatonService } from '../../services/automaton.service';
import { RuleControlComponent } from './rule-control/rule-control.component';
import { MatDivider } from '@angular/material/divider';
import { EdgeControlComponent } from './edge-control/edge-control.component';
import { StateControlComponent } from './state-control/state-control.component';
import { ControlsSliderComponent } from 'src/app/toolbar/automaton-controller/slider/controls-slider.component';
import { SliderSettings } from './SliderSettings';

@Component({
    selector: 'app-automaton-controller',
    templateUrl: './automaton-controller.component.html',
    styleUrls: ['./automaton-controller.component.scss'],
    standalone: true,
    imports: [
        RuleControlComponent,
        MatDivider,
        EdgeControlComponent,
        StateControlComponent,
        ControlsSliderComponent,
    ],
})
export class AutomatonControllerComponent implements OnInit {
    readonly speedSettings: SliderSettings = { min: 1, max: 30, label: 'fps', step: 1 };
    readonly cellnumberSettings: SliderSettings = { min: 10, max: 500, label: 'cells', step: 10 };
    automatonStartOptions: Option[] = [];
    automatonInitState = model<number>();
    r;

    constructor(public automaton: AutomatonService) {}

    ngOnInit() {
        this.automaton.ready$.subscribe(() => {
            this.automatonStartOptions = [
                { value: this.automaton.initModes.singeCell, viewValue: 'Start from single cell ' },
                {
                    value: this.automaton.initModes.randomCells,
                    viewValue: 'Start from random state ',
                },
            ];
        });
    }

    changeRule(rule: number) {
        this.automaton.setRule(rule);
    }
}
