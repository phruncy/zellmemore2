import { Component, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { ContentBase } from '../../content-base/contentBase.component';
import { AutomatonService } from '../../services/automaton.service';
import { SizeService } from '../../services/size.service';
import * as p5 from 'p5';

@Component({
  selector: 'app-viz-punchcard',
  templateUrl: './viz-punchcard.component.html',
  styleUrls: ['./viz-punchcard.component.css']
})
export class VizPunchcardComponent extends ContentBase implements AfterContentInit 
{
    @ViewChild('container', { static: true }) container: ElementRef;
    private _p5: p5;

    constructor(
        protected automaton: AutomatonService,
        protected sizeService: SizeService
        ) 
        {
            super(automaton, sizeService);
            this.processingSketch = this.processingSketch.bind(this);
        }

        ngAfterContentInit() 
        {
            this.createP5();
        }

        onReset()
        {
            this._p5.reset();
        }

        onResize()
        {
            this._p5.onWidgetResize(this.widgetWidth, this.widgetHeight);
        }

        update() {}

        createP5() 
        {
            this._p5 = new p5(this.processingSketch, this.container.nativeElement);
        }

        /**
         * 
         * @param p5 A p5 object (this will be created and passed by the p5 constuctor)
         */
        processingSketch(p5)
        {
            let edge: number = 0;
            let linePosition: number = 0;
            let dotSize: number = 1;
            let dotGap: number = 0;
            let angle: number = 0;
            let amplitude: number = 0;
            let circularModeRadius: number;
            
            const getLinearX = (index: number) => (dotSize + dotSize) * index + edge;
            const getAmplitude = (state: number) => state === 1 ? amplitude : -amplitude;

            const initValues = () =>
            {
                edge = p5.width * 0.05;
                linePosition = p5.height / 2;
                dotSize = (p5.width - 2 * edge) * 0.5 / this.automaton.cellnumber;
                dotGap = (p5.width - 2 * edge) / this.automaton.cellnumber - edge;
                angle = 2 * Math.PI / this.automaton.cellnumber;
                amplitude = dotSize * 2;
                circularModeRadius = (p5.width - 2 * edge - dotSize - 2 * amplitude) / 2;
            }
            
            p5.setup = () => 
            {
                p5.createCanvas(this.widgetWidth, this.widgetHeight);
                p5.noStroke();
                p5.fill(0);
                initValues();
            };
        
            p5.draw = () => 
            {
                p5.background(255);
                if (this.automaton.isCircular) {
                    p5.push();
                    p5.translate(p5.width / 2, p5.height / 2);
                    this.automaton.states.forEach((state, index) => 
                    {
                        p5.push();
                        p5.rotate(angle * index);
                        p5.translate(0, circularModeRadius + getAmplitude(state));
                        p5.circle(0, 0, dotSize +2);
                        p5.pop();
                    });
                    p5.pop();
                } else {
                    this.automaton.states.forEach( (state, index) => {
                        // amplitude has to be subtracted since the coordinate origin is at the top!
                        p5.circle(getLinearX(index), linePosition - getAmplitude(state), dotSize);
                    });
                }
            };

            p5.onWidgetResize = (widgetWidth: number, widgetHeight: number) =>
            {
                p5.resizeCanvas(widgetWidth, widgetHeight);
                initValues();
            }

            p5.reset()
            {
                initValues();
            }
        };
}
