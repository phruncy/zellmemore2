import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AutomatonService } from '../services/automaton.service';
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
    constructor(private visualizationService: VisualizationService) { }

  ngOnInit() {
  }

    // tells the visualization service which option was selected
    // function is called whenever a DOM Element associated with a 
    // _visualization-Object is clicked 
    selectVisualizationToDisplay(id: string)
    {
        this.visualizationService.visualizationToDisplay = id;
    }

}
