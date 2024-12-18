import { Component } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';
import { CustomFooterComponent } from '../custom-footer/custom-footer.component';

@Component({
    selector: 'app-disclaimer',
    templateUrl: './disclaimer.component.html',
    styleUrls: ['./disclaimer.component.scss'],
    standalone: true,
    imports: [HeaderComponent, CustomFooterComponent],
})
export class DisclaimerComponent {}
