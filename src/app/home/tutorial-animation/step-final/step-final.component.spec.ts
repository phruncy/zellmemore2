import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StepFinalComponent } from './step-final.component';

describe('StepFinalComponent', () => {
  let component: StepFinalComponent;
  let fixture: ComponentFixture<StepFinalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [StepFinalComponent],
    providers: [provideRouter([]), provideAnimations()],
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFinalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeDescription', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
