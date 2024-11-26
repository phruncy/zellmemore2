import { P5Sketch } from "src/app/P5Sketches/P5Sketch";
import * as p5 from "p5";

export const p5threads = new P5Sketch
(   
    "vortex",
    function vortexSketch(p5: p5): void 
    {
        let center: number;
        let radiusMax: number;
        let segmentHeight: number;

        const initValues = () =>
        {
            center = p5.width / 2;
            radiusMax = p5.height * 0.9 / 2;
        }
        
        p5.setup = () =>
        {
            p5.createCanvas(this.componentWidth, this.componentHeight);
            initValues();
        }
    }
);