import { Component, input, output } from '@angular/core';
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MatCard, MatCardHeader, MatCardTitle, MatCardImage } from '@angular/material/card';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';

@Component({
    selector: 'app-selection-tile',
    templateUrl: './selection-tile.component.html',
    styleUrls: ['./selection-tile.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardImage,
        FaIconComponent,
        MatIconButton,
        MatRipple,
    ],
})
export class SelectionTileComponent {
    active = input(false);
    name = input.required<string>();
    thumbnail = input<string>();
    selected = output();

    readonly faPlusCircle = faPlusCircle;
    readonly faCheckCircle = faCheckCircle;

    onSelect() {
        this.selected.emit();
    }
}
