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
  styleUrls: ['./viz-waves01.component.css']
})
export class VizWaves01Component extends ContentBase implements AfterContentInit, P5Animated {

    @ViewChild('container') container: ElementRef;
    _p5: p5;

    private _amplitude: number; // absolute spatial difference between 0 and 1 states
    private _radius: number; // radius of the 0 state position in circular mode
    private _baseline: number; // y coordinate of the 0 state in linear mode
    private _margin: number;
    private _segment: number; // angle between the dots in circular mode
    private _agents: Agent[] = [];
    private _linearGap: number; // wavelength in linear mode

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
                s.stroke(255);
                s.background(0);
                s.curveTightness(1.0);
            }
            s.draw = () =>
            {
                s.background(0, 25);
                this.moveAgents();
                // circular rendering
                if (this.automaton.isCircular) {
                    s.push();
                    s.translate(this.widgetWidth / 2, this.widgetHeight / 2);
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
        this._amplitude = this.widgetHeight * 0.2;
        this._baseline = this.widgetHeight / 2 + this._amplitude / 2;
        this._linearGap = (this.widgetWidth - 2 * this._margin) / 
                            this.automaton.cellnumber;
        this._radius = (this.widgetWidth - 2 * this._margin - 2 *
                             this._amplitude) / 2;
        this._segment = (Math.PI * 2) / this.automaton.cellnumber;
        // initialize agents with current automaton state
        this._agents = [];
        this.automaton.cells.forEach(cell => {
            this._agents.push(
                new Agent(cell.id, this.getTargetPosition(cell.state)));
        });
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
    
