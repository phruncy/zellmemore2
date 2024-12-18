import { Component } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatDivider } from '@angular/material/divider';
import { CustomFooterComponent } from '../custom-footer/custom-footer.component';
import { TutorialAnimationComponent } from './tutorial-animation/tutorial-animation.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        HeaderComponent,
        RouterLink,
        FaIconComponent,
        MatDivider,
        CustomFooterComponent,
        TutorialAnimationComponent,
    ],
})
export class HomeComponent {
    readonly faArrowAltCircleRight = faChevronRight;
}
