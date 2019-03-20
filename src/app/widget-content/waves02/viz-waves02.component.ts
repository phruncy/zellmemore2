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

    @ViewChild('container') container: ElementRef;
    _p5: p5;

    private _amplitude: number; // absolute spatial difference between 0 and 1 states
    private _radius: number; // radius of the 0 state position in circular mode
    private _baseline: number; // y coordinate of the 0 state in linear mode
    private _margin: number;
    private _segment: number; // angle between the dots in circular mode
    private _agents: Agent[] = [];
    private _linearGap: number; // wavelength in linear mode

    private _centerX: number; // circle center in circular mode
    private _centerY: number;

    constructor(
                protected automaton: AutomatonService,
                protected size: SizeService
                ) {
        super(automaton, size);
    }

    ngAfterContentInit() 
    {
        this.init();
        this.createP5();
    }
    update() {
        this.automaton.cells.forEach((cell, index) => {
                this._agents[index].target = this.getTargetPosition(cell.state);
        });
    }

    onResize() {
        this._p5.resizeCanvas(this.widgetWidth, this.widgetHeight);
        this.init();
        this._p5.background(0);
    }

    onReset() {
        this.init();
        this._p5.background(0);
    }

    // contains the p5 instance
    createP5() {
        const sketch = (s) => 
        {
            s.setup = () => 
            {
                s.createCanvas(this.widgetWidth, this.widgetHeight);
                s.noFill();
                s.stroke(0);
                s.background(0);
            }
            s.draw = () =>
            {
                s.background(255);
                this.moveAgents();
                // move circle Center to mousePosition
                this._centerX += (s.mouseX - this._centerX) * 0.003;
                this._centerY += (s.mouseY - this._centerY) * 0.003;
                // circular rendering
                if (this.automaton.isCircular) {
                    s.push();
                    s.translate(this._centerX, this._centerY);
                    s.beginShape();
                    s.curveVertex (
                        Math.cos(0) * (this._radius + this._agents[0].pos),     Math.sin(0) * (this._radius + this._agents[0].pos)
                    );
                    this._agents.forEach(agent => {
                        s.curveVertex(
                            Math.cos(this._segment * agent.id) * (this._radius + agent.pos),
                            Math.sin(this._segment * agent.id) * (this._radius + agent.pos)
                        );
                    });
                    s.curveVertex (
                        Math.cos(0) * (this._radius + this._agents[0].pos),     Math.sin(0) * (this._radius + this._agents[0].pos)
                    );
                    s.curveVertex (
                        Math.cos(0) * (this._radius + this._agents[0].pos),     Math.sin(0) * (this._radius + this._agents[0].pos)
                    );
                    s.endShape();
                    s.pop();
                } else { // linear rendering
                    s.push();
                    s.translate(this._margin, this._baseline);
                    s.beginShape();
                    this._agents.forEach(agent => {
                        s.curveVertex(agent.id * this._linearGap, -agent.pos);
                    });
                    s.endShape();
                    s.pop();
                }
            };
        };
        this._p5 = new p5(sketch, this.container.nativeElement);
    }

    init() {
        this._margin = this.widgetWidth * 0.05;
        this._amplitude = this.widgetHeight * 0.1;
        this._baseline = this.widgetHeight / 2 + this._amplitude / 2;
        this._linearGap = (this.widgetWidth - 2 * this._margin) /
                            this.automaton.cellnumber;
        this._radius = (this.widgetWidth - 2 * this._margin - 2 *
                             this._amplitude) / 3.5;
        this._segment = (Math.PI * 2) / this.automaton.cellnumber;
        // initialize agents with current automaton state
        this._agents = [];
        this.automaton.cells.forEach(cell => {
            this._agents.push(
                new Agent(cell.id, this.getTargetPosition(cell.state)));
        });
        this._centerX = this.widgetWidth / 2;
        this._centerY = this.widgetHeight / 2;
    }

    getTargetPosition(state: number): number {
        if (state === 1) {
            return this._amplitude;
        }
        return 0;
    }

    moveAgents() {
        const speed = (this._amplitude / (60 / this.automaton.fps));
        this._agents.forEach( agent => {
            const distanceRemaining = Math.abs(agent.target - agent.pos);
            if (distanceRemaining <= speed) {
                agent.pos = agent.target;
            } else {
                agent.pos = agent.pos + Math.sign(agent.target - agent.pos) * speed;
            }
        });
    }
}
