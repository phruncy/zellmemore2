import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { ContentBase } from '../content-base/contentBase.component';
import { AutomatonService } from '../automaton.service';
import { SizeService } from '../size.service';
import * as p5 from 'p5';
import { P5Animated } from '../p5-animated';

@Component({
  selector: 'app-viz-threads',
  templateUrl: './viz-threads.component.html',
  styleUrls: ['./viz-threads.component.css']
})
export class VizThreadsComponent extends ContentBase implements AfterContentInit, P5Animated {

    @ViewChild('container') container: ElementRef;
    _p5: p5;
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

    private _strokeWeight: number;
    private _color01 = [86, 239, 185];

    constructor(
                protected automaton: AutomatonService,
                protected sizeService: SizeService) {
        super(automaton, sizeService);
     }

    get strokeWeight() 
    {
        if (this.automaton.cellnumber > 300) {
            return 1;
        } else if (this.automaton.cellnumber > 100) {
            return 2;
        } else if (this.automaton.cellnumber > 50) {
            return 3;
        }
        return 4;
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
  update() {}

    initValues() 
    {
        this._linePosition = this.widgetHeight / 2;
        this._edge = this.widgetWidth * 0.05;
        this._dotGap = ((this.widgetWidth - 2 * this._edge) / this.automaton.cellnumber) * 0.5;
        this._dotSize = ((this.widgetWidth - 2 * this._edge) / this.automaton.cellnumber) - this._dotGap;
        this._amplitude = this._dotSize * 2;
        this._segmentSize = (2 * Math.PI) / this.automaton.cellnumber;
        this._radius = (this.widgetWidth - 2 * this._edge - this._dotSize - 2 * this._amplitude) / 4;
        this._strokeWeight = this.strokeWeight;
    }

    getLinearX(cell: any) 
    {
        return (this._dotSize + this._dotGap) * cell.id + this._edge;
    }

    getAmplitude(cell: any) 
    {
        if (cell.state === 1) {
            return this._amplitude;
        }
        return - this._amplitude;
    }

    createP5() 
    {
        const sketch = (s) => {
            s.setup = () => {
                s.createCanvas(this.widgetWidth, this.widgetHeight);
            }
            s.draw = () => {
                s.background(255);
                s.strokeWeight(this._strokeWeight);
                if (this.automaton.isCircular) {
                    s.push();
                    s.translate(this.widgetWidth / 2, this.widgetHeight / 2);
                    this.automaton.cells.forEach(cell => {
                        s.defineColor(cell);
                        s.push();
                        s.rotate(this._segmentSize * cell.id);
                        //
                        s.translate(0, this._radius + this.getAmplitude(cell));
                        s.line(0, 0, s.width, s.height);
                        s.ellipse(0, 0, this._dotSize, this._dotSize);
                        s.pop();
                    });
                    s.pop();
                } else {
                    this.automaton.cells.forEach( cell => {
                        s.defineColor(cell);
                        s.line(this.getLinearX(cell), this._linePosition - this.getAmplitude(cell), this.getLinearX(cell) - this.getAmplitude(cell), 0);
                        // amplitude has to be subtracted since the coordinate origin is at the top!
                        s.ellipse(this.getLinearX(cell), this._linePosition - this.getAmplitude(cell), this._dotSize, this._dotSize);
                    });
                }
            };

            s.defineColor = (cell) =>
            {
                if (cell.state === 1) {
                    s.stroke(this._color01[0], this._color01[1], this._color01[2]);
                    s.fill(this._color01[0], this._color01[1], this._color01[2]);
                } else {
                    s.stroke(0);
                    s.fill(0);
                }
            }
        }
        this._p5 = new p5(sketch, this.container.nativeElement);
    }

}
