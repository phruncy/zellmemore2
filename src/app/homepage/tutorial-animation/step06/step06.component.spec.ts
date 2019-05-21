import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step06Component } from './step06.component';

describe('Step06Component', () => {
  let component: Step06Component;
  let fixture: ComponentFixture<Step06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
