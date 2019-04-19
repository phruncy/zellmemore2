import { Component, OnInit, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { AutomatonService } from 'src/app/services/automaton.service';
import { ContentBase } from 'src/app/content-base/contentBase.component';
import { SizeService } from 'src/app/services/size.service';


@Component({
  selector: 'app-chaos',
  templateUrl: './chaos.component.html',
  styleUrls: ['./chaos.component.css']
})
export class ChaosComponent extends ContentBase implements AfterContentInit {

    @ViewChild('defaultCanvas')canvas: ElementRef;
    private _ctx: CanvasRenderingContext2D;

    private _randomized: number[] = [];
    private _blockSize: number;
    private _maxDisplayableGenerations: number;
    private _buffer: ImageData;

    constructor(
                protected automaton: AutomatonService,
                protected size: SizeService
    ) { 
        super(automaton, size);
    }

    ngAfterContentInit() {
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

    onReset()
    {
        this._ctx.clearRect(0, 0, this.widgetWidth, this.widgetHeight);
        this._blockSize = this.getBlocksize();
        this._maxDisplayableGenerations = Math.floor(this.widgetWidth / this._blockSize);
        this.render();
    }

    init() {
        this.canvas.nativeElement.height = this.widgetHeight;
        this.canvas.nativeElement.width = this.widgetWidth;
        this._randomized = [];
        for (let i = 0; i < this.automaton.cellnumber; i++) {
            this._randomized.push(i);
        }
        this.shuffle(this._randomized);
        this._blockSize = this.getBlocksize();
        this._maxDisplayableGenerations = Math.floor(this.widgetHeight / this._blockSize);
    }

    render() {
        const positionY = this.getPosition();
        if (this.automaton.generation >= this._maxDisplayableGenerations) {
            this._buffer = this._ctx.getImageData(0, this._blockSize, this.widgetWidth, this.widgetHeight - this._blockSize);
            this._ctx.clearRect(0, 0, this.widgetWidth, this.widgetHeight);
            this._ctx.putImageData(this._buffer, 0, 0);
        }
        this.automaton.cells.forEach(
            cell => {
                if (cell.state === 1) {
                    this._ctx.fillRect(
                        this._randomized[cell.id] * this._blockSize,
                        positionY, 
                        this._blockSize,
                        this._blockSize);
                }
        });
    }

    shuffle(array: number[]) {
        for (let i = array.length - 2; i > 0; i--) {
            const random =  1 + Math.floor(Math.random() * i);
            const eltAtRandom = array[random];
            array[random] = array[i];
            array[i] = eltAtRandom;
        }
    }

    getPosition(): number {
        if (this.automaton.generation < this._maxDisplayableGenerations) {
            return this.automaton.generation * this._blockSize;
        }
        return (this._maxDisplayableGenerations - 1) * this._blockSize;
    }

    getBlocksize(): number
    {
        return (this.widgetWidth / this.automaton.cellnumber);
    }

}
