import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizDefaultComponent } from './viz-default.component';

describe('VizDefaultComponent', () => {
  let component: VizDefaultComponent;
  let fixture: ComponentFixture<VizDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizDefaultComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
