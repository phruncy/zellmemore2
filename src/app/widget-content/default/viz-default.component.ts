import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { ContentBase } from '../../content-base/contentBase.component';
import { AutomatonService } from '../../services/automaton.service';
import { SizeService } from '../../services/size.service';

@Component({
    selector: 'app-viz-default',
    templateUrl: './viz-default.component.html',
    styleUrls: ['./viz-default.component.css'],
    standalone: true
})
export class VizDefaultComponent extends ContentBase implements AfterContentInit {

    @ViewChild('defaultCanvas', { static: true })canvas: ElementRef;
    private _ctx: CanvasRenderingContext2D;

    private _blockSize: number;
    private _maxDisplayableGenerations: number;
    private _buffer: ImageData;

    constructor(
      protected automaton: AutomatonService,
      protected sizeService: SizeService) {
      super(automaton, sizeService);
    }

    ngAfterContentInit()
    {
        this._ctx = this.canvas.nativeElement.getContext('2d');
        this.init();
        this.update();
    }

    onResize() {
        this.init();
        this.render();
    }

    onReset()
    {
        this._blockSize = this.getBlocksize();
        this._maxDisplayableGenerations = this.widgetWidth/ this._blockSize;
        this._ctx.clearRect(0, 0, this.widgetWidth, this.widgetHeight);
        this.update();
    }

    update() 
    {
        this.render();
    }

    init() 
    {
        this.canvas.nativeElement.height = this.widgetHeight;
        this.canvas.nativeElement.width = this.widgetWidth;
        this._blockSize = this.getBlocksize();
        this._maxDisplayableGenerations = this.widgetHeight / this._blockSize;
    }

    render()
    {
        const positionY = this.getPosition();
        if (this.automaton.generation >= this._maxDisplayableGenerations) {
            this._buffer = this._ctx.getImageData(0, this._blockSize, this.widgetWidth, this.widgetHeight - this._blockSize);
            this._ctx.clearRect(0, 0, this.widgetWidth, this.widgetHeight);
            this._ctx.putImageData(this._buffer, 0, 0);
        }
        this.automaton.states.forEach(
            (state, index) => {
                if (state === 1) {
                    this._ctx.fillRect(
                        index * this._blockSize, 
                        positionY, 
                        this._blockSize, 
                        this._blockSize);
                }
        });
    }

    getBlocksize(): number
    {
        return (this.widgetWidth / this.automaton.cellnumber);
    }

    getPosition(): number {
        if (this.automaton.generation < this._maxDisplayableGenerations) {
            return this.automaton.generation * this._blockSize;
        }
        return (this._maxDisplayableGenerations - 1) * this._blockSize;
    }
}