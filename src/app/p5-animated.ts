import { ViewChild, ElementRef } from '@angular/core';
import * as p5 from 'p5';

export interface P5Animated {

    // the sketch's container DOM Element (usually a widget)
    container: ElementRef;
    // the p5 instance
    _p5: p5;

    // contains the actual p5-Code
    createP5();
}
