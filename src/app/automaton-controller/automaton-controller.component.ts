import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { AutomatonService } from '../automaton.service';
import { RuleConverterService } from '../rule-converter.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-automaton-controller',
  templateUrl: './automaton-controller.component.html',
  styleUrls: ['./automaton-controller.component.css']
})
export class AutomatonControllerComponent implements OnInit {

    @Input() private slider;
    @Input() private speed;
    @Input() decimal;
    /* radio button form group */
    form = new FormGroup ({
        state: new FormControl(''),
    });
    private labeltext: String;

    private BOXES = [
        { id: '000', value: 0, tag: 'a box'},
        { id: '001', value: 1, tag: 'a box'},
        { id: '010', value: 2, tag: 'a box'},
        { id: '011', value: 3, tag: 'a box'},
        { id: '100', value: 4, tag: 'a box'},
        { id: '101', value: 5, tag: 'a box'},
        { id: '110', value: 6, tag: 'a box'},
        { id: '111', value: 7, tag: 'a box'},
    ];

    constructor(
        private automaton: AutomatonService,
        private converter: RuleConverterService
        ) { }

        ngOnInit() {
        this.automaton.ready$.subscribe(
            () => {
                this.slider = this.automaton.cellnumber;
                this.speed = this.automaton.fps;
                this.decimal = this.converter.binaryToDecimal(this.automaton.ruleset);
                this.setLabel();
                this.form.setValue({state: this.automaton.initState.toString()});
            }
        );
        /* connects the radio button control to the automaton */
        this.form.valueChanges.subscribe (
            () => {
                this.automaton.initState = parseInt(this.form.value.state, 10);
            }
        );
    }

    /* sets the digit in the ruleset at the given index to active or inactive, depending on the checkbox state */
    updateRule(index: number, checked: boolean) {
        this.automaton.ruleset[index] = checked ? 1 : 0;
        this.decimal = this.converter.binaryToDecimal(this.automaton.ruleset);
    }

    updateDecimal()
    {
        this.automaton.ruleset = this.converter.decimalToBinary(parseInt(this.decimal, 10));
    }

    /* sets the 'Array-Mode' label */
    setLabel() {
        this.labeltext =
            this.automaton.isCircular ? 'enabled' : 'disabled';
    }

    toggle() {
        this.automaton.toggleArrayMode();
        this.setLabel();
    }
}
