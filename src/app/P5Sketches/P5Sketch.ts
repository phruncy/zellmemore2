import { widgetP5 } from './p5Widget';

export class P5Sketch {
    name: string;
    sketch: (p5: widgetP5) => void;

    constructor(name: string, sketch: (p5: widgetP5) => void) {
        this.name = name;
        this.sketch = sketch;
    }
}
