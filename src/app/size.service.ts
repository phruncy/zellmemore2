import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

    private _frameHeight;
    private _frameWidth;
    constructor() { }

  setFrameSize(width: number, height: number) {
      this._frameWidth = width;
      this._frameHeight = height;
  }

  provideHeight(rows): number {
        const height = 250;
        return height;
  }

  provideWidth(): number {
      const width = 250;
      return width;
  }




}