import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisualizationDetailService {

  private _source: string = '../assets/json/visualization-details.json';

  constructor(private http: HttpClient) { }

  async getName(id: string)
  {
    const data = await this.http.get<any>(this._source).toPromise();
    const name = data.find(obj => obj.id === id).name;
    return name;
  }

  provideVisualizations(): Observable<any>
  {
    return this.http.get<any>(this._source).pipe();
  }
}
