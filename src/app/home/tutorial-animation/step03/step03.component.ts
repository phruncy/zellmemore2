import { Component, input } from '@angular/core';

@Component({
    selector: 'app-step03',
    styleUrls: ['./step03.component.scss'],
    standalone: true,
    template: `<div class="graphics-container">
        <div class="cell-row">
            <div class="cell-container">
                <div class="signal left" [class.animate-step02]="activeDescription() >= 2"></div>
                <div
                    class="background-circle outer"
                    [class.animate-step01]="activeDescription() === 1"
                    [class.animate-step02]="activeDescription() >= 2"></div>
                <div class="cell black" id="cell1"></div>
            </div>
            <div class="cell-container">
                <div
                    class="connector left"
                    [class.animate-step01]="activeDescription() === 1"
                    [class.animate-step02]="activeDescription() >= 2"></div>
                <div
                    class="connector right"
                    [class.animate-step01]="activeDescription() === 1"
                    [class.animate-step02]="activeDescription() >= 2"></div>
                <div
                    class="background-circle"
                    [class.animate-step01]="activeDescription() === 1"
                    [class.animate-step02]="activeDescription() >= 2"></div>
                <div
                    class="cell"
                    id="cell2"
                    [class.animate-step02]="activeDescription() >= 2"></div>
            </div>
            <div class="cell-container">
                <div class="signal right" [class.animate-step02]="activeDescription() >= 2"></div>
                <div
                    class="background-circle outer"
                    [class.animate-step01]="activeDescription() === 1"
                    [class.animate-step02]="activeDescription() >= 2"></div>
                <div class="cell" id="cell3"></div>
            </div>
        </div>
    </div>`,
})
export class Step03Component {
    activeDescription = input.required<number>();
}
