import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edge-control',
    templateUrl: './edge-control.component.html',
    styleUrls: ['./edge-control.component.scss'],
    standalone: true,
    imports: [MatSlideToggle, FormsModule]
})
export class EdgeControlComponent implements OnInit {

    checked: boolean;

    constructor(private automaton: AutomatonService) { }

    ngOnInit() 
    {
        this.automaton.ready$.subscribe(
            () => {
                this.checked = this.automaton.isCircular;
            });
    }

    onToggle() 
    {
        this.automaton.isCircular = this.checked;
    }

}
