import { computed, Injectable, Signal } from '@angular/core';
import { VisualizationService as SketchService } from './visualization.service';
import { VisualizationDetailService as DescDataService } from './visualization-detail.service';
import { AutomatonService } from './automaton.service';
import { VisualizationDescData } from '../VisualizationDescData';
import { map, Observable, shareReplay, Subject } from 'rxjs';
import { p5sketch } from '../P5Sketches/P5Sketch';

export interface VisualizationContext {
    factory: (automaton: AutomatonService) => p5sketch;
    data: VisualizationDescData;
}

@Injectable()
export class VisualizationContextService {
    private _contexts: Observable<VisualizationContext[]>;
    constructor(
        private sketchService: SketchService,
        private dataService: DescDataService,
    ) {
        this._contexts = this.combineContexts();
    }

    readonly defaultDesc: VisualizationDescData = {
        name: 'Unnamed Sketch',
        thumbnail: '',
    };

    private _creationRequest = new Subject<number>();
    creationRequested$ = this._creationRequest.asObservable();

    get activeSketches(): Signal<boolean[]> {
        return this.sketchService.isActiveMap;
    }

    public requestCreation(index: number) {
        this.sketchService.select(index);
        this._creationRequest.next(index);
    }

    public addToActives(index: number) {
        this.sketchService.addToActive(index);
    }

    public removeFromeActives(index: number) {
        this.sketchService.removeFromActive(index);
    }

    public getFactoryByIndex(index: number) {
        const factory = this.sketchService.sketchList[index].factory;
        return factory;
    }

    public getContextByIndex(index: number): Observable<VisualizationContext> {
        return this._contexts.pipe(map((contexts) => contexts[index]));
    }

    public getContexts(): Observable<VisualizationContext[]> {
        return this._contexts;
    }

    private combineContexts(): Observable<VisualizationContext[]> {
        const sketches = this.sketchService.sketchList;
        const data = this.dataService.fetchDescriptionData();
        return data.pipe(
            map((data) =>
                sketches.map((sketch) => {
                    const descData =
                        data.find((element) => element.id === sketch.id).value ?? this.defaultDesc;
                    return <VisualizationContext>{
                        factory: sketch.factory,
                        data: descData,
                    };
                }),
            ),
            shareReplay(1),
        );
    }
}
