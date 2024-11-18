import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[widget-host]',
    standalone: true,
})

export class WidgetDirective
{
    
    constructor(public viewContainerRef: ViewContainerRef)
    {

    }
}

