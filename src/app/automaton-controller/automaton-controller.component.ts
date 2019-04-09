import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { AutomatonService } from '../services/automaton.service';
import { RuleConverterService } from '../services/rule-converter.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material';
import { MessengerService } from '../services/messenger.service';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { customTooltipDefaults } from '../utils/customTooltipDefaults';

@Component({
  selector: 'app-automaton-controller',
  templateUrl: './automaton-controller.component.html',
  styleUrls: ['./automaton-controller.component.css'],
  providers: [
      {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults}
  ]
})
export class AutomatonControllerComponent implements OnInit {

    @Input() private slider;
    @Input() private speed;
    @Input() decimal;
    @ViewChild('popup-container', {read: ViewContainerRef})
    private popupContainer: ViewContainerRef;

    /* radio button form group */
    form = new FormGroup ({
        state: new FormControl(''),
    });
    private labeltext: String;
    private faAngleDown = faAngleDown;

    private BOXES = [
        { id: '111', value: 7, tag: 'a box'},
        { id: '110', value: 6, tag: 'a box'},
        { id: '101', value: 5, tag: 'a box'},
        { id: '100', value: 4, tag: 'a box'},
        { id: '011', value: 3, tag: 'a box'},
        { id: '010', value: 2, tag: 'a box'},
        { id: '001', value: 1, tag: 'a box'},
        { id: '000', value: 0, tag: 'a box'},
    ];

    constructor(
        private automaton: AutomatonService,
        private converter: RuleConverterService,
        private messenger: MessengerService
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

    /* setup Cells evaluates the entered number before execution and 
     * will throw an error if the number parameter is not a number 
     * in the range between 0 and 255 */
    updateCellNumber(number)
    {
        try {
            this.automaton.setupCells(number);
        } catch {
            this.slider = this.automaton.cellnumber;
            console.log("catched");
        }
    }

    updateDecimal()
    {
        if (this.decimal === '') {
            this.decimal = 0;
        }
        try {
            this.automaton.ruleset = this.converter.decimalToBinary(parseInt(this.decimal, 10));
        } catch (error) {
            this.decimal = this.converter.binaryToDecimal(this.automaton.ruleset);
            console.log(error);
            const popup = this.messenger.openPopUp('Please enter a number between 0 and 255.', 3000, this.popupContainer);
        }
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
