import { Component, Signal, input, output, computed } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-rule-control',
    templateUrl: './rule-control.component.html',
    styleUrls: ['./rule-control.component.scss'],
    standalone: true,
    imports: [
        MatMenuTrigger,
        MatFormField,
        MatInput,
        FormsModule,
        FaIconComponent,
        MatMenu,
        MatCheckbox,
    ],
})
export class RuleControlComponent {
    readonly faAngleLeft = faAngleLeft;
    readonly boxLabels = [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 0],
        [0, 1, 1],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
    ];
    boxesDisplayed = false;

    rule = input.required<Signal<number>>();
    ruleString = computed(() => this.rule()().toString());
    ruleBoxStates = computed<boolean[]>(() =>
        Array.from({ length: this.boxLabels.length }, (_, i) => {
            const bit = this.boxLabels.length - 1 - i;
            if (((this.rule()() >> bit) & 1) === 1) return true;
            return false;
        }),
    );
    ruleChanged = output<number>();

    constructor(private messenger: MessengerService) {}

    onTextInputChanged(input: string) {
        const rule = this.parseRuleInput(input);
        this.emitRuleUpdate(rule);
    }

    onBoxesChanged(checked: boolean, index: number) {
        const rulebit = this.boxLabels.length - 1 - index;
        let rule = this.rule()();
        if (checked) {
            const mask = 1 << rulebit;
            rule |= mask;
        } else {
            const mask = ~(1 << rulebit);
            rule = rule & mask;
        }
        this.emitRuleUpdate(rule);
    }

    private emitRuleUpdate(rule: number) {
        try {
            if (rule < 0 || rule > 255 || isNaN(rule)) throw new Error('Invalid rule input.');
            this.ruleChanged.emit(rule);
        } catch {
            this.messenger.openPopUp('Please enter a number between 0 and 255.', 3000);
        }
    }

    private parseRuleInput(input: string): number {
        if (input === '') return 0;
        return parseInt(input, 10);
    }
}
