import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizationSelectionComponent } from './visualization-selection.component';

describe('VisualizationSelectionComponent', () => {
    let component: VisualizationSelectionComponent;
    let fixture: ComponentFixture<VisualizationSelectionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [VisualizationSelectionComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VisualizationSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
