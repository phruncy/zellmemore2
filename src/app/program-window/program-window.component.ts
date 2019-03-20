import { Component,
       } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VisualizationSelectionComponent } from '../visualization-selection/visualization-selection.component';
import { VisualizationService } from '../services/visualization.service';
import { AutomatonService } from '../services/automaton.service';
import { RuleConverterService } from '../services/rule-converter.service';
import { faTimes, faPlay, faUndo, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-program-window',
  templateUrl: './program-window.component.html',
  styleUrls: ['./program-window.component.css']
}
)

export class ProgramWindowComponent {

    private _selectionDisplayed = false;
    private _controllerDisplayed = false;
    private faTimes = faTimes;
    private faPlay = faPlay;
    private faUndo = faUndo;
    private faAngleLeft = faAngleLeft;

    constructor(
        private route: ActivatedRoute,
        private visualizationService: VisualizationService,
        private automaton: AutomatonService,
        private location: Location,
        private converter: RuleConverterService,
    ) {
        }

    get selectionDisplayed(): boolean
    {
        return this._selectionDisplayed;
    }

    get controllerDisplayed(): boolean
    {
        return this._controllerDisplayed;
    }

    toggleSelection()
    {
        this._selectionDisplayed = !this._selectionDisplayed;
    }

    toggleController()
    {
        this._controllerDisplayed = !this._controllerDisplayed;
    }

}

