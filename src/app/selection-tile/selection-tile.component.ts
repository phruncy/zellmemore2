import { Component, OnInit, Input } from '@angular/core';
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
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardImage, FaIconComponent, MatIconButton, MatRipple]
})
export class SelectionTileComponent implements OnInit 
{
    @Input() id;
    @Input() name: string;
    @Input() thumbnail;
    readonly faPlusCircle = faPlusCircle;
    readonly faCheckCircle = faCheckCircle;
    private _isActive = false;
    constructor(private visualizationService: VisualizationService) { }

    get isActive(): boolean {return this._isActive; }

    ngOnInit() 
    {
        this.checkIsActive = this.checkIsActive.bind(this);
        this.onActiveComponentaChange = this.onActiveComponentaChange.bind(this);
        this.visualizationService.$activeComponentsChanged.subscribe(this.onActiveComponentaChange);
    }

    onActiveComponentaChange()
    {
        this.checkIsActive(this.id)
    }

    selectVisualizationToDisplay(id: string)
    {
        this.visualizationService.visualizationToDisplay = id;
    }

    checkIsActive(id: string): boolean
    {
        return this.visualizationService.activeComponents.includes(id);
    }
}
