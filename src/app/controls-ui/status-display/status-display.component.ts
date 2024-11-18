import { Component, OnInit, Input } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
    selector: 'app-status-display',
    templateUrl: './status-display.component.html',
    styleUrls: ['./status-display.component.css'],
    standalone: true
})
export class StatusDisplayComponent implements OnInit 
{
  public generation: number;  
  
  constructor(private automaton: AutomatonService) { }
    ngOnInit() 
    {
      this.update = this.update.bind(this);
      this.automaton.ready$.subscribe(this.update);
      this.automaton.changed$.subscribe(this.update);
    }

    update(): void
    {
      this.generation = this.automaton.generation;
    }
}
