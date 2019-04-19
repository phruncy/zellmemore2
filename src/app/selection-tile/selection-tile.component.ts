import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-selection-tile',
  templateUrl: './selection-tile.component.html',
  styleUrls: ['./selection-tile.component.scss']
})
export class SelectionTileComponent implements OnInit {

    @Input() id;
    @Input() name: string;
    @Input() thumbnail;
    private faPlusCircle = faPlusCircle;
    constructor() { }

  ngOnInit() {
  }

}
