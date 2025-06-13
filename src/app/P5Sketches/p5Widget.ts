import p5 from 'p5';

/**
 * @class widgetP5 Expands the p5  class by custom methods to handle events related to the Automaton object and application environment.
 */
export class widgetP5 extends p5 {
    constructor(
        sketch: (...args: any[]) => any,
        dimensions: { w: number; h: number },
        node?: HTMLElement,
    ) {
        super(sketch, node);
        this.componentResize(dimensions.w, dimensions.h);
    }

    componentResize(w: number, h: number): void {}
    automatonModeChange(): void {}
    automatonReset(): void {}
    automatonStateUpdate(): void {}
}
