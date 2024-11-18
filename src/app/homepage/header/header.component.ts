import { Component } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [MatButton, RouterLink, MatAnchor, MatTooltip, MatDivider]
})
export class HeaderComponent
{
    constructor() { }
}
