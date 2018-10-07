import { TestBed, inject } from '@angular/core/testing';

import { VisualizationDetailService } from './visualization-detail.service';

describe('VisualizationDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualizationDetailService]
    });
  });

  it('should be created', inject([VisualizationDetailService], (service: VisualizationDetailService) => {
    expect(service).toBeTruthy();
  }));
});
