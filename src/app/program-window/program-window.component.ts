import { Component,
         OnInit,
       } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VisualizationSelectionComponent } from '../visualization-selection/visualization-selection.component';
import { VisualizationService } from '../visualization.service';
import { AutomatonService } from '../automaton.service';
import { RuleConverterService } from '../rule-converter.service';

@Component({
  selector: 'app-program-window',
  templateUrl: './program-window.component.html',
  styleUrls: ['./program-window.component.css']
}
)

export class ProgramWindowComponent implements OnInit {

    private _selectionDisplayed = false;
    private _controllerDisplayed = false;
    private displayedRule: number;

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

    ngOnInit()
    {
        this.automaton.initialise();
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

