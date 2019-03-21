import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

    private _palette = [
        [232, 29, 98],
        [55, 64, 70],
        [0, 187, 211],
        [255, 234, 58],
        [155, 37, 175],
        [138, 194, 73],
        [204, 219, 56],
        [33, 149, 242]
    ];
    constructor() { }

    get palette(): number[][] {
        return this._palette;
    }
}
