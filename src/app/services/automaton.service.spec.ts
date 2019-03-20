import { TestBed, inject } from '@angular/core/testing';

import { AutomatonService } from './automaton.service';

describe('AutomatonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomatonService]
    });
  });

  it('should be created', inject([AutomatonService], (service: AutomatonService) => {
    expect(service).toBeTruthy();
  }));
});
