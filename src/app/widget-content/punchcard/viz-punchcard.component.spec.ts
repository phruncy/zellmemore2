import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VizPunchcardComponent } from './viz-punchcard.component';

describe('VizPunchcardComponent', () => {
  let component: VizPunchcardComponent;
  let fixture: ComponentFixture<VizPunchcardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [VizPunchcardComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizPunchcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
