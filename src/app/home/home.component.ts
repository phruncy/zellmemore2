import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AutomatonConfiguration } from '../automaton-configuration';
import { AutomatonConfigurationService } from '../automaton-configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  programs: AutomatonConfiguration[];
  constructor(
    private configurationService: AutomatonConfigurationService
  ) { }

  ngOnInit() {
    this.fetchConfigurations();
  }

  fetchConfigurations(): void
  {
    this.configurationService.getConfigurations()
    .subscribe(programs => this.programs = programs);
  }

}
