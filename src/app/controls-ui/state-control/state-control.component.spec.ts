import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateControlComponent } from './state-control.component';

describe('StateControlComponent', () => {
  let component: StateControlComponent;
  let fixture: ComponentFixture<StateControlComponent>;

  beforeEach(async(() => {
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
