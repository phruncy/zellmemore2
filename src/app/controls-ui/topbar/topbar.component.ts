import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { faPlay, faUndo, faAngleLeft, faPause, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    private faPlay = faPlay;
    private faPause = faPause;
    private faUndo = faUndo;
    private faAngleLeft = faAngleLeft;
    private _controllerDisplayed: boolean;

    constructor(private automaton: AutomatonService) { }

    ngOnInit() {
        this._controllerDisplayed = window.innerWidth > 420 ? true : false;
    }

    toggleController()
    {
        this._controllerDisplayed = !this._controllerDisplayed;
    }

    hideController() {
        this._controllerDisplayed = false;
    }
}
