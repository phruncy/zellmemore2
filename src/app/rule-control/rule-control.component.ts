import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { AutomatonService } from '../services/automaton.service';
import { RuleConverterService } from '../services/rule-converter.service';
import { MessengerService } from '../services/messenger.service';

@Component({
  selector: 'app-rule-control',
  templateUrl: './rule-control.component.html',
  styleUrls: ['./rule-control.component.css']
})
export class RuleControlComponent implements OnInit {

    @Input() decimal;
    @ViewChild('popupContainer') private popupContainer: ViewContainerRef;

    private BOXES = [
        { id: '111', value: 7, iconValues: [1, 1, 1]},
        { id: '110', value: 6, iconValues: [1, 1, 0]},
        { id: '101', value: 5, iconValues: [1, 0, 1]},
        { id: '100', value: 4, iconValues: [1, 0, 0]},
        { id: '011', value: 3, iconValues: [0, 1, 1]},
        { id: '010', value: 2, iconValues: [0, 1, 0]},
        { id: '001', value: 1, iconValues: [0, 0, 1]},
        { id: '000', value: 0, iconValues: [0, 0, 0]},
    ];

    constructor(
        private automaton: AutomatonService,
        private converter: RuleConverterService,
        private messenger: MessengerService) { }

    ngOnInit() {
        this.automaton.ready$.subscribe(
            () => {
                this.decimal = this.converter.binaryToDecimal(this.automaton.ruleset);
            }
        );
    }

  /* sets the digit in the ruleset at the given index to active or inactive, depending on the checkbox state */
    updateRule(index: number, checked: boolean) {
        this.automaton.ruleset[index] = checked ? 1 : 0;
        this.decimal = this.converter.binaryToDecimal(this.automaton.ruleset);
    }

    updateDecimal(): void {
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

}
