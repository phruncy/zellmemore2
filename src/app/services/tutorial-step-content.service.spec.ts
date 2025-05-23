import { TestBed } from '@angular/core/testing';

import { TutorialStepContentService } from './tutorial-step-content.service';

describe('TutorialStepContentService', () => {
    let service: TutorialStepContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TutorialStepContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
