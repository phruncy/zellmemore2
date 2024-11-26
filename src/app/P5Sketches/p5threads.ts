import { P5Sketch } from "src/app/P5Sketches/P5Sketch";
import * as p5 from "p5";

export const p5threads = new P5Sketch 
(
    "threads",
    function p5threads(p5: p5): void 
    {
        const contrastColor = [86, 239, 185];
        
        let dotSize = 10;
        let dotGap: number;
        let lineHeight: number;
        let edge: number;
        /* for circular mode */
        let amplitude: number;
        let circularModeRadius: number;
        let angle: number;

        const getAmplitude = (state) => state === 1 ? amplitude : -amplitude;
        const getLinearX = (index) => (dotSize + dotGap) * index + edge;
        const getStrokeWeight = (value) =>
        {
            if (value >= 300) return 1;
            if (value >= 100) return 2;
            if (value >= 50)  return 3;
            return 4;
        }
        
        const initValues = () =>        
        {
            lineHeight = p5.height / 2;
            edge = p5.width * 0.05;
            dotGap = ((p5.width - 2 * edge) / this.automaton.cellnumber) * 0.5;
            dotSize = ((p5.width - 2 * edge) / this.automaton.cellnumber) - dotGap;
            amplitude = dotSize * 2;
            angle = (2 * Math.PI) / this.automaton.cellnumber;
            circularModeRadius = (p5.width - 2 * edge - dotSize - 2 * amplitude) / 4;
        }
        
        p5.setup = () => 
        {
            p5.createCanvas(this.componentWidth, this.componentHeight);
            initValues();
        }

        p5.draw = () => 
        {
            p5.background(255);
            const stroke = getStrokeWeight(this.automaton.cellnumber);
            p5.strokeWeight(stroke);
            if (this.automaton.isCircular) {
                p5.push();
                p5.translate(p5.width / 2, p5.height / 2);
                this.automaton.states.forEach((state, index) => {
                    p5.defineColor(state);
                    p5.push();
                    p5.rotate(angle * index);
                    //
                    p5.translate(0, circularModeRadius + getAmplitude(state));
                    p5.line(0, 0, p5.width, p5.height);
                    p5.circle(0, 0, dotSize);
                    p5.pop();
                });
                p5.pop();
            } else {
                this.automaton.states.forEach( (state, index) => {
                    p5.defineColor(state);
                    p5.line(getLinearX(index), lineHeight - getAmplitude(state), getLinearX(index) - getAmplitude(state), 0);
                    // amplitude has to be subtracted since the coordinate origin is at the top!
                    p5.circle(getLinearX(index), lineHeight - getAmplitude(state), dotSize);
                });
            }
        };

        p5.defineColor = (state: number) =>
        {
            if (state === 1) {
                p5.stroke(contrastColor[0], contrastColor[1], contrastColor[2]);
                p5.fill(contrastColor[0], contrastColor[1], contrastColor[2]);
            } else {
                p5.stroke(0);
                p5.fill(0);
            }
        }

        p5.automatonReset = () =>
        {
            initValues();
        }

        p5.componentResize = (w: number, h: number) =>
        {
            p5.resizeCanvas(w, h);
            initValues();
        }

        p5.automatonModeChange = () => {};
        p5.automatonStateUpdate = () => {};
    });