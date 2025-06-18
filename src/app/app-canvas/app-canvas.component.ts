import {
    Component,
    OnInit,
    viewChild,
    ViewContainerRef,
    ElementRef,
    HostListener,
    output,
    ComponentRef,
    effect,
} from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { SizeService } from '../services/size.service';
import { AnimatedTooltipComponent } from '../animated-tooltip/animated-tooltip.component';
import { AddTileAreaComponent } from '../add-tile-area/add-tile-area.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VisualizationContextService } from '../services/visualization-context.service';

@Component({
    selector: 'app-canvas',
    styleUrls: ['./app-canvas.component.scss'],
    standalone: true,
    imports: [AnimatedTooltipComponent, AddTileAreaComponent],
    template: `
        <div #entry class="empty"></div>
        <app-add-tile-area
            class="add-tile-area"
            [class.active]="!isEmpty"
            [areaWidth]="sizeService.addAreaWidth"
            [areaHeight]="sizeService.addAreaHeight"
            (click)="requestSelection.emit(true)"
            (keypress.enter)="requestSelection.emit(true)"
            tabindex="0"></app-add-tile-area>
        <div
            class="empty-frame-overlay"
            [class.active]="isEmpty"
            (click)="requestSelection.emit(true)"
            (keypress.enter)="requestSelection.emit(true)"
            tabindex="0">
            <app-animated-tooltip></app-animated-tooltip>
        </div>
    `,
})
export class WidgetFrameComponent implements OnInit {
    entry = viewChild('entry', { read: ViewContainerRef });
    widgetAdded = output<boolean>();
    requestSelection = output<boolean>();

    private _widgetRefs: ComponentRef<WidgetComponent>[] = [];

    constructor(
        private visualizationService: VisualizationContextService,
        public sizeService: SizeService,
        private elRef: ElementRef,
    ) {
        this.visualizationService.creationRequested$
            .pipe(takeUntilDestroyed())
            .subscribe((contentId) => {
                this.addWidget(contentId);
            });
    }

    get isEmpty(): boolean {
        return this._widgetRefs.length === 0;
    }

    ngOnInit() {
        this.sizeService.setFrameSize(
            this.elRef.nativeElement.offsetWidth,
            this.elRef.nativeElement.offsetHeight,
        );
    }

    @HostListener('window:resize', ['$event']) onResize() {
        this.sizeService.setFrameSize(
            this.elRef.nativeElement.offsetWidth,
            this.elRef.nativeElement.offsetHeight,
        );
        this.resizeWidgets();
    }

    addWidget(contentId: number) {
        this.sizeService.recalculateWidgetSize(this._widgetRefs.length + 1);

        const component = this.entry().createComponent(WidgetComponent);
        component.setInput('contentId', contentId);

        const sub = component.instance.shouldDestroy.subscribe(() => {
            this.visualizationService.removeFromeActives(contentId);
            this.destroyWidget(component);
            sub.unsubscribe();
        });
        this.widgetAdded.emit(true);
        this._widgetRefs.push(component);
        this.resizeWidgets();
        if (this.sizeService.isSmallMobile) {
            this.scrolltoLastWidget();
        }
    }

    destroyWidget(component: ComponentRef<WidgetComponent>) {
        const index = this._widgetRefs.indexOf(component);
        this._widgetRefs.splice(index, 1);
        component.destroy();
        this.sizeService.recalculateWidgetSize(this._widgetRefs.length);
        this.resizeWidgets();
    }

    private resizeWidgets() {
        const sidelength = this.sizeService.widgetSize;
        const margin = this.sizeService.margin;
        this._widgetRefs.forEach((widget) => {
            widget.instance.resize(sidelength, margin);
        });
    }

    private scrolltoLastWidget(): void {
        const newScrollingPosition =
            this._widgetRefs.length * (this.sizeService.margin + this.sizeService.widgetSize);
        this.elRef.nativeElement.scrollTop = newScrollingPosition;
    }
}
