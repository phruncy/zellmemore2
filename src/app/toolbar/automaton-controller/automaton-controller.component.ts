import { Component, OnInit } from '@angular/core';
import { AutomatonService } from '../../services/automaton.service';
import { RuleControlComponent } from './rule-control/rule-control.component';
import { MatDivider } from '@angular/material/divider';
import { EdgeControlComponent } from './edge-control/edge-control.component';
import { StateControlComponent } from './state-control/state-control.component';
import { ControlsSliderComponent } from 'src/app/toolbar/automaton-controller/slider/controls-slider.component';
import { SliderSettings } from './SliderSettings';
import { ActivatedRoute } from '@angular/router';

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
        ControlsSliderComponent
    ],
})
export class AutomatonControllerComponent implements OnInit {

    readonly speedSettings: SliderSettings = {min: 1, max: 30, label: "fps", step: 1};
    readonly cellnumberSettings: SliderSettings= {min: 10, max: 500, label:"cells", step: 10};
    speed: number = this.speedSettings.min;
    cellNumber: number = this.cellnumberSettings.min;
    isCircular: boolean = false;

    constructor(private automaton: AutomatonService, private route: ActivatedRoute) { }

    ngOnInit() 
    {
        this.init = this.init.bind(this);
        this.automaton.ready$.subscribe(() => 
        {
            this.init();
            this.route.params.subscribe(this.init);
        });
    }

    setCellnumber(value: number)
    {
        this.automaton.cellnumber = value;
    }

    setCircular(value: boolean)
    {
        this.automaton.isCircular = value;
    }

    setSpeed(value: number)
    {
        this.automaton.fps = value;
    }

    private init()
    {
        this.speed = this.automaton.fps;
        this.cellNumber = this.automaton.cellnumber;
        this.isCircular = this.automaton.isCircular;
    }
}
