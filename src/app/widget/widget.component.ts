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
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import {customTooltipDefaults } from '../utils/customTooltipDefaults';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { P5VisualizationComponent } from '../p5-visualization/p5-visualization.component';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss'],
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }
    ],
    standalone: true,
    imports: [FaIconComponent]
})
export class WidgetComponent implements OnInit, OnDestroy 
{
    readonly faTimes = faTimes;
    readonly faPlayCircle = faPlayCircle;
    readonly faExpand = faExpand;

    isRunning: boolean = false;
    
    widgetentry = viewChild('entry', {read: ViewContainerRef});
    fullscreenContainer = viewChild<ElementRef>('fullscreen');
    /* binds the width/height properties to the width/height variables. type is 'string'! */
    @HostBinding('style.width.px') private _width = '300';
    @HostBinding('style.height.px') private _height = '300';
    @HostBinding('style.margin-right.px') private _marginRight;
    @HostBinding('style.margin-bottom.px') private _marginBottom;
    title: String = 'widget name';

    private _self: any;

    constructor(
            private visService: VisualizationService,
            private detailsService: VisualizationDetailService,
            private sizeService: SizeService,
            private automaton: AutomatonService,
            private elementRef: ElementRef
        ) 
    {
        this.automaton.ready$.subscribe(() => { this.isRunning = this.automaton.isRunning; })
    }

    set self(self: any)
    {
        this._self = self;
    }

    /* IncreaseWidgetNumber() has to be called in order to get the right 
     * element size in the DOM 
     * The size needs to be set before the component is loaded
     */
    ngOnInit() 
    {
        this.updateSize = this.updateSize.bind(this);
        this.sizeService.sizeChanged$.subscribe (this.updateSize);
        this.sizeService.increaseWidgetNumber();
        this.updateSize();
        this.fetchComponent();
    }

    ngOnDestroy()
    {
        this.sizeService.decreaseWidgetNumber();
    }

    onClick()
    {
        this.automaton.toggleLoop();
    }

    fetchComponent()
    {
        const visualization = this.visService.provideSketch();
        const component = this.widgetentry().createComponent(P5VisualizationComponent);
        this.visService.addToActive(component.instance);
        component.setInput('p5sketch', visualization);
        this.detailsService.getName(this.visService.visualizationToDisplay).then( name => this.title = name);
    }
    
    remove()
    {
        this._self.destroy();
    }
    
    enterFullscreen()
    {
        if (this.fullscreenContainer().nativeElement.requestFullscreen) {
            this.fullscreenContainer().nativeElement.requestFullscreen();
        } 
        else if (this.fullscreenContainer().nativeElement.webkitRequestFullscreen) {
            this.fullscreenContainer().nativeElement.webkitRequestFullscreen();
        }
        else {
            throw new Error('No fullscreen available');
        }
    }
    
    private updateSize() 
    {
        this._width = this.sizeService.widgetSize.toString();
        this._height = this._width;
        this._marginRight = this.sizeService.margin;
        this._marginBottom = this.sizeService.margin;
    }
}

