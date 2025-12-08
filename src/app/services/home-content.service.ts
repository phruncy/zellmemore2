import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeContentData } from '../home/HomeContentData';

@Injectable({
    providedIn: 'root',
})
export class HomeContentService {
    private readonly _http = inject(HttpClient);
    fetchContent(): Observable<HomeContentData> {
        return this._http.get<HomeContentData>('assets/json/homepage-text.json');
    }
}
