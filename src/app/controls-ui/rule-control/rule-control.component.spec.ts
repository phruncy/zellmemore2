import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RuleControlComponent } from './rule-control.component';

describe('RuleControlComponent', () => {
  let component: RuleControlComponent;
  let fixture: ComponentFixture<RuleControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RuleControlComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
