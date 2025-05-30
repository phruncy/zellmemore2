import { TestBed } from '@angular/core/testing';

import { VisualizationContextService } from './visualization-context.service';

describe('VisualizationContextService', () => {
  let service: VisualizationContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizationContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
