import { Component,
        OnInit,
        ComponentFactoryResolver,
        ViewChild,
        ViewContainerRef,
        ElementRef
       } from '@angular/core';
import { VisualizationService } from '../visualization.service';
import { WidgetComponent } from '../widget/widget.component';
import { SizeService } from '../size.service';

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
        private elRef: ElementRef
    ) { }

    ngOnInit() 
    {
        this.visualizationService.hasChanged$.subscribe(
        () => {
            this.addWidget(this.visualizationService.visualizationToDisplay);
        });
        this.sizeService.setFrameSize(this.elRef.nativeElement.offsetWidth, this.elRef.nativeElement.offsetHeight);
        console.log("height----" + this.elRef.nativeElement.offsetHeight);
    }

    /* Subscription to Visualization Service:
    * a new widget is added whenever the selected visualization changes
    * change in value is induced by the selection component's
    * (click) Callback
    */
    addWidget(id: any)
    {
        console.log('widget added with id: ' + id);
        // creates a Factory for a widget component
        const widgetFactory = this.resolver.resolveComponentFactory(WidgetComponent);
        const component = this.entry.createComponent(widgetFactory);
        component.instance.ref = component;
    }

}
