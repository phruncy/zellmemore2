import { Component, OnInit, model } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cells-control',
    templateUrl: './cells-control.component.html',
    styleUrls: ['./cells-control.component.scss'],
    standalone: true,
    imports: [MatSlider, MatSliderThumb, FormsModule]
})
export class CellsControlComponent implements OnInit {

    readonly cellsMin = 10;
    readonly cellsMax = 500;
    readonly step = 10;

    currentCellCount: number = 0;

  constructor(private automaton: AutomatonService) { }

  ngOnInit() 
  {
    this.automaton.ready$.subscribe(() =>
    {
      this.currentCellCount = this.automaton.cellnumber;
    })
  }

  onValueChange()
  {
    this.automaton.cellnumber = this.currentCellCount;
  }
}
