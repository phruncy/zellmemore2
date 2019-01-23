import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { AutomatonService } from '../automaton.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-view',
  templateUrl: './testing02.component.html',
  styleUrls: ['./testing02.component.css']
})
export class Testing02Component implements OnInit, OnDestroy, AfterContentInit {

    private automatonSubscription: Subscription;
    /* Access to Canvas Element */
    @ViewChild('defaultCanvas')canvas: ElementRef;
    private _ctx: CanvasRenderingContext2D;

    private blockMatrix: number[][];
    private _blockSize = 2;

    constructor(private automaton: AutomatonService,
                private reference: ElementRef) {}

    ngOnInit()
    {
        this.automatonSubscription = this.automaton.changed$.subscribe(
            () => {
                /* Automaton Change Callback: here goes whatever the visualization does when the automaton changes state */
                this.update();
            });
    }

    ngOnDestroy()
    {
        console.log(' testing02 unsubscribed and destroyed');
        this.automatonSubscription.unsubscribe();
    }

    ngAfterContentInit()
    {
        this._ctx = this.canvas.nativeElement.getContext('2d');
        this.render();
    }

    update()
    {
        this.render();
    }

    render()
    {
        this._ctx.clearRect(0, 0, 200, 200);
        for (let i = 0; i < this.automaton.cells.length; i++) {
            if (this.automaton.cells[i].state === 1) {
                this._ctx.fillRect(i * this._blockSize, 0, this._blockSize, 200);
            }
        }
    }

}
