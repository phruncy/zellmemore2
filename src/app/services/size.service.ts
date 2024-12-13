import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
    
    public margin;
    private _appCanvasWidth;
    private _appCanvasHeight;
    private _widgetNumber = 0;
    private _widgetSize = 250;

    private _sizeChanged = new Subject<void>();
    public sizeChanged$ = this._sizeChanged.asObservable();

    constructor(private http: HttpClient) {
        this.http.get('../assets/json/ui.json').subscribe((data: any) => {
            const config = data;
            this.margin = config.widgetMargin;
        });
    }

    get widgetSize(): number { return this._widgetSize; }
    get widgetNumber(): number { return this._widgetNumber; }

    public setFrameSize(width: number, height: number) 
    {
            this._appCanvasWidth = width;
            this._appCanvasHeight = height;
            this.setWidgetSize();
    }

    public decreaseWidgetNumber()
    {
        this._widgetNumber--;
        this.setWidgetSize();
    }

    public increaseWidgetNumber()
    {
        this._widgetNumber++;
        this.setWidgetSize();
    }

    /* 
     * calculates the side length for the current number of widgets in the
     * given number of rows based on the frameWidth.
     * if the result exceeds the frameHeight, the maximum widget size based on * the frame height is returned instead.
     * @param rows: the number of rows that the widgets will be displayed in
     *              it is increased by 1 whenever the resulting sidelength for
     *              the given number of rows is smaller than the resulting 
     *              sidelength for the given rows + 1.
     */

    private getInterimSize(rows: number): number {
        const w = (this._appCanvasWidth - 
            (this._widgetNumber / rows) * this.margin) / Math.ceil(this._widgetNumber / rows);
        if ((w * rows + rows * this.margin) > this._appCanvasHeight) {
            return (this._appCanvasHeight - this.margin) / rows;
        }
        return Math.floor(w) - 1;
    }

    private setWidgetSize()
    {
        let rows = 1;
        let sidelength;
        while ((sidelength = this.getInterimSize(rows)) 
            < this.getInterimSize(rows + 1)) {
            rows++;
        }
        this._widgetSize = Math.floor(sidelength);
        this._sizeChanged.next();
    }
}