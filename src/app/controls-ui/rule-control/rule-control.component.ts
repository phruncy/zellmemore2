import { Component, OnInit, Input, ViewContainerRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rule-control',
  templateUrl: './rule-control.component.html',
  styleUrls: ['./rule-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RuleControlComponent implements OnInit {

    @Input() decimal;
    @ViewChild('popupContainer', { static: true }) private popupContainer: ViewContainerRef;
    private _boxesDisplayed = false;
    private faAngleLeft = faAngleLeft;

    private BOXES = [
        { id: '111', index: 7, iconValues: [1, 1, 1], checked: false},
        { id: '110', index: 6, iconValues: [1, 1, 0], checked: false},
        { id: '101', index: 5, iconValues: [1, 0, 1], checked: false},
        { id: '100', index: 4, iconValues: [1, 0, 0], checked: false},
        { id: '011', index: 3, iconValues: [0, 1, 1], checked: false},
        { id: '010', index: 2, iconValues: [0, 1, 0], checked: false},
        { id: '001', index: 1, iconValues: [0, 0, 1], checked: false},
        { id: '000', index: 0, iconValues: [0, 0, 0], checked: false},
    ];
    constructor(
        private automaton: AutomatonService,
        private messenger: MessengerService) { }

    ngOnInit() {
        this.automaton.ready$.subscribe(
            () => {
                this.decimal = this.automaton.rule;
                this.BOXES.forEach((box) => {
                    if ((this.automaton.rule >> box.index & 1) === 1)
                        box.checked = true;
                });
            }
        );
    }

    onTextInputChanged()
    {
        this.updateRule(convertRuleInput(this.decimal));
        this.syncBoxes();
    }

    onBoxesChanged()
    {
        const newRule = parseFromCheckboxes(this.BOXES);
        this.updateRule(newRule);
        this.syncDecimal();
    }

    syncDecimal()
    {
        this.decimal = this.automaton.rule;
    }

    syncBoxes()
    {
        this.BOXES.forEach((box) => {
            if ((this.automaton.rule >> box.index & 1) === 1)
                box.checked = true;
            else
                box.checked = false;
        });
    }

    updateRule(rule: number) {
        try 
        {
            if ((rule < 0) || (rule > 255) || isNaN(rule))
                    throw new Error("Invalid rule input.");
            this.automaton.rule = rule;
        }
        catch(error)
        {
            const popup = this.messenger.openPopUp('Please enter a number between 0 and 255.', 3000, this.popupContainer);
            this.decimal = this.automaton.rule;
        }
    }

    setIcon(value: boolean) 
    {
        this._boxesDisplayed = value;
    }

}

function parseFromCheckboxes(BOXES: any) : number
{
    const shiftIn = (result, box) => {
        result = result<<1;
        if(box.checked)
        {
            result |= 1;
        }
        return result;
    }
    return BOXES.reduce(shiftIn, 0);
}

function convertRuleInput(decimal: string): number 
{
    if(decimal === "")
        return 0;
    return parseInt(decimal, 10);
}

