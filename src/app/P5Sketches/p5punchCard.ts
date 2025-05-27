import { widgetP5 } from './p5Widget';
import { AutomatonService } from '../services/automaton.service';

export const punchCardFactory = (automaton: AutomatonService) => {
    let edge: number = 0;
    let linePosition: number = 0;
    let dotSize: number = 1;
    let angle: number = 0;
    let amplitude: number = 0;
    let circularModeRadius: number;

    return (p5: widgetP5) => {
        const getLinearX = (index: number) => (dotSize + dotSize) * index + edge;
        const getAmplitude = (state: number) => (state === 1 ? amplitude : -amplitude);

        const initValues = () => {
            edge = p5.width * 0.05;
            linePosition = p5.height / 2;
            dotSize = ((p5.width - 2 * edge) * 0.5) / automaton.cellnumber;
            angle = (2 * Math.PI) / automaton.cellnumber;
            amplitude = dotSize * 2;
            circularModeRadius = (p5.width - 2 * edge - dotSize - 2 * amplitude) / 2;
        };

        p5.setup = () => {
            p5.createCanvas(p5.width, p5.height);
            p5.noStroke();
            p5.fill(0);
            initValues();
        };

        p5.draw = () => {
            p5.background(255);
            if (automaton.isCircular()) {
                p5.push();
                p5.translate(p5.width / 2, p5.height / 2);
                automaton.states().forEach((state, index) => {
                    p5.push();
                    p5.rotate(angle * index);
                    p5.translate(0, circularModeRadius + getAmplitude(state));
                    p5.circle(0, 0, dotSize + 2);
                    p5.pop();
                });
                p5.pop();
            } else {
                automaton.states().forEach((state, index) => {
                    // amplitude has to be subtracted since the coordinate origin is at the top!
                    p5.circle(getLinearX(index), linePosition - getAmplitude(state), dotSize);
                });
            }
        };

        p5.componentResize = (widgetWidth: number, widgetHeight: number) => {
            p5.resizeCanvas(widgetWidth, widgetHeight);
            initValues();
        };

        p5.automatonReset = () => {
            initValues();
        };
    };
};
