import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizFrequencyComponent } from './viz-frequency.component';

describe('VizFrequencyComponent', () => {
  let component: VizFrequencyComponent;
  let fixture: ComponentFixture<VizFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
