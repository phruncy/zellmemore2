import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizWaves02Component } from './viz-waves02.component';

describe('VizWaves02Component', () => {
  let component: VizWaves02Component;
  let fixture: ComponentFixture<VizWaves02Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizWaves02Component]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizWaves02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
