import { Component, input } from '@angular/core';
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { VisualizationService } from '../services/visualization.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardImage } from '@angular/material/card';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-selection-tile',
    templateUrl: './selection-tile.component.html',
    styleUrls: ['./selection-tile.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardImage,
        FaIconComponent,
        MatIconButton,
        MatRipple,
    ],
})
export class SelectionTileComponent {
    id = input.required<number>();
    name = input.required<string>();
    thumbnail = input<any>();

    readonly faPlusCircle = faPlusCircle;
    readonly faCheckCircle = faCheckCircle;

    private _isActive = false;
    get isActive(): boolean {
        return this._isActive;
    }

    constructor(private visualizationService: VisualizationService) {
        this.onActiveVisualizationChange = this.onActiveVisualizationChange.bind(this);
        this.visualizationService.$activeComponentsChanged
            .pipe(takeUntilDestroyed())
            .subscribe(this.onActiveVisualizationChange);
    }

    onActiveVisualizationChange() {
        this._isActive = this.visualizationService.activeComponents.includes(this.id());
    }

    selectVisualizationToDisplay(id: number) {
        this.visualizationService.select(id);
    }
}
