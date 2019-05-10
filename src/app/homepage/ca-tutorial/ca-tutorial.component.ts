import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';

@Component({
  selector: 'app-ca-tutorial',
  templateUrl: './ca-tutorial.component.html',
  styleUrls: ['./ca-tutorial.component.scss']
})
export class CaTutorialComponent implements OnInit {

    constructor(private scrollDispatcher: ScrollDispatcher) { }

    @ViewChild('container') _container: ElementRef;
    private _scrollable: CdkScrollable[];

    ngOnInit() {
        this._scrollable = this.scrollDispatcher.getAncestorScrollContainers(this._container);
        this.scrollDispatcher.scrolled().subscribe(
            () => {
                this.onScroll();
            }
        );
        console.log(this._scrollable);
     }

    onScroll(): void {
    }
}
