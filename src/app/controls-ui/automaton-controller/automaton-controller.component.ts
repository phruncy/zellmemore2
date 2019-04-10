import { Component, OnInit, Input, OnChanges,} from '@angular/core';
import { AutomatonService } from '../../services/automaton.service';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-automaton-controller',
  templateUrl: './automaton-controller.component.html',
  styleUrls: ['./automaton-controller.component.css'],
})
export class AutomatonControllerComponent implements OnInit {

    private faAngleDown = faAngleDown;

    constructor(private automaton: AutomatonService) { }

    ngOnInit() {}
}
