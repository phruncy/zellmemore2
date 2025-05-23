import { Component, HostListener, model } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import {
    faPlay,
    faUndo,
    faAngleLeft,
    faPause,
    faHome,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-toolbar-toprow',
    templateUrl: './toolbar-toprow.component.html',
    styleUrls: ['./toolbar-toprow.component.scss'],
    standalone: true,
    imports: [MatButton, MatTooltip, FaIconComponent, RouterLink],
})
export class ToolbarToprowComponent {
    readonly faPlay = faPlay;
    readonly faPause = faPause;
    readonly faUndo = faUndo;
    readonly faAngleLeft = faAngleLeft;
    readonly faHome = faHome;
    readonly faGear = faGear;

    displayController = model<boolean>(true);
    constructor(public automaton: AutomatonService) {}

    get isMobileLayout() {
        return window.innerWidth < 480;
    }

    get generation() {
        return this.automaton.generation;
    }

    @HostListener('window:keydown.space', ['$event'])
    handleKeyDown() {
        this.toggleRunning();
    }

    public onClickPlay() {
        this.toggleRunning();
    }

    public onClickReset() {
        this.automaton.reset();
    }

    public toggleController() {
        this.displayController.set(!this.displayController());
    }

    private toggleRunning() {
        this.automaton.toggle();
    }
}
