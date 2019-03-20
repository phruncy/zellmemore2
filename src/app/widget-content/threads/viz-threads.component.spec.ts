import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizThreadsComponent } from './viz-threads.component';

describe('VizThreadsComponent', () => {
  let component: VizThreadsComponent;
  let fixture: ComponentFixture<VizThreadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizThreadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
