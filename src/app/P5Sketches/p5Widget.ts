import * as p5 from 'p5';

/**
 * @class widgetP5 Expands the p5  class by custom methods to handle events related to the Automaton object and application environment.
 */
export class widgetP5 extends p5 {
    constructor(sketch: (...args: any[]) => any, node?: HTMLElement) {
        super(sketch, node);
    }

    componentResize(w: number, h: number): void {}
    automatonModeChange(): void {}
    automatonReset(): void {}
    automatonStateUpdate(): void {}
}
