import { Component, model } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edge-control',
    styleUrls: ['../../../styles/controller/controller.scss'],
    standalone: true,
    imports: [MatSlideToggle, FormsModule],
    template: `
        <span class="tag">connect edges</span>
        <mat-slide-toggle class="range" [(ngModel)]="checked"></mat-slide-toggle>
    `
})
export class EdgeControlComponent
{
    checked = model<boolean>(false);
}