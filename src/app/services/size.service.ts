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
    
    readonly addAreaWidth = 35;
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
    
    /**
     * Calculate Max length of each square if they are arranged in a layout with n rows:
     * Calculate a the maximum size based on both the width and the height and take the 
     * minium of both in order to fit both constraints
     */
    private calculateWidgetSize(rows: number) : number 
    {
        const maxWidgetsPerRow = Math.ceil(this.widgetNumber / rows);
        const netWidth = this._appCanvasWidth - maxWidgetsPerRow * this.margin - this.addAreaWidth;
        const netHeight = this._appCanvasHeight - (rows - 1) * this.margin;
        const maxWidth = netWidth / maxWidgetsPerRow;
        const maxHeight = netHeight / rows;
        return Math.min (maxWidth, maxHeight);
    }

    private setWidgetSize()
    {
        let rows = 1;
        let sidelength = 0;
        while ((sidelength = this.calculateWidgetSize(rows)) < this.calculateWidgetSize(rows + 1))
        {
            rows++;
        }
        this._widgetSize = sidelength;
        this._sizeChanged.next();
    }
}