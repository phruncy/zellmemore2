/* Base class for every widget-content-component */

import { OnInit, OnDestroy, HostBinding, Input } from "@angular/core";
import { AutomatonService } from "../automaton.service";
import { SizeService } from "../size.service";
import { Subscription } from "rxjs";

export abstract class ContentBase implements OnInit, OnDestroy {

    private _generationSub: Subscription;
    private _numberSub: Subscription;
    /* sets the height */
    @HostBinding('style.width.px') protected widgetWidth ;
    @HostBinding('style.height.px') protected widgetHeight;

    constructor(protected automaton: AutomatonService,
                protected sizeService: SizeService) {}

    ngOnInit()
    {
        this._generationSub = this.automaton.changed$.subscribe(
            () => {
                this.update();
            }
        );
        this._numberSub = this.automaton.cellsChanged$.subscribe(
            () => {
                this.onNumberChange();
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
        this._numberSub.unsubscribe();
    }

    fetchSize() 
    {
        this.widgetWidth = this.sizeService.widgetSize.toString();
        this.widgetHeight = this.widgetWidth;
    }

    abstract update();
    abstract onResize();
    abstract onNumberChange();
}