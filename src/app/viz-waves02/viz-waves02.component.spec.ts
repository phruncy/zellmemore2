import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizWaves02Component } from './viz-waves02.component';

describe('VizWaves02Component', () => {
  let component: VizWaves02Component;
  let fixture: ComponentFixture<VizWaves02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizWaves02Component ]
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
