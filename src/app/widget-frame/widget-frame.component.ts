import { Component,
        OnInit,
        ViewChild,
        ViewContainerRef,
        ElementRef,
        ChangeDetectorRef,
        HostListener,
        output
       } from '@angular/core';
import { VisualizationService } from '../services/visualization.service';
import { WidgetComponent } from '../widget/widget.component';
import { SizeService } from '../services/size.service';
import { faAngleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-widget-frame',
  templateUrl: './widget-frame.component.html',
  styleUrls: ['./widget-frame.component.css']
})
export class WidgetFrameComponent implements OnInit {

    @ViewChild('entry', { read: ViewContainerRef, static: true }) entry: ViewContainerRef;
    
    widgetAdded = output<boolean>();
    clickAnimated = output<boolean>();

    readonly faAngleDown = faAngleDown;
    readonly faPlusCircle = faPlusCircle;

    constructor(
        private visualizationService: VisualizationService,
        private sizeService: SizeService,
        private elRef: ElementRef,
        private cd: ChangeDetectorRef,
    ) { }

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

    onVisualizationSelect()
    {
        this.addWidget();
    }

    addWidget()
    {
        const component = this.entry.createComponent(WidgetComponent);
        component.instance.ref = component;
        this.cd.detectChanges();
        this.widgetAdded.emit(true);
    }

    hasWidgets(): boolean
    {
        return this.sizeService.widgetNumber === 0;
    }
}
