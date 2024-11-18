import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Step05Component } from './step05.component';

describe('Step05Component', () => {
  let component: Step05Component;
  let fixture: ComponentFixture<Step05Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [Step05Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
