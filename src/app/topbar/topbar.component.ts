import { Component, HostListener, OnInit} from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { faPlay, faUndo, faAngleLeft, faPause, faHome } from '@fortawesome/free-solid-svg-icons';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatDivider } from '@angular/material/divider';
import { AutomatonControllerComponent } from '../automaton-controller/automaton-controller.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    standalone: true,
    imports: [MatButton, MatTooltip, FaIconComponent, MatDivider, AutomatonControllerComponent]
})
export class TopbarComponent implements OnInit 
{
    readonly faPlay = faPlay;
    readonly faPause = faPause;
    readonly faUndo = faUndo;
    readonly faAngleLeft = faAngleLeft;
    readonly faHome = faHome;
    controllerDisplayed: boolean;
    isRunning = false;
    generation: number;

    constructor(private automaton: AutomatonService) { }

    ngOnInit() 
    {
        this.controllerDisplayed = window.innerWidth > 420 ? true : false;
        this.init = this.ngOnInit.bind(this);
        this.update = this.update.bind(this);
        this.automaton.ready$.subscribe(this.init)
        this.automaton.changed$.subscribe(this.update)
        this.automaton.cellsChanged$.subscribe(this.update);
    }

    @HostListener('window:keydown.space', ['$event'])
    handleKeyDown(event: KeyboardEvent)
    {
        this.toggleRunning();
    }
    
    public onClickPlay()
    {
        this.toggleRunning();
    }
    
    public onClickReset()
    {
        this.automaton.reset();
    }
    
    public toggleController()
    {
        this.controllerDisplayed = !this.controllerDisplayed;
    }

    private init(): void
    {
        this.isRunning = this.automaton.isRunning;
    }
    
    private update()
    {
        this.generation = this.automaton.generation;
    }

    private toggleRunning() 
    {
        this.isRunning = !this.isRunning;
        this.automaton.isRunning = this.isRunning;
    }
}
