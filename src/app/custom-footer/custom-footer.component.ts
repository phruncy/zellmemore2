import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-custom-footer',
    styleUrls: ['./custom-footer.component.scss'],
    standalone: true,
    imports: [MatDivider, RouterLink],
    template: `
    <mat-divider></mat-divider>
    <div class ="container">
            <a class="link" routerLink="/data-disclaimer">Privacy</a>
    </div>
    `
})
export class CustomFooterComponent {}