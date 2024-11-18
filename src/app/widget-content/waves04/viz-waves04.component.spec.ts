import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizWaves04Component } from './viz-waves04.component';

describe('VizWaves04Component', () => {
  let component: VizWaves04Component;
  let fixture: ComponentFixture<VizWaves04Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizWaves04Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizWaves04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
