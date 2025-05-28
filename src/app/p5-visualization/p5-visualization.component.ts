import {
    Component,
    HostBinding,
    viewChild,
    ElementRef,
    AfterContentInit,
    input,
    effect,
} from '@angular/core';
import { AutomatonService } from '../services/automaton.service';
import { widgetP5 } from '../P5Sketches/p5Widget';
import { P5Sketch } from 'src/app/P5Sketches/P5Sketch';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-p5-visualization',
    standalone: true,
    imports: [],
    template: `<div #container id="container" (click)="toggle()"></div>`,
})
export class P5VisualizationComponent implements AfterContentInit {
    p5container = viewChild<ElementRef>('container');
    p5sketch = input.required<P5Sketch>();

    @HostBinding('style.width.px') protected componentWidth;
    @HostBinding('style.height.px') protected componentHeight;

    private _p5: widgetP5;

    constructor(private automaton: AutomatonService) {
        effect(() => {
            this.automaton.states();
            if (this._p5) this.update();
        });
        effect(() => {
            this.automaton.isCircular();
            if (this._p5) this.modeChanged();
        });
        this.automaton.cellsChanged$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.reset();
        });
    }

    ngAfterContentInit(): void {
        const dimensions = { w: this.componentWidth, h: this.componentHeight };
        this._p5 = new widgetP5(
            this.p5sketch().sketch,
            dimensions,
            this.p5container().nativeElement,
        );
    }

    toggle() {
        this.automaton.toggle();
    }

    resizeContent(size: number): void {
        this.componentWidth = size.toString();
        this.componentHeight = this.componentWidth;
        this._p5?.componentResize(size, size);
    }

    private update(): void {
        this._p5.automatonStateUpdate();
    }

    private reset(): void {
        this._p5.automatonReset();
    }

    private modeChanged(): void {
        this._p5.automatonModeChange();
    }
}
