import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizWaves03Component } from './viz-waves03.component';

describe('VizWaves03Component', () => {
  let component: VizWaves03Component;
  let fixture: ComponentFixture<VizWaves03Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizWaves03Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizWaves03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
