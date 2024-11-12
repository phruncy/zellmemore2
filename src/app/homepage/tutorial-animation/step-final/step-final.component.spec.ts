import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepFinalComponent } from './step-final.component';

describe('StepFinalComponent', () => {
  let component: StepFinalComponent;
  let fixture: ComponentFixture<StepFinalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StepFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
