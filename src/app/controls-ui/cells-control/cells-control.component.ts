import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-cells-control',
  templateUrl: './cells-control.component.html',
  styleUrls: ['./cells-control.component.css']
})
export class CellsControlComponent implements OnInit {

    private _cellsMin = 10;
    private _cellsMax = 300;
    private _step = 10;

  constructor(private automaton: AutomatonService) { }

  ngOnInit() {}
}
