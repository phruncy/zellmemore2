import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Step06Component } from './step06.component';

describe('Step06Component', () => {
  let component: Step06Component;
  let fixture: ComponentFixture<Step06Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [Step06Component]
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
