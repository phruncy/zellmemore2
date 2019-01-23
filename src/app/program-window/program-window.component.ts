import { Component,
         OnInit,
         Output,
         EventEmitter,
         ViewChild,
         ViewContainerRef,
         ComponentFactoryResolver,
         ComponentRef,
         ComponentFactory,
         Renderer2
       } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VisualizationSelectionComponent } from '../visualization-selection/visualization-selection.component';
import { VisualizationService } from '../visualization.service';

import { WidgetComponent } from '../widget/widget.component';
import { AutomatonService } from '../automaton.service';
import { RuleConverterService } from '../rule-converter.service';

@Component({
  selector: 'app-program-window',
  templateUrl: './program-window.component.html',
  styleUrls: ['./program-window.component.css']
}
)

export class ProgramWindowComponent implements OnInit {

    @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
    @Output() onSelectionChange: EventEmitter<void> = new EventEmitter<void>();
    private _selectionDisplayed = false;
    private _controllerDisplayed = false;
    private displayedRule: number;

    constructor(
        private route: ActivatedRoute,
        private visualizationService: VisualizationService,
        private automaton: AutomatonService,
        private location: Location,
        // for dynamic widget loading: allows to create a ComponentFactory.
        private resolver: ComponentFactoryResolver,
        private converter: RuleConverterService,
        private renderer: Renderer2 // for adding the class to the widget
    ) {
        }

    get selectionDisplayed(): boolean
    {
        return this._selectionDisplayed;
    }

    get controllerDisplayed(): boolean
    {
        return this._controllerDisplayed;
    }

    ngOnInit()
    {
        /* Subscription to Visualization Service:
         * a new widget is added whenever the selected visualization changes
         * change in value is induced by the selection component's
         * (click) Callback
         */
        this.visualizationService.hasChanged$.subscribe(
        () => {
            this.addWidget(this.visualizationService.visualizationToDisplay);
        });
        this.automaton.initialise();
    }

    toggleSelection()
    {
        this._selectionDisplayed = !this._selectionDisplayed;
    }

    toggleController()
    {
        this._controllerDisplayed = !this._controllerDisplayed;
    }

    addWidget(id: any)
    {
        console.log("widget added with id: " + id);
        // creates a Factory for a widgetComponent
        const widgetFactory = this.resolver.resolveComponentFactory(WidgetComponent);
        const component = this.entry.createComponent(widgetFactory);
        component.instance.ref = component;
        this.renderer.addClass(component.location.nativeElement, 'grid-content');
    }

    removeWidget()
    {

    }  


}

