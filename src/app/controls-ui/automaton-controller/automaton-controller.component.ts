import { Component, OnInit, Input, OnChanges,} from '@angular/core';
import { AutomatonService } from '../../services/automaton.service';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { RuleControlComponent } from '../rule-control/rule-control.component';
import { MatDivider } from '@angular/material/divider';
import { CellsControlComponent } from '../cells-control/cells-control.component';
import { EdgeControlComponent } from '../edge-control/edge-control.component';
import { StateControlComponent } from '../state-control/state-control.component';
import { SpeedControlComponent } from '../speed-control/speed-control.component';

@Component({
    selector: 'app-automaton-controller',
    templateUrl: './automaton-controller.component.html',
    styleUrls: ['./automaton-controller.component.scss'],
    standalone: true,
    imports: [
        RuleControlComponent,
        MatDivider,
        CellsControlComponent,
        EdgeControlComponent,
        StateControlComponent,
        SpeedControlComponent,
    ],
})
export class AutomatonControllerComponent implements OnInit {

    private faAngleDown = faAngleDown;

    constructor(private automaton: AutomatonService) { }

    ngOnInit() {}
}
