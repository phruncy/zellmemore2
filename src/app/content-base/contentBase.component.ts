import { OnInit, OnDestroy, HostBinding, Input } from "@angular/core";
import { AutomatonService } from "../automaton.service";
import { SizeService } from "../size.service";

export abstract class ContentBase implements OnInit, OnDestroy {

    private _automatonSubscription;
    /* sets the height */
    @HostBinding('style.width.px') protected widgetWidth ;
    @HostBinding('style.height.px') protected widgetHeight;

    constructor(protected automaton: AutomatonService,
                protected sizeService: SizeService) {}

    ngOnInit()
    {
        this._automatonSubscription = this.automaton.changed$.subscribe(
            () => {
                this.update();
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
        this._automatonSubscription.unsubscribe();
    }

    fetchSize() 
    {
        this.widgetWidth = this.sizeService.widgetSize.toString();
        this.widgetHeight = this.widgetWidth;
    }

    abstract update();
    abstract onResize();
}