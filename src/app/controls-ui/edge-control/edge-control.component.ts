import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-edge-control',
  templateUrl: './edge-control.component.html',
  styleUrls: ['./edge-control.component.css']
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
        this.automaton.isCircular ? 'enabled' : 'disabled';
    }

    toggle() {
        this.automaton.isCircular = !this.automaton.isCircular;
        this.setLabel();
    }

}
