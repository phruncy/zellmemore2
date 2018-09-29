import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as p5 from 'p5';
import { AutomatonConfiguration } from '../automaton-configuration';
import { AutomatonConfigurationService } from '../automaton-configuration.service';
import { AutomatonService } from '../automaton.service';



@Component({
  selector: 'app-program-window',
  templateUrl: './program-window.component.html',
  styleUrls: ['./program-window.component.css']
}
)

export class ProgramWindowComponent implements OnInit {

  configuration: AutomatonConfiguration;
  
  constructor(
    private route: ActivatedRoute,
    private configurationService: AutomatonConfigurationService,
    private location: Location,
    private automaton: AutomatonService
  ) { }

  private p5;
  

  ngOnInit() 
  {
     this.fetchConfiguration();
     this.p5 = new p5(this.sketch) 
     this.p5.automaton = this.automaton
  }

  private sketch(p: any) 
  {
    p.setup = () =>
    {
      p.createCanvas(500,500);
      console.log(p.automaton);
      p.testNumber = p.automaton.testing();
      
    }

    p.draw= () => 
    {
      p.background(100);
      p.fill(0);
      if (p.testNumber< p.width)
      {
        p.testNumber += 1;
      }
      p.rect(20,20,p.testNumber, p.testNumber);

    }
  }

   fetchConfiguration() : void
  {
    const id = +this.route.snapshot.paramMap.get('id');
    //.getConfiguration() erwartet eine Zahl als Parameter
    this.configurationService.getConfiguration(id)
      .subscribe(configuration => this.configuration = configuration);
  } 
}
