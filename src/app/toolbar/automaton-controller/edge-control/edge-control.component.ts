import { Component, model } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edge-control',
    styleUrls: ['../../toolbar.common.scss'],
    standalone: true,
    imports: [MatSlideToggle, FormsModule],
    template: `<mat-slide-toggle class="mat-element" labelPosition="before" [(ngModel)]="checked">Connect Edges</mat-slide-toggle>`
})
export class EdgeControlComponent
{
    checked = model<boolean>(false);
}