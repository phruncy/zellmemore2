import { Component, HostListener, model, OnInit} from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { faPlay, faUndo, faAngleLeft, faPause, faHome } from '@fortawesome/free-solid-svg-icons';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-toolbar-toprow',
    templateUrl: './toolbar-toprow.component.html',
    styleUrls: ['./toolbar-toprow.component.scss'],
    standalone: true,
    imports: [MatButton, MatTooltip, FaIconComponent]
})
export class ToolbarToprowComponent implements OnInit 
{
    readonly faPlay = faPlay;
    readonly faPause = faPause;
    readonly faUndo = faUndo;
    readonly faAngleLeft = faAngleLeft;
    readonly faHome = faHome;
    isRunning = false;
    generation: number;

    displayController = model<boolean>(true);
    constructor(private automaton: AutomatonService) { }

    ngOnInit() 
    {
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
        this.displayController.set(!this.displayController());
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
