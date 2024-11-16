import { Component, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { ContentBase } from '../../content-base/contentBase.component';
import { P5Animated } from '../../utils/p5-animated';
import * as p5 from 'p5';
import { SizeService } from '../../services/size.service';
import { AutomatonService } from '../../services/automaton.service';
import { Agent } from '../../utils/agent';
import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'app-viz-signals',
  templateUrl: './viz-signals.component.html',
  styleUrls: ['./viz-signals.component.css']
})
export class VizSignalsComponent extends ContentBase implements AfterContentInit, P5Animated {

    @ViewChild('container', { static: true }) container: ElementRef;
    _p5: p5;

    constructor(
                protected automaton: AutomatonService,
                protected size: SizeService,
                protected colors: ColorService
    ) 
    {
        super(automaton, size);
        this.processingSketch = this.processingSketch.bind(this);
        this.automaton.modeChanged$.subscribe(
            () => {this._p5.background(0);}
        );
    }

    ngAfterContentInit() 
    {
        this.createP5();
    }

    update() 
    {
        this._p5.cellsUpdated();    
    }

    onResize() 
    {
        this._p5.resize();
    }

    onReset() 
    {
        this._p5.reset();
    }

    // contains the p5 instance
    createP5() 
    {    
        this._p5 = new p5(this.processingSketch, this.container.nativeElement);
    }

    processingSketch(p5)
    {
        let amplitude: number; // absolute spatial difference between 0 and 1 states
        let dotSize: number; // size of the dots representing the cells
        let radius: number; // radius of the 0 state position in circular mode
        let margin: number;
        let gap: number; // gap between the dots
        let angle: number; // angle between the dots in circular mode
        let agents: Agent[] = [];
        let colorIndex: number; // the current rendering color

        const getTargetPosition = (state) => state === 1 ? amplitude : -amplitude;
        
        const initValues = () =>
        {
            angle = (Math.PI * 2) / this.automaton.cellnumber;
            margin = p5.width * 0.1;
            gap = ((p5.width - 2 * margin) / this.automaton.cellnumber) * 0.2;
            dotSize = ((p5.width - 2 * margin) / this.automaton.cellnumber) - gap;
            amplitude = p5.height * 0.05 ;
            radius = p5.width / 2 - margin - amplitude;
            agents = [];
            this.automaton.states.forEach((state, index) => 
            {
                agents.push(new Agent(index, getTargetPosition(state)));
            });
            colorIndex = Math.floor(Math.random() * 7);
        }

        const moveAgents = () =>
        {
            const speed = 2 * amplitude * this.automaton.fps;
            const movement = speed * (1 / p5.deltaTime); 
            agents.forEach( agent => 
            {
                if (Math.abs(agent.pos - agent.target) < movement)
                    agent.pos = agent.target;
                agent.pos = agent.pos + Math.sign(agent.target - agent.pos) * movement;
            });
        }

        const drawCircular = () =>
        {
            p5.translate(p5.width / 2, p5.height / 2);
            agents.forEach(agent => 
            {
                p5.circle(0, radius + agent.pos, dotSize);
                p5.rotate(angle);
            });
        }
        
        const drawLinear = () =>
        {
            p5.translate(margin, p5.height / 2);
            agents.forEach(agent => 
            {
                p5.circle((agent.id * (dotSize + gap)), -agent.pos, dotSize);
            });
        }

        p5.setup = () => 
        {
            p5.createCanvas(this.widgetWidth, this.widgetHeight);
            p5.noStroke();
            p5.fill(255);
            p5.background(0);
            initValues();
        }

        p5.draw = () =>
        {
            moveAgents();
            p5.background(0, 10);
            p5.push();
            if (this.automaton.isCircular) 
            {
                drawCircular();
            } else 
            {
                drawLinear();
            }
            p5.pop();
        };

        p5.cellsUpdated = () =>
        {
            const color = this.colors.palette[colorIndex];
            colorIndex = (colorIndex + 1) % this.colors.palette.length;
            this._p5.fill(color[0], color[1], color[2]);
            this.automaton.states.forEach((state, index) => 
            {
                agents[index].target = getTargetPosition(state);
            });
        }

        p5.resize = (w:number, h: number) =>
        {
            p5.resizeCanvas(w, h);
            p5.reset();
        }

        p5.reset = () =>
        {
            p5.background(0);
            initValues();
        }
    }
}