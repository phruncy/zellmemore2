import { Component, OnInit, ViewChild, AfterContentInit, ElementRef } from '@angular/core';
import { ContentBase } from '../../content-base/contentBase.component';
import { AutomatonService } from '../../services/automaton.service';
import { SizeService } from '../../services/size.service';
import * as p5 from 'p5';

@Component({
  selector: 'app-viz-punchcard',
  templateUrl: './viz-punchcard.component.html',
  styleUrls: ['./viz-punchcard.component.css']
})
export class VizPunchcardComponent extends ContentBase implements AfterContentInit {

    @ViewChild('container', { static: true }) container: ElementRef;
    private _p5: p5;
    private _dotSize = 10;
    private _dotGap: number;
    // the horizontal position of the dots in linear mode
    private _linePosition: number;
    private _edge: number;
    /* for circular mode */
    private _amplitude: number;
    private _radius: number;
    // distance between Dots in circular Mode
    private _segmentSize: number;

    constructor(
        protected automaton: AutomatonService,
        protected sizeService: SizeService
        ) {
            super(automaton, sizeService);
        }

        ngAfterContentInit() {
            this.initValues();
            this.createP5();
          }

        onReset()
        {
            this.initValues();
        }

        onResize()
        {
            this.initValues();
            this._p5.resizeCanvas(this.widgetWidth, this.widgetHeight);
        }

        update()
        {}

        initValues() {
            this._linePosition = this.widgetHeight / 2;
            this._edge = this.widgetWidth * 0.05;
            this._dotGap = ((this.widgetWidth - 2 * this._edge) / this.automaton.cellnumber) * 0.5;
            this._dotSize = ((this.widgetWidth - 2 * this._edge) / this.automaton.cellnumber) - this._dotGap;
            this._amplitude = this._dotSize * 2;
            this._segmentSize = (2 * Math.PI) / this.automaton.cellnumber;
            this._radius = (this.widgetWidth - 2 * this._edge - this._dotSize - 2 * this._amplitude) / 2;
        }

        getLinearX(index: number) {
            return (this._dotSize + this._dotGap) * index + this._edge;
        }

        getAmplitude(state: number) {
            if (state === 1) {
                return this._amplitude;
            }
            return - this._amplitude;
        }

        createP5() {
            const sketch = (s) => {
                s.setup = () => {
                    s.createCanvas(this.widgetWidth, this.widgetHeight);
                    s.noStroke();
                    s.fill(0);
                };

                s.draw = () => 
                {
                    s.background(255);
                    if (this.automaton.isCircular) {
                        s.push();
                        s.translate(this.widgetWidth / 2, this.widgetHeight / 2);
                        this.automaton.states.forEach((state, index) => {
                            s.push();
                            s.rotate(this._segmentSize * index);
                            //
                            s.translate(0, this._radius + this.getAmplitude(state));
                            s.ellipse(0, 0, this._dotSize +2, this._dotSize +2);
                            s.pop();
                        });
                        s.pop();
                    } else {
                        this.automaton.states.forEach( (state, index) => {
                            // amplitude has to be subtracted since the coordinate origin is at the top!
                            s.ellipse(this.getLinearX(index), this._linePosition - this.getAmplitude(state), this._dotSize, this._dotSize);
                        });
                    }
                };
            };
            this._p5 = new p5(sketch, this.container.nativeElement);
        }
}
