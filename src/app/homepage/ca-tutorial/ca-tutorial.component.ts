import { Component, ViewChild } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';

@Component({
  selector: 'app-ca-tutorial',
  templateUrl: './ca-tutorial.component.html',
  styleUrls: ['./ca-tutorial.component.scss']
})
export class CaTutorialComponent
{
    constructor() { }

    @ViewChild(CdkScrollable, { static: false }) _scrollable: CdkScrollable;

    onClick(): void {
        console.log(this._scrollable.measureScrollOffset('top'));
    }
}