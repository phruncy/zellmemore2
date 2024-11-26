/*
 * This is the Container for any visualization.
 * A Widget Container is created whenever the VisualizationService's selected 
 * Visualization property is reassigned.
 * The widget's content is delivered by the VisualizationService.
 */
import { Component,
          OnInit,
          OnDestroy,
          ViewContainerRef,
          HostBinding,
          viewChild,
          ElementRef,
        } from '@angular/core';
import { VisualizationService } from '../services/visualization.service';
import { AutomatonService } from '../services/automaton.service';
import { SizeService } from '../services/size.service';
import { faTimes, faPlayCircle, faExpand } from '@fortawesome/free-solid-svg-icons';
import { VisualizationDetailService } from '../services/visualization-detail.service';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip } from '@angular/material/tooltip';
import {customTooltipDefaults } from '../utils/customTooltipDefaults';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { P5VisualizationComponent } from '../p5-visualization/p5-visualization.component';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css'],
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }
    ],
    standalone: true,
    imports: [FaIconComponent, MatTooltip]
})
export class WidgetComponent implements OnInit, OnDestroy 
{
    widgetentry = viewChild('entry', {read: ViewContainerRef});
    fullscreenContainer = viewChild<ElementRef>('fullscreen');
    /* binds the width/height properties to the width/height variables. type is 'string'! */
    @HostBinding('style.width.px') private _width = '300';
    @HostBinding('style.height.px') private _height = '300';
    @HostBinding('style.margin-right.px') private _marginRight;
    @HostBinding('style.margin-bottom.px') private _marginBottom;
    title: String = 'widget name';

    private _self: any;
    readonly faTimes = faTimes;
    readonly faPlayCircle = faPlayCircle;
    readonly faExpand = faExpand;

    public isRunning: boolean = false;
    
    constructor(
            private visService: VisualizationService,
            private details: VisualizationDetailService,
            private sizeService: SizeService,
            private automaton: AutomatonService,
        ) 
    {
        this.automaton.ready$.subscribe(() => { this.isRunning = this.automaton.isRunning; })
    }

    set ref(ref: any)
    {
        this._self = ref;
    }

    /* IncreaseWidgetNumber() has to be called in order to get the right 
     * element size in the DOM 
     * The size needs to be set before the component is loaded
     */
    ngOnInit() 
    {
        this.fetchSize = this.fetchSize.bind(this);
        this.sizeService.sizeChanged$.subscribe (this.fetchSize);
        this.sizeService.increaseWidgetNumber();
        this.fetchSize();
        this.fetchComponent();
    }

    /* Widget has to be removed from the size service's log */
    ngOnDestroy()
    {
        this.sizeService.decreaseWidgetNumber();
    }

    onClick()
    {
        this.automaton.toggleLoop();
    }

    /* Component is fetched from the visualization service's dictionary 
     * that matches ids with the fitting components. The container does 
     * not care about its content: The id is only known to the service 
     */
    fetchComponent()
    {
        const visualization = this.visService.provideSketch();
        const component = this.widgetentry().createComponent(P5VisualizationComponent);
        component.setInput('p5sketch', visualization);
    }

    fetchSize() 
    {
        this._width = this.sizeService.widgetSize.toString();
        this._height = this._width;
        this._marginRight = this.sizeService.margin;
        this._marginBottom = this.sizeService.margin;
    }

    remove()
    {
        this._self.destroy();
    }

    toggleFullscreen()
    {
        console.log(this.fullscreenContainer());
        if (this.fullscreenContainer().nativeElement.webkitRequestFullscreen) {
            this.fullscreenContainer().nativeElement.webkitRequestFullscreen();
        } else {
            throw new Error('No fullscreen available');
        }
        this.sizeService.fullscreenActive = !this.sizeService.fullscreenActive;
    }
}

