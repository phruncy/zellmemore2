import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { P5Animated } from '../../utils/p5-animated';
import * as p5 from 'p5';
import { ContentBase } from '../../content-base/contentBase.component';
import { AutomatonService } from '../../services/automaton.service';
import { SizeService } from '../../services/size.service';
import { clearModulesForTest } from '@angular/core/src/linker/ng_module_factory_loader';

@Component({
  selector: 'app-viz-frequency',
  templateUrl: './viz-frequency.component.html',
  styleUrls: ['./viz-frequency.component.css']
})
export class VizFrequencyComponent extends ContentBase implements AfterContentInit, P5Animated {

    _p5: p5;
    @ViewChild('container', { static: true }) container: ElementRef;

    private _barWidth: number;
    private _history: number[];

    constructor(
                protected automaton: AutomatonService,
                protected sizeService: SizeService
    ) {
        super(automaton, sizeService);
    }

    ngAfterContentInit()
    {
        this.resetHistory();
        this.init();
        this.createP5();
    }

    update()
    {
        this.automaton.cells.forEach(cell =>
            {
                if (cell.state === 1) {
                this._history[cell.id]++;
                }
            }
        );
    }
    onResize()
    {
        this.init();
        this._p5.resizeCanvas(this.widgetWidth, this.widgetHeight);
    }
    onReset()
    {
        this.init();
        this.resetHistory();
    }

    createP5() 
    {
        const sketch = (s) =>
        {
            s.setup = () => {
                s.createCanvas(this.widgetWidth, this.widgetHeight);
                s.fill(0);
                s.noStroke();
            }
            s.draw = () => {
                s.background(255);
                const scale = this.scale();
                this.automaton.cells.forEach(cell =>
                    {
                        const barHeight = this._history[cell.id] * this._barWidth * scale;
                        s.rect(cell.id * this._barWidth, s.height - barHeight, this._barWidth, barHeight);
                    }
                );
            }
        }
        this._p5 = new p5(sketch, this.container.nativeElement);
    }

    init() {
        this._barWidth = this.widgetWidth / this.automaton.cellnumber;
    }

    resetHistory() 
    {
        this._history = this.automaton.cells.map(cell => cell.state);
    }

    /* scales the bar height once a constantly active cell's bar would reach 
        the widget height. Hence the bar of a cell that has been active for 
        its entire lifecycle will span the entire height, the others scale relatively 
    */
    scale()
    {
        const highest = this.automaton.generation * this._barWidth;
        if (highest > this.widgetHeight) {
            return this.widgetWidth / highest;
        }
        return 1;
    }
}
