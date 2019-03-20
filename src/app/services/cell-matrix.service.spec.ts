import { TestBed, inject } from '@angular/core/testing';

import { CellMatrixService } from './cell-matrix.service';

describe('CellMatrixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CellMatrixService]
    });
  });

  it('should be created', inject([CellMatrixService], (service: CellMatrixService) => {
    expect(service).toBeTruthy();
  }));
});
