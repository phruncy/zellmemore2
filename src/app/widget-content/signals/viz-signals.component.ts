import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { ContentBase } from '../../content-base/contentBase.component';
import { P5Animated } from '../../utils/p5-animated';
import * as p5 from 'p5';
import { SizeService } from '../../services/size.service';
import { AutomatonService } from '../../services/automaton.service';
import { Agent } from '../../utils/agent';

@Component({
  selector: 'app-viz-signals',
  templateUrl: './viz-signals.component.html',
  styleUrls: ['./viz-signals.component.css']
})
export class VizSignalsComponent extends ContentBase implements AfterContentInit, P5Animated {

    @ViewChild('container') container: ElementRef;
    _p5: p5;

    private _amplitude: number; // absolute spatial difference between 0 and 1 states
    private _dotSize: number; // size of the dots representing the cells
    private _radius: number; // radius of the 0 state position in circular mode
    private _baseline: number; // y coordinate of the 0 state in linear mode
    private _margin: number;
    private _gap: number; // gap between the dots
    private _segment: number; // angle between the dots in circular mode
    private _agents: Agent[] = [];

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
s
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
                s.noStroke();
                s.fill(255);
                s.background(0);
            }
            s.draw = () =>
            {
                s.background(0, 20);
                this.moveAgents();
                if (this.automaton.isCircular) {
                    s.push();
                    s.translate(this.widgetWidth / 2, this.widgetHeight / 2);
                    this._agents.forEach(agent => {
                        s.push();
                        s.rotate(this._segment * agent.id);
                        s.translate(0, this._radius + agent.pos);
                        s.ellipse(0, 0, this._dotSize, this._dotSize);
                        s.pop();
                    });
                    s.pop();
                } else {
                    s.push();
                    s.translate(this._margin, this._baseline);
                    this._agents.forEach(agent => {
                        s.ellipse(
                                    (agent.id * (this._dotSize + this._gap)),
                                    -agent.pos,
                                    this._dotSize,
                                    this._dotSize);
                    });
                    s.pop();
                }
            };
        };
        this._p5 = new p5(sketch, this.container.nativeElement);
    }

    init() {
        this._margin = this.widgetWidth * 0.05;
        this._amplitude = this.widgetHeight * 0.3;
        this._baseline = this.widgetHeight / 2 + this._amplitude / 2;
        this._gap = ((this.widgetWidth - 2 * this._margin) / this.automaton.cellnumber) * 0.2;
        this._dotSize = ((this.widgetWidth - 2 * this._margin) / this.automaton.cellnumber) - this._gap;
        this._radius = (this.widgetWidth - 2 * this._margin - 2 * this._amplitude) / 2;
        this._segment = (Math.PI * 2) / this.automaton.cellnumber;
        this._agents = [];
        this.automaton.cells.forEach(cell => {
            this._agents.push(new Agent(cell.id, this.getTargetPosition(cell.state)));
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