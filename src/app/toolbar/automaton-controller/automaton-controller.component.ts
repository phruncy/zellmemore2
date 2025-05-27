import { Component, model } from '@angular/core';
import { AutomatonService } from '../../services/automaton.service';
import { RuleControlComponent } from './rule-control/rule-control.component';
import { MatDivider } from '@angular/material/divider';
import { EdgeControlComponent } from './edge-control/edge-control.component';
import { StateControlComponent } from './state-control/state-control.component';
import { ControlsSliderComponent } from 'src/app/toolbar/automaton-controller/slider/controls-slider.component';
import { SliderSettings } from './SliderSettings';
import { Option } from './Option';

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
export class AutomatonControllerComponent {
    readonly speedSettings: SliderSettings = { min: 1, max: 30, label: 'fps', step: 1 };
    readonly cellnumberSettings: SliderSettings = { min: 10, max: 500, label: 'cells', step: 10 };
    automatonStartOptions: Option[] = [];
    automatonInitState = model<number>();

    constructor(public automaton: AutomatonService) {
        this.automatonStartOptions = [
            { value: this.automaton.initModes.singeCell, viewValue: 'Start from single cell ' },
            {
                value: this.automaton.initModes.randomCells,
                viewValue: 'Start from random state ',
            },
        ];
    }

    get rule() {
        return this.automaton.rule;
    }

    get fps() {
        return this.automaton.fps;
    }

    get isCircular() {
        return this.automaton.isCircular;
    }

    get initMode() {
        return this.automaton.initMode;
    }

    changeRule(rule: number) {
        this.automaton.setRule(rule);
    }

    changeEdgeMode(checked: boolean) {
        this.automaton.setEdgeConnection(checked);
    }

    changeFps(fps: number) {
        this.automaton.setFps(fps);
    }

    changeInitMode(mode: number) {
        this.automaton.setInitMode(mode);
    }
}
