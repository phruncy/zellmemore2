import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

interface Option {
    value: number;
    viewValue: string;
}
@Component({
    selector: 'app-state-control',
    styleUrls: ['../../toolbar.common.scss'],
    standalone: true,
    imports: [MatSelect, FormsModule, MatOption],
    template: `
        <span></span>
        <mat-select
            class="mat-element"
            [(ngModel)]="initMode"
            (ngModelChange)="onSelectionChange()"
            disableRipple>
            @for (option of options; track option.value) {
                <mat-option class="mat-element" [value]="option.value">{{
                    option.viewValue
                }}</mat-option>
            }
        </mat-select>
    `,
})
export class StateControlComponent implements OnInit {
    public options: Option[];
    public initMode: number;
    constructor(
        private automaton: AutomatonService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.init = this.init.bind(this);
        this.automaton.ready$.subscribe(this.init);
        this.route.params.subscribe(this.init);
    }

    onSelectionChange() {
        this.automaton.initMode = this.initMode;
    }

    private init() {
        this.initMode = this.automaton.initMode;
        this.options = [
            { value: this.automaton.initModes.singeCell, viewValue: 'Start from single cell ' },
            { value: this.automaton.initModes.randomCells, viewValue: 'Start from random state ' },
        ];
    }
}
