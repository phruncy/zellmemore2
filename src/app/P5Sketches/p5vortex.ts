import { widgetP5 } from './p5Widget';
import { AutomatonService } from '../services/automaton.service';

export const vortexFactory = (automaton: AutomatonService) => {
    let center: number;
    let radiusMax: number;
    let history: number[];
    let maxHistory: number;
    let arcLength: number;

    return (p5: widgetP5) => {
        const initValues = () => {
            center = p5.width / 2;
            radiusMax = p5.height * 0.9;
            maxHistory = Math.floor(radiusMax * 0.5);
            history = automaton.states().slice();
            arcLength = (Math.PI * 2) / automaton.cellnumber;
        };

        p5.setup = () => {
            p5.createCanvas(p5.width, p5.height);
            p5.noFill();
            initValues();
        };

        p5.draw = () => {
            p5.background(255);
            let index = 0;
            for (let row = 0; row < maxHistory; row++) {
                const generationRadius = radiusMax * ((maxHistory - row) / maxHistory);
                for (let state = 0; state < automaton.cellnumber; state++) {
                    if (history[index] === 1) {
                        const startAngle = (Math.PI * 2 * state) / automaton.cellnumber;
                        p5.arc(
                            center,
                            center,
                            generationRadius,
                            generationRadius,
                            startAngle,
                            startAngle + arcLength,
                        );
                    }
                    index++;
                }
            }
        };

        p5.automatonReset = () => {
            initValues();
        };

        p5.automatonStateUpdate = () => {
            history = automaton.states().concat(history);
            if (history.length > maxHistory * automaton.cellnumber) {
                history.splice(-automaton.cellnumber);
            }
        };

        p5.componentResize = (w: number, h: number) => {
            p5.resizeCanvas(w, h);
            initValues();
        };
    };
};
