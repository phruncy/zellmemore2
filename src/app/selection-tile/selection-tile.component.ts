import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { VisualizationService } from '../services/visualization.service';

@Component({
  selector: 'app-selection-tile',
  templateUrl: './selection-tile.component.html',
  styleUrls: ['./selection-tile.component.scss']
})
export class SelectionTileComponent implements OnInit {

    @Input() id;
    @Input() name: string;
    @Input() thumbnail;
    private faPlusCircle = faPlusCircle;
    private faCheckCircle = faCheckCircle;
    private _isActive = false;
    constructor(private visualizationService: VisualizationService) { }

    ngOnInit() {
        this.visualizationService.$activeComponentsChanged.subscribe(
            () => {
                this._isActive = this.checkIsActive(this.id);
                console.log(this._isActive);
            }
        );
    }

    // tells the visualization service which option was selected
    // function is called whenever a DOM Element associated with a
    // _visualization-Object is clicked
    selectVisualizationToDisplay(id: string)
    {
        this.visualizationService.visualizationToDisplay = id;
    }

    checkIsActive(id: string): boolean
    {
        console.log(this.visualizationService.activeComponents);
        return this.visualizationService.activeComponents.includes(id);
    }
}
