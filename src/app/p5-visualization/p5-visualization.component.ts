import {
    Component,
    HostBinding,
    OnInit,
    OnDestroy,
    viewChild,
    ElementRef,
    AfterContentInit,
    input,
    effect,
} from '@angular/core';
import { AutomatonService } from '../services/automaton.service';
import { Subscription, Subject } from 'rxjs';
import { widgetP5 } from '../P5Sketches/p5Widget';
import { P5Sketch } from 'src/app/P5Sketches/P5Sketch';

@Component({
    selector: 'app-p5-visualization',
    standalone: true,
    imports: [],
    template: `<div #container id="container" (click)="toggle()"></div>`,
})
export class P5VisualizationComponent implements OnInit, OnDestroy, AfterContentInit {
    p5container = viewChild<ElementRef>('container');
    p5sketch = input.required<P5Sketch>();

    @HostBinding('style.width.px') protected componentWidth;
    @HostBinding('style.height.px') protected componentHeight;

    private _automatonReset: Subscription;
    private _onDestroy = new Subject<void>();
    public $onDestroy = this._onDestroy.asObservable();

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
    }

    ngOnInit() {
        this._automatonReset = this.automaton.cellsChanged$.subscribe(() => {
            this.reset();
        });
    }

    ngAfterContentInit(): void {
        this.p5sketch().sketch = this.p5sketch().sketch.bind(this);
        this._p5 = new widgetP5(this.p5sketch().sketch, this.p5container().nativeElement);
    }

    ngOnDestroy() {
        this._automatonReset.unsubscribe();
        this._onDestroy.next();
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
