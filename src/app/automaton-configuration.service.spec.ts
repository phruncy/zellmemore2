import { TestBed, inject } from '@angular/core/testing';

import { AutomatonConfigurationService } from './automaton-configuration.service';

describe('AutomatonConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomatonConfigurationService]
    });
  });

  it('should be created', inject([AutomatonConfigurationService], (service: AutomatonConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
