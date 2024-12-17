import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TutorialAnimationComponent } from './tutorial-animation.component';

describe('TutorialAnimationComponent', () => {
  let component: TutorialAnimationComponent;
  let fixture: ComponentFixture<TutorialAnimationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [TutorialAnimationComponent],
    providers: [provideAnimations()] 
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
