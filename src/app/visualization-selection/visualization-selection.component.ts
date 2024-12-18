import { Component, OnInit, output } from '@angular/core';
import { VisualizationDetailService } from '../services/visualization-detail.service';
import { NgFor } from '@angular/common';
import { customTooltipDefaults } from '../utils/customTooltipDefaults';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { SelectionTileComponent } from '../selection-tile/selection-tile.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-visualization-selection',
    templateUrl: './visualization-selection.component.html',
    styleUrls: ['./visualization-selection.component.scss'],
    providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }],
    standalone: true,
    imports: [NgFor, SelectionTileComponent, FaIconComponent, MatButtonModule],
})
export class VisualizationSelectionComponent implements OnInit {
    readonly faTimes = faTimes;

    public shouldClose = output<boolean>();
    private _visualizations: any[] = [];

    constructor(private visualizationDetailService: VisualizationDetailService) {}

    get visualizations(): any[] {
        return this._visualizations;
    }

    ngOnInit() {
        this.fetchVisualizations();
    }

    close() {
        this.shouldClose.emit(true);
    }

    fetchVisualizations() {
        this.visualizationDetailService.provideVisualizations().subscribe((data) => {
            this._visualizations = data;
        });
    }
}
