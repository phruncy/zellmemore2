import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-state-control',
  templateUrl: './state-control.component.html',
  styleUrls: ['./state-control.component.scss']
})
export class StateControlComponent implements OnInit {

  constructor(private automaton: AutomatonService) { }

  private initMode;
  ngOnInit() {
    this.automaton.ready$.subscribe(() =>
    {
      this.initMode = this.automaton.initMode;
    });
  }

  onSelectionChange()
  {
    this.automaton.initMode = this.initMode;
  }
}
