import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Step04Component } from './step04.component';

describe('Step04Component', () => {
  let component: Step04Component;
  let fixture: ComponentFixture<Step04Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [Step04Component],
    providers: [provideAnimations()] 
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step04Component);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeDescription', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
