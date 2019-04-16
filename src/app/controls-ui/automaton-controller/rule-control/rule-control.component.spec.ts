import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleControlComponent } from './rule-control.component';

describe('RuleControlComponent', () => {
  let component: RuleControlComponent;
  let fixture: ComponentFixture<RuleControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleControlComponent ]
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
