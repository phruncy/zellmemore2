import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisualizationDetailService {

  constructor(private http: HttpClient) { }

  private _details = 'api/json/visualization-details.json'
  
  //provides the json data asounchronously
  provideVisualizations(): Observable<any>
  {
    let jsonData = "hallo";
    return this.http.get<any>('../assets/json/visualization-details.json').pipe();
  }
}
