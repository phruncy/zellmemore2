import { TestBed, inject } from '@angular/core/testing';

import { RuleConverterService } from './rule-converter.service';

describe('RuleConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuleConverterService]
    });
  });

  it('should be created', inject([RuleConverterService], (service: RuleConverterService) => {
    expect(service).toBeTruthy();
  }));
});
