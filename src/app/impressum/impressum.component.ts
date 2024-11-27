import { Component } from '@angular/core';
import { HeaderComponent } from '../homepage/header/header.component';
import { CustomFooterComponent } from '../custom-footer/custom-footer.component';

@Component({
    selector: 'app-impressum',
    styleUrls: ['./impressum.component.scss'],
    standalone: true,
    imports: [HeaderComponent, CustomFooterComponent],
    template: `
      <app-header></app-header>
      <div class="outer-container"></div>
      <app-custom-footer></app-custom-footer>
    `
})
export class ImpressumComponent 
{
  constructor() { }
}