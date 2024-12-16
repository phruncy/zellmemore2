import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
    
    public margin;
    private _sizeChanged = new Subject<void>();
    public sizeChanged$ = this._sizeChanged.asObservable();

    private _config = {
        appCanvasWidth: 0,
        appCanvasHeight: 0,
        widgetNumber: 0,
        widgetSize: 0,
        minWidgetSize: 0
    }

    constructor(private http: HttpClient) {
        this.http.get('../assets/json/ui.json').subscribe((data: any) => {
            const config = data;
            this.margin = config.widgetMargin;
            this._config.minWidgetSize = config.minWidgetSize;
        });
    }

    get isSmallMobile(): boolean { return this._config.appCanvasWidth - this.margin - this._addAreaSmallSide < this._config.minWidgetSize * 2;}
    private _addAreaSmallSide = 35;
    get addAreaWidth(): number { return this.isSmallMobile ? this._config.widgetSize : this._addAreaSmallSide; }
    get addAreaHeight(): number 
    { 
        return this.isSmallMobile ? this._addAreaSmallSide : this.widgetSize;
    }
    get widgetSize(): number { return this._config.widgetSize; }
    get widgetNumber(): number { return this._config.widgetNumber; }

    public setFrameSize(width: number, height: number) 
    {
            this._config.appCanvasWidth = width;
            this._config.appCanvasHeight = height;
            this.setWidgetSize();
    }

    public decreaseWidgetNumber()
    {
        this._config.widgetNumber--;
        this.setWidgetSize();
    }

    public increaseWidgetNumber()
    {
        this._config.widgetNumber++;
        this.setWidgetSize();
    }
    
    /**
     * Calculate Max length of each square if they are arranged in a layout with n rows:
     * Calculate a the maximum size based on both the width and the height and take the 
     * minium of both in order to fit both constraints
     */
    private calculateWidgetSize(rows: number) : number 
    {
        const maxWidgetsPerRow = Math.ceil(this._config.widgetNumber / rows);
        const netWidth = this._config.appCanvasWidth - maxWidgetsPerRow * this.margin - this.addAreaWidth;
        const netHeight = this._config.appCanvasHeight - rows * this.margin;
        const maxWidth = netWidth / maxWidgetsPerRow;
        const maxHeight = netHeight / rows;
        return Math.min (maxWidth, maxHeight);
    }

    private calculateForLargeLayout(): number 
    {
        let rows = 1;
        let sidelength = 0;
        while ((sidelength = this.calculateWidgetSize(rows)) < this.calculateWidgetSize(rows + 1))
        {
            rows++;
        }
        return sidelength;
    }

    private setWidgetSize()
    {
        if (this._config.appCanvasHeight > this._config.appCanvasWidth && this.isSmallMobile)
        {
            this._config.widgetSize = this._config.appCanvasWidth - this.margin;
        } 
        else 
        {
            this._config.widgetSize = this.calculateForLargeLayout();
        }
        this._sizeChanged.next();
    }
}