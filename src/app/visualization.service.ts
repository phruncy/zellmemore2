import { Injectable, 
          Output, 
          EventEmitter,
          ComponentFactoryResolver,
          Inject,
          ReflectiveInjector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WidgetComponent } from './widget/widget.component';

@Injectable({
  providedIn: 'root'
})

export class VisualizationService {

  factoryResolver;
  rootViewContainer;
  private _visualizationToDisplay: string;
  private _hasChanged = new Subject<void>();
  // program window component subscribes to this
  public hasChanged$ = this._hasChanged.asObservable();
  
  constructor(@Inject(ComponentFactoryResolver) factoryResover) 
  {
    this.factoryResolver = factoryResover; 
  }

  get visualizationToDisplay(): string
  {
    return this._visualizationToDisplay;
  }
  
  // this is used by the visualization-selection
  // to determine the visualization to display
  // changes are detected by the program window which then 
  // adds the selected visualization as a new widget
  set visualizationToDisplay(id: string)
  {
    this._visualizationToDisplay = id;
    // tells program window about value change
    this._hasChanged.next();
  }

  setRootViewContainerRef(reference)
  {
    this.rootViewContainer = reference;
  }

  addWidgetComponent()
  {
    const factory = this.factoryResolver
                        .resolveComponentFactory(WidgetComponent);
    const component = factory.create(this.rootViewContainer.parnetInjector);
    this.rootViewContainer.insert(component.hostView);                    
  }
}
