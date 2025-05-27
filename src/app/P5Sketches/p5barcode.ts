import { widgetP5 } from './p5Widget';
import { AutomatonService } from '../services/automaton.service';

export const barCodeFactory = (automaton: AutomatonService) => {
    let cellSize: number = 0;
    return (p5: widgetP5) => {
        const initValues = () => {
            cellSize = p5.width / automaton.cellnumber;
        };

        p5.setup = () => {
            p5.createCanvas(p5.width, p5.height);
            p5.noStroke();
            p5.fill(0);
            p5.background(255);
            initValues();
        };

        p5.draw = () => {
            p5.background(255);
            automaton.states().forEach((element, i) => {
                if (element === 1) {
                    p5.rect(i * cellSize, 0, cellSize, p5.height);
                }
            });
        };

        p5.componentResize = (w: number, h: number) => {
            p5.resizeCanvas(w, h);
            initValues();
        };

        p5.automatonReset = () => {
            initValues();
        };
    };
};
