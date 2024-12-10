import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Step03Component } from './step03.component';

describe('Step03Component', () => {
  let component: Step03Component;
  let fixture: ComponentFixture<Step03Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [Step03Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
