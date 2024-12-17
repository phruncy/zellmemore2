import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Step01Component } from './step01.component';

describe('Step01Component', () => {
  let component: Step01Component;
  let fixture: ComponentFixture<Step01Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [Step01Component],
    providers: [provideAnimations()] 
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step01Component);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeDescription', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
