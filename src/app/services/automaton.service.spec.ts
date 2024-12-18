import { TestBed, inject } from '@angular/core/testing';
import { AutomatonService } from './automaton.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AutomatonService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AutomatonService, provideHttpClient(), provideHttpClientTesting()],
        });
    });

    it('should be created', inject([AutomatonService], (service: AutomatonService) => {
        expect(service).toBeTruthy();
    }));
});
