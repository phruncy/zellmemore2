import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

    private _frameHeight;
    private _frameWidth;
    private _widgetNumber = 0;
    private _widgetSize = 250;
    /* informs listeners (widgets) about change in widget size */
    private _sizeChanged = new Subject<void>();
    public sizeChanged$ = this._sizeChanged.asObservable();
    constructor() { }

    get widgetSize(): number
    {
      return this._widgetSize;
    }

  setFrameSize(width: number, height: number) {
      this._frameWidth = width;
      this._frameHeight = height;
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

  private getInterimSize(rows: number): number
    {
        return this._frameWidth / Math.ceil(this._widgetNumber / rows);
    }

  private getInterimTotal(rows: number): number
  {
      return this.getInterimSize(rows) * rows;
  }  

    /* calculates the maximum side length for the current number of widgets
     * @param rows: the number of rows that the widgets will be displayed in
     *              it is increased by 1 whenever the resulting sidelength for
     *              the given number of rows is smaller than the resulting 
     *              sidelength for the given rows + 1.
     */
    private changeWidgetSize()
    {
        let rows = 1;
        let sidelength;
        while (((sidelength = this.getInterimSize(rows)) <= this.getInterimSize(rows + 1)) && (this.getInterimTotal(rows + 1) <= this._frameHeight)) {
            rows++;
        }
        if (sidelength >= this._frameHeight) {
            this._widgetSize = this._frameHeight;
        } else {
            this._widgetSize = sidelength;
        }
        this._sizeChanged.next();
    }
}