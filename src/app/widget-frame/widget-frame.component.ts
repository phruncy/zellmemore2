import { Component,
        OnInit,
        ComponentFactoryResolver,
        ViewChild,
        ViewContainerRef,
        ElementRef,
        ChangeDetectorRef,
        HostListener
       } from '@angular/core';
import { VisualizationService } from '../services/visualization.service';
import { WidgetComponent } from '../widget/widget.component';
import { SizeService } from '../services/size.service';

@Component({
  selector: 'app-widget-frame',
  templateUrl: './widget-frame.component.html',
  styleUrls: ['./widget-frame.component.css']
})
export class WidgetFrameComponent implements OnInit {

    @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;

    constructor(
        private visualizationService: VisualizationService,
        private sizeService: SizeService,
        private resolver: ComponentFactoryResolver,
        private elRef: ElementRef,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() 
    {
        this.visualizationService.hasChanged$.subscribe(
        () => {
            this.addWidget(this.visualizationService.visualizationToDisplay);
        });
        this.sizeService.setFrameSize(this.elRef.nativeElement.offsetWidth, this.elRef.nativeElement.offsetHeight);
    }

    @HostListener('window:resize', ['$event']) onResize()
    {
        this.sizeService.setFrameSize(this.elRef.nativeElement.offsetWidth, this.elRef.nativeElement.offsetHeight);
    }



    /* Subscription to Visualization Service:
    * a new widget is added whenever the selected visualization changes
    * change in value is induced by the selection component's
    * (click) Callback
    */
    addWidget(id: any)
    {
        // creates a Factory for a widget component
        const widgetFactory = this.resolver.resolveComponentFactory(WidgetComponent);
        const component = this.entry.createComponent(widgetFactory);
        component.instance.ref = component;
        this.cd.detectChanges();
    }
}
