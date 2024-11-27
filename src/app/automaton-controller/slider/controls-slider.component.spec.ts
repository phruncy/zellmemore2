import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsSliderComponent } from './controls-slider.component';

describe('ControlsSliderComponent', () => {
  let component: ControlsSliderComponent;
  let fixture: ComponentFixture<ControlsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
