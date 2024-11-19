import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { P5Animated } from '../../utils/p5-animated';
import * as p5 from 'p5';
import { ContentBase } from '../../content-base/contentBase.component';
import { AutomatonService } from '../../services/automaton.service';
import { SizeService } from '../../services/size.service';

@Component({
    selector: 'app-viz-frequency',
    templateUrl: './viz-frequency.component.html',
    styleUrls: ['./viz-frequency.component.css'],
    standalone: true
})
export class VizFrequencyComponent extends ContentBase implements AfterContentInit, P5Animated {

    _p5: p5;
    @ViewChild('container', { static: true }) container: ElementRef;

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

    update()
    {
        this._p5.stateUpdate();
    }

    onResize()
    {
        this._p5.resize(this.widgetWidth, this.widgetHeight);
    }

    onReset()
    {
        this._p5.reset();
    }

    createP5() 
    {
        this._p5 = new p5(this.processingSketch, this.container.nativeElement);
    }

    processingSketch(p5)
    {
        let barWidth : number;
        let history: number[];
        
        const initValues = () =>
        {
            barWidth = p5.width / this.automaton.cellnumber;
        };
        
        const resetHistory = () =>
        {
            history = this.automaton.states.slice(0);
                
        }

        const scale = (): number =>
        {
            const highest = this.automaton.generation * barWidth;
            if (highest > p5.height)
                return p5.height /highest;
            return 1.0;
        }
        
        p5.setup = () => 
        {
            p5.createCanvas(this.widgetWidth, this.widgetHeight);
            p5.fill(0);
            p5.noStroke();
            initValues();
            resetHistory();
        }
        p5.draw = () => {
            p5.background(255);
            history.forEach((entry, i) => 
            {
                const barHeight = entry * barWidth * scale();
                p5.rect(i * barWidth, p5.height - barHeight, barWidth, barHeight);
            }) 
        }

        p5.reset = () =>
        {
            initValues();
            resetHistory();
        }

        p5.resize = (w: number, h: number) => 
        {
            p5.resizeCanvas(w, h);
            initValues();
        }

        p5.stateUpdate= () =>
        {
            this.automaton.states.forEach((state, index) => { history[index] += state; });
        }
    }
}