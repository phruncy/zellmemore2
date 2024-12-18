import { P5Sketch } from 'src/app/P5Sketches/P5Sketch';
import * as p5 from 'p5';

export const p5chaos = new P5Sketch('chaos', function chaosSketch(p5: p5): void {
    let blockSize: number;
    let maxDisplayableGenerations: number;
    let buffer: ImageData;

    const initValues = () => {
        blockSize = p5.width / this.automaton.cellnumber;
        maxDisplayableGenerations = Math.floor(p5.height / blockSize);
    };

    const getPositionY = (): number =>
        Math.min(this.automaton.generation, maxDisplayableGenerations - 1) * blockSize;

    const drawCurrentGeneration = () => {
        const random: number[] = this.automaton.states.slice().sort(() => 0.5 - Math.random());
        const positionY = getPositionY();
        random.forEach((state, index) => {
            if (state === 1) {
                p5.square(index * blockSize, positionY, blockSize);
            }
        });
    };

    const addCurrentToFrameBuffer = () => {
        drawCurrentGeneration();
        buffer = p5.drawingContext.getImageData(0, 0, p5.width, p5.height);
    };

    const initFrameBuffer = () => {
        p5.background(255);
        addCurrentToFrameBuffer();
    };

    p5.setup = () => {
        p5.createCanvas(this.componentWidth, this.componentHeight);
        p5.background(255);
        p5.fill(0);
        p5.noStroke();
        initValues();
        initFrameBuffer();
    };

    p5.draw = () => {
        p5.background(255);
        p5.drawingContext.putImageData(buffer, 0, 0);
        buffer = p5.drawingContext.getImageData(0, 0, p5.width, p5.height);
    };

    p5.automatonStateUpdate = () => {
        p5.background(255);
        const anchorY = this.automaton.generation <= maxDisplayableGenerations - 1 ? 0 : -blockSize;
        p5.drawingContext.putImageData(buffer, 0, anchorY);
        addCurrentToFrameBuffer();
    };

    p5.componentResize = (w: number, h: number) => {
        p5.resizeCanvas(w, h);
        initValues();
        initFrameBuffer();
    };

    p5.automatonReset = () => {
        initValues();
        initFrameBuffer();
    };

    p5.automatonModeChange = () => {};
});
