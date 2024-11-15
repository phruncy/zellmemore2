import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisualizationDetailService {

  constructor(private http: HttpClient) { }

  provideVisualizations(): Observable<any>
  {
    return this.http.get<any>('../assets/json/visualization-details.json').pipe();
  }
}
