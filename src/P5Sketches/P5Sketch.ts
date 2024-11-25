import * as p5 from 'p5';
import { AutomatonService } from 'src/app/services/automaton.service';

export class P5Sketch
{
    name: string;
    sketch: (p5: p5) => void;

    constructor(name: string, sketch: (p5: p5) => void)
    {
        this.name = name;
        this.sketch = sketch;
    }
}