import { Component, OnInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';

@Component({
  selector: 'app-speed-control',
  templateUrl: './speed-control.component.html',
  styleUrls: ['./speed-control.component.scss']
})
export class SpeedControlComponent implements OnInit {

    private _speedMin = 1;
    private _speedMax = 30;
  constructor(private automaton: AutomatonService) { }

  ngOnInit() {}
}
