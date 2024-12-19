import { P5Sketch } from 'src/app/P5Sketches/P5Sketch';
import { widgetP5 } from './p5Widget';

export const p5barcode = new P5Sketch('barcode', function barcodeSketch(p5: widgetP5): void {
    let cellSize: number;

    const initValues = () => {
        cellSize = p5.width / this.automaton.cellnumber;
    };

    p5.setup = () => {
        p5.createCanvas(this.componentWidth, this.componentHeight);
        p5.noStroke();
        p5.fill(0);
        p5.background(255);
        initValues();
    };

    p5.draw = () => {
        p5.background(255);
        this.automaton.states.forEach((element, i) => {
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
});
