import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { P5Animated } from '../../utils/p5-animated';
import * as p5 from 'p5';
import { Agent } from '../../utils/agent';
import { AutomatonService } from '../../services/automaton.service';
import { SizeService } from '../../services/size.service';
import { ContentBase } from '../../content-base/contentBase.component';
import { ColorService } from 'src/app/services/color.service';

@Component({
    selector: 'app-viz-waves03',
    templateUrl: './viz-waves03.component.html',
    styleUrls: ['./viz-waves03.component.css'],
    standalone: true
})
export class VizWaves03Component extends ContentBase implements AfterContentInit, P5Animated {

    @ViewChild('container', { static: true }) container: ElementRef;
    _p5: p5;

    constructor(
                protected automaton: AutomatonService,
                protected size: SizeService,
                protected colors: ColorService
                ) {
        super(automaton, size);
        this.processingSketch = this.processingSketch.bind(this);
        this.automaton.modeChanged$.subscribe(() => {this._p5.onModeChange()});
        this.automaton.changed$.subscribe(() => {this._p5.onCellUpdate()})
    }

    ngAfterContentInit() 
    {
        this.createP5();
    }

    update() {
        
    }

    onResize() {
        this._p5.onWidgetResize(this.widgetWidth, this.widgetHeight);
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
        let amplitude: number; // absolute spatial difference between 0 and 1 states
        let radius: number; // radius of the 0 state position in circular mode
        let baseline: number; // y coordinate of the 0 state in linear mode
        let margin: number;
        let segment: number; // angle between the dots in circular mode
        let agents: Agent[] = [];
        let linearGap: number; // wavelength in linear mode

        let centerX: number; // circle center in circular mode
        let centerY: number;
        let colorCounter: number;
        
        const initValues = () =>
        {
            margin = p5.width * 0.05;
            amplitude = p5.height * 0.1;
            baseline = p5.height / 2 + amplitude / 2;
            linearGap = (p5.width - 2 * margin) /this.automaton.cellnumber;
            radius = (p5.width - 2 * margin - 2 * amplitude) / 4;
            segment = (Math.PI * 2) / this.automaton.cellnumber;
            // initialize agents with current automaton state
            agents = [];
            this.automaton.states.forEach((state, index) => 
                {
                    agents.push(
                    new Agent(index, getTargetPosition(state)));
                });
            centerX = p5.width / 2;
            centerY = p5.height / 2;
            colorCounter = Math.floor(Math.random() * 7);
        } 

        const moveAgents = () =>
        {
            const speed = (amplitude / (60 / this.automaton.fps));
            agents.forEach( agent => {
                const distanceRemaining = Math.abs(agent.target - agent.pos);
                if (distanceRemaining <= speed) {
                    agent.pos = agent.target;
                } else {
                    agent.pos = agent.pos + Math.sign(agent.target - agent.pos) * speed;
                }
        });
        }
        
        const getTargetPosition = (state: number) => state === 1 ? amplitude : 0;

        const drawLinearShape = () =>
        {
            p5.push();
            p5.translate(margin, baseline);
            p5.beginShape();
            agents.forEach(agent => {
                p5.curveVertex(agent.id * linearGap, -agent.pos);
            });
            p5.endShape();
            p5.pop();
        }

        const drawCircularShape = () =>
        {                
            p5.push();
            p5.translate(centerX, centerY);
            p5.beginShape();
            p5.curveVertex (
                Math.cos(0) * (radius + agents[0].pos),     Math.sin(0) * (radius + agents[0].pos)
            );
            p5.push();
            agents.forEach(agent => {
                p5.curveVertex(
                    Math.cos(segment * agent.id) * (radius + agent.pos),
                    Math.sin(segment * agent.id) * (radius + agent.pos)
                );
                p5.rotate(segment);
            });
            p5.pop();
            p5.curveVertex (
                Math.cos(0) * (radius + agents[0].pos),     Math.sin(0) * (radius + agents[0].pos)
            );
            p5.curveVertex (
                Math.cos(0) * (radius + agents[0].pos),     Math.sin(0) * (radius + agents[0].pos)
            );
            p5.endShape();
            p5.pop();
        }

        p5.setup = () => 
        {
            p5.createCanvas(this.widgetWidth, this.widgetHeight);
            p5.noFill();
            p5.stroke(0);
            p5.strokeWeight(.5, 15);
            p5.background(255);
            initValues();
        };

        p5.draw = () =>
        {
            moveAgents();
            // let drawing follow the mouse movement
            if (this.automaton.isRunning) {
                centerX += (p5.mouseX - centerX) * 0.003;
                centerY += (p5.mouseY - centerY) * 0.003;
                baseline += (p5.mouseY - baseline) * 0.003;
            }
            if (this.automaton.isCircular) 
            {
                drawCircularShape();
            } 
            else 
            { 
                drawLinearShape();
            }
        };

        p5.onWidgetResize = (w: number, h: number) =>
        {
            p5.resizeCanvas(w, h);
            p5.reset(); 
        }

        p5.reset = () =>
        {
            initValues();
            p5.background(255);
        }

        p5.onModeChange = () =>
        {
            p5.background(255);
        }

        p5.onCellUpdate = () =>
        {
            p5.background(255, 5);
            const color = this.colors.palette[colorCounter];
            colorCounter = (colorCounter + 1) % 8;
            p5.stroke(color[0], color[1], color[2]);
            this.automaton.states.forEach((state, index) => 
            {
                agents[index].target = getTargetPosition(state);
            });
        }    
    }
}
