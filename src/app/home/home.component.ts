import { Component, OnInit } from '@angular/core';
import { AutomatonConfigurationService } from '../services/automaton-configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

    constructor(
    private configurationService: AutomatonConfigurationService
  ) { }

  ngOnInit() {
  }
}
