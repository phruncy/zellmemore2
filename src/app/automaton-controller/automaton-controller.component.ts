import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AutomatonService } from '../automaton.service';

@Component({
  selector: 'app-automaton-controller',
  templateUrl: './automaton-controller.component.html',
  styleUrls: ['./automaton-controller.component.css']
})
export class AutomatonControllerComponent implements OnInit, AfterViewInit {

    private sliderValue;
    private speedValue;
    constructor(private automaton: AutomatonService) { }
    @ViewChild('cellnumber-slider')numberSlider: ElementRef;

    ngOnInit() {
        this.sliderValue = this.automaton.cellnumber;
        this.speedValue = 3;
    }

    ngAfterViewInit() {
    }

    callback()
    {
        console.log('changed');
    }

}
