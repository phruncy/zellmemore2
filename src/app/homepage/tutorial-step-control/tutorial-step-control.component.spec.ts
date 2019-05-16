import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialStepControlComponent } from './tutorial-step-control.component';

describe('TutorialStepControlComponent', () => {
  let component: TutorialStepControlComponent;
  let fixture: ComponentFixture<TutorialStepControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialStepControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialStepControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
