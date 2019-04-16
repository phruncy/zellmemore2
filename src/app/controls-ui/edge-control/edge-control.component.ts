import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-edge-control',
  templateUrl: './edge-control.component.html',
  styleUrls: ['./edge-control.component.scss']
})
export class EdgeControlComponent implements OnInit {

    private labeltext: String;

    constructor(private automaton: AutomatonService) { }

    ngOnInit() {
        this.automaton.ready$.subscribe(
            () => {
                this.setLabel();
            });
    }

  /* sets the 'Array-Mode' label */
    setLabel() {
    this.labeltext =
        this.automaton.isCircular ? 'on' : 'off';
    }

    toggle() {
        this.automaton.isCircular = !this.automaton.isCircular;
        this.setLabel();
    }

}
