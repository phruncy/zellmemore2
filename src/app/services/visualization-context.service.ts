import { Injectable } from '@angular/core';
import { VisualizationService as SketchService } from './visualization.service';
import { VisualizationDetailService as DescDataService } from './visualization-detail.service';
import { AutomatonService } from './automaton.service';
import { VisualizationDescData } from '../VisualizationDescData';
import { map, Observable } from 'rxjs';
import { p5sketch } from '../P5Sketches/P5Sketch';

export interface VisualizationContext {
    factory: (automaton: AutomatonService) => p5sketch;
    data: VisualizationDescData;
}

@Injectable()
export class VisualizationContextService {
    constructor(
        private sketchService: SketchService,
        private dataService: DescDataService,
    ) {}

    readonly defaultDesc: VisualizationDescData = {
        name: 'Unnamed Sketch',
        thumbnail: '',
    };

    public getFactoryByIndex(index: number) {
        const factory = this.sketchService.sketchList[index].factory;
        return factory;
    }

    public getContextByIndex(index: number): Observable<VisualizationContext> {
        return this.combineContexts().pipe(map((contexts) => contexts[index]));
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
        );
    }
}
