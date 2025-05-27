import { AutomatonService } from '../services/automaton.service';
import { widgetP5 } from './p5Widget';

export class P5Sketch {
    sketch: (p5: widgetP5) => void;

    constructor(
        factory: (automaton: AutomatonService) => (p5: widgetP5) => void,
        automaton: AutomatonService,
    ) {
        this.sketch = factory(automaton);
    }
}
