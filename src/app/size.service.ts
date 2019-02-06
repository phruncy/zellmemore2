import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

    private _frameHeight;
    private _frameWidth;
    private _widgetNumber = 0;
    private _widgetSize = 250;
    public margin = 3; // default
    /* informs listeners (widgets) about change in widget size */
    private _sizeChanged = new Subject<void>();
    public sizeChanged$ = this._sizeChanged.asObservable();
    
    constructor(private http: HttpClient) {
        this.http.get('../assets/json/ui.json').subscribe((data: any) => {
            const config = data;
            this.margin = config.widgetMargin;
        });
    }

    get widgetSize(): number
    {
      return this._widgetSize;
    }

  setFrameSize(width: number, height: number) {
      this._frameWidth = width;
      this._frameHeight = height;
      this.changeWidgetSize();
  }

  decreaseWidgetNumber()
  {
      this._widgetNumber--;
      this.changeWidgetSize();
  }

  increaseWidgetNumber()
  {
      this._widgetNumber++;
      this.changeWidgetSize();
      console.log("widgets: " + this._widgetNumber + ", size: " + this._widgetSize);
  }

    /* calculates the maximum side length for the current number of widgets
     * @param rows: the number of rows that the widgets will be displayed in
     *              it is increased by 1 whenever the resulting sidelength for
     *              the given number of rows is smaller than the resulting 
     *              sidelength for the given rows + 1.
     */

    private getInterimSize(rows) {
        const w = (this._frameWidth - 
            (this._widgetNumber / rows) * this.margin) / Math.ceil(this._widgetNumber / rows);
        if ((w * rows + rows * this.margin) > this._frameHeight) {
            return (this._frameHeight - this.margin) / rows;
        }
        return Math.floor(w) - 1;
    }
    
    private changeWidgetSize()
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