import { Component } from '@angular/core';
import { faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
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
export class ProgramWindowComponent
{
    selectionActive = false;
    readonly faTimes = faTimes;
    readonly faHome = faHome;

    toggleSelection()
    {
        this.selectionActive = !this.selectionActive;
    }

    closeSelection()
    {
        this.selectionActive = false;
    }
}