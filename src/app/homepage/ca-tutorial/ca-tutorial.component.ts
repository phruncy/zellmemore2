import { Component, ViewChild } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { TutorialAnimationComponent } from '../tutorial-animation/tutorial-animation.component';

@Component({
    selector: 'app-ca-tutorial',
    templateUrl: './ca-tutorial.component.html',
    styleUrls: ['./ca-tutorial.component.scss'],
    standalone: true,
    imports: [TutorialAnimationComponent]
})
export class CaTutorialComponent
{
    constructor() { }

    @ViewChild(CdkScrollable, { static: false }) _scrollable: CdkScrollable;

    onClick(): void {
        console.log(this._scrollable.measureScrollOffset('top'));
    }
}