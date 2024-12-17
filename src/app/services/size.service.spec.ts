import { TestBed, inject } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SizeService } from './size.service';

describe('SizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SizeService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should be created', inject([SizeService], (service: SizeService) => {
    expect(service).toBeTruthy();
  }));
});
