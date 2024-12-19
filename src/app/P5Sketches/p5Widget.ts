import * as p5 from 'p5';

export class widgetP5 extends p5 {
    constructor(sketch: (...args: any[]) => any, node?: HTMLElement) {
        super(sketch, node);
    }

    componentResize(w: number, h: number): void {}
    automatonModeChange(): void {}
    automatonReset(): void {}
    automatonStateUpdate(): void {}
}
