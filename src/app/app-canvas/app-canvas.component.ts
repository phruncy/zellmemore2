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
    selector: 'app-canvas',
    styleUrls: ['./app-canvas.component.scss'],
    standalone: true,
    imports: [AnimatedTooltipComponent, AddTileAreaComponent],
    template: `
        <div #entry class ="empty"></div>
        <app-add-tile-area 
            class="add-tile-area" 
            [class.active]="!isEmpty" 
            [areaWidth]="sizeService.addAreaWidth"
            [areaHeight]="sizeService.addAreaHeight"
            (click)="requestSelection.emit(true)"></app-add-tile-area>
        <div class="empty-frame-overlay" [class.active]="isEmpty" (click)="requestSelection.emit(true)">
                <app-animated-tooltip></app-animated-tooltip>
        </div>
    `
})
export class WidgetFrameComponent implements OnInit 
{
    entry = viewChild('entry', {read: ViewContainerRef});
    
    widgetAdded = output<boolean>();
    requestSelection = output<boolean>();

    constructor(
        private visualizationService: VisualizationService,
        public sizeService: SizeService,
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
