import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-speed-control',
    templateUrl: './speed-control.component.html',
    styleUrls: ['./speed-control.component.scss'],
    standalone: true,
    imports: [MatTooltip, MatSlider, MatSliderThumb, FormsModule]
})
export class SpeedControlComponent implements OnInit
{
  readonly speedMin = 1;
  readonly speedMax = 30;
  private _fps: number;
  constructor(private automaton: AutomatonService) {}

  ngOnInit()
  {
    this.init = this.init.bind(this);
    this.automaton.ready$.subscribe(this.init);
  }

  onModelChange(event: number): void
  {
    this.automaton.fps = event;
  }

  init(): void
  {
    this._fps = this.automaton.fps;
  }
}