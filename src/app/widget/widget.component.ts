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
          HostBinding,
        } from '@angular/core';
import { VisualizationService } from '../services/visualization.service';
import { AutomatonService } from '../services/automaton.service';
import { SizeService } from '../services/size.service';
import { faTimes, faPlayCircle, faExpand } from '@fortawesome/free-solid-svg-icons';
import { VisualizationDetailService } from '../services/visualization-detail.service';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip } from '@angular/material/tooltip';
import {customTooltipDefaults } from '../utils/customTooltipDefaults';
import { ContentBase } from '../content-base/contentBase.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

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
    @ViewChild('entry', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
    /* binds the width/height properties to the width/height variables. type is 'string'! */
    @ViewChild('fullscreen', { static: true }) container; // reference to  container-div
    @HostBinding('style.width.px') private _width = '300';
    @HostBinding('style.height.px') private _height = '300';
    @HostBinding('style.margin-right.px') private _marginRight;
    @HostBinding('style.margin-bottom.px') private _marginBottom;
    title: String = 'widget name';

    private _ref: any;
    /* icon references */
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
        this._ref = ref;
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
        const visualization = this.visService.provideComponent();
        const component = this.entry.createComponent(visualization);
        this.details.provideVisualizations().subscribe (
            data => 
            {
                this.title = data.find(
                    obj => obj.id === this.visService.visualizationToDisplay).name;
            }
        );
        this.visService.addToActive(component.instance as ContentBase);
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
        this._ref.destroy();
    }

    toggleFullscreen()
    {
        console.log(this.container);
        if (this.container.nativeElement.webkitRequestFullscreen) {
            this.container.nativeElement.webkitRequestFullscreen();
        } else {
            throw new Error('No fullscreen available');
        }
        //this.sizeService.fullscreenActive = !this.sizeService.fullscreenActive;
    }
}

