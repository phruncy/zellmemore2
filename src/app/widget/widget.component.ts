import {
    Component,
    OnInit,
    HostBinding,
    viewChild,
    ElementRef,
    output,
    input,
} from '@angular/core';
import { faTimes, faPlayCircle, faExpand } from '@fortawesome/free-solid-svg-icons';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { customTooltipDefaults } from '../utils/customTooltipDefaults';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { P5VisualizationComponent } from '../p5-visualization/p5-visualization.component';
import {
    VisualizationContext,
    VisualizationContextService,
} from '../services/visualization-context.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss'],
    providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults }],
    standalone: true,
    imports: [FaIconComponent, P5VisualizationComponent, AsyncPipe],
})
export class WidgetComponent implements OnInit {
    readonly faTimes = faTimes;
    readonly faPlayCircle = faPlayCircle;
    readonly faExpand = faExpand;

    fullscreenContainer = viewChild<ElementRef>('fullscreen');
    p5Component = viewChild(P5VisualizationComponent);
    /* binds the width/height properties to the width/height variables. type is 'string'! */
    @HostBinding('style.width.px') private _width = '300';
    @HostBinding('style.height.px') private _height = '300';
    @HostBinding('style.margin-right.px') private _marginRight;
    @HostBinding('style.margin-bottom.px') private _marginBottom;

    title: string = 'widget name';
    shouldDestroy = output();

    contentId = input.required<number>();
    context$: Observable<VisualizationContext>;

    constructor(private visualizationService: VisualizationContextService) {}

    ngOnInit() {
        this.fetchComponent();
    }

    resize(sidelength: number, margin: number) {
        this._width = sidelength.toString();
        this._height = this._width;
        const marginStr = margin.toString();
        this._marginRight = marginStr;
        this._marginBottom = marginStr;
        this.p5Component().resizeContent(sidelength);
    }

    requestDestruction() {
        this.shouldDestroy.emit();
    }

    enterFullscreen() {
        if (this.fullscreenContainer().nativeElement.requestFullscreen) {
            this.fullscreenContainer().nativeElement.requestFullscreen();
        } else if (this.fullscreenContainer().nativeElement.webkitRequestFullscreen) {
            this.fullscreenContainer().nativeElement.webkitRequestFullscreen();
        } else {
            throw new Error('No fullscreen available');
        }
    }

    private fetchComponent() {
        this.visualizationService.addToActives(this.contentId());
        this.context$ = this.visualizationService.getContextByIndex(this.contentId());
    }
}
