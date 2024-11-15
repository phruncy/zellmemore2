import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { faPlay, faUndo, faAngleLeft, faPause, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit 
{
    readonly faPlay = faPlay;
    readonly faPause = faPause;
    readonly faUndo = faUndo;
    readonly faAngleLeft = faAngleLeft;
    private _controllerDisplayed: boolean;
    private _isRunning = false;

    constructor(private automaton: AutomatonService) { }

    ngOnInit() 
    {
        this._controllerDisplayed = window.innerWidth > 420 ? true : false;
        this.init = this.ngOnInit.bind(this);
        this.automaton.ready$.subscribe(this.init)
    }

    init(): void
    {
        this._isRunning = this.automaton.isRunning;
    }

    onClickPlay()
    {
        this._isRunning = !this._isRunning;
        this.automaton.isRunning = this._isRunning;
    }

    onClickReset()
    {
        this.automaton.reset();
    }

    toggleController()
    {
        this._controllerDisplayed = !this._controllerDisplayed;
    }

    hideController() {
        this._controllerDisplayed = false;
    }
}
