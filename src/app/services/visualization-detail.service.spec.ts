import { TestBed, inject } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VisualizationDetailService } from './visualization-detail.service';

describe('VisualizationDetailService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VisualizationDetailService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });
    });

    it('should be created', inject(
        [VisualizationDetailService],
        (service: VisualizationDetailService) => {
            expect(service).toBeTruthy();
        },
    ));
});
