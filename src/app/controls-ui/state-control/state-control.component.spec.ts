import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StateControlComponent } from './state-control.component';

describe('StateControlComponent', () => {
  let component: StateControlComponent;
  let fixture: ComponentFixture<StateControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StateControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
