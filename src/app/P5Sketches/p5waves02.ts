import { P5Sketch } from "src/app/P5Sketches/P5Sketch";
import * as p5 from "p5";
import { Agent } from "src/app/utils/agent";

export const p5waves02 = new P5Sketch
(   
    "waves02",
    function waves02Sketch(p5: p5): void 
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
            p5.createCanvas(this.componentWidth, this.componentHeight);
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
        }

        p5.componentResize = (w:number, h: number) =>
        {
            p5.resizeCanvas(w, h);
            p5.automatonReset();
        }

        p5.automatonReset = () =>
        {
            p5.background(255);
            initValues();
        }

        p5.automatonStateUpdate = () =>
        {
            this.automaton.states.forEach((state, index) => 
            {
                agents[index].target = getTargetPosition(state);
            });
        }

        p5.automatonModeChange = () => {}
    }
);