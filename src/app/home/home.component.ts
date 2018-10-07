import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AutomatonConfigurationService } from '../automaton-configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(
    private configurationService: AutomatonConfigurationService
  ) { }

  ngOnInit() {
    //this.fetchConfigurations();
  }

/*   fetchConfigurations(): void
  {
    this.configurationService.getConfigurations()
    .subscribe(programs => this.programs = programs);
  } */

}
