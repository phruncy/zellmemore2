import { Component, HostListener } from '@angular/core';
import { faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { customTooltipDefaults } from '../utils/customTooltipDefaults';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { WidgetFrameComponent } from '../app-canvas/app-canvas.component';
import { VisualizationSelectionComponent } from '../visualization-selection/visualization-selection.component';
import { SizeService } from '../services/size.service';
import { AutomatonService } from '../services/automaton.service';
import { VisualizationService } from '../services/visualization.service';

@Component({
    selector: 'app-program-window',
    styleUrls: ['./program-window.component.scss'],
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults },
        SizeService,
        AutomatonService,
        VisualizationService,
    ],
    standalone: true,
    imports: [ToolbarComponent, WidgetFrameComponent, VisualizationSelectionComponent],
    template: `
        <div class="window-overlay" [class.active]="selectionActive" (click)="closeSelection()">
            <app-visualization-selection
                (shouldClose)="closeSelection()"></app-visualization-selection>
        </div>
        <div class="program-window">
            <app-toolbar></app-toolbar>
            <div class="program-window-canvas">
                <app-canvas
                    (requestSelection)="openSelection()"
                    (widgetAdded)="closeSelection()"></app-canvas>
            </div>
        </div>
    `,
})
export class ProgramWindowComponent {
    selectionActive = false;
    readonly faTimes = faTimes;
    readonly faHome = faHome;

    @HostListener('window:keydown.escape', ['$event'])
    handleKeydown() {
        this.closeSelection();
    }

    openSelection() {
        this.selectionActive = !this.selectionActive;
    }

    closeSelection() {
        this.selectionActive = false;
    }
}
