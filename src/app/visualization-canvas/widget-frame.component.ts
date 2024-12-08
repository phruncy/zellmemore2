import { Component,
        OnInit,
        viewChild,
        ViewContainerRef,
        ElementRef,
        ChangeDetectorRef,
        HostListener,
        output
       } from '@angular/core';
import { VisualizationService } from '../services/visualization.service';
import { WidgetComponent } from '../widget/widget.component';
import { SizeService } from '../services/size.service';
import { AnimatedTooltipComponent } from "../animated-tooltip/animated-tooltip.component";
import { AddTileAreaComponent } from "../add-tile-area/add-tile-area.component";

@Component({
    selector: 'app-widget-frame',
    styleUrls: ['./widget-frame.component.scss'],
    standalone: true,
    imports: [AnimatedTooltipComponent, AddTileAreaComponent],
    template: `
        <div #entry class ="empty"></div>
        <app-add-tile-area class="add-tile-area" [class.active]="!isEmpty"></app-add-tile-area>
        <div class="empty-frame-overlay" [class.active]="isEmpty" (click)="clickAnimated.emit(true)">
                <app-animated-tooltip></app-animated-tooltip>
        </div>
    `
})
export class WidgetFrameComponent implements OnInit 
{
    entry = viewChild('entry', {read: ViewContainerRef});
    
    widgetAdded = output<boolean>();
    clickAnimated = output<boolean>();

    constructor(
        private visualizationService: VisualizationService,
        private sizeService: SizeService,
        private elRef: ElementRef,
        private cd: ChangeDetectorRef,
    ) { }

    get isEmpty(): boolean { return this.sizeService.widgetNumber === 0;}

    ngOnInit() 
    {
        this.visualizationService.selectionChanged$.subscribe(
        () => { this.addWidget() });
        this.sizeService.setFrameSize(this.elRef.nativeElement.offsetWidth, this.elRef.nativeElement.offsetHeight);
    }

    @HostListener('window:resize', ['$event']) onResize()
    {
        this.sizeService.setFrameSize(this.elRef.nativeElement.offsetWidth, this.elRef.nativeElement.offsetHeight);
    }

    addWidget()
    {
        const component = this.entry().createComponent(WidgetComponent);
        component.instance.ref = component;
        this.cd.detectChanges();
        this.widgetAdded.emit(true);
    }
}
