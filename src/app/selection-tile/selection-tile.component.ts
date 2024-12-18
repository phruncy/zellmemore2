import { Component, OnInit, input } from '@angular/core';
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { VisualizationService } from '../services/visualization.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardImage } from '@angular/material/card';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';

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
export class SelectionTileComponent implements OnInit {
    id = input.required<string>();
    name = input.required<string>();
    thumbnail = input<any>();

    readonly faPlusCircle = faPlusCircle;
    readonly faCheckCircle = faCheckCircle;

    private _isActive = false;
    get isActive(): boolean {
        return this._isActive;
    }

    constructor(private visualizationService: VisualizationService) {}

    ngOnInit() {
        this.onActiveVisualizationChange = this.onActiveVisualizationChange.bind(this);
        this.visualizationService.$activeComponentsChanged.subscribe(
            this.onActiveVisualizationChange,
        );
    }

    onActiveVisualizationChange() {
        this._isActive = this.visualizationService.activeComponents.includes(this.id());
    }

    selectVisualizationToDisplay(id: string) {
        this.visualizationService.visualizationToDisplay = id;
    }
}
