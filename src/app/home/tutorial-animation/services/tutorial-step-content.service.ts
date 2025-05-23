import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { TutorialStepData } from '../TutorialStepData';

@Injectable()
export class TutorialStepContentService {
    private _http = inject(HttpClient);
    private readonly dataPath = '/assets/json/tutorialtexts.json';
    private _data$: Observable<TutorialStepData[]>;

    constructor() {
        this._data$ = this.fetchData();
    }

    fetchStepsData(): Observable<TutorialStepData[]> {
        return this._data$;
    }

    private fetchData(): Observable<TutorialStepData[]> {
        return this._http.get<TutorialStepData[]>(this.dataPath).pipe(shareReplay(1));
    }
}
