import { Component, OnInit, ViewContainerRef, viewChild, ViewEncapsulation } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgFor } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';

interface Checkbox {
    id: string;
    iconValues: number[];
    checked: boolean;
}

@Component({
    selector: 'app-rule-control',
    templateUrl: './rule-control.component.html',
    styleUrls: ['./rule-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatMenuTrigger,
        MatFormField,
        MatInput,
        FormsModule,
        FaIconComponent,
        MatMenu,
        NgFor,
        MatCheckbox,
    ],
})
export class RuleControlComponent implements OnInit {
    readonly faAngleLeft = faAngleLeft;
    readonly BOXES: Checkbox[] = [
        { id: '111', iconValues: [1, 1, 1], checked: false },
        { id: '110', iconValues: [1, 1, 0], checked: false },
        { id: '101', iconValues: [1, 0, 1], checked: false },
        { id: '100', iconValues: [1, 0, 0], checked: false },
        { id: '011', iconValues: [0, 1, 1], checked: false },
        { id: '010', iconValues: [0, 1, 0], checked: false },
        { id: '001', iconValues: [0, 0, 1], checked: false },
        { id: '000', iconValues: [0, 0, 0], checked: false },
    ];
    decimal: string;
    boxesDisplayed = false;
    popupContainer = viewChild('popupContainer', { read: ViewContainerRef });

    constructor(
        private automaton: AutomatonService,
        private messenger: MessengerService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.init = this.init.bind(this);
        this.automaton.ready$.subscribe(this.init);
        this.route.params.subscribe(this.init);
    }

    onTextInputChanged() {
        this.updateRule(convertRuleInput(this.decimal));
        this.syncBoxes();
    }

    onBoxesChanged() {
        const newRule = parseFromCheckboxes(this.BOXES);
        this.updateRule(newRule);
    }

    syncBoxes() {
        this.BOXES.forEach((box, index) => {
            box.checked = false;
            const k = this.BOXES.length - 1 - index;
            if (((this.automaton.rule >> k) & 1) === 1) box.checked = true;
        });
    }

    updateRule(rule: number) {
        try {
            if (rule < 0 || rule > 255 || isNaN(rule)) throw new Error('Invalid rule input.');
            this.automaton.rule = rule;
        } catch {
            this.messenger.openPopUp('Please enter a number between 0 and 255.', 3000);
        }
        this.decimal = this.automaton.rule.toString();
    }

    private init() {
        this.decimal = this.automaton.rule.toString();
        this.syncBoxes();
    }
}

function parseFromCheckboxes(BOXES: Checkbox[]): number {
    const shiftIn = (result, box) => {
        result = result << 1;
        if (box.checked) {
            result |= 1;
        }
        return result;
    };
    return BOXES.reduce(shiftIn, 0);
}

function convertRuleInput(decimal: string): number {
    if (decimal === '') return 0;
    return parseInt(decimal, 10);
}
