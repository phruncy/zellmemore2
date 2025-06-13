import { Component, output } from '@angular/core';
import { VisualizationDetailService } from '../services/visualization-detail.service';
import { AsyncPipe } from '@angular/common';
import { customTooltipDefaults } from '../utils/customTooltipDefaults';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { SelectionTileComponent } from './selection-tile/selection-tile.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatButton } from '@angular/material/button';
import { VisualizationDescData } from 'src/app/VisualizationDescData';
import { Observable } from 'rxjs';
import { VisualizationService } from '../services/visualization.service';

@Component({
    selector: 'app-visualization-selection',
    styleUrls: ['./visualization-selection.component.scss'],
    providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }],
    standalone: true,
    imports: [SelectionTileComponent, FaIconComponent, MatButton, AsyncPipe],
    template: `
        <div class="selection-frame">
            <div class="header">
                <h2>Select a visualization:</h2>
                <fa-icon [icon]="faTimes" class="close-icon" (close)="close()"></fa-icon>
            </div>
            <div class="selection-tiles-container">
                @for (tileData of selectionTileData$ | async; track $index) {
                    <app-selection-tile
                        [active]="activeMap()[$index] ?? false"
                        [name]="tileData.name"
                        [thumbnail]="tileData.thumbnail"
                        (selected)="requestWidgetCreation($index)"></app-selection-tile>
                }
            </div>
        </div>
    `,
})
export class VisualizationSelectionComponent {
    readonly faTimes = faTimes;

    public selectionTileData$: Observable<VisualizationDescData[]>;
    public shouldClose = output<boolean>();
    public activeMap = this._visService.isActiveMap;

    constructor(
        private _visService: VisualizationService,
        private _visualizationDetailService: VisualizationDetailService,
    ) {
        this.selectionTileData$ = this._visualizationDetailService.provideVisualizations();
    }

    requestWidgetCreation(contentId: number) {
        this._visService.select(contentId);
    }

    close() {
        this.shouldClose.emit(true);
    }
}
