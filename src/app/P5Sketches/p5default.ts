import { widgetP5 } from './p5Widget';
import { AutomatonService } from '../services/automaton.service';

export const defaultFactory = (automaton: AutomatonService) => {
    let blockSize: number = 0;
    let maxDisplayableGenerations: number = 0;
    let buffer: number = 0;

    return (p5: widgetP5) => {
        const initValues = () => {
            blockSize = p5.width / automaton.cellnumber;
            maxDisplayableGenerations = Math.floor(p5.height / blockSize);
        };

        const getPositionY = (): number =>
            Math.min(automaton.generation(), maxDisplayableGenerations - 1) * blockSize;

        const drawCurrentGeneration = () => {
            const positionY = getPositionY();
            automaton.states().forEach((state, index) => {
                if (state === 1) {
                    p5.square(index * blockSize, positionY, blockSize);
                }
            });
        };

        const addCurrentToFrameBuffer = () => {
            drawCurrentGeneration();
            buffer = p5.drawingContext.getImageData(
                0,
                0,
                p5.width * p5.pixelDensity(),
                p5.height * p5.pixelDensity(),
            );
        };

        const initFrameBuffer = () => {
            p5.background(255);
            addCurrentToFrameBuffer();
        };

        p5.setup = () => {
            p5.createCanvas(p5.width, p5.height);
            p5.background(255);
            p5.fill(0);
            p5.noStroke();
            initValues();
            initFrameBuffer();
        };

        p5.draw = () => {
            p5.background(255);
            p5.drawingContext.putImageData(buffer, 0, 0);
            //buffer = p5.drawingContext.getImageData(0, 0, p5.width, p5.height);
        };

        p5.automatonStateUpdate = () => {
            p5.background(255);
            const anchorY =
                automaton.generation() <= maxDisplayableGenerations - 1 ? 0 : -blockSize;
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
    };
};
