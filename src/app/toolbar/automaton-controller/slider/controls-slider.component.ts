import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatTooltip } from '@angular/material/tooltip';
import { SliderSettings } from '../SliderSettings';

@Component({
  selector: 'app-controls-slider',
  standalone: true,
  imports: [MatSlider, MatSliderThumb, MatTooltip, FormsModule],
  styleUrl: '../../toolbar.common.scss',
  template:`
    <div class="controller-element mat-element">
      <span mat matTooltip="tooltip">{{tooltip}}</span>
      <mat-slider
          [min]="settings().min"
          [max]="settings().max"
          [step]="settings().step">
          <input matSliderThumb [(ngModel)]="value"/>
      </mat-slider>
    </div>
  `
})
export class ControlsSliderComponent 
{
  public settings = input.required<SliderSettings>();
  value = model<number>(1);

  get tooltip(): string { return `${this.value()} ${this.settings().label}`; }
}