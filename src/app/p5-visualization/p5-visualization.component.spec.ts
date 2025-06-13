import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5VisualizationComponent } from './p5-visualization.component';
import { AutomatonService } from '../services/automaton.service';
import { p5sketch } from '../P5Sketches/P5Sketch';

describe('P5VisualizationComponent', () => {
    let component: P5VisualizationComponent;
    let fixture: ComponentFixture<P5VisualizationComponent>;
    let mockAutomaton: jasmine.SpyObj<AutomatonService>;

    beforeEach(async () => {
        mockAutomaton = jasmine.createSpyObj('AutomatonService', ['getStates']);
        await TestBed.configureTestingModule({
            imports: [P5VisualizationComponent],
            providers: [{ provide: AutomatonService, useValue: mockAutomaton }],
        }).compileComponents();

        fixture = TestBed.createComponent(P5VisualizationComponent);
        component = fixture.componentInstance;

        const dummyP5: p5sketch = () => {};
        fixture.componentRef.setInput('p5sketch', dummyP5);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
