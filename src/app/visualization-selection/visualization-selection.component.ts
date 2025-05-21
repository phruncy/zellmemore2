import { Component, output } from '@angular/core';
import { VisualizationDetailService } from '../services/visualization-detail.service';
import { AsyncPipe } from '@angular/common';
import { customTooltipDefaults } from '../utils/customTooltipDefaults';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { SelectionTileComponent } from '../selection-tile/selection-tile.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { VisualizationDescData } from 'src/VisualizationDescData';
import { Observable } from 'rxjs';
import { VisualizationService } from '../services/visualization.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-visualization-selection',
    templateUrl: './visualization-selection.component.html',
    styleUrls: ['./visualization-selection.component.scss'],
    providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }],
    standalone: true,
    imports: [SelectionTileComponent, FaIconComponent, MatButtonModule, AsyncPipe],
})
export class VisualizationSelectionComponent {
    readonly faTimes = faTimes;

    public selectionTileData$: Observable<VisualizationDescData[]>;
    public shouldClose = output<boolean>();

    constructor(
        private _visService: VisualizationService,
        private _visualizationDetailService: VisualizationDetailService,
    ) {
        this.selectionTileData$ = this._visualizationDetailService.provideVisualizations();
        this._visService.$activeComponentsChanged.pipe(takeUntilDestroyed()).subscribe();
    }

    isActive(id: number) {
        return this._visService.activeComponents.includes(id);
    }

    requestWidgetCreation(contentId: number) {
        this._visService.select(contentId);
    }

    close() {
        this.shouldClose.emit(true);
    }
}
