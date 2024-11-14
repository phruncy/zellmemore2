import { Component, OnInit, Input } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-status-display',
  templateUrl: './status-display.component.html',
  styleUrls: ['./status-display.component.css']
})
export class StatusDisplayComponent implements OnInit 
{
    constructor(private automaton: AutomatonService) { }
    ngOnInit() {}
}
