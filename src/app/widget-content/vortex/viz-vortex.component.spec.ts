import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizVortexComponent } from './viz-vortex.component';

describe('VizVortexComponent', () => {
  let component: VizVortexComponent;
  let fixture: ComponentFixture<VizVortexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VizVortexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizVortexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
