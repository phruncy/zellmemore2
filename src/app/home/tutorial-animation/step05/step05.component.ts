import { Component, input } from '@angular/core';
import { animations } from 'src/app/home/animations';

@Component({
    selector: 'app-step05',
    templateUrl: './step05.component.html',
    styleUrls: ['./step05.component.scss'],
    animations: [animations.dropdownCell],
    standalone: true,
    imports: [],
})
export class Step05Component {
    activeDescription = input.required<number>();

    trios = [
        { id: 1, left: 1, middle: 1, right: 1 },
        { id: 2, left: 1, middle: 1, right: 0 },
        { id: 3, left: 1, middle: 0, right: 1 },
        { id: 4, left: 1, middle: 0, right: 0 },
        { id: 5, left: 0, middle: 1, right: 1 },
        { id: 6, left: 0, middle: 1, right: 0 },
        { id: 7, left: 0, middle: 0, right: 1 },
        { id: 8, left: 0, middle: 0, right: 0 },
    ];
}
