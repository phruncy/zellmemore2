import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationDetailComponent } from './visualization-detail.component';

describe('VisualizationDetailComponent', () => {
  let component: VisualizationDetailComponent;
  let fixture: ComponentFixture<VisualizationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
