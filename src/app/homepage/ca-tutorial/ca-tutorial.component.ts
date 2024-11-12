import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';

@Component({
  selector: 'app-ca-tutorial',
  templateUrl: './ca-tutorial.component.html',
  styleUrls: ['./ca-tutorial.component.scss']
})
export class CaTutorialComponent implements OnInit {

    constructor(private scrollDispatcher: ScrollDispatcher) { }

    @ViewChild(CdkScrollable, { static: false }) _scrollable: CdkScrollable;

    ngOnInit() {
    }

    onClick(): void {
        console.log(this._scrollable.measureScrollOffset('top'));
    }
}
