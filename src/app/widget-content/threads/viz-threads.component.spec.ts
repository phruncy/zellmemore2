import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizThreadsComponent } from './viz-threads.component';

describe('VizThreadsComponent', () => {
  let component: VizThreadsComponent;
  let fixture: ComponentFixture<VizThreadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizThreadsComponent]
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
