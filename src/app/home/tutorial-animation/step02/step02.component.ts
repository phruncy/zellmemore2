import { Component, input, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-step02',
    styleUrls: ['./step02.component.scss'],
    animations: [
        trigger('changeState', [
            state('1', style({ background: 'black' })),
            state('0', style({ background: 'white' })),
            transition('1 <=> 0', [animate('0.15s 0.85s ease-in-out')]),
        ]),
    ],
    standalone: true,
    imports: [],
    template: `
        <div class="graphics-container">
            <div class="multiple-cells-wrapper">
                @for (state of cells; track $index) {
                    <div class="cell" [@changeState]="state"></div>
                }
            </div>
        </div>
    `,
})
export class Step02Component implements OnDestroy {
    public cells: string[] = [];
    activeDescription = input.required<number>();

    private _interval;
    private readonly _frequency = 1000;
    private readonly _cellnumber = 15;

    constructor() {
        for (let i = 0; i < this._cellnumber; i++) {
            this.cells.push(this.provideRandomState());
        }
        this._interval = setInterval(() => {
            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i] = this.provideRandomState();
            }
        }, this._frequency);
    }

    ngOnDestroy() {
        clearInterval(this._interval);
    }

    private provideRandomState(): string {
        return Math.round(Math.random()).toString();
    }
}
