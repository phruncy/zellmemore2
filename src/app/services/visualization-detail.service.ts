import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VisualizationDescData } from 'src/app/VisualizationDescData';

interface VisualizationDescWithId {
    id: string;
    value: VisualizationDescData;
}

@Injectable({
    providedIn: 'root',
})
export class VisualizationDetailService {
    private _source: string = 'assets/json/visualization-details.json';

    constructor(private _http: HttpClient) {}

    async getName(index: number) {
        const data = await firstValueFrom(this._http.get<any>(this._source));
        const name = data[index].value.name;
        return name;
    }

    provideVisualizations(): Observable<VisualizationDescData[]> {
        return this._http.get<VisualizationDescWithId[]>(this._source).pipe(
            map((data) => {
                return data.map((element) => element.value);
            }),
        );
    }

    fetchDescriptionData(): Observable<VisualizationDescWithId[]> {
        return this._http.get<VisualizationDescWithId[]>(this._source);
    }
}
