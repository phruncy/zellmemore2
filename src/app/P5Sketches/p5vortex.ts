import { P5Sketch } from "src/app/P5Sketches/P5Sketch";
import * as p5 from "p5";

export const p5vortex = new P5Sketch
(   
    "vortex",
    function vortexSketch(p5: p5): void 
    {
        let center: number;
        let radiusMax: number;
        let history: number[];
        let maxHistory: number;
        let arcLength: number;

        const initValues = () =>
        {
            center = p5.width / 2;
            radiusMax = p5.height * 0.9;
            maxHistory = Math.floor(radiusMax * 0.5);
            history = this.automaton.states.slice();
            arcLength = Math.PI * 2 / this.automaton.cellnumber;
        }
        
        p5.setup = () =>
        {
            p5.createCanvas(this.componentWidth, this.componentHeight);
            p5.noFill();
            initValues();
        }

        p5.draw = () => 
        {
            p5.background(255);
            let index = 0;
            for (let row = 0; row < maxHistory; row++) {
                const generationRadius = radiusMax * ((maxHistory - row) / maxHistory);
                for (let state = 0; state < this.automaton.cellnumber; state++) {
                    if(history[index] === 1) {
                        const startAngle = Math.PI * 2 * state / this.automaton.cellnumber;
                        p5.arc(center, center, generationRadius, generationRadius, startAngle, startAngle + arcLength);
                    }
                    index++;
                }
            }

        }

        p5.automatonReset = () => 
        { initValues(); }

        p5.automatonModeChange = () => {}

        p5.automatonStateUpdate = () => 
        {
            history = this.automaton.states.concat(history);
            if (history.length > maxHistory * this.automaton.cellnumber) {
                history.splice(-this.automaton.cellnumber);
            }
        }

        p5.componentResize = (w: number, h: number) => {
            p5.resizeCanvas(w, h);
            initValues();
        }
    } 
);