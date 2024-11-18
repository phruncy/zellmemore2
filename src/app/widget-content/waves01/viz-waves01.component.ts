import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { P5Animated } from '../../utils/p5-animated';
import * as p5 from 'p5';
import { AutomatonService } from '../../services/automaton.service';
import { Agent } from '../../utils/agent';
import { SizeService } from '../../services/size.service';
import { ContentBase } from '../../content-base/contentBase.component';

@Component({
    selector: 'app-viz-waves01',
    templateUrl: './viz-waves01.component.html',
    styleUrls: ['./viz-waves01.component.css'],
    standalone: true
})
export class VizWaves01Component extends ContentBase implements AfterContentInit, P5Animated {

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
        this._p5.updateAgents();
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
        let agents: Agent[] = [];
        let amplitude: number; // absolute spatial difference between 0 and 1 states
        let radius: number;
        let margin: number;
        let angle: number; // angle between the dots in circular mode
        let linearWavelength: number; // wavelength in linear mode
        
        const initValues = () =>
        {
            margin = p5.width * 0.05;
            amplitude = p5.height * 0.1;
            linearWavelength = (p5.width - 2 * margin) / this.automaton.cellnumber;
            radius = p5.width / 2 - margin - 2 * amplitude;
            angle = (Math.PI * 2) / this.automaton.cellnumber;
            agents = [];
            this.automaton.states.forEach((state, i) => 
                {
                agents.push( new Agent(i, getTargetPosition(state)));
            });
        }
        
        const getTargetPosition = (state) => state === 1 ? amplitude : -amplitude;
        const moveAgents = () =>
        {
            const speed = (amplitude * 2 / (60 / this.automaton.fps));
            agents.forEach( agent => {
                const distanceRemaining = Math.abs(agent.target - agent.pos);
                if (distanceRemaining <= speed) {
                    agent.pos = agent.target;
                } else {
                    agent.pos = agent.pos + Math.sign(agent.target - agent.pos) * speed;
                }
            });
        }

        const drawCircular = () =>
        {
            p5.translate(p5.width / 2, p5.height / 2);
            p5.beginShape();
            p5.curveVertex (radius + agents[0].pos, 0); // sin and cos of 0 are 0 and on respectively
            agents.forEach(agent => 
            {
                p5.curveVertex(
                    Math.cos(angle * agent.id) * (radius + agent.pos),
                    Math.sin(angle * agent.id) * (radius + agent.pos)
                );
            });
            p5.curveVertex(radius + agents[0].pos, 0);
            p5.curveVertex(radius + agents[0].pos, 0);
            p5.endShape();
        }

        const drawLinear = () =>
        {
            p5.translate(margin, p5.height / 2);
            p5.beginShape();
            agents.forEach(agent => { p5.curveVertex(agent.id * linearWavelength, -agent.pos); });
            p5.endShape();
        }
        
        p5.setup = () => 
        {
            p5.createCanvas(this.widgetWidth, this.widgetHeight);
            p5.noFill();
            p5.stroke(255);
            p5.background(0);
            p5.curveTightness(1.0);
            initValues();
        }

        p5.draw = () =>
        {
            moveAgents();
            p5.background(0, 25);
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

        p5.updateAgents = () =>
        {
            this.automaton.states.forEach((state, index) => 
            {
                agents[index].target = getTargetPosition(state);
            });
        }

        p5.reset = () =>
        {
            p5.background(0);
            initValues();
        }

        p5.resize = (w: number, h: number) =>
        {
            p5.resizeCanvas(w, h);
            p5.reset();
        }
    }
}
    
