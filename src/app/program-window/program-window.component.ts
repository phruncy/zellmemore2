import { Component } from '@angular/core';
import { faTimes, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip } from '@angular/material/tooltip';
import {customTooltipDefaults } from '../utils/customTooltipDefaults';
import { TopbarComponent } from '../controls-ui/topbar/topbar.component';
import { WidgetFrameComponent } from '../widget-frame/widget-frame.component';
import { MatRipple } from '@angular/material/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { VisualizationSelectionComponent } from '../visualization-selection/visualization-selection.component';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CustomFooterComponent } from '../custom-footer/custom-footer.component';

@Component({
    selector: 'app-program-window',
    templateUrl: './program-window.component.html',
    styleUrls: ['./program-window.component.scss'],
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }
    ],
    standalone: true,
    imports: [TopbarComponent, WidgetFrameComponent, MatTooltip, MatRipple, FaIconComponent, VisualizationSelectionComponent, MatButton, RouterLink, CustomFooterComponent]
})
export class ProgramWindowComponent
{
    selectionActive = false;
    readonly faTimes = faTimes;
    readonly faHome = faHome;
    readonly faPlusCircle = faPlusCircle;

    toggleSelection()
    {
        this.selectionActive = !this.selectionActive;
    }

    closeSelection()
    {
        this.selectionActive = false;
    }
}