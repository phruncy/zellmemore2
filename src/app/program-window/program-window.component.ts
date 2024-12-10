import { Component, HostListener } from '@angular/core';
import { faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import {customTooltipDefaults } from '../utils/customTooltipDefaults';
import { TopbarComponent } from '../topbar/topbar.component';
import { WidgetFrameComponent } from '../app-canvas/app-canvas.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { VisualizationSelectionComponent } from '../visualization-selection/visualization-selection.component';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-program-window',
    templateUrl: './program-window.component.html',
    styleUrls: ['./program-window.component.scss'],
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }
    ],
    standalone: true,
    imports: [TopbarComponent, WidgetFrameComponent, VisualizationSelectionComponent,]
})
export class ProgramWindowComponent
{
    selectionActive = false;
    readonly faTimes = faTimes;
    readonly faHome = faHome;

    @HostListener('window:keydown.escape', ['$event'])
    handleKeydown(event: KeyboardEvent) {
        this.closeSelection();
    } 

    openSelection()
    {
        this.selectionActive = !this.selectionActive;
    }

    closeSelection()
    {
        this.selectionActive = false;
    }
}