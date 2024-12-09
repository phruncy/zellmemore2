import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-animated-tooltip',
  standalone: true,
  imports: [FaIconComponent],
  styleUrl: './animated-tooltip.component.scss',
  template: `
    <div class="animated" >
      <p>Click <fa-icon [icon]="faPlusCircle" class="midTextIcon"></fa-icon> to add visualizations<br><fa-icon [icon]="faAngleDown" class="midTextIcon"></fa-icon></p>
    </div>
  `
})
export class AnimatedTooltipComponent 
{
  readonly faPlusCircle = faPlusCircle;
  readonly faAngleDown = faAngleDown;
}
