import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

interface Option
{
  value: number;
  viewValue: String;
}

@Component({
  selector: 'app-state-control',
  templateUrl: './state-control.component.html',
  styleUrls: ['./state-control.component.scss']
})
export class StateControlComponent implements OnInit {

    public options: Option[];
    private _initMode: number;
    constructor(private automaton: AutomatonService) {}
    
    ngOnInit() 
    {
      this.automaton.ready$.subscribe(() =>
      {
        this._initMode = this.automaton.initMode;
        this.options = 
        [
          { value: this.automaton.initModes.singeCell, viewValue: "Start with a single active cell" },
          { value: this.automaton.initModes.randomCells, viewValue: "Start from random state" }
        ];
      });
    }

    onSelectionChange()
    {
      this.automaton.initMode = this._initMode;
    }
}
