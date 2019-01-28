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
    private _widgetNumber;
    private _rows;
    private _columns;
    private _frameWidth;
    private _frameHeight;
    private _gap;

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
        console.log('height----' + this.elRef.nativeElement.offsetHeight);
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

    getInterimSize(rows: number): number
    {
        return this._frameWidth / (this._widgetNumber / rows);
    }

    /* calculates the maximum side length for the current number of widgets
     * @param rows: the number of rows that the widgets will be displayed in
     *              it is increased by 1 whenever the resulting sidelength for
     *              the given number of rows is smaller than the resulting 
     *              sidelength for the given rows + 1.
     */
    provideWidgetSize(): number
    {
        let rows = 1;
        let sidelength;
        while (sidelength = this.getInterimSize(rows) 
        <= this.getInterimSize(rows + 1) 
        && this.getInterimSize(rows + 1) <= this._frameHeight) {
            rows++;
        }
        if (sidelength <= this._frameHeight) {
            return this._frameHeight;
        }
        return sidelength;
    }
}
