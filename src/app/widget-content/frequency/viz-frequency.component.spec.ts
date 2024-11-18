import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizFrequencyComponent } from './viz-frequency.component';

describe('VizFrequencyComponent', () => {
  let component: VizFrequencyComponent;
  let fixture: ComponentFixture<VizFrequencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizFrequencyComponent]
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
