import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-edge-control',
  templateUrl: './edge-control.component.html',
  styleUrls: ['./edge-control.component.scss']
})
export class EdgeControlComponent implements OnInit {

    private labeltext: String;
    private _checked: boolean;

    constructor(private automaton: AutomatonService) { }

    ngOnInit() 
    {
        this.automaton.ready$.subscribe(
            () => {
                this._checked = this.automaton.isCircular;
            });
    }

    onToggle() 
    {
        this.automaton.isCircular = this._checked;
    }

}
