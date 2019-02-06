import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { AutomatonService } from '../automaton.service';
import { Subscription } from 'rxjs';
import { ContentBase } from '../content-base/contentBase.component';
import { SizeService } from '../size.service';

@Component({
  selector: 'app-default-view',
  templateUrl: './testing02.component.html',
  styleUrls: ['./testing02.component.css']
})
export class Testing02Component extends ContentBase implements AfterContentInit {
    @ViewChild('defaultCanvas')canvas: ElementRef;
    private _ctx: CanvasRenderingContext2D;

    private blockMatrix: number[][];
    private _blockSize: number;

    constructor(protected automaton: AutomatonService,
                protected sizeService: SizeService,
                private reference: ElementRef)
                {
                    super(automaton, sizeService);
                }

    ngAfterContentInit()
    {
        this._ctx = this.canvas.nativeElement.getContext('2d');
        this.init();
        this.render();
    }

    update()
    {
        this.render();
    }

    onResize()
    {
        this.init();
        this.render();
    }

    onNumberChange()
    {
        this._blockSize = this.getBlocksize();
        this.render();
    }

    getBlocksize(): number
    {
        return (this.widgetWidth / this.automaton.cellnumber);
    }

    init() {
        this.canvas.nativeElement.height = this.widgetHeight;
        this.canvas.nativeElement.width = this.widgetWidth;
        this._blockSize = this.getBlocksize();
    }

    render()
    {
        this._ctx.clearRect(0, 0, this.widgetWidth, this.widgetHeight);
        for (let i = 0; i < this.automaton.cells.length; i++) {
            if (this.automaton.cells[i].state === 1) {
                this._ctx.fillRect(i * this._blockSize, 0, this._blockSize, this.widgetHeight);
            }
        }
    }

}
