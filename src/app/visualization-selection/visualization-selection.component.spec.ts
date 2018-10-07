import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationSelectionComponent } from './visualization-selection.component';

describe('VisualizationSelectionComponent', () => {
  let component: VisualizationSelectionComponent;
  let fixture: ComponentFixture<VisualizationSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationSelectionComponent ]
    })
    .compileComponents();
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
