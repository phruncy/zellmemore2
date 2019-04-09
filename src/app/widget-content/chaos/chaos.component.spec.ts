import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaosComponent } from './chaos.component';

describe('ChaosComponent', () => {
  let component: ChaosComponent;
  let fixture: ComponentFixture<ChaosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
