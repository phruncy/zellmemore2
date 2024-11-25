import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5VisualizationComponent } from './p5-visualization.component';

describe('P5VisualizationComponent', () => {
  let component: P5VisualizationComponent;
  let fixture: ComponentFixture<P5VisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P5VisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P5VisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
