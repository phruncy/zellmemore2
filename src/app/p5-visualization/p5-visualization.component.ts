import { Component, HostBinding, OnInit, OnDestroy, viewChild, ElementRef, AfterContentInit, input} from '@angular/core';
import { AutomatonService } from '../services/automaton.service';
import { SizeService } from '../services/size.service';
import { Subscription, Subject } from 'rxjs';
import * as p5 from 'p5';
import { P5Sketch } from '../../P5Sketches/P5Sketch';

@Component({
  selector: 'app-p5-visualization',
  standalone: true,
  imports: [],
  templateUrl: './p5-visualization.component.html',
  styleUrl: './p5-visualization.component.scss'
})
export class P5VisualizationComponent implements OnInit, OnDestroy, AfterContentInit
{
  p5container = viewChild<ElementRef>('container');
  p5sketch = input.required<P5Sketch>();

  @HostBinding('style.width.px') protected componentWidth ;
  @HostBinding('style.height.px') protected componentHeight;

  private _automatonChanged: Subscription;
  private _automatonReset: Subscription;
  private _sizeChange: Subscription;
  private _automatonModeChanged: Subscription;
  private _onDestroy = new Subject<void>();
  public $onDestroy = this._onDestroy.asObservable();

  private _p5: p5;

  constructor(private automaton: AutomatonService, private sizeService: SizeService)
  { }

  ngOnInit() 
  {
    this._automatonChanged = this.automaton.changed$.subscribe(() => { this.update(); });
    this._automatonReset = this.automaton.cellsChanged$.subscribe(() => { this.reset(); });
    this._automatonModeChanged = this.automaton.modeChanged$.subscribe(() => {this.modeChanged()});
    this._sizeChange = this.sizeService.sizeChanged$.subscribe(() => 
      {
        this.fetchSize();
        this.resizeContent();
      });
    this.fetchSize();
  }

  ngAfterContentInit(): void 
  {
    this.p5sketch().sketch = this.p5sketch().sketch.bind(this);
    this._p5 = new p5(this.p5sketch().sketch, this.p5container().nativeElement)
  }

  ngOnDestroy() 
  {
    this._automatonChanged.unsubscribe();
    this._automatonReset.unsubscribe();
    this._automatonModeChanged.unsubscribe();
    this._sizeChange.unsubscribe();
    this._onDestroy.next();
  }

  update() : void 
  {
    this._p5.automatonStateUpdate();
  }

  reset() : void
  {
    this._p5.automatonReset();
  }

  modeChanged() : void
  {
    this._p5.automatonModeChange();
  }

  resizeContent(): void
  {
    this._p5.componentResize(this.componentWidth, this.componentHeight);
  }

  fetchSize() 
  {
      this.componentWidth = this.sizeService.widgetSize.toString();
      this.componentHeight = this.componentWidth;
  }
}
