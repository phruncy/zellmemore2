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
  template: `<div #entry> <div/>`,
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
  private _id;
  constructor(private service: VisualizationService,
              private resolver: ComponentFactoryResolver
    ) { }

  ngOnInit() {
    this.fetchComponent();
  }

  ngOnDestroy()
  {}
  
  fetchComponent()
  {
    const factory = this.resolver.resolveComponentFactory(this.service.provideComponent);
    const component = this.entry.createComponent(factory);
  }
}
