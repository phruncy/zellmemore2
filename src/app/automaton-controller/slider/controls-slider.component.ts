import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatTooltip } from '@angular/material/tooltip';
import { SliderSettings } from '../ControlSettings';

@Component({
  selector: 'app-controls-slider',
  standalone: true,
  imports: [MatSlider, MatSliderThumb, MatTooltip, FormsModule],
  templateUrl: './controls-slider.component.html',
  styleUrl: './controls-slider.scss'
})
export class ControlsSliderComponent 
{
  public settings = input.required<SliderSettings>();
  value = model<number>(1);

  get tooltip(): string { return `${this.value()} ${this.settings().label}`; }
}