import { Component,
        OnInit,
        ViewChild,
        ViewContainerRef,
        ElementRef,
        ChangeDetectorRef,
        HostListener,
        Output,
        EventEmitter
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
    @Output() clickAnimated = new EventEmitter();
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
        this.visualizationService.hasChanged$.subscribe(
        () => {
            this.addWidget();
        });
        this.sizeService.setFrameSize(this.elRef.nativeElement.offsetWidth, this.elRef.nativeElement.offsetHeight);
    }

    @HostListener('window:resize', ['$event']) onResize()
    {
        this.sizeService.setFrameSize(this.elRef.nativeElement.offsetWidth, this.elRef.nativeElement.offsetHeight);
    }

    addWidget()
    {
        const component = this.entry.createComponent(WidgetComponent);
        component.instance.ref = component;
        this.cd.detectChanges();
    }
}
