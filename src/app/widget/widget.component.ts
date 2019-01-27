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
import { AutomatonService } from '../automaton.service';
import { SizeService } from '../size.service';
import { faTimesCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit, OnDestroy {

    @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
    private _ref: any;
    private _height: number;
    private _width: number;
    faTimesCircle = faTimesCircle;
    faPlayCircle = faPlayCircle;
    constructor(
            private visService: VisualizationService,
            private sizeService: SizeService,
            private resolver: ComponentFactoryResolver,
            private automaton: AutomatonService
        ) {}

    set ref(ref: any)
    {
        this._ref = ref;
    }

    ngOnInit() 
    {
        this.fetchSize();
        this.fetchComponent();
    }

    ngOnDestroy()
    {
        console.log('Widget has been removed.');
    }

    fetchSize()
    {
        this._height = this.sizeService.provideHeight();
        this._width = this.sizeService.provideWidth();
    }

    fetchComponent()
    {
        const visualization = this.visService.provideComponent();
        const factory = this.resolver.resolveComponentFactory(visualization);
        const component = this.entry.createComponent(factory);
    }

    remove()
    {
        this._ref.destroy();
    }
}

