import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizSignalsComponent } from './viz-signals.component';

describe('VizSignalsComponent', () => {
  let component: VizSignalsComponent;
  let fixture: ComponentFixture<VizSignalsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizSignalsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
