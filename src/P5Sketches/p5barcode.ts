import { P5Sketch } from "src/P5Sketches/P5Sketch";
import * as p5 from "p5";

export const p5barcode = new P5Sketch
(
    "barcode",
    function barcodeSketch(p5: p5) : void
    {
        let cellSize;

        const initValues = () => { cellSize = p5.width / this.automaton.cellnumber; };
        
        p5.setup = () =>
        {
            p5.createCanvas(this.componentWidth, this.componentHeight);
            p5.noStroke();
            p5.fill(0);
            p5.background(255);
            initValues();
        }

        p5.draw = () =>
        {
            p5.background(255);
            this.automaton.states.forEach((element, i) => 
            {
                if (element === 1)
                {
                    p5.rect(i * cellSize, 0, cellSize, p5.height);
                }
            });
        }

        p5.componentResize = () => 
        {
            p5.resizeCanvas(this.componentWidth, this.componentHeight);
            initValues();
        }

        p5.automatonModeChange = () => {}
        p5.automatonReset = () => { initValues(); }
        p5.automatonStateUpdate = () => {}
    }
);