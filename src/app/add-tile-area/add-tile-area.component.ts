import { Component, input, HostBinding } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-add-tile-area',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './add-tile-area.component.html',
  host: {
    '[style.height.px]': 'areaHeight()',
    '[style.margin-right.px]': 'margin()',
    '[style.margin-bottom.px]': 'margin()'
  },
  styleUrl: './add-tile-area.component.scss'
})
export class AddTileAreaComponent 
{
  readonly faPlusCircle = faPlusCircle;
  public areaHeight = input.required();
  public margin = input();
}
