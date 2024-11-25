
import { P5Sketch } from "src/P5Sketches/P5Sketch";
import * as p5 from "p5";

export const p5frequency = new P5Sketch
(   
    "frequency",
    function (p5: p5): void 
    {
        let barWidth : number;
        let history: number[];
        
        const initValues = () =>
        {
            barWidth = p5.width / this.automaton.cellnumber;
        };
        
        const resetHistory = () =>
        {
            history = this.automaton.states.slice(0);
                
        }

        const scale = (): number =>
        {
            const highest = this.automaton.generation * barWidth;
            if (highest > p5.height)
                return p5.height /highest;
            return 1.0;
        }
        
        p5.setup = () => 
        {
            p5.createCanvas(this.componentWidth, this.componentHeight);
            p5.fill(0);
            p5.noStroke();
            initValues();
            resetHistory();
        }
        p5.draw = () => {
            p5.background(255);
            history.forEach((entry, i) => 
            {
                const barHeight = entry * barWidth * scale();
                p5.rect(i * barWidth, p5.height - barHeight, barWidth, barHeight);
            }) 
        }

        p5.automatonReset = () =>
        {
            initValues();
            resetHistory();
        }

        p5.componentResize = (w: number, h: number) => 
        {
            p5.resizeCanvas(w, h);
            initValues();
        }

        p5.automatonStateUpdate= () =>
        {
            this.automaton.states.forEach((state, index) => { history[index] += state; });
        }

        p5.automatonModeChange = () => {}
    }
);