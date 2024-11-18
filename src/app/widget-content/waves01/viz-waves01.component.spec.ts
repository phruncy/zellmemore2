import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizWaves01Component } from './viz-waves01.component';

describe('VizWaves01Component', () => {
  let component: VizWaves01Component;
  let fixture: ComponentFixture<VizWaves01Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizWaves01Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizWaves01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
