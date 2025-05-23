import { Component, input } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-step-final',
    styleUrls: ['./step-final.component.scss'],
    standalone: true,
    imports: [MatButton, RouterLink, FaIconComponent],
    template: `
        <div class="btn-container">
            <button class="btn" routerLink="/program-window" mat-flat-button color="accent">
                Try it
                <fa-icon [icon]="faAngleRight"></fa-icon>
            </button>
        </div>
    `,
})
export class StepFinalComponent {
    activeDescription = input.required<number>();
    readonly faAngleRight = faAngleRight;
}
