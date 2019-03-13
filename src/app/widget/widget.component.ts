/*
 * This is the Container for any visualization.
 * A Widget Container is created whenever the VisualizationService's selected 
 * Visualization property is reassigned.
 * The widget's content is delivered by the VisualizationService.
 */

import { Component,
          OnInit,
          OnDestroy,
          ViewChild,
          ViewContainerRef,
          ComponentFactoryResolver,
          ComponentRef,
          ComponentFactory,
          HostBinding
        } from '@angular/core';
import { VisualizationService } from '../visualization.service';
import { AutomatonService } from '../automaton.service';
import { SizeService } from '../size.service';
import { faTimesCircle, faPlayCircle, faExpand } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit, OnDestroy {

    @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
    /* binds the width/height properties to the width/height variables. type is 'string'! */
    @HostBinding('style.width.px') private _width = '300';
    @HostBinding('style.height.px') private _height = '300';
    @HostBinding('style.margin-right.px') private _marginRight;
    @HostBinding('style.margin-bottom.px') private _marginBottom;

    private _ref: any;
    /* icon references */
    faTimesCircle = faTimesCircle;
    faPlayCircle = faPlayCircle;
    faExpand = faExpand;
    constructor(
            private visService: VisualizationService,
            private sizeService: SizeService,
            private resolver: ComponentFactoryResolver,
            private automaton: AutomatonService
        ) {}

    set ref(ref: any)
    {
        this._ref = ref;
    }

    /* IncreaseWidgetNumber() has to be called in order to get the right 
     * element size in the DOM 
     * The size needs to be set before the component is loaded
     */
    ngOnInit() 
    {
        this.sizeService.sizeChanged$.subscribe (
            () => {
                this.fetchSize();
                }
        );
        this.sizeService.increaseWidgetNumber();
        this.fetchSize();
        this.fetchComponent();
    }

    /* Widget has to be removed from the size service's log */
    ngOnDestroy()
    {
        this.sizeService.decreaseWidgetNumber();
        console.log('Widget has been removed.');
    }

    /* Component is fetched from the visualization service's dictionary 
     * that matches ids with the fitting components. The container does 
     * not care about its content: The id is only known to the service 
     */
    fetchComponent()
    {
        const visualization = this.visService.provideComponent();
        const factory = this.resolver.resolveComponentFactory(visualization);
        const component = this.entry.createComponent(factory);
    }

    fetchSize() {
        this._width = this.sizeService.widgetSize.toString();
        this._height = this._width;
        this._marginRight = this.sizeService.margin;
        this._marginBottom = this.sizeService.margin;
    }

    remove()
    {
        this._ref.destroy();
    }

    toggleFullscreen()
    {
        console.log("fullscreen");
    }
}

