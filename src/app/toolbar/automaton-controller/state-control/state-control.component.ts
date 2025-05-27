import { Component, model, input } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Option } from '../Option';

@Component({
    selector: 'app-state-control',
    styleUrls: ['../../toolbar.common.scss'],
    standalone: true,
    imports: [MatSelect, FormsModule, MatOption],
    template: `
        <span></span>
        <mat-select class="mat-element" [(ngModel)]="initState" disableRipple>
            @for (option of options(); track option.value) {
                <mat-option class="mat-element" [value]="option.value">{{
                    option.viewValue
                }}</mat-option>
            }
        </mat-select>
    `,
})
export class StateControlComponent {
    public options = input.required<Option[]>();
    public initMode: number;
    initState = model<number>(0);
}
