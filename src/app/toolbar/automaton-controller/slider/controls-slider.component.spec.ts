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
    const mockSettings = { min: 0, max: 100, label: "mock", step: 1 };
    fixture.componentRef.setInput('settings', mockSettings);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
