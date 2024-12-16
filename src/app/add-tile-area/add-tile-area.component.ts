import { Component, input } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-add-tile-area',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './add-tile-area.component.html',
  host: {
    '[style.height.px]': 'areaHeight()',
    '[style.width.px]': 'areaWidth()',
    '[style.margin-right.px]': 'margin()',
    '[style.margin-bottom.px]': 'margin()'
  },
  styleUrl: './add-tile-area.component.scss'
})
export class AddTileAreaComponent 
{
  readonly faPlusCircle = faPlusCircle;
  public areaHeight = input.required();
  public areaWidth = input.required();
  public margin = input();
}
