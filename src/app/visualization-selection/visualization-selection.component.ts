import { Component, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { customTooltipDefaults } from '../utils/customTooltipDefaults';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { SelectionTileComponent } from './selection-tile/selection-tile.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import {
    VisualizationContext,
    VisualizationContextService,
} from '../services/visualization-context.service';

@Component({
    selector: 'app-visualization-selection',
    styleUrls: ['./visualization-selection.component.scss'],
    providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }],
    standalone: true,
    imports: [SelectionTileComponent, FaIconComponent, AsyncPipe],
    template: `
        <div class="selection-frame">
            <div class="header">
                <h2>Select a visualization:</h2>
                <fa-icon [icon]="faTimes" class="close-icon" (close)="close()"></fa-icon>
            </div>
            <div class="selection-tiles-container">
                @for (ctx of contexts$ | async; track $index) {
                    <app-selection-tile
                        [active]="activeMap()[$index] ?? false"
                        [name]="ctx.data.name"
                        [thumbnail]="ctx.data.thumbnail"
                        (selected)="requestWidgetCreation($index)"></app-selection-tile>
                }
            </div>
        </div>
    `,
})
export class VisualizationSelectionComponent {
    readonly faTimes = faTimes;
    public contexts$: Observable<VisualizationContext[]>;
    public shouldClose = output<boolean>();
    public activeMap = this._visService.activeSketches;

    constructor(private _visService: VisualizationContextService) {
        this.contexts$ = this._visService.getContexts();
    }

    requestWidgetCreation(contentId: number) {
        this._visService.requestCreation(contentId);
    }

    close() {
        this.shouldClose.emit(true);
    }
}
