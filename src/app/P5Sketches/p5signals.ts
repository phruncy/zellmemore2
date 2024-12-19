import { P5Sketch } from 'src/app/P5Sketches/P5Sketch';
import { widgetP5 } from './p5Widget';
import { Agent } from 'src/app/utils/agent';
import { sketchColors } from 'src/app/utils/colors';

export const p5signals = new P5Sketch('signals', function signalsSketch(p5: widgetP5): void {
    let amplitude: number; // absolute spatial difference between 0 and 1 states
    let dotSize: number; // size of the dots representing the cells
    let radius: number; // radius of the 0 state position in circular mode
    let margin: number;
    let gap: number; // gap between the dots
    let angle: number; // angle between the dots in circular mode
    let agents: Agent[] = [];
    let colorIndex: number; // the current rendering color

    const getTargetPosition = (state) => (state === 1 ? amplitude : -amplitude);

    const initValues = () => {
        angle = (Math.PI * 2) / this.automaton.cellnumber;
        margin = p5.width * 0.1;
        gap = ((p5.width - 2 * margin) / this.automaton.cellnumber) * 0.2;
        dotSize = (p5.width - 2 * margin) / this.automaton.cellnumber - gap;
        amplitude = p5.height * 0.05;
        radius = p5.width / 2 - margin - amplitude;
        agents = [];
        this.automaton.states.forEach((state, index) => {
            agents.push(new Agent(index, getTargetPosition(state)));
        });
        colorIndex = Math.floor(Math.random() * 7);
    };

    const moveAgents = () => {
        const speed = 2 * amplitude * this.automaton.fps;
        const movement = speed * (1 / p5.deltaTime);
        agents.forEach((agent) => {
            if (Math.abs(agent.pos - agent.target) < movement) agent.pos = agent.target;
            agent.pos = agent.pos + Math.sign(agent.target - agent.pos) * movement;
        });
    };

    const drawCircular = () => {
        p5.translate(p5.width / 2, p5.height / 2);
        agents.forEach((agent) => {
            p5.circle(0, radius + agent.pos, dotSize);
            p5.rotate(angle);
        });
    };

    const drawLinear = () => {
        p5.translate(margin, p5.height / 2);
        agents.forEach((agent) => {
            p5.circle(agent.id * (dotSize + gap), -agent.pos, dotSize);
        });
    };

    p5.setup = () => {
        p5.createCanvas(this.componentWidth, this.componentWidth);
        p5.noStroke();
        p5.fill(255);
        p5.background(0);
        initValues();
    };

    p5.draw = () => {
        moveAgents();
        p5.background(0, 10);
        p5.push();
        if (this.automaton.isCircular) {
            drawCircular();
        } else {
            drawLinear();
        }
        p5.pop();
    };

    p5.automatonStateUpdate = () => {
        const color: number[] = sketchColors[colorIndex];
        colorIndex = (colorIndex + 1) % sketchColors.length;
        this._p5.fill(color[0], color[1], color[2]);
        this.automaton.states.forEach((state, index) => {
            agents[index].target = getTargetPosition(state);
        });
    };

    p5.componentResize = (w: number, h: number) => {
        p5.resizeCanvas(w, h);
        p5.automatonReset();
    };

    p5.automatonReset = () => {
        p5.background(0);
        initValues();
    };
});
