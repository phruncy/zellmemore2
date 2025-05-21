import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VisualizationDescData } from 'src/VisualizationDescData';

@Injectable({
    providedIn: 'root',
})
export class VisualizationDetailService {
    private _source: string = '../assets/json/visualization-details.json';

    constructor(private _http: HttpClient) {}

    async getName(id: number) {
        const data = await this._http.get<any>(this._source).toPromise();
        const name = data.find((obj) => obj.id === id).name;
        return name;
    }

    provideVisualizations(): Observable<VisualizationDescData[]> {
        return this._http.get<VisualizationDescData[]>(this._source);
    }
}
