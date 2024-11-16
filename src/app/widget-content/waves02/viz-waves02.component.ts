import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import * as p5 from 'p5';
import { ContentBase } from '../../content-base/contentBase.component';
import { P5Animated } from '../../utils/p5-animated';
import { Agent } from '../../utils/agent';
import { AutomatonService } from '../../services/automaton.service';
import { SizeService } from '../../services/size.service';

@Component({
  selector: 'app-viz-waves02',
  templateUrl: './viz-waves02.component.html',
  styleUrls: ['./viz-waves02.component.css']
})
export class VizWaves02Component extends ContentBase implements AfterContentInit, P5Animated {

    @ViewChild('container', { static: true }) container: ElementRef;
    _p5: p5;

    constructor(
                protected automaton: AutomatonService,
                protected size: SizeService
                ) 
    {
        super(automaton, size);
        this.processingSketch = this.processingSketch.bind(this);
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
        this._p5.resize(this.widgetWidth, this.widgetHeight);
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
        let radius: number; // radius of the 0 state position in circular mode
        let margin: number;
        let linearGap: number;
        let angle: number;
        let agents: Agent[] = [];

        let centerX, centerY;
        
        const initValues = () =>
        {
            centerX = p5.width / 2;
            centerY = p5.height /2;
            amplitude = p5.height * 0.05
            angle = (Math.PI * 2) / this.automaton.cellnumber;
            margin = p5.width * 0.05;
            radius = (p5.width / 2 - amplitude) * 0.5;
            linearGap = (p5.width - 2 * margin) /
                            this.automaton.cellnumber;
            agents = [];
            this.automaton.states.forEach((state, index) => 
            {
                agents.push( new Agent(index, getTargetPosition(state)));
            });
        }

        const getTargetPosition = (state) => state === 1 ? amplitude : -amplitude;

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
        
        p5.setup = () => 
        {
            p5.createCanvas(this.widgetWidth, this.widgetHeight);
            p5.fill(0);
            p5.stroke(0);
            p5.background(255);
            initValues();
        }

        p5.draw = () =>
        {
            moveAgents();
            centerX += (p5.mouseX - centerX) * 0.003;
            centerY += (p5.mouseY - centerY) * 0.003;
            p5.background(255);
            p5.push();
            if (this.automaton.isCircular) {
                p5.translate(centerX, centerY);
                p5.beginShape();
                p5.curveVertex(radius + agents[0].pos, 0);
                agents.forEach(agent => 
                {
                    p5.curveVertex(
                        Math.cos(angle * agent.id) * (radius + agent.pos),
                        Math.sin(angle * agent.id) * (radius + agent.pos)
                    );
                });
                p5.curveVertex (radius + agents[0].pos, 0);
                p5.curveVertex (radius + agents[0].pos, 0);
                p5.endShape();
            } else { // linear rendering
                p5.translate(margin, p5.height / 2);
                p5.beginShape();
                agents.forEach(agent => {
                    p5.curveVertex(agent.id * linearGap, -agent.pos);
                });
                p5.endShape();
            }
            p5.pop();
        };

        p5.resize = (w:number, h: number) =>
        {
            p5.resizeCanvas(w, h);
            p5.reset();
        }

        p5.reset = () =>
        {
            p5.background(255);
            initValues();
        }

        p5.cellsUpdated = () =>
        {
            this.automaton.states.forEach((state, index) => 
            {
                agents[index].target = getTargetPosition(state);
            });
        }
    }
}
