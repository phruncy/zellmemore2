/* Base class for every widget-content-component */

import { OnInit, OnDestroy, HostBinding, Input } from '@angular/core';
import { AutomatonService } from '../services/automaton.service';
import { SizeService } from '../services/size.service';
import { Subscription, Subject } from 'rxjs';

export abstract class ContentBase implements OnInit, OnDestroy {

    private _generationSub: Subscription;
    private _resetSub: Subscription;
    private _onDestroy = new Subject<void>();
    public $onDestroy = this._onDestroy.asObservable();
    /* sets the size */
    @HostBinding('style.width.px') protected widgetWidth ;
    @HostBinding('style.height.px') protected widgetHeight;

    constructor(protected automaton: AutomatonService,
                protected sizeService: SizeService) {}

    ngOnInit() {
        this._generationSub = this.automaton.changed$.subscribe(
            () => {
                this.update();
            }
        );

        this._resetSub = this.automaton.cellsChanged$.subscribe(
            () => {
                this.onReset();
            }
        );
        this.sizeService.sizeChanged$.subscribe (
            () => {
                this.fetchSize();
                this.onResize();
                }
        );
        this.fetchSize();
    }

    ngOnDestroy()
    {
        this._generationSub.unsubscribe();
        this._resetSub.unsubscribe();
        this._onDestroy.next();
    }

    fetchSize() 
    {
        this.widgetWidth = this.sizeService.widgetSize.toString();
        this.widgetHeight = this.widgetWidth;
    }

    abstract update();
    abstract onResize();
    abstract onReset();
}