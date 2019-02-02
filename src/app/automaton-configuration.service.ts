import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutomatonConfigurationService {

    private _initialNumbers = [110, 30, 45, 90, 150, 250, 129, 105, 99, 182, 225, 147, 131, 18, 118, 13, 73, 137, 124, 193];
    private _configuration: any;

    constructor(private httpService: HttpClient) {
        /* fetches the configuration json data */
        this.httpService.get('../assets/json/automaton-config.json').subscribe(
            data => {
                this._configuration = data;
                console.log(this._configuration.fps);
            },
            (err: HttpErrorResponse) => {
                console.log(err.message);
            }
        );
     }

    get fps(): number
    {
        return 23;//parseInt(this._configuration.fps, 10);
    }

    get isCircular(): boolean {
        return false;//this._configuration['isCircular'];
    }

    get cellnumber(): number {
        return 120;
    }

    get stateConfiguration(): number {
        return 0;
    }


  provideStartRule(): number {
    const randomIndex = Math.floor(Math.random() * this._initialNumbers.length);
    return this._initialNumbers[randomIndex];
  }


}


