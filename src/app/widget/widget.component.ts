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
          ComponentFactoryResolver,
          ComponentRef,
          ComponentFactory
        } from '@angular/core';
import { VisualizationService } from '../visualization.service';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

    @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
    private _ref: any;
    constructor(private service: VisualizationService,
                private resolver: ComponentFactoryResolver
        ) {}

    set ref(ref: any)
    {
        this._ref = ref;
    }

    ngOnInit() 
    {
        this.fetchComponent();
    }

    ngOnDestroy()
    {
        console.log("Widget has been removed.");
    }
    
    fetchComponent()
    {
        let visualization = this.service.provideComponent();
        const factory = this.resolver.resolveComponentFactory(visualization);
        const component = this.entry.createComponent(factory);
        console.log("Hurra, eine Komponente wurde erzeugt.");
    }

    remove()
    {
        this._ref.destroy();
    }
}

