import { TestBed, inject } from '@angular/core/testing';

import { VisualizationSizeService } from './visualization-size.service';

describe('VisualizationSizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualizationSizeService]
    });
  });

  it('should be created', inject([VisualizationSizeService], (service: VisualizationSizeService) => {
    expect(service).toBeTruthy();
  }));
});
