import { widgetP5 } from './p5Widget';
import { AutomatonService } from '../services/automaton.service';

export const frequencyFactory = (automaton: AutomatonService) => {
    let barWidth: number;
    let history: number[];

    return (p5: widgetP5) => {
        const initValues = () => {
            barWidth = p5.width / automaton.cellnumber;
        };

        const resetHistory = () => {
            history = automaton.states().slice(0);
        };

        const scale = (): number => {
            const highest = automaton.generation() * barWidth;
            if (highest > p5.height) return p5.height / highest;
            return 1.0;
        };

        p5.setup = () => {
            p5.createCanvas(p5.width, p5.height);
            p5.fill(0);
            p5.noStroke();
            initValues();
            resetHistory();
        };
        p5.draw = () => {
            p5.background(255);
            history.forEach((entry, i) => {
                const barHeight = entry * barWidth * scale();
                p5.rect(i * barWidth, p5.height - barHeight, barWidth, barHeight);
            });
        };

        p5.automatonReset = () => {
            initValues();
            resetHistory();
        };

        p5.componentResize = (w: number, h: number) => {
            p5.resizeCanvas(w, h);
            initValues();
        };

        p5.automatonStateUpdate = () => {
            automaton.states().forEach((state, index) => {
                history[index] += state;
            });
        };
    };
};
