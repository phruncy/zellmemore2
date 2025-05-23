import { Component, input } from '@angular/core';

@Component({
    selector: 'app-step03',
    templateUrl: './step03.component.html',
    styleUrls: ['./step03.component.scss'],
    standalone: true,
})
export class Step03Component {
    activeDescription = input.required<number>();
}
