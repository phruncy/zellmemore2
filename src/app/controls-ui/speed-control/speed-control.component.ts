import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-speed-control',
  templateUrl: './speed-control.component.html',
  styleUrls: ['./speed-control.component.scss']
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