import { Component,
       } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VisualizationService } from '../services/visualization.service';
import { AutomatonService } from '../services/automaton.service';
import { faTimes, faPlay, faUndo, faAngleLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import {customTooltipDefaults } from '../utils/customTooltipDefaults';

@Component({
  selector: 'app-program-window',
  templateUrl: './program-window.component.html',
  styleUrls: ['./program-window.component.scss'],
  providers: [
      {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults}
  ]
}
)

export class ProgramWindowComponent {

    private _selectionDisplayed = false;
    private faTimes = faTimes;
    private faPlay = faPlay;
    private faUndo = faUndo;
    private faHome = faHome;
    private faAngleLeft = faAngleLeft;

    constructor(
        private route: ActivatedRoute,
        private visualizationService: VisualizationService,
        private automaton: AutomatonService,
        private location: Location,
    ) {
        }

    get selectionDisplayed(): boolean
    {
        return this._selectionDisplayed;
    }

    toggleSelection()
    {
        this._selectionDisplayed = !this._selectionDisplayed;
    }
}