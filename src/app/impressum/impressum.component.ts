import { Component } from '@angular/core';
import { HeaderComponent } from '../homepage/header/header.component';
import { CustomFooterComponent } from '../custom-footer/custom-footer.component';

@Component({
    selector: 'app-impressum',
    templateUrl: './impressum.component.html',
    styleUrls: ['./impressum.component.scss'],
    standalone: true,
    imports: [HeaderComponent, CustomFooterComponent]
})
export class ImpressumComponent 
{
  constructor() { }
}
