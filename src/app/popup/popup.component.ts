import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-popup',
    styleUrls: ['./popup.component.css'],
    standalone: true,
    template: `<div class="container">
        <p class="text">{{ this.message }}</p>
    </div>`,
})
export class PopupComponent {
    readonly message: string;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
        this.message = data;
    }
}
