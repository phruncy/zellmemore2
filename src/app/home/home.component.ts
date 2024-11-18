import { Component } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../homepage/header/header.component';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatDivider } from '@angular/material/divider';
import { CaTutorialComponent } from '../homepage/ca-tutorial/ca-tutorial.component';
import { AboutComponent } from '../homepage/about/about.component';
import { CustomFooterComponent } from '../custom-footer/custom-footer.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterLink, FaIconComponent, MatDivider, CaTutorialComponent, AboutComponent, CustomFooterComponent]
})


export class HomeComponent 
{
    readonly faArrowAltCircleRight = faChevronRight;
    
    constructor() { }
}
