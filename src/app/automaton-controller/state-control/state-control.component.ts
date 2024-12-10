import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';

interface Option
{
  value: number;
  viewValue: String;
}

@Component({
    selector: 'app-state-control',
    styleUrls: ['../../../styles/controller/controller.scss'],
    standalone: true,
    imports: [MatSelect, FormsModule, MatOption],
    template: `
      <mat-select 
          class="mat-element" 
          [(ngModel)]="initMode"
          (ngModelChange)="onSelectionChange()"
          disableRipple>
          @for(option of options; track option)
          {
            <mat-option class="mat-element" [value]="option.value">{{option.viewValue}}</mat-option>
          }
      </mat-select>
    `
})
export class StateControlComponent implements OnInit 
{
    public options: Option[];
    public initMode: number;
    constructor(private automaton: AutomatonService) {}
    
    ngOnInit() 
    {
      this.automaton.ready$.subscribe(() =>
      {
        this.initMode = this.automaton.initMode;
        this.options = 
        [
          { value: this.automaton.initModes.singeCell, viewValue: "Single cell" },
          { value: this.automaton.initModes.randomCells, viewValue: "Random state" }
        ];
      });
    }

    onSelectionChange()
    {
      this.automaton.initMode = this.initMode;
    }
}
