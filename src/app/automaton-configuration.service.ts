import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutomatonConfigurationService {

    private _initialNumbers = [110, 30, 45, 90, 150, 250, 129, 105, 99, 182, 225, 147, 131, 18, 118, 13, 73, 137, 124, 193];
    constructor() { }

  provideStartRule(): number {
    const randomIndex = Math.floor(Math.random() * this._initialNumbers.length);
    return 90;
    /* return this._initialNumbers[randomIndex]; */
  }

/*   //Gibt eine einzelne Configuration zurück
  //gibt das Element zurück, dessen id dem übergebenen Parameter entspricht
  getConfiguration(id: number): //Observable<AutomatonConfiguration>
  {
  //of() gibt ein Observable zurück
  //return of(CONFIGURATIONS.find(configuration => configuration.id === id));

  }

 
getConfigurations(): //Observable<AutomatonConfiguration[]>
  {
    //of() gibt ein Observable zurück 
    //return of(CONFIGURATIONS);
  } */
}


