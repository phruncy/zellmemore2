import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-state-control',
  templateUrl: './state-control.component.html',
  styleUrls: ['./state-control.component.scss']
})
export class StateControlComponent implements OnInit {

  constructor(private automaton: AutomatonService) { }

  ngOnInit() {
  }
}
