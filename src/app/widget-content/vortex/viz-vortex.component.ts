import { Component, OnInit, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { ContentBase } from '../../content-base/contentBase.component';
import { AutomatonService } from '../../services/automaton.service';
import { SizeService } from '../../services/size.service';
import { CellMatrixService } from '../../services/cell-matrix.service';

@Component({
    selector: 'app-viz-vortex',
    templateUrl: './viz-vortex.component.html',
    styleUrls: ['./viz-vortex.component.css'],
    standalone: true
})
export class VizVortexComponent extends ContentBase implements AfterContentInit {
    @ViewChild('canvas', { static: true }) canvas: ElementRef;
    private _ctx: CanvasRenderingContext2D;

    private _radiusMax: number;
    private _segment: number;
    private _segmentHeight: number;
    private _center: number;

    constructor(
                protected automaton: AutomatonService,
                protected size: SizeService,
                private matrix: CellMatrixService
    ) {
        super(automaton, size);
    }

    ngAfterContentInit()
    {
        this._ctx = this.canvas.nativeElement.getContext('2d');
        console.log(this.matrix.data);
        this.setup();
    }

    render()
    {
        this._ctx.clearRect(0, 0, this.widgetWidth, this.widgetHeight);
        for (let i = 0; i < this.matrix.data.length; i++) {
            this.matrix.data[i].forEach((entry, index) => 
            {
                if (entry === 1) {
                    this._ctx.beginPath();
                    this._ctx.arc(
                        this._center, 
                        this._center, 
                        this.getGenerationRadius(i + 1), 
                        this._segment * index,
                        this._segment * index + this._segment);
                    this._ctx.stroke();
                }
            });
        }
    }

    update()
    {
        this.render();
    }

    onReset()
    {
        this.setup();
    }

    onResize()
    {
        this.setup();
    }

    setup()
    {
        this.canvas.nativeElement.height = this.widgetHeight;
        this.canvas.nativeElement.width = this.widgetWidth;
        this._radiusMax = (this.widgetHeight * 0.9) / 2;
        this._segmentHeight = this._radiusMax / this.matrix.data.length;
        this._segment = (Math.PI * 2) / this.automaton.states.length;
        this._center = this.widgetWidth / 2;
        this.update();
    }

    getGenerationRadius(generation: number): number
    {
        return generation * (this._radiusMax / this.matrix.data.length);
    }

}
