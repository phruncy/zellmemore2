import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualizationSizeService {

    private _visualizationHeight: number;
    private _visualizationWidth: number;
    private _visualizationAreaHeight: number;
    private _visualizationAreaWidth: number;
    private _inbetween: number;

    constructor() { }

    get visualizationHeight(): number
    {
        return this._visualizationHeight;
    }

    get visualizationWidth(): number
    {
        return this.visualizationWidth;
    }

    calculateVisualizationScale()
    {
        
    }

}
