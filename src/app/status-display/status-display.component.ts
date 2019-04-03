import { Component, OnInit, Input } from '@angular/core';
import { AutomatonService } from '../services/automaton.service';

@Component({
  selector: 'app-status-display',
  templateUrl: './status-display.component.html',
  styleUrls: ['./status-display.component.css']
})
export class StatusDisplayComponent implements OnInit {

    @Input() cellnumber: number;
    constructor(private automaton: AutomatonService) { }

    ngOnInit() {
        this.cellnumber = this.automaton.cellnumber;
    }

}
